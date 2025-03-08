<script lang="ts">
	import ItemsContainerStyled from '$lib/components/template/ItemsContainerStyled.svelte';
	import type { ExperiencesEvent, ExperiencesEventUI } from '$lib/content';
	import { mapTimelineUI } from '$lib/utils/skills.utils';
	import { Icon, Briefcase } from 'svelte-hero-icons';
	export let experiences: ExperiencesEvent[];

	const timeline: ExperiencesEventUI[] = experiences.map(mapTimelineUI);
</script>

<div class="px-4 py-2 sm:rounded-lg sm:px-1">
	<h2 id="timeline-title" class="mx-1 my-1 text-lg font-medium text-gray-900 dark:text-zinc-100">
		Esperienze Lavorative
	</h2>
	<div class="mt-3 flow-root">
		{#each timeline as item, itemIdx}
			<div>
				<div class="relative pb-2">
					{#if itemIdx !== timeline.length - 1}
						<span
							class="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-50"
							aria-hidden="true"
						></span>
					{/if}

					<div class="relative flex space-x-3">
						<div>
							<span
								class="{item.className}
                                flex h-8 w-8 items-center justify-center rounded-full ring-8 ring-white"
							>
								<Icon class="h-5 w-5 text-white" aria-hidden="true" src={Briefcase} />
							</span>
						</div>
						<ItemsContainerStyled>
							<div>
								<div class="text-sm text-gray-500 dark:text-zinc-100">
									<span>{item.content}</span>
								</div>
								<span class="text-sm font-medium text-gray-900 dark:text-zinc-100">
									{item.target}
								</span>
								<div class="whitespace-nowrap text-sm text-gray-500 dark:text-zinc-100">
									<time dateTime={item.dateStart}>{item.dateStart}</time>
									-
									{#if item.dateEndTime}
										<time dateTime={item.dateEndTime}>{item.dateEnd}</time>
									{/if}
									{#if item.dateEndTime === null}
										{item.dateEnd}
									{/if}
								</div>
							</div>

							<div slot="descriptions" class="flex flex-col gap-1 dark:text-zinc-100">
								{#if item.experiencesList}									
									{#each item.experiencesList as experiences}
										<div class="w-full">
											<span class="mt-1 font-normal">{experiences}</span>
										</div>
									{/each}									
								{/if}
							</div>
							<div slot="skills" class="">
								{#if item.skillAquiredList}
									
										<div class="flex flex-col dark:text-zinc-100">
											{#each item.skillAquiredList as skill}
												<div class="flex flex-row justify-start gap-1">
													<span class="font-medium">{skill.name}</span>
													<span class="font-light">{skill.type}</span>
												</div>
											{/each}
										</div>

								{/if}
							</div>
						</ItemsContainerStyled>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
