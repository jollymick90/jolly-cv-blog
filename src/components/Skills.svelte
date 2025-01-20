<script lang="ts">
	import type { SkillItem, SkillItemUI } from "$lib/libs";
    import { listSkills } from "$lib/config/config";
    import { getColor } from "$lib/utils/skills.utils";

    const skills: SkillItemUI[] = listSkills.map(skill => {
        return {
            ...skill,
            color: getColor(skill)
        }
    })


// {getColor(skill), "h-1"
//{ width: `${skill.level}%` }
</script>


<div>
    <h4>Abilità tecniche</h4>
    <div class="w-full grid grid-cols-6 gap-2">
        {#each skills as skill }
        <div class="m-1 w-full flex flex-col">
            <span class="text-sm truncate text-ellipsis">{skill.name}</span>
            <div class="w-full bg-gray-200 h-1">
                <div class="{skill.color} h-1"
                 style="width: {skill.level}%"></div>
            </div>
        </div>
        {/each}
        
    </div>

</div >