<script lang="ts">
	import Container from '$lib/components/template/Container.svelte';
	import type { EventFormat } from '$lib/content/content';
	import { t } from '$lib/i18n';
	import EventCard from './EventCard.svelte';
	const { events } : { events: EventFormat[] } = $props();

</script>

<Container className="mt-16 sm:mt-32">
	<header class="max-w-2xl">
		<h1 class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
			{$t("event.title")}
		</h1>
		<p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">
			{$t("event.intro")}
		</p>
	</header>
	<div class="mt-16 sm:mt-20 flex flex-col gap-4">
		{#each events as event }
			<EventCard {event}></EventCard>	
		{/each}		
	</div>
</Container>
