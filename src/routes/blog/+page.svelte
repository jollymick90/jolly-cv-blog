<script>
	export let data;
	let { posts } = data;
</script>

<h1>Blog</h1>

{#each posts as post}
	<article>
		<h2>{post.metadata.title}</h2>
		<p>{post.metadata.date}</p>
		<!-- post.component è il contenuto markdown -->
		<svelte:component this={post.component} />
	</article>
{/each}
