<script>
	import EventLayout from '$lib/components/pages/event/EventLayout.svelte';

	export let data;
	let { metadata, content } = data;
	
</script>

<EventLayout article={metadata}>
	
	<svelte:component this={content} />
</EventLayout>
