<!-- src/routes/landing/+page.svelte -->
<script lang="ts">
	// import { getConfig } from '../../utils/config';
	// import type { LandingConfig } from '../../types';

	// let config: LandingConfig;

	// $: (async () => {
	// 	config = await getConfig('landing');
	// })();
	export let data;
	let config = data.config;
</script>

<svelte:head>
	<title>{config?.title ?? 'Landing Page'}</title>
</svelte:head>

<main>
	<h1>{config?.heading}</h1>
	<p>{config?.description}</p>
</main>
