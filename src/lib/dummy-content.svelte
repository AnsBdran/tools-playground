<script lang="ts">
	const dummy =
		'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit expedita, soluta error porro';
	const { count, content = dummy } = $props();
</script>

{#each Array(100) as _}
	<p>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit expedita, soluta error porro
		adipisci consectetur iure, minus asperiores cumque, beatae doloremque delectus sequi quam?
	</p>
{/each}
