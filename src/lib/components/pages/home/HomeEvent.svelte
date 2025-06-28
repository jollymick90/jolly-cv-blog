<script lang="ts">

	import { langStore } from '$lib/i18n/lang.store';
	import {
		Card,
		CardCta,
		CardDescription,
		CardEyebrow,
		CardTitle
	} from '$lib/components/theme/card';
	import type { EventFormat, ProjectFormat } from '$lib/content/content';
	import { onMount } from 'svelte';
	import { loadEvents } from '$lib/utils/event-loader-utils';
	import { Icon, PresentationChartLine } from 'svelte-hero-icons';
	import { t } from '$lib/i18n';
	import svelteConference from '$lib/img/photos/image-12.jpg';
	import { createOmino } from '$lib/animate/event/omino';
	import { create3DEvent } from '$lib/animate/event';
	const lang = $derived($langStore);
	let count = $state(0);
	let currentLang = $derived($langStore);
	let articleList = $state([] as ProjectFormat[]);
	let container: any;
	onMount(() => {
		async function init() {
			articleList = (await loadEvents(currentLang)) as EventFormat[];
			// articleList = articleList.filter(article => titleMainList.includes(article.slug));
			count = articleList.length;
		}
		init();
		create3DEvent(container);
		
	});
</script>

<div class="rounded-2xl border border-zinc-500 p-6 dark:border-zinc-700/40">
	<h2 class="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
		<Icon
			class="h-7 w-7 text-zinc-400 dark:text-white"
			aria-hidden="true"
			src={PresentationChartLine}
		/>
		<span class="ml-3">{$t('home.event')}</span>
	</h2>
	<div bind:this={container} class="h-52 w-full bg-blue-200"></div>
	<div class="mt-6 flex flex-col space-y-4 text-zinc-900 dark:text-white">
		{#each articleList as article}
			<Card>
				<CardTitle hoverHighlight={true} href="/{lang}/event/{article.slug}">
					{article.metadata.title}
				</CardTitle>
				<CardEyebrow decorate>
					{article.metadata.date}
				</CardEyebrow>
				<CardDescription>
					{article.metadata.description}
				</CardDescription>
				<CardCta color="text-jm-400">{$t('home.readarticle')}</CardCta>
			</Card>
		{/each}
	</div>
</div>
