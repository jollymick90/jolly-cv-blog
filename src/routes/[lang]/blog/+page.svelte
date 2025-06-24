<script>
	import Article from '$lib/components/pages/blog/Article.svelte';
	import BlogPageLayout from '$lib/components/template/BlogPageLayout.svelte';

	// export let data;
	// let { posts } = data;
	let { data } = $props();
	let { posts } = data;
</script>

<BlogPageLayout>
	<div class="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
		<div class="flex max-w-3xl flex-col space-y-16">
			{#each posts as post}
				<Article article={post}></Article>
			{/each}
		</div>
	</div>
</BlogPageLayout>
