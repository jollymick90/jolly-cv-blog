<script lang="ts">
	
	import { langStore } from '$lib/i18n/lang.store';
	import {
		Card,
		CardCta,
		CardDescription,
		CardEyebrow,
		CardTitle
	} from '$lib/components/theme/card';
	import type { ProjectFormat } from '$lib/content/content';
	import { onMount } from 'svelte';
	import { loadProjects } from '$lib/utils/project-loader-utils';
	import { ArrowRight, CodeBracketSquare, Icon } from 'svelte-hero-icons';
	import { t } from '$lib/i18n';

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
	<div class="flex flex-col mt-6 space-y-4 dark:text-white text-zinc-900">
		{#each articleList as art}
			<a href="/{lang}/project/{art.slug}" class="flex flex-row justify-between">  
				{art.metadata.title}
				<Icon class="mr-2 h-5 w-5 text-gray-400" aria-hidden="true" src={ArrowRight} />
			</a>
			<Card>
				<CardTitle hoverHighlight={true} href="/{lang}/project/{art.slug}">
					{art.metadata.title}
				</CardTitle>
				<CardEyebrow decorate>
					{art.metadata.date}
				</CardEyebrow>
				<CardDescription>
					{art.metadata.description}
				</CardDescription>
				<CardCta color="text-lapislazuli-700">{$t('home.readarticle')}</CardCta>
			</Card>
		{/each}
	</div>
</div>
