<script lang="ts">
	import type { RoleProps } from '$lib/components/types/components';
	import type { IResume } from '$lib/content';

	import Button from '$lib/components/theme/Button.svelte';
	import ArrowDownIcon from '$lib/components/icons/ArrowDownIcon.svelte';
	
	import HomeResumeRole from '$lib/components/pages/home/HomeResumeRole.svelte';
	import { Briefcase, Icon } from 'svelte-hero-icons';
	import { langStore } from '$lib/i18n/lang.store';
	const lang = $derived($langStore);
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

	function downloadCV() {
		const url = `/${lang}_michele_scarpa_cv.pdf`
		const link = document.createElement('a');
    	link.href = url;
    	link.download = 'Michele-Scarpa-CV.pdf'; // nome del file salvato
    	document.body.appendChild(link);
    	link.click();
    	document.body.removeChild(link);
	}

</script>

<div class="rounded-2xl border border-zinc-500 p-6 dark:border-zinc-700/40">
	<h2 class="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
		
		<Icon class="h-7 w-7 dark:text-white text-zinc-400"
		 aria-hidden="true" src={Briefcase} />
		<span class="ml-3">Work</span>
	</h2>
	<ol class="mt-6 space-y-4">
		{#each data as role}
			<HomeResumeRole {role} />
		{/each}
	</ol>
	
	
		<button class="group mt-6 w-full inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none bg-zinc-50 font-medium text-zinc-900 hover:bg-zinc-100 active:bg-zinc-100 active:text-zinc-900/60 dark:bg-zinc-800/50 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:active:bg-zinc-800/50 dark:active:text-zinc-50/70"
		 aria-label="click"
		 onclick={() => downloadCV()}
		 >
		Download CV
		<ArrowDownIcon
			class="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50"
		/>
		</button>
	
</div>

