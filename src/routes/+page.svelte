<script lang="ts">
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
