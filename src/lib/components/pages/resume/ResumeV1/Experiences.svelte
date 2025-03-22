<script lang="ts">
    import ExperienceHeadline from './ExperienceHeadline.svelte';

	import ItemsContainerStyled from '$lib/components/template/ItemsContainerStyled.svelte';
	import type { ExperiencesEvent, ExperiencesEventUI } from '$lib/content';
	import { mapTimelineUI } from '$lib/utils/skills.utils';
	import { Icon, Briefcase } from 'svelte-hero-icons';
	import SkillAquired from './SkillAquired.svelte';
	import SkillExperiences from './SkillExperiences.svelte';
	
	const { experiences }: { experiences: ExperiencesEvent[] } = $props();
	
	const timeline: ExperiencesEventUI[] = experiences.map(mapTimelineUI);
</script>

<div class="px-0 md:px-4 py-2 sm:rounded-lg sm:px-1">
	<h2 id="timeline-title" class="mx-1 my-1 text-lg font-medium text-gray-900 dark:text-zinc-100">
		Esperienze Lavorative
	</h2>
	<div class="mt-3 flow-root">
		{#each timeline as item, itemIdx}
			<div>
				<div class="relative pb-2">
					{#if itemIdx !== timeline.length - 1}
						<span
							class="hidden md:block absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-50"
							aria-hidden="true"
						></span>
					{/if}

					<div class="relative flex md:space-x-3">
						<div class="hidden md:block">
							<span
								class="{item.className}
                                flex h-8 w-8 items-center justify-center rounded-full ring-8 ring-white"
							>
								<Icon class="h-5 w-5 text-white" aria-hidden="true" src={Briefcase} />
							</span>
						</div>
						<ItemsContainerStyled>
							<ExperienceHeadline item={item}></ExperienceHeadline>
							<div slot="descriptions" class="flex flex-col gap-1 dark:text-zinc-100">
								<SkillExperiences experiencesList={item.experiencesList}></SkillExperiences>
							</div>
							<div slot="skills" class="">
								<SkillAquired skillAquiredList={item.skillAquiredList}></SkillAquired>
							</div>
						</ItemsContainerStyled>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
