<script lang="ts">
	import { type ExperiencesEvent } from '$lib/content/resume';

	import type { IResume, StudiesEvent, TimelineEvent } from '$lib/content';
	import {
		Icon,
		Envelope,
		Phone,
		MapPin
	} from 'svelte-hero-icons';
	import avatar from '$lib/img/profile-michele.png';

	import { t } from '$lib/i18n';
	import { LinkedInIcon } from '$lib/components/icons';

	const techSkills = [
		"<b>Programming Languages</b>: Typescript, Javascript, Java, Kotlin",
        "<b>Frontend Frameworks</b>: React, Angular, Vue, Svelte",
        "<b>Backend & Databases</b>: Spring Boot, NodeJS, PostgresSQL, Postgis",
        "<b>GIS Technologies</b>: OpenLayers/Leaflet, Geoserver",
        "<b>Tools & Platforms</b>: Docker, AWS, Kubernates, Keycloak",
        "<b>Other</b>: GraphQL, NX - Monorepo"
	]

	const softSkills = [
		"Analytical Thinking",
		"Creative Problem Solving",
		"Project Management",
		"Team Collaboration",
		"Mentoring"
	]
	export const {
		resume
	}: {
		resume: IResume;
	} = $props();


	const studiesList = resume.studies.filter(s => s.id === 1);
	const experiencesList = resume.experiences.filter(e => e.id !== 3);
</script>

<div class="w-full mx-auto flex max-w-[1200px] 
print:flex-row
flex-col bg-white 
">
	<main class="print:w-full mx-20 p-5  ">
		<section class="hidden md:block print:block">
			<div class="ml-5">
				<h1 class="text-xl">{resume.fullName}</h1>
				<p class="text-2xl">{resume.mainRoleTitle}</p>
			</div>
		</section>
		<section class="profile">
			<p class="print:text-md">{resume.presentation}</p>
		</section>
		<section class="">
			<h3 class="mt-2">{$t('resume.techskills')}</h3>
			<ul>
				{#each techSkills as skill}
					<li class=" list-disc text-sm px-2 py-1">
						{@html skill}
					</li>
				{/each}
			</ul>
		</section>
		<h3>{$t('resume.softskills')}</h3>
			<ul>
				{#each softSkills as skill}
					<li class="list-disc text-sm">{skill}</li>
				{/each}
			</ul>

		<section >
			<h2 class="my-2 font-medium">{$t('resume.history_experiences')}</h2>

			{#each experiencesList as exp}
				{@render experience(exp)}
			{/each}
		</section>
		<section class="text-xs hidden md:block print:block">
		
			{$t('resume.privacy')}
		
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
			<a class="text-sm" href={`mailto:${resume.contact.email}`}>
				{resume.contact.email}
			</a>
		</div>
		<div class="flex">
	<LinkedInIcon class="h-6 w-6 mr-2 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" ></LinkedInIcon>

    		
			<a class="text-sm" href={`${resume.social[0].href}`}>
				in/michele-scarpa-90-arco
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
	<aside class="w-full print:block border-r-2 border-dashed bg-white dark:text-black">

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
			<h3>{$t('resume.softskills')}</h3>
			<ul>
				{#each softSkills as skill}
					<li class="text-sm">{skill}</li>
				{/each}
			</ul>
			<h3 class="mt-2">{$t('resume.techskills')}</h3>
			<div class="flex flex-wrap gap-2">
				{#each techSkills as skill}
					<span class=" text-sm rounded-lg px-2 py-1">
						{@html skill}
					</span>
				{/each}
			</div>

			<div>
				<h3 class="mb-2 mt-2">{$t('resume.certifications')}</h3>

				{#each resume.certifications as cert}
					{@render certifications(cert)}
				{/each}
			</div>
			<div>
				<h3 class="mb-2 mt-2">{$t('resume.education')}</h3>

				{#each studiesList as study}
					{@render studies(study)}
				{/each}
			</div>

		</div>
	</aside>
{/snippet}


{#snippet studies(study: StudiesEvent)}
	<div class="mb-2 flex flex-row flex-wrap gap-1 md:gap-0 md:flex-col text-left text-[#10253f] dark:text-[#fefeff]">
		<span class="text-sm">{study.target}</span>
		<span class="text-xs">{study.content}</span>
		<em class="text-xs">{study.date}</em>
	</div>
{/snippet}

{#snippet certifications(cert: TimelineEvent)}
	<div class="mb-2 flex flex-col text-left text-[#10253f] dark:text-[#fefeff]">
		<span class="text-sm">{cert.content}</span>
		<em class="text-xs">{cert.date}</em>
	</div>
{/snippet}

{#snippet experience(experience: ExperiencesEvent)}
	<div class="mb-2 border-b-2 border-dashed border-[#10253f] pb-5">
		<div class="my-2 flex justify-start border-[#10253f] align-middle">
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
			<div class="flex flex-col md:flex-row w-full">
				<div class="flex">
					<h4 class="block md:hidden text-bold">{$t('resume.activities')}</h4>
				</div>
				<div>
					<h4 class="hidden md:block text-bold italic">{$t('resume.activities')}</h4>
					<ul>
						{#each Array.from(experience.experiencesList || []) as expItem}
							<li class="list-disc text-sm print:text-sm">{@html expItem}</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
	</div>
{/snippet}

<style>

	.details,
	.skills {
		text-align: left;

	}

	.details h3,
	.skills h3 {
		border-bottom: 1px solid #ffffff55;
		padding-bottom: 5px;
		margin-bottom: 10px;
	}

	.skills ul {
		padding: 0;
	}

	.skills li {
		padding: 5px 0;
		/* border-bottom: 1px solid #ffffff33; */
	}

	ul {
		margin-top: 5px;
		padding-left: 20px;
	}
</style>
