<script lang="ts">
	import { type ExperiencesEvent } from '$lib/content/resume';
	import type { IResume, StudiesEvent, TimelineEvent } from '$lib/content';
	import {
		Icon,
		Envelope,
		Phone,
		MapPin,
		Briefcase,
		WrenchScrewdriver,
		RocketLaunch
	} from 'svelte-hero-icons';
	import avatar from '$lib/img/profile-michele.png';

	import { t } from '$lib/i18n';

	export const {
		resume
	}: {
		resume: IResume;
	} = $props();

	const skills = [...resume.skills];
	const top5Skills = skills
		.filter((skill) => skill.type === 'SOFT_SKILL')
		.sort((skillA, skillB) => skillB.level - skillA.level)
		.splice(0, 3);

	const web5TechSkills = skills
		.filter((skill) => skill.type === 'WEB_DEVELOPMENT' && skill.name != 'HTML/CSS')
		.sort((skillA, skillB) => skillB.level - skillA.level)
		.splice(0, 5);

	const tools5TechSkills = skills
		.filter((skill) => skill.type === 'TOOLS' && skill.name != 'Framework7')
		.sort((skillA, skillB) => skillB.level - skillA.level)
		.splice(0, 2);

	const framework5TechSkills = skills
		.filter((skill) => skill.type === 'FRAMEWORKS')
		.sort((skillA, skillB) => skillB.level - skillA.level)
		.splice(0, 2);

	const programmingLanguage = skills
		.filter((skill) => skill.type === 'PROGRAMMING_LANGUAGE')
		.sort((skillA, skillB) => skillB.level - skillA.level)
		.splice(0, 5);
	const experiences = resume.experiences.filter((v) => {
		if (v.hideForPrintable) return false;
		return true;
	});
</script>

<div class="cv-container m-auto flex max-w-[1200px] flex-row bg-white">
	{@render headerDesktop()}
	<main class=" w-[70%] p-5">
		<section>
			<div class="ml-5">
				<h1 class="text-xl">{resume.fullName}</h1>
				<p class="text-2xl">{resume.mainRoleTitle}</p>
			</div>
		</section>
		<section class="border-b-2 border-dashed mt-6 pb-2 profile">
			<p>{resume.presentation}</p>
		</section>

		<section class="experience">
			<h2 class="my-2 font-medium">{$t('resume.history_experiences')}</h2>

			{#each experiences as exp}
				{@render experience(exp)}
			{/each}
		</section>
	</main>
</div>

{#snippet contact()}
	<div class="flex flex-col">
		{#if resume.contact.showPhone}
			<div class="flex">
				<Icon class="mr-2 h-5 w-5 text-gray-400" aria-hidden="true" src={Phone} />
				<a href={`tel:${resume.contact.phone}`}>
					{resume.contact.phone}
				</a>
			</div>
		{/if}

		<div class="flex">
			<Icon class="mr-2 h-5 w-5 text-gray-400" aria-hidden="true" src={Envelope} />
			<a href={`mailto:${resume.contact.email}`}>
				{resume.contact.email}
			</a>
		</div>
	</div>
{/snippet}
{#snippet address()}
	<p class="flex flex-wrap">
		<Icon class="mr-2 h-5 w-5 text-gray-400" aria-hidden="true" src={MapPin} />
		{#if resume.contact.address.showStreet}
			<span>{resume.contact.address.street}</span>
		{/if}
		<br />
		{#if resume.contact.address.useShortAddress}
			<span>{resume.contact.address.nearestBigCity}</span>
		{:else}
			<span>{resume.contact.address.city}</span>
		{/if}

		{#if resume.contact.address.showStreet}
			<span>{resume.contact.address.zipcode}</span>
		{/if}
		<span>, {resume.contact.address.country}</span>
	</p>
{/snippet}

{#snippet headerDesktop()}
	<aside class="sidebar border-r-2 border-dashed w-[35%] bg-[#fefeff] text-[#10253f]">
		<div class="flex justify-center">
			<img
				src={avatar}
				alt="{resume.fullName}"
				class="h-[100px] w-[100px] rounded-full bg-zinc-100 object-cover dark:bg-zinc-800"
			/>
		</div>
		<div class="details">
			<h3>{$t('resume.contact')}</h3>
			{@render address()}
			{@render contact()}
		</div>
		<div class="skills mt-2">
			<h3 class="mb-2 mt-2">{$t('resume.techskills')}</h3>
			<div class="flex flex-wrap gap-2">
				{#each programmingLanguage as skill}
					<span class="border-blue-[#10253f] rounded-lg border-2 px-2 py-1">
						{skill.name}
					</span>
				{/each}
			</div>
			<div class="mt-2 flex flex-wrap gap-2">
				{#each [...web5TechSkills, ...tools5TechSkills, ...framework5TechSkills] as skill}
					<span class="border-blue-[#10253f] rounded-lg border-2 px-2 py-1">
						{skill.name}
					</span>
				{/each}
			</div>
			<h3 class="my-2">{$t('resume.softskills')}</h3>

			<div class="flex flex-col">
				{#each top5Skills as skill}
					<span>{skill.name}</span>
				{/each}
			</div>
			<div>
				<h3 class="mb-2 mt-2">{$t('resume.certifications')}</h3>

				{#each resume.certifications.filter((c) => c.id !== 1) as cert}
					{@render certifications(cert)}
				{/each}
			</div>
			<div>
				<h3 class="mb-2 mt-2">{$t('resume.education')}</h3>

				{#each resume.studies as study}
					{@render studies(study)}
				{/each}
			</div>

		</div>
	</aside>
{/snippet}

{#snippet studies(study: StudiesEvent)}
	<div class="mb-2 flex flex-col text-left text-[#10253f]">
		<span>{study.target}</span>
		<span>{study.content}</span>
		<em class="text-sm">{study.date}</em>
	</div>
{/snippet}
{#snippet certifications(cert: TimelineEvent)}
	<div class="mb-2 flex flex-col text-left text-[#10253f]">
		<span>{cert.content}</span>
		<em class="text-sm">{cert.date}</em>
	</div>
{/snippet}

{#snippet experience(experience: ExperiencesEvent)}
	{@const experiencesAquired = experience.skillAquiredList.filter((l) => l.level && l.level >= 70)}

	<div class="border-grey-300 mb-2 border-b-2 border-dashed pb-5">
		<div class="my-2 flex justify-start border-[#10253f] align-middle">
			<Icon class="mr-2 h-5 w-[50px] text-gray-400" aria-hidden="true" src={Briefcase} />
			<h3 class="text-bold text-[#10253f]">
				{experience.role}, {experience.companyName}
			</h3>

			<h3 class="text-md ml-2 align-middle italic">
				{new Date(experience.dateStartTime).getFullYear()} - {experience.dateEndTime === null
					? 'current'
					: new Date(experience.dateEndTime).getFullYear()}
			</h3>
		</div>

		<div class="flex flex-col">
			<div class="flex w-full justify-start">
				<Icon
					class="mr-2 mt-3 h-5 w-[50px] align-middle text-gray-400"
					aria-hidden="true"
					src={WrenchScrewdriver}
				/>
				<div class="flex w-[90%] flex-wrap gap-1">
					{#each experiencesAquired as sa}
						<span class="border-blue-[#10253f] rounded-xl border-b-2 px-2 py-1 text-center text-sm">
							{sa.name}
						</span>
					{/each}
				</div>
			</div>
			<div class="mt-1 flex justify-start">
				<Icon
					class="mr-2 mt-2 h-5 w-[50px] align-middle text-gray-400"
					aria-hidden="true"
					src={RocketLaunch}
				/>
				<ul class="w-[90%]">
					{#each Array.from(experience.experiencesListShort || []) as expItem}
						<li class="list-disc text-sm">{expItem}</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
{/snippet}

<style>
	.cv-container {
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	}

	.sidebar {
		padding: 30px 20px;
		text-align: center;
	}

	.details,
	.skills {
		text-align: left;
	}

	.details h3,
	.skills h3 {
		border-bottom: 1px solid #ffffff55;
	}
	.sidebar h3 {
		font-weight: 800;
	}

	ul {
		margin-top: 5px;
		padding-left: 20px;
	}
</style>
