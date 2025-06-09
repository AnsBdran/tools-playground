<script>
	import Nav from './lib/nav.svelte';

	let { children } = $props();
</script>

<Nav />
<div class=" p-12" id="app-main">
	{@render children()}
</div>
