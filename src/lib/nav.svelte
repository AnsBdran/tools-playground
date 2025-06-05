<script lang="ts">
	import { links } from '@dvcol/svelte-simple-router';
	const { class: className = '' } = $props();
	import { scrollY } from 'svelte/reactivity/window';
</script>

<nav class={['bg-violet-900 text-white fixed top-0 left-0 right-0 z-10 py-2 px-4', className]}>
	<ul use:links class="flex gap-4">
		<li>
			<a href="/">Home</a>
		</li>
		<li>
			<a href="/about">About</a>
		</li>
		<li>
			<a href="/login">Login</a>
		</li>
		<li>
			<span>
				{scrollY.current}
			</span>
		</li>
	</ul>
</nav>
