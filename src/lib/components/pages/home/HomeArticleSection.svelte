<script lang="ts">
	import { loadArticles } from '$lib/utils/blog-loader-utils';
	import { onMount } from 'svelte';
	import HomeArticle from './HomeArticle.svelte';
	import { langStore } from '$lib/i18n/lang.store';
	import type { ArticleFormat } from '$lib/content/content';
	let titleMainList = [
		'007-post-20230401',
		'006-post-20241230',
		'005-post-20240101'
	]

	let count = $state(0);
	let currentLang = $derived($langStore);
	let articleList: ArticleFormat[] = $state([]);

	onMount(() => {
		async function init() {
			articleList = await loadArticles(currentLang) as ArticleFormat[];
			articleList = articleList.filter(article => titleMainList.includes(article.slug));
			count = articleList.length;
		}
		init();
	});

</script>

{#each articleList as article}
	<HomeArticle {article}></HomeArticle>
{/each}
