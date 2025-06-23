<script lang="ts">
	
	import BriefcaseIcon from '$lib/components/icons/BriefcaseIcon.svelte';
	import { langStore } from '$lib/i18n/lang.store';

	import type { EventFormat, ProjectFormat } from '$lib/content/content';
	import { onMount } from 'svelte';
	import { loadEvents } from '$lib/utils/event-loader-utils';

	let count = $state(0);
	let currentLang = $derived($langStore);
	let articleList: ProjectFormat[] = $state([]);


	onMount(() => {
		async function init() {
			articleList = await loadEvents(currentLang) as EventFormat[];
			// articleList = articleList.filter(article => titleMainList.includes(article.slug));
			count = articleList.length;
		}
		init();
	});
	$effect(() => {
					$inspect(articleList)

	})
</script>

<div class="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
	<h2 class="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
		<BriefcaseIcon class="h-6 w-6 flex-none" />
		<span class="ml-3">Event</span>
	</h2>
	<ol class="mt-6 space-y-4 text-white">
		{#each articleList as art}
			<li>
			{art.metadata.title}
			</li>
		{/each}
	</ol>
</div>
