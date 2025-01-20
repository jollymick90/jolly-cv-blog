<!-- src/routes/resume/+page.svelte -->
<script lang="ts">
	import { getConfig } from '$lib/utils/config';
	import type { ResumeConfig } from '../../types';
	import Resume from '../../components/Resume.svelte';

	let config: ResumeConfig;

	$: (async () => {
		config = await getConfig('resume');
	})();

	function downloadResume() {
		// logica per download PDF/Resume
		// puoi linkare direttamente un PDF statico o generarlo
	}
</script>

<svelte:head>
	<title>{config?.title ?? 'Resume'}</title>
</svelte:head>

<main>

	<div class="relative bg-gray-100">

        <div class="lg:absolute lg:inset-0">
            <div class="lg:absolute lg:inset-y-0 lg:left-0 lg:w-1/3">
                <img
                    class="h-56 w-full object-cover lg:absolute lg:h-full"
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80"
                    alt=""
                />
            </div>
        </div>
        <div class="relative pt-4 pb-16 px-4 sm:pt-4 sm:px-6 lg:px-8 lg:max-w-7xl lg:mx-auto lg:grid lg:grid-cols-4">
            <div class="relative lg:col-start-2 lg:col-span-3 lg:pl-8 drop-shadow-md rounded-md p-2">
                <!-- {DButton}
                <div ref={componentRef} >
                    <Resume />
                </div> -->
				<Resume />
            </div>
        </div>

    </div>
	<h1>{config?.name}</h1>
	<h2>{config?.role}</h2>
	<p>{config?.description}</p>

	<!-- Esperienze, competenze, ecc... -->
	{#each config?.experiences ?? [] as experience}
		<div>
			<h3>{experience.company}</h3>
			<p>{experience.position} - {experience.years}</p>
		</div>
	{/each}

	<button on:click={downloadResume}>Download Resume</button>
</main>
