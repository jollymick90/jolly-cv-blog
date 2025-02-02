<!-- src/routes/resume/+page.svelte -->
<script lang="ts">
	import { getConfig } from '$lib/utils/config';
	import Container from '../../components/Container.svelte';
	import Resume from '../../components/resume/Resume.svelte';
	import type { ResumeConfig } from '../../types';

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
	<Resume />
</Container>