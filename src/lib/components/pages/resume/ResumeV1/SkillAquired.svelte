<script lang="ts">
	import type { SkillAquired } from '$lib/content';
	import SkillChip from './SkillChip.svelte';

	const {
		skillAquiredList
	}: {
		skillAquiredList: SkillAquired[] | undefined;
	} = $props();

    let skillUi = $derived(mapUiData(skillAquiredList));



	function mapUiData(skillAquiredList: SkillAquired[] | undefined): any {
		if (!skillAquiredList) {
            return []
        }
        const skillMapped: {[key: string]: string[]} = {};
        for (const skill of skillAquiredList) {
            if (skill.type) {
                if (!skillMapped[skill.type])
                    skillMapped[skill.type] = [];

                skillMapped[skill.type].push(skill.name);
            }
        }
        let skillUi: {type: string, name: string[]}[] = [];
        for (const k of Object.keys(skillMapped)) {
            skillUi.push({type: k, name: skillMapped[k]});
        }

        return skillUi;
        
	}
</script>

{#if skillAquiredList}
	<div class="flex flex-col gap-2 dark:text-zinc-100">
		{#each skillUi as skill}
        <div class="overflow-hidden rounded-lg bg-teagreen-800 shadow">
            <div class="px-2 py-3 sm:p-3">
                <div class="grid grid-cols-3 gap-1 ">
                    <span class="font-medium text-zinc-800">{skill.type} </span>
                    <div class="col-start-2 col-span-2">
                        <div class="flex flex-wrap gap-1">
                        {#each skill.name as name}
                        <SkillChip>
                            {name}
                        </SkillChip>
                        {/each}
                    </div>
                    </div>
                </div>
            </div>
        </div>
			
		{/each}
	</div>
{/if}
