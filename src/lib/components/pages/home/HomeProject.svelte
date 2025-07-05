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
	import { create3DProject } from '$lib/animate/project';

	const titleMainList = [
		'001-afsk-balloon-challenge',
		'002-gis-portal',
		// '003-realtime-bus-tracking'
	]
	const lang = $derived($langStore);
	let container: any;

	let count = $state(0);
	let currentLang = $derived($langStore);
	let articleList: ProjectFormat[] = $state([]);


	onMount(() => {
		async function init() {
			articleList = await loadProjects(currentLang) as ProjectFormat[];
			articleList = articleList.filter(a => titleMainList.includes(a.slug))
			count = articleList.length;
		}
		init();

		create3DProject(container);
	});
</script>

<div class="rounded-2xl border border-zinc-500 p-6 dark:border-zinc-700/40">
	<h2 class="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">		
		<Icon class="h-7 w-7 dark:text-white text-zinc-400"
		 aria-hidden="true" src={CodeBracketSquare} />

		<span class="ml-3">{$t('home.projects')}</span>
	</h2>
	<p class="my-3 text-zinc-900 dark:text-zinc-100">{$t('home.projects-descriptions')}</p>

	<div bind:this={container} class="h-52 w-full bg-blue-200"></div>

	<div class="flex flex-col mt-6 space-y-4 dark:text-white text-zinc-900">
		{#each articleList as art}
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
