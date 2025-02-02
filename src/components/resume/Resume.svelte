<script lang="ts">
	import Certifications from './Certifications.svelte';
	import Contact from './Contact.svelte';
	import Experiences from './Experiences.svelte';

	import MainSkills from './MainSkills.svelte';
	import Presentation from './Presentation.svelte';
	import Skills from './Skills.svelte';
	import Speakers from './Speakers.svelte';
	import Studies from './Studies.svelte';
	//@ts-ignore
	import html2pdf from 'html2pdf.js';
	let captureElement: HTMLDivElement;

	function downloadPDF() {
		if (!captureElement) return;

		html2pdf().from(captureElement).save('download.pdf');
	}
</script>

<button
type="button"
aria-label="Download CV PDF"
class="group rounded-full bg-white/90 px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-sm transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20
font-semibold 
                                dark:text-zinc-200 text-gray-900
"

 on:click={downloadPDF}>Download PDF</button>
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
			<MainSkills />
			<Contact />
		</div>
		<div class="prose prose-lg prose-indigo mx-auto mt-3 text-gray-500">
			<Presentation />
			<Skills />
			<Experiences />
			<Speakers />
			<Certifications />
			<Studies />
		</div>
	</div>
</div>
