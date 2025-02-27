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

<div class="w-full">
	<h4 class="my-1">Abilità</h4>
	<div class="flex flex-col my-1">
		<span class="truncate text-ellipsis text-md">Ho riassunto le mie capacità in questa tabella</span>
	</div>

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
	<div class="flex h-full">
		<div class="flex w-full flex-col justify-start">
            <b >conoscenza</b> 
            <div class="flex h-1 w-full bg-gray-200">
				<div class="h-1 bg-exp-base" style="width: 100%"></div>
			</div>
			<div class="flex flex-col px-5">
				<span class="truncate text-ellipsis text-sm">Poche esperienze professionali</span>
				<span class="truncate text-ellipsis text-sm">Comprensione codice e task semplici</span>
			</div>
		</div>
		<div class="flex w-full flex-col justify-start">
            <b>applicazione</b>
            <div class="flex h-1 w-full bg-gray-200">
				<div class="h-1 bg-exp-work" style="width: 100%"></div>
			</div>
			<div class="flex flex-col px-5">
				<span class="truncate text-ellipsis text-sm">Sviluppo e autonomia</span>
				<span class="truncate text-ellipsis text-sm">Esperienze professionali</span>
			</div>

		</div>
		<div class="flex w-full flex-col justify-start">
            <b>condivisione</b>
            <div class="flex h-1 w-full bg-gray-200">
				<div class="h-1 bg-exp-pro" style="width: 100%"></div>
			</div>
			<div class="flex flex-col px-5">
				<span class="truncate text-ellipsis text-sm">Esperienze continuative</span>

				<span class="truncate text-ellipsis text-sm">Progettazione e sviluppo avanzata</span>
				<span class="truncate text-ellipsis text-sm">Best practices e Condivisione</span>
			</div>

		</div>
	</div>
</div>
