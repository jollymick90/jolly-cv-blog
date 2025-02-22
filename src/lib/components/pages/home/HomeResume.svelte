<script lang="ts">
	import type { RoleProps } from '$lib/components/types/components';
	import Button from '$lib/components/theme/Button.svelte';
	import ArrowDownIcon from '$lib/components/icons/ArrowDownIcon.svelte';
	import BriefcaseIcon from '$lib/components/icons/BriefcaseIcon.svelte';
	import Role from '$lib/components/theme/Role.svelte';
	// import image1 from '$lib/img/LogoJob1.webp';
	// import image2 from '$lib/img/LogoJob2.webp';
	import Resume from '../resume/Resume.svelte';
	import type { IResume } from '$lib/content';
	export let resume: IResume;
	let data: RoleProps[] = resume.experiences.map(exp => {
		const _role: RoleProps = {
			company: exp.content,
			title: exp.target,
			start: exp.dateStart,
			end: exp.dateEnd
		}
		return _role;
	})

</script>

<div class="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
	<h2 class="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
		<BriefcaseIcon class="h-6 w-6 flex-none" />
		<span class="ml-3">Work</span>
	</h2>
	<ol class="mt-6 space-y-4">
		{#each data as role}
			<Role {role} />
		{/each}
	</ol>
	<Button href="#" variant="secondary" className="group mt-6 w-full">
		Download CV
		<ArrowDownIcon
			class="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50"
		/>
	</Button>
</div>
