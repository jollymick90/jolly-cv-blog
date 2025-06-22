<script>
	import ProjectLayout from '$lib/components/pages/project/ProjectLayout.svelte';

	export let data;
	let { metadata, content } = data;
	
</script>

<ProjectLayout article={metadata}>
	
	<svelte:component this={content} />
</ProjectLayout>
