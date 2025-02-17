<script lang="ts">
	import type { RoleProps } from '$lib/types/components';

	import Button from '../core/Button.svelte';
	import ArrowDownIcon from '../core/icons/ArrowDownIcon.svelte';
	import BriefcaseIcon from '../core/icons/BriefcaseIcon.svelte';
	import Role from '../core/Role.svelte';
	let resume: RoleProps[] = [
		{
			company: 'CompanyA',
			title: 'FullStack Developer',
			logo: 'logoPlanetaria',
			start: '2019',
			end: {
				label: 'Present',
				dateTime: new Date().getFullYear().toString()
			}
		},
		{
			company: 'CompanyB',
			title: 'Product Designer',
			logo: 'logoAirbnb',
			start: '2014',
			end: '2019'
		},
		{
			company: 'CompanyC',
			title: 'iOS Software Engineer',
			logo: 'logoFacebook',
			start: '2011',
			end: '2014'
		},
		{
			company: 'Starbucks',
			title: 'Shift Supervisor',
			logo: 'logoStarbucks',
			start: '2008',
			end: '2011'
		}
	];
</script>

<div class="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
	<h2 class="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
		<BriefcaseIcon class="h-6 w-6 flex-none" />
		<span class="ml-3">Work</span>
	</h2>
	<ol class="mt-6 space-y-4">
		{#each resume as role}
			<Role {role} 
	
			/>
		{/each}
	</ol>
	<Button href="#" variant="secondary" class="group mt-6 w-full">
		Download CV
		<ArrowDownIcon
			class="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50"
		/>
	</Button>
</div>
