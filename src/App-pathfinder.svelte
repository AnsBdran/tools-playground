<script lang="ts">
	import { click, goto, pattern, state as pathState } from 'svelte-pathfinder';
	import Nav from './lib/nav-simple-router.svelte';
	import type { Component as SvelteComponentType } from 'svelte';
	import { RenderScan } from 'svelte-render-scan';
	import { scrollY } from 'svelte/reactivity/window';

	const routes = [
		['/', import('./routes/home.svelte')],
		['/about', import('./routes/about.svelte')],
		['/login', import('./routes/login.svelte')]
	] as const;

	let params = $state(null);
	let Component: SvelteComponentType | null = $state(null);
	let isTransitioning = $state(false);

	// prefs.scroll = true;
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
<div class="w-full p-4 min-h-screen pt-16 relative">
	<Nav class="bg-violet-900 text-white fixed top-0 left-0 right-0 z-10 py-2 px-4" />
	{#if Component}
		<div class:transitioning={isTransitioning}>
			<Component {params} />
		</div>
	{/if}
</div>
