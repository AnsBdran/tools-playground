<script lang="ts">
	import { PersistedState } from 'runed';
	import DummyContent from '../lib/dummy-content.svelte';

	const name = new PersistedState('name', '');
</script>

<h1>Hello World</h1>
<input type="text" placeholder="Enter your name" bind:value={name.current} />
<DummyContent />
