<script lang="ts">
	import Container from '$lib/components/template/Container.svelte';
	import Cv from '$lib/components/pages/resume/CV.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data?.resume.title ?? 'Resume'}</title>
</svelte:head>

<Container className="mt-9">
	
	 <Cv resume={data.resume} printable={false}/>
</Container>