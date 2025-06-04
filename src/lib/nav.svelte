<script lang="ts">
	import { link } from '@dvcol/svelte-simple-router';
</script>

<nav>
	<ul class="flex gap-4">
		<li>
			<a href="/" use:link>Home</a>
		</li>
		<li>
			<a href="/about" use:link>About</a>
		</li>
		<li>
			<a href="/login" use:link>Login</a>
		</li>
	</ul>
</nav>
