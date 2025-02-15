<script lang="ts">
	import { loadArticles } from '$lib/blog/loader';
	import { onMount } from 'svelte';
	import HomeArticle from './HomeArticle.svelte';

    $: count = 0;
	let articleList: any[] = [];
	onMount(() => {
		async function init() {
			articleList = await loadArticles();
            count = articleList.length;
		}
		init();
	});

	let articlesHomeList = [];
</script>


<div class="text-white">
	{#each articleList as article }
	<HomeArticle article={article}></HomeArticle>

	{/each}
    {count}
</div>