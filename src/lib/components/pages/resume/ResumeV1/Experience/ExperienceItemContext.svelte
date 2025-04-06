<script lang="ts">
	import type { ExperiencesEventUI } from '$lib/content';
	import { Briefcase, Icon } from 'svelte-hero-icons';
	import ItemsContainerStyled from '$lib/components/template/ItemsContainerStyled.svelte';
	import ExperienceHeadline from './ExperienceHeadline.svelte';
	import SkillExperiences from './SkillExperiences.svelte';
	import SkillAquired from './SkillAquired.svelte';
	import { isExpand } from './experience.store';
	const {
		item,
		isLast
	}: {
		item: ExperiencesEventUI;
		isLast: boolean;
	} = $props();
	let _isExpand = $derived($isExpand)

	$effect(()=> {
		console.log(".---", _isExpand)
	})

</script>

<div>
	<div class="relative pb-2">
		{#if isLast}
			<span
				class="absolute left-6 top-4 -ml-px hidden h-full w-0.5 bg-gray-200 dark:bg-gray-50 md:block"
				aria-hidden="true"
			></span>
		{/if}
		<div class={_isExpand ? '' : 'h-[300px] overflow-hidden'}>

		<div class="relative flex md:space-x-3">

			<div class="hidden md:block">
				<span
					class="{item.className}
                    mt-2 ml-2 flex h-8 w-8 items-center justify-center rounded-full ring-8 ring-white"
				>
					<Icon class="h-5 w-5 text-white" aria-hidden="true" src={Briefcase} />
				</span>
			</div>
			
			<ItemsContainerStyled>
				<ExperienceHeadline {item}></ExperienceHeadline>
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
</div>
