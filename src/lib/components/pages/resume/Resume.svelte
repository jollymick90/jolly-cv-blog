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
<div bind:this={captureElement} class="relative overflow-hidden bg-white py-1">
	<div class="relative px-4 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-prose text-lg">
			<h1>
				<span class="block text-center text-base font-semibold uppercase tracking-wide text-jm-600">
					Michele Scarpa
				</span>
				<span
					class="mt-2 block text-center text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl"
				>
					Software engineer
				</span>
			</h1>
			<MainSkills mainSkillList={resume.mainSkills}/>
			<Contact contact={resume.contact}/>
		</div>
		<div class="prose prose-lg prose-indigo mx-auto mt-3 text-gray-500">
			<Presentation presentation={resume.presentation}/>
			<Skills listSkills={resume.skills}/>
			
				<Experiences experiences={resume.experiences}/>
				
			
			<div class="grid grid-cols-3">
				<Speakers speakers={resume.speakers}/>
			<Certifications certifications={resume.certifications}/>
			<Studies studies={resume.studies}/>
		</div>
		</div>
	</div>
</div>
