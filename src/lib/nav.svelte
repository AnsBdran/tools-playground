<script lang="ts">
	import { active, links } from '@dvcol/svelte-simple-router';
	const { class: className = '' } = $props();
	import { scrollY } from 'svelte/reactivity/window';
</script>

<nav class={['bg-violet-900 text-white fixed top-0 left-0 right-0 z-10 py-2 px-4', className]}>
	<ul
		use:links={{
			navigate: {
				force: true
			}
		}}
		class="flex gap-4"
	>
		<li>
			<a href="/" use:active={{ path: '/', name: 'home' }}>Home</a>
		</li>
		<li>
			<a href="/about" use:active>About</a>
		</li>
		<li>
			<a href="/login" use:active>Login</a>
		</li>
		<li>
			<a href="/not-found">redirect =&gt; /</a>
		</li>
		<li>
			<span>
				{scrollY.current}
			</span>
		</li>
	</ul>
</nav>
