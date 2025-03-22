<script lang="ts">
	import type { IResume } from '$lib/content';
	import Certifications from './Certifications.svelte';
	import Contact from './Contact.svelte';
	import Experiences from './Experiences.svelte';

	import MainSkills from './MainSkills.svelte';
	import Presentation from './Presentation.svelte';
	import Skills from './Skills.svelte';
	import Speakers from './Speakers.svelte';
	import Studies from './Studies.svelte';
	// //@ts-ignore
	// import html2pdf from 'html2pdf.js';
	let captureElement: HTMLDivElement;
	export let resume: IResume;

	function downloadPDF() {
		if (!captureElement) return;

		// html2pdf().from(captureElement).save('download.pdf');
	}
</script>

<button
	type="button"
	aria-label="Download CV PDF"
	class="group rounded-full bg-white/90 px-3 py-2 font-semibold text-gray-900 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-sm transition dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20"
	on:click={downloadPDF}
>
	Download PDF
</button>
<div
	bind:this={captureElement}
	class="flex w-full flex-col items-center justify-center overflow-hidden border-2 
	dark:bg-lapislazuli-200
	border-gray-400 dark:border-white rounded-xl px-2"
>
	<div class="w-full mx-2 max-w-prose text-lg">
		<h1>
			<span class="mt-3 block text-center text-xl font-semibold uppercase tracking-wide text-jm-600">
				
				{resume.fullName}
			</span>
			<span
				class="block text-center text-3xl font-extrabold leading-8 tracking-tight text-zinc-800
				dark:text-zinc-100 sm:text-4xl"
			>
				{resume.mainRoleTitle}
			</span>
		</h1>
		<MainSkills mainSkillList={resume.mainSkills} />
		<Contact contact={resume.contact} />
	</div>
	<div class="w-full px-0 md:px-5 lg:px-16 xl:px-32 mt-1 text-gray-500">
		<Presentation presentation={resume.presentation} />
		<Skills listSkills={resume.skills} />

		<div class="grid grid-cols-1">
			<Experiences experiences={resume.experiences} />
		</div>
		<div class="grid grid-cols-1">
			<Speakers speakers={resume.speakers} />
		</div>
		<div class="grid grid-cols-1 md:grid-cols-2">
			<Certifications certifications={resume.certifications} />
			<Studies studies={resume.studies} />
		</div>
	</div>
</div>
