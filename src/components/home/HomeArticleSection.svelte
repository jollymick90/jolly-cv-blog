<script lang="ts">
	import { loadArticles } from '$lib/blog/loader';
	import { onMount } from 'svelte';

    $: count = 0;
	onMount(() => {
		async function init() {
			const resolvedPosts = await loadArticles();
            count = resolvedPosts.length;
		}
		init();
	});

	let articlesHomeList = [];
</script>


<div class="text-white">

    {count}
</div>