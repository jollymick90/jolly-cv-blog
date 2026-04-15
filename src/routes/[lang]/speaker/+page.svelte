<script lang="ts">
	import Events from '$lib/components/pages/event/Events.svelte';	
	import Container from '$lib/components/template/Container.svelte';

	let { data } = $props();
	let { posts } = data;
</script>

<svelte:head>
	<title>{data?.profile?.name ?? 'Speaker'}</title>
</svelte:head>

<Container className="mt-9">
	 <Events events={posts}/>
</Container>