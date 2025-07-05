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
	import { LinkedInIcon } from '$lib/components/icons';

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
</script>

<div class="cv-container m-auto flex max-w-[1200px] 
print:flex-row
flex-col bg-white md:flex-row">
	{@render headerDesktop()}

	{@render headerMobile()}

	<main class="p-5 print:w-[65%] md:w-[70%] md:p-4">
		<section class="hidden md:block print:block">
			<div class="ml-5">
				<h1 class="text-xl">{resume.fullName}</h1>
				<p class="text-2xl">{resume.mainRoleTitle}</p>
			</div>
		</section>
		<section class="profile">
			<p class="print:text-md">{resume.presentation}</p>
		</section>

		<section class="experience">
			<h2 class="my-2 font-medium">{$t('resume.history_experiences')}</h2>

			{#each resume.experiences as exp}
				{@render experience(exp)}
			{/each}
		</section>
		<section class="text-xs hidden md:block print:block">
		
			{$t('resume.privacy')}
		
		</section>
	</main>
	{@render footerMobile()}
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
	<aside class="sidebar print:block hidden border-r-2 border-dashed w-[35%] bg-[#fefeff] dark:bg-[#10253f] dark:text-[#fefeff] md:block">

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
				{#each top5Skills as skill}
					<li class="text-sm">{skill.name}</li>
				{/each}
			</ul>
			<h3 class="mt-2">{$t('resume.techskills')}</h3>
			<div class="flex flex-wrap gap-2">
				{#each programmingLanguage as skill}
					<span class="border-blue-[#10253f] text-sm rounded-lg border-2 px-2 py-1">
						{skill.name}
					</span>
				{/each}
			</div>
			<div class="mt-2 flex flex-wrap gap-2">
				{#each [...web5TechSkills, ...tools5TechSkills, ...framework5TechSkills] as skill}
					<span class="border-blue-[#10253f] text-sm rounded-lg border-2 px-2 py-1">
						{skill.name}
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

				{#each resume.studies as study}
					{@render studies(study)}
				{/each}
			</div>

		</div>
	</aside>
{/snippet}
{#snippet headerMobile()}
	<header class="w-full print:hidden bg-[#10253f] p-4 text-white md:hidden">
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
			<ul class="flex flex-col justify-center gap-2">
				{#each top5Skills as skill}
					<li>{skill.name}</li>
				{/each}
			</ul>
			<h3 class="mt-4 border-b-2 border-[#fffffff5]">{$t('resume.techskills')}</h3>
			<div class="mt-2 flex flex-wrap justify-center gap-2 md:p-0">
				{#each programmingLanguage as skill}
					<span class="border-blue-[#10253f] rounded-lg border-2 px-2 py-1">
						{skill.name}
					</span>
				{/each}
			</div>
			<div class="mt-2 flex flex-wrap justify-center gap-2 pb-2 ">
				{#each [...web5TechSkills, ...tools5TechSkills, ...framework5TechSkills] as skill}
					<span class="border-blue-[#10253f] rounded-lg border-2 px-2 py-1">
						{skill.name}
					</span>
				{/each}
			</div>
		
			<div class="pb-2">
				<h3 class="mb-2 mt-2 border-b-2 border-[#fffffff5]">{$t('resume.certifications')}</h3>

				{#each resume.certifications as cert}
					{@render certifications(cert)}
				{/each}
			</div> 
			
		</div>
	</header>
{/snippet}
{#snippet footerMobile()}
	<footer class="print:hidden block md:hidden w-full bg-[#10253f] p-2 text-white">
		
		<div class="">
			
			<div class="pb-2 border-b-2 border-[#fffffff5]">
				<h3 class="mb-2 mt-2">{$t('resume.education')}</h3>

				{#each resume.studies as study}
					{@render studies(study)}
				{/each}
			</div>

		</div>
		<div class="text-xs">
			{$t('resume.privacy')}
		</div>
	</footer>
	
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
	{@const experiencesAquired = experience.skillAquiredList.filter((l) => l.level && l.level >= 70)}
	{@const experiencesUse = experience.skillAquiredList.filter((l) => !l.level || l.level < 70)}
	<div class="mb-2 border-b-2 border-dashed border-[#10253f] pb-5">
		<div class="my-2 flex justify-start border-[#10253f] align-middle">
			<Icon
				class="mr-2 h-5 w-[50px] text-gray-400"
				aria-hidden="true"
				src={Briefcase} 
			/>
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
					<Icon
					class="mr-2 h-5 w-[50px] align-middle text-gray-400"
					aria-hidden="true"
					src={WrenchScrewdriver}
				/>
					<span class="block md:hidden text-bold">{$t('resume.skills_acquired')}</span>
				</div>
				

				<div class="flex flex-col">
					<h4 class="hidden md:block italic text-sm text-bold">{$t('resume.skills_acquired')}</h4>
					<div class="flex flex-wrap gap-1">
						{#each experiencesAquired as sa}
							<span class="border-blue-[#10253f] print:text-xs text-sm border-b-2 print:py-[2px] px-2 py-1 text-center">
								{sa.name}
							</span>
						{/each}
					</div>
					{#if experiencesUse.length > 0}
						<span class="print:hidden text-bold text-sm talic">{$t('resume.technologies')}</span>
						<div class="flex flex-wrap gap-1">
							{#each experiencesUse as sa}
								<p class="border-blue-[#10253f] print:text-xs text-sm border-b-2 px-2 print:py-[2px] py-1 text-center">
									{sa.name}
								</p>
							{/each}
						</div>
					{/if}
				</div>
			</div>
			<div class="flex flex-col md:flex-row w-full">
				<div class="flex">
					<Icon
						class="mt-2 h-5 w-[50px] align-middle text-gray-400"
						aria-hidden="true"
						src={RocketLaunch}
					/>
					<h4 class="block md:hidden text-bold">{$t('resume.activities')}</h4>
				</div>
				<div>
					<h4 class="hidden md:block text-bold italic">{$t('resume.activities')}</h4>
					<ul>
						{#each Array.from(experience.experiencesList || []) as expItem}
							<li class="list-disc text-sm print:text-sm">{expItem}</li>
						{/each}
					</ul>
				</div>
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

	.sidebar h3 {
		color: #ddd;
		font-weight: 800;
	}

	ul {
		margin-top: 5px;
		padding-left: 20px;
	}
</style>
