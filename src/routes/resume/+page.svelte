<!-- src/routes/resume/+page.svelte -->
<script lang="ts">
	import { getConfig } from '../../utils/config';
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

<main>
	<h1>{config?.name}</h1>
	<h2>{config?.role}</h2>
	<p>{config?.description}</p>

	<!-- Esperienze, competenze, ecc... -->
	{#each config?.experiences ?? [] as experience}
		<div>
			<h3>{experience.company}</h3>
			<p>{experience.position} - {experience.years}</p>
		</div>
	{/each}

	<button on:click={downloadResume}>Download Resume</button>
</main>
