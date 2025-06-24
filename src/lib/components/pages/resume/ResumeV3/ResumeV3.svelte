<script lang="ts">
	import { type ExperiencesEvent } from '$lib/content/resume';

	import type { IResume, StudiesEvent } from '$lib/content';
	import { Icon, Envelope, Phone, MapPin } from 'svelte-hero-icons';

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
		.filter((skill) => skill.type === 'WEB_DEVELOPMENT')
		.sort((skillA, skillB) => skillB.level - skillA.level)
		.splice(0, 5);

	const programmingLanguage = skills
		.filter((skill) => skill.type === 'PROGRAMMING_LANGUAGE')
		.sort((skillA, skillB) => skillB.level - skillA.level)
		.splice(0, 5);
</script>

<div class="cv-container m-auto flex max-w-[1200px] flex-col bg-white md:flex-row">
	{@render headerDesktop()}

	{@render headerMobile()}

	<main class=" p-5 md:w-[70%] md:p-4">
		<section class="profile">
			<p>{resume.presentation}</p>
		</section>

		<section class="experience">
			<h2 class="my-2 font-medium">{$t('resume.history_experiences')}</h2>

			{#each resume.experiences as exp}
				{@render experience(exp)}
			{/each}
		</section>

		<section class="education">
			<h2 class="my-2 font-medium">{$t('resume.education')}</h2>

			{#each resume.studies as study}
				{@render studies(study)}
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
	<aside class="sidebar hidden md:block">
		<h1>{resume.fullName}</h1>
		<p class="subtitle">{resume.mainRoleTitle}</p>
		<div class="details">
			<h3>{$t('resume.contact')}</h3>
			{@render address()}
			{@render contact()}
		</div>
		<div class="skills">
			<h3>{$t('resume.softskills')}</h3>
			<ul>
				{#each top5Skills as skill}
					<li>{skill.name}</li>
				{/each}
			</ul>
			<h3 class="mt-2">{$t('resume.techskills')}</h3>
			<ul>
				{#each programmingLanguage as skill}
					<li>{skill.name}</li>
				{/each}
			</ul>
			<ul>
				{#each web5TechSkills as skill}
					<li>{skill.name}</li>
				{/each}
			</ul>
		</div>
	</aside>
{/snippet}
{#snippet headerMobile()}
	<header class="w-full bg-[#10253f] p-2 text-white md:hidden">
		<h1>{resume.fullName}</h1>
		<p class="mb-2 text-xl">{resume.mainRoleTitle}</p>
		<div class="mb-3 pb-2">
			<h3 class="mb-1 border-b-2 border-[#fffffff5] text-white">
				{$t('resume.contact')}
			</h3>
			{@render address()}
			{@render contact()}
		</div>
		<div class="">
			<h3 class=" border-b-2 border-[#fffffff5]">{$t('resume.softskills')}</h3>
			<ul class="flex flex-col gap-2">
				{#each top5Skills as skill}
					<li>{skill.name}</li>
				{/each}
			</ul>
			<h3 class=" border-b-2 border-[#fffffff5]">{$t('resume.techskills')}</h3>
			<ul class="flex flex-col gap-2">
				<li class="flex flex-wrap gap-2">
					{#each programmingLanguage as skill}
						<span>{skill.name}</span>
					{/each}
				</li>
			</ul>
			<ul class="flex flex-col gap-2">
				<li class="flex flex-wrap gap-2">
					{#each web5TechSkills as skill}
						<span>{skill.name}</span>
					{/each}
				</li>
			</ul>
		</div>
	</header>
{/snippet}
{#snippet studies(study: StudiesEvent)}
	<h3 class="mb-2 text-[#10253f]">
		<em>{study.date}</em>
		{study.target}, {study.content}, Italy
	</h3>
{/snippet}

{#snippet experience(experience: ExperiencesEvent)}
	{@const experiencesAquired = experience.skillAquiredList.filter((l) => l.level && l.level >= 70)}
	{@const experiencesUse = experience.skillAquiredList.filter((l) => !l.level || l.level < 70)}
	<h3 class="my-2 border-b-[1px] border-[#10253f] text-[#10253f]">
		{experience.role}, {experience.companyName}, Italy
	</h3>
	<p>
		<em>
			{new Date(experience.dateStartTime).getFullYear()} - {experience.dateEndTime === null
				? 'current'
				: new Date(experience.dateEndTime).getFullYear()}
		</em>
	</p>
	<div class="flex flex-col">
		<div class="w-full">
			<h4 class="text-bold">Abilità Aquisite/Consolidate</h4>
			<div class="flex flex-wrap gap-1">
			{#each experiencesAquired as sa}
				<span class="py-1 px-2 border-2 border-blue-[#10253f] rounded-xl text-center">{sa.name}</span>
			{/each}
			</div>
			{#if experiencesUse.length > 0}
				<h4 class="text-bold">Tecnologie Usate</h4>
				<div class="flex flex-wrap gap-1">
				{#each experiencesUse as sa}
					<p class="py-1 px-2 border-2 border-blue-[#10253f] rounded-xl text-center">{sa.name}</p>
				{/each}
				</div>
			{/if}
		</div>
		<div class="w-full">
			<h4 class="text-bold">Attività / Progetti</h4>
			<ul>
				{#each Array.from(experience.experiencesList || []) as expItem}
					<li class="list-disc">{expItem}</li>
				{/each}
			</ul>
		</div>
	</div>
{/snippet}

<style>
	.cv-container {
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	}

	.sidebar {
		width: 35%;
		background: #10253f;
		color: white;
		padding: 30px 20px;
		text-align: center;
	}

	.sidebar h1 {
		margin-top: 15px;
		font-size: 24px;
	}

	.subtitle {
		font-size: 14px;
		color: #c5d2e0;
		margin-bottom: 30px;
	}

	.profile-pic {
		width: 100px;
		height: 100px;
		border-radius: 50%;
		object-fit: cover;
	}

	.details,
	.skills {
		text-align: left;
		margin-top: 30px;
	}

	.details h3,
	.skills h3 {
		border-bottom: 1px solid #ffffff55;
		padding-bottom: 5px;
		margin-bottom: 10px;
	}

	.skills ul {
		/* list-style: none; */
		padding: 0;
	}

	.skills li {
		padding: 5px 0;
		border-bottom: 1px solid #ffffff33;
	}

	.main-content {
		width: 70%;
		padding: 40px;
	}

	h2 {
		/* border-bottom: 2px solid #ddd;
		padding-bottom: 5px;
		margin-top: 30px; */
	}
	/* h3 {
    margin-bottom: 5px;
    color: #10253f;
} */

	.sidebar h3 {
		color: #ddd;
		font-weight: 800;
	}

	ul {
		margin-top: 5px;
		padding-left: 20px;
	}
</style>
