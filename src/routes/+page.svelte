<script lang="ts">
	console.log("1 load page.svelte loaded and redirect")
</script>
<h1>page svelte common</h1>
<!-- <script lang="ts">
	import Container from '$lib/components/template/Container.svelte';
	import HomeArticleSection from '$lib/components/pages/home/HomeArticleSection.svelte';
	import HomeHeadings from '$lib/components/pages/home/HomeHeadings.svelte';
	import HomeNewsLetterSection from '$lib/components/pages/home/HomeNewsLetterSection.svelte';
	import HomeResume from '$lib/components/pages/home/HomeResume.svelte';

	import Photos from '$lib/components/pages/home/Photos.svelte';
	// import { myResumePlaceholder } from '$lib/config/my-resume.js';
	// import type { IResume } from '$lib/content/resume.js';

	export let data;
	let config = data.landing;
	let resume = data.resume;
</script>

<svelte:head>
	<title>{config?.title ?? 'Landing Page'}</title>
</svelte:head>

<Container className="mt-9">
	<HomeHeadings
		heading={config.heading}
		description={config.description}
		socialListInput={resume.contact.social}
	></HomeHeadings>
</Container>
<Photos></Photos>

<Container className="mt-24 md:mt-28">
	<div class="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
		<div class="flex flex-col gap-16">
			<HomeArticleSection></HomeArticleSection>
		</div>
		<div class="space-y-10 lg:pl-16 xl:pl-24">
			<HomeNewsLetterSection></HomeNewsLetterSection>
			<HomeResume {resume}></HomeResume>
		</div>
	</div>
</Container> -->
