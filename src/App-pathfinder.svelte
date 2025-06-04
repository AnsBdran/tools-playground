<script lang="ts">
	import { fade } from 'svelte/transition';
	import { click, goto, pattern, prefs, state as pathState } from 'svelte-pathfinder';
	import Nav from './lib/nav.svelte';
	import type { Component as SvelteComponentType } from 'svelte';
	import { RenderScan } from 'svelte-render-scan';
	const routes = [
		['/', import('./routes/home.svelte')],
		['/about', import('./routes/about.svelte')],
		['/login', import('./routes/login.svelte')]
	] as const;

	let params = $state(null);
	let Component: SvelteComponentType | null = $state(null);
	let isTransitioning = $state(false);

	prefs.scroll = true;
	$inspect(Component);
	$effect(() => {
		let matched = false;

		for (const [path, comp] of routes) {
			if (!(params = $pattern(path))) continue;
			matched = true;

			if (document.startViewTransition) {
				isTransitioning = true;
				document.startViewTransition(async () => {
					const { default: cmp, ...exports } = await comp;

					if (exports?.validate_params && !(await exports.validate_params(params))) {
						goto('/');
						return;
					}

					if (exports?.load_data) {
						pathState.update((s: any) => ({ ...s }));
					}

					Component = cmp;
					isTransitioning = false;
				});
			} else {
				// Fallback for browsers that don't support View Transitions
				(async () => {
					const { default: cmp, ...exports } = await comp;
					Component = cmp;
				})();
			}
		}
	});
</script>

<svelte:window onclick={click} />
<RenderScan />
<div class="w-full p-4 min-h-screen flex flex-col gap-24">
	<Nav />
	{#if Component}
		<div class:transitioning={isTransitioning}>
			<Component {params} />
		</div>
	{/if}
</div>
<!-- 
<style>
	.transitioning {
		view-transition-name: page;
	}
	::view-transition-old(page),
	::view-transition-new(page) {
		animation: none;
		mix-blend-mode: normal;
	}
	::view-transition-old(page) {
		z-index: 1;
	}
	::view-transition-new(page) {
		z-index: 2;
	}
</style> -->
