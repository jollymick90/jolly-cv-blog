<script>
	import Article from '../../components/blog/Article.svelte';
import Container from '../../components/Container.svelte';
	import SimpleLayout from '../../components/layout/SimpleLayout.svelte';

	export let data;
	let { posts } = data;
</script>
<SimpleLayout 
title="Writing on software design, company building, and the aerospace industry."
intro="All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order."
>

      <div class="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div class="flex max-w-3xl flex-col space-y-16">
{#each posts as post}
<Article article={post}></Article>
	<!-- <article class="text-white">
		<h2>
			<a href={`/blog/${post.slug}`}>{post.metadata.title}</a>
		</h2>		
		<p>{post.metadata.date}</p>
	</article> -->
{/each}
		</div>
	  </div>
	</SimpleLayout>
