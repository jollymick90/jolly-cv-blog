<!-- src/routes/resume/+page.svelte -->
<script lang="ts">
	import { myResumePlaceholder, type IResume } from '$lib/content';
	import { getConfig } from '$lib/utils/config-utils';
	import Container from '$lib/components/Container.svelte';
	import Resume from '$lib/components/resume/Resume.svelte';
	import type { ResumeConfig } from '$lib/types';

	let resume: IResume = myResumePlaceholder
	let config: ResumeConfig;

	$: (async () => {
		config = await getConfig('resume');
	})();

	function downloadResume() {
		// logica per download PDF/Resume
		// puoi linkare direttamente un PDF statico o generarlo
	}
</script>

<svelte:head>
	<title>{config?.title ?? 'Resume'}</title>
</svelte:head>

<Container className="mt-9">
	<Resume resume={resume}/>
</Container>