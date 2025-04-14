<!-- src/routes/resume/+page.svelte -->
<script lang="ts">
	import Container from '$lib/components/template/Container.svelte';
	import Resume from '$lib/components/pages/resume/Resume.svelte';	
	
	let { data } = $props();
	function downloadResume() {
	}
</script>

<svelte:head>
	<title>{data?.resume.title ?? 'Resume'}</title>
</svelte:head>

<Container className="mt-9">
	<Resume resume={data.resume}/>
</Container>