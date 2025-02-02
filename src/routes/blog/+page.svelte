<script>
	import Container from '../../components/Container.svelte';

	export let data;
	let { posts } = data;
</script>

<Container className="mt-9">
<h1>Blog</h1>

{#each posts as post}
	<article class="text-white">
		<h2>{post.metadata.title}</h2>
		<p>{post.metadata.date}</p>
		<!-- post.component è il contenuto markdown -->
		<svelte:component this={post.component} />
	</article>
{/each}
</Container>