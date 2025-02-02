<script lang="ts">
	import Container from '../components/Container.svelte';
	import HomeHeadings from '../components/home/HomeHeadings.svelte';
	
	import Photos from '../components/home/Photos.svelte';

	export let data;
	let config = data.config;
</script>

<svelte:head>
	<title>{config?.title ?? 'Landing Page'}</title>
</svelte:head>

<Container className="mt-9">
	<HomeHeadings {data}></HomeHeadings>
</Container>
<Photos></Photos>
