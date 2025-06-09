<script lang="ts">
	import { route } from '../router';
	import { active, links } from '@dvcol/svelte-simple-router';
	import { isActiveLink } from 'sv-router';
	const { class: className = '' } = $props();
	import { scrollY } from 'svelte/reactivity/window';
	let enable_transition = $state(true);

	const checkForSamePath = (path: string) => {
		console.log(path, route.pathname);
		return path === route.pathname;
	};

	const onclick = (e: MouseEvent) => {
		if (checkForSamePath((e.currentTarget as HTMLAnchorElement).getAttribute('href') ?? '')) {
			console.log('same path');
		}
	};
</script>

<nav class={['bg-violet-900 text-white fixed top-0 left-0 right-0 z-10 py-2 px-4', className]}>
	<ul class="flex gap-4">
		<li>
			<a href="/" {onclick} data-view-transition={enable_transition} use:isActiveLink>Home</a>
		</li>
		<li>
			<a href="/about" {onclick} data-view-transition={enable_transition} use:isActiveLink>About</a>
		</li>
		<li>
			<a href="/about/nested" {onclick} data-view-transition={enable_transition} use:isActiveLink
				>About nested</a
			>
		</li>
		<li>
			<a href="/login" {onclick} data-view-transition={enable_transition}>Login</a>
		</li>
		<li>
			<a href="/not-found" {onclick} data-view-transition={enable_transition}>Not found</a>
		</li>
		<li>
			<span>
				{scrollY.current}
			</span>
		</li>
	</ul>
</nav>
