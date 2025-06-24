<script lang="ts">
	
	import BriefcaseIcon from '$lib/components/icons/BriefcaseIcon.svelte';
	import { langStore } from '$lib/i18n/lang.store';

	import type { ProjectFormat } from '$lib/content/content';
	import { onMount } from 'svelte';
	import { loadProjects } from '$lib/utils/project-loader-utils';
	import { CodeBracketSquare, Icon } from 'svelte-hero-icons';
	const lang = $derived($langStore);

	let count = $state(0);
	let currentLang = $derived($langStore);
	let articleList: ProjectFormat[] = $state([]);


	onMount(() => {
		async function init() {
			articleList = await loadProjects(currentLang) as ProjectFormat[];
			count = articleList.length;
		}
		init();
	});
</script>

<div class="rounded-2xl border border-zinc-500 p-6 dark:border-zinc-700/40">
	<h2 class="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">		
		<Icon class="h-7 w-7 dark:text-white text-zinc-400"
		 aria-hidden="true" src={CodeBracketSquare} />

		<span class="ml-3">Project</span>
	</h2>
	<ol class="mt-6 space-y-4 dark:text-white text-zinc-900">
		{#each articleList as art}
			<li>
							<a href="/{lang}/project/{art.slug}">  
				{art.metadata.title}
			</a>
			
			</li>
		{/each}
	</ol>
</div>
