<script lang="ts">
	import { Router } from 'sv-router';
	import './router';
	import { RenderScan } from 'svelte-render-scan';

	//  disable auto scroll restoration on back/forward navigation
	history.scrollRestoration = 'manual';
</script>

<Router />
<RenderScan />
