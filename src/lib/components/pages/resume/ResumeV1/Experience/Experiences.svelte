<script lang="ts">

	import type { ExperiencesEvent, ExperiencesEventUI } from '$lib/content';
	import { mapTimelineUI } from '$lib/utils/skills.utils';

	import ExperienceItemContext from './ExperienceItemContext.svelte';

	const { experiences }: { experiences: ExperiencesEvent[] } = $props();

	const timeline: ExperiencesEventUI[] = experiences.map(mapTimelineUI);
</script>

<div class="px-0 py-2 sm:rounded-lg sm:px-1 md:px-4">
	<h2 id="timeline-title" class="mx-1 my-1 text-lg font-medium text-gray-900 dark:text-zinc-100">
		Esperienze Lavorative
	</h2>
	<div class="mt-3 flow-root">
		{#each timeline as item, itemIdx}
			<ExperienceItemContext {item} isLast={itemIdx !== timeline.length - 1}
			></ExperienceItemContext>
		{/each}
	</div>
</div>
