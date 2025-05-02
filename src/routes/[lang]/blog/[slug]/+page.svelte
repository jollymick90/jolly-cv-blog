<script>
	import ArticleLayout from '$lib/components/pages/blog/ArticleLayout.svelte';

	export let data;
	let { metadata, content } = data;
	
</script>

<h1>CIAO</h1>
<ArticleLayout article={metadata}>
	
	<svelte:component this={content} />
</ArticleLayout>
