<script>
	import Article from '$lib/components/pages/blog/Article.svelte';
	import SimpleLayout from '$lib/components/template/SimpleLayout.svelte';

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
			{/each}
		</div>
	</div>
</SimpleLayout>
