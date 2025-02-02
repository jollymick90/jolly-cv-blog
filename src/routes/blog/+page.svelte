<script>
	import Container from '../../components/Container.svelte';

	export let data;
	let { posts } = data;
</script>

<Container className="mt-9">
<h1 class="text-white">Blog</h1>

{#each posts as post}
	<article class="text-white">
		<h2>
			<a href={`/blog/${post.slug}`}>{post.metadata.title}</a>
		</h2>		
		<p>{post.metadata.date}</p>
	</article>
{/each}
</Container>
