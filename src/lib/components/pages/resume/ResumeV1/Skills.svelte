<script lang="ts">
	import ButtonExpand from '$lib/components/template/ButtonExpand.svelte';
	import type { SkillItemUI, SkillItem } from '$lib/content/resume';
	import { getColor } from '$lib/utils/skills.utils';

	const { listSkills }: { listSkills: SkillItem[] } = $props();
	let isExpand = $state(false);
	const skills: SkillItemUI[] = listSkills.map((item) => {
		return {
			...item,
			color: getColor(item)
		};
	});
</script>

<div class="w-full">
	<h2 id="timeline-title" class="mx-1 my-1 text-lg font-medium text-gray-900 dark:text-zinc-100">
		<span>Competenze</span>
		<ButtonExpand
			onChange={(value: boolean) => {
				isExpand = value;
			}}
		></ButtonExpand>
	</h2>

	<div class={isExpand ? '' : 'h-20 overflow-hidden'}>
		<div class="grid w-full grid-cols-3 gap-2 md:grid-cols-6">
			{#each skills as skill}
				<div class="m-1 flex w-full flex-col">
					<span class="truncate text-ellipsis text-sm dark:text-zinc-100">{skill.name}</span>
					<div class="h-1 w-full bg-gray-200 dark:bg-gray-100">
						<div class="{skill.color} h-1" style="width: {skill.level}%"></div>
					</div>
				</div>
			{/each}
		</div>
		<div class="mt-1 overflow-hidden rounded-lg border-2 border-dotted border-zinc-200 shadow">
			<div class="px-2 py-3 sm:p-3">
				<h2 id="timeline-title" class="text-md mt-1 font-medium text-gray-900 dark:text-zinc-100">
					Scala Competenze
				</h2>
				<div class="m-1 flex">
					<div class="flex w-full flex-col justify-start px-1">
						<b class="dark:text-zinc-100">conoscenza</b>
						<div class="flex h-1 w-full bg-gray-200">
							<div class="h-1 bg-exp-base" style="width: 100%"></div>
						</div>
						<div class="flex flex-col">
							<span class="truncate text-ellipsis text-sm dark:text-zinc-100">
								Esperienze professionali contenute
							</span>
							<span class="truncate text-ellipsis text-sm dark:text-zinc-100">
								Comprensione codice e task semplici
							</span>
						</div>
					</div>
					<div class="flex w-full flex-col justify-start px-1">
						<b class="dark:text-zinc-100">applicazione</b>
						<div class="flex h-1 w-full bg-gray-200">
							<div class="h-1 bg-exp-work" style="width: 100%"></div>
						</div>
						<div class="flex flex-col">
							<span class="truncate text-ellipsis text-sm dark:text-zinc-100">
								Sviluppo e autonomia
							</span>
							<span class="truncate text-ellipsis text-sm dark:text-zinc-100">
								Esperienze professionali
							</span>
						</div>
					</div>
					<div class="flex w-full flex-col justify-start px-1">
						<b class="dark:text-zinc-100">condivisione</b>
						<div class="flex h-1 w-full bg-gray-200">
							<div class="h-1 bg-exp-pro" style="width: 100%"></div>
						</div>
						<div class="flex flex-col">
							<span class="truncate text-ellipsis text-sm dark:text-zinc-100">
								Esperienze continuative
							</span>

							<span class="truncate text-ellipsis text-sm dark:text-zinc-100">
								Progettazione e sviluppo avanzata
							</span>
							<span class="truncate text-ellipsis text-sm dark:text-zinc-100">
								Best practices e Condivisione
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
