<script lang="ts">
	import Container from '$lib/components/template/Container.svelte';
	import type { ProjectFormat } from '$lib/content/content';
	import { t } from '$lib/i18n';
	import ProjectCard from './ProjectCard.svelte';
	const { projects } : { projects: ProjectFormat[] } = $props();

</script>

<Container className="mt-16 sm:mt-32">
	<header class="max-w-2xl">
		<h1 class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
			{$t("project.title")}
		</h1>
		<p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">
			{$t("project.intro")}
		</p>
	</header>
	<div class="mt-16 sm:mt-20 flex flex-col gap-4">
		{#each projects as project }
			<ProjectCard {project}></ProjectCard>	
		{/each}		
	</div>
</Container>
