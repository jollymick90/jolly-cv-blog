<script lang="ts">
	import Container from '$lib/components/template/Container.svelte';
	import Resume from '$lib/components/pages/resume/Resume.svelte';	
	import Cv from '$lib/components/pages/resume/CV.svelte';
	
	let { data } = $props();
	function downloadResume() {
	}
</script>

<svelte:head>
	<title>{data?.resume.title ?? 'Resume'}</title>
</svelte:head>

<Container className="mt-9">
	<Cv resume={data.resume}/>
</Container>