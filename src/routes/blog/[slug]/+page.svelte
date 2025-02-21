<script>
	import ArticleLayout from '$lib/components/blog/ArticleLayout.svelte';

	export let data;
	let { metadata, content } = data;
	console.log(metadata, content, data)
</script>

<ArticleLayout article={metadata}>
	<svelte:component this={content} />
</ArticleLayout>
