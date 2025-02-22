<script lang="ts">
	import type { SkillItemUI, SkillItem } from '$lib/content/resume';
	import { getColor } from '$lib/utils/skills.utils';

    export let listSkills: SkillItem[];
    
	const skills: SkillItemUI[] = listSkills.map((item) => {
		return {
			...item,
			color: getColor(item)
		};
	});
</script>

<div>
	<h4>Abilità tecniche</h4>
	<div class="grid w-full grid-cols-6 gap-2">
		{#each skills as skill}
			<div class="m-1 flex w-full flex-col">
				<span class="truncate text-ellipsis text-sm">{skill.name}</span>
				<div class="h-1 w-full bg-gray-200">
					<div class="{skill.color} h-1" style="width: {skill.level}%"></div>
				</div>
			</div>
		{/each}
	</div>
</div>
