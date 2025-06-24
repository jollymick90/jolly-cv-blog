<script lang="ts">
	import Projects from '$lib/components/pages/project/Projects.svelte';
	import Container from '$lib/components/template/Container.svelte';

	let { data } = $props();
	let { posts } = data;
</script>

<svelte:head>
	<title>{data?.resume.title ?? 'Resume'}</title>
</svelte:head>

<Container className="mt-9">
	 <Projects projects={posts}/>
</Container>