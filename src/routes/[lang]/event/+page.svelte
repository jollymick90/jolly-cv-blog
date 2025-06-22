<script lang="ts">
	import Event from '$lib/components/pages/event/Event.svelte';
	import Container from '$lib/components/template/Container.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data?.resume.title ?? 'Resume'}</title>
</svelte:head>

<Container className="mt-9">
	 <Event/>
</Container>