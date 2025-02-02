<script lang="ts">
	import Container from '../components/Container.svelte';
	import Home from '../components/home/Home.svelte';

	export let data;
	let config = data.config;
</script>

<svelte:head>
	<title>{config?.title ?? 'Landing Page'}</title>
</svelte:head>

<Container className="mt-9">
	<Home {data}></Home>
</Container>
