<script lang="ts">
	import type { SpeakersEvent, SpeakersEventUI } from '$lib/content';
	import { Icon, Flag } from 'svelte-hero-icons';
	import { mapTimelineUI } from '$lib/utils/skills.utils';
	import ItemsContainerStyled from '$lib/components/template/ItemsContainerStyled.svelte';
	export let speakers: SpeakersEvent[];
	const timeline: SpeakersEventUI[] = speakers.map(mapTimelineUI);
</script>

<div class="bg-white px-4 py-2 sm:rounded-lg sm:px-1">
	<h2 id="timeline-title" class="mx-1 my-1 text-lg font-medium text-gray-900">
		Relatore
	</h2>
	<div class="mt-3 flow-root">
		{#each timeline as item, itemIdx}
			<div>
				<div class="relative pb-2">
					{#if itemIdx !== timeline.length - 1}
						<span
							class="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
							aria-hidden="true"
						></span>
					{/if}

					<div class="relative flex space-x-3">
						<div>
							<span
								class="{item.className}
                            flex h-8 w-8 items-center justify-center rounded-full ring-8 ring-white"
							>
								<Icon class="h-5 w-5 text-white" aria-hidden="true" src={Flag} />
							</span>
						</div>
						<ItemsContainerStyled>
							<div class="text-sm text-gray-500">
								<span>{item.content}</span>
							</div>
							<div class="whitespace-nowrap text-sm text-gray-500">
								<span>{item.date}</span>
							</div>
							<div slot="descriptions" class="flex flex-col">
								<span>{item.title}</span>
								<span>{item.description}</span>
							</div>
						</ItemsContainerStyled>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
