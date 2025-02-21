<script lang="ts">
	import { loadArticles } from '$lib/utils/blog-loader-utils';
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

{#each articleList as article}
	<HomeArticle {article}></HomeArticle>
{/each}
