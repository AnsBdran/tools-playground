<script>
	import { searchParams } from 'sv-router';
	import DummyContent from '../lib/dummy-content.svelte';

	searchParams.append('test', 'test');
</script>

<h1>About</h1>
<DummyContent content="About page" />
