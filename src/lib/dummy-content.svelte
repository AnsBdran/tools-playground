<script lang="ts">
	const dummy: string =
		'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit expedita, soluta error porro	Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit expedita, soluta error porro adipisci consectetur iure, minus asperiores cumque, beatae doloremque delectus sequi quam?';
	const { count = 100, content = dummy } = $props();
</script>

{#each Array(count) as _}
	<p>{content}</p>
{/each}
