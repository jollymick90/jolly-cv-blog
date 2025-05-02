<script lang="ts">
	import { loadArticles } from '$lib/utils/blog-loader-utils';
	import { onMount } from 'svelte';
	import HomeArticle from './HomeArticle.svelte';
	import { langStore } from '$lib/i18n/lang.store';

	let count = $state(0);
	let currentLang = $derived($langStore);
	let articleList: any[] = $state([]);

	onMount(() => {
		async function init() {
			articleList = await loadArticles(currentLang);
			count = articleList.length;
		}
		init();
	});

</script>

{#each articleList as article}
	<HomeArticle {article}></HomeArticle>
{/each}
