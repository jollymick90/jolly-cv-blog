<script lang="ts">
	import type { RoleProps } from '$lib/components/types/components';
	import type { IResume } from '$lib/content';

	import Button from '$lib/components/theme/Button.svelte';
	import ArrowDownIcon from '$lib/components/icons/ArrowDownIcon.svelte';
	import BriefcaseIcon from '$lib/components/icons/BriefcaseIcon.svelte';
	import Role from '$lib/components/pages/home/HomeResumeRole.svelte';

	const { resume }: { resume: IResume } = $props();

	const data: RoleProps[] = resume.experiences.map(exp => {
		const _role: RoleProps = {
			company: exp.companyName,
			title: exp.role,
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
