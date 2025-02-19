<script>
	import ArticleLayout from '../../../components/blog/ArticleLayout.svelte';
	import Container from '../../../components/Container.svelte';

	export let data;
	let { metadata, content } = data;
</script>

<ArticleLayout article={metadata}>
	<svelte:component this={content} />
</ArticleLayout>
