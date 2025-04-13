<!-- src/routes/resume/+page.svelte -->
<script lang="ts">
	import Container from '$lib/components/template/Container.svelte';
	import Resume from '$lib/components/pages/resume/Resume.svelte';
	
	export let data;
	// let resume: IResume | null = null
	// let config: ResumeConfig;

	// $: (async () => {
	// 	config = await getConfig('resume');
	// })();

	function downloadResume() {
		// logica per download PDF/Resume
		// puoi linkare direttamente un PDF statico o generarlo
	}
</script>

<svelte:head>
	<title>{data?.resume.title ?? 'Resume'}</title>
</svelte:head>

<Container className="mt-9">
	<Resume resume={data.resume}/>
</Container>