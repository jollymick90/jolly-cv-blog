<script>
	import Container from '../../../components/Container.svelte';

	export let data;
	let { metadata, content } = data;
</script>

<Container className="mt-9">
<article class="text-white">
	<h1>{metadata.title}</h1>
	<p>{metadata.date}</p>
	<svelte:component this={content} />
</article>
</Container>
