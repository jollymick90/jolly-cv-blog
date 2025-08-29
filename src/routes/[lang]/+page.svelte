<script lang="ts">
	import { t } from '$lib/i18n';
	import Container from '$lib/components/template/Container.svelte';
	import HomeArticleSection from '$lib/components/pages/home/HomeArticleSection.svelte';
	import HomeHeadings from '$lib/components/pages/home/HomeHeadings.svelte';
	import HomeNewsLetterSection from '$lib/components/pages/home/HomeNewsLetterSection.svelte';
	import HomeResume from '$lib/components/pages/home/HomeResume.svelte';

	import Photos from '$lib/components/pages/home/Photos.svelte';
	import HomeProject from '$lib/components/pages/home/HomeProject.svelte';
	import HomeEvent from '$lib/components/pages/home/HomeEvent.svelte';

	const { data } = $props();
	const resume = data.resume;
</script>

<svelte:head>
	<title>
		{$t('home.title')}
	</title>
</svelte:head>

<Container className="mt-9">
	<HomeHeadings socialListInput={resume.social}></HomeHeadings>
</Container>
<Photos></Photos>

<Container className="mt-24 mb-10 md:mt-28">
	<div class="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
		<div class="space-y-10">
			<HomeResume {resume}></HomeResume>
			<HomeProject></HomeProject>
			</div>
		<div class="flex flex-col gap-16 lg:pl-16 xl:pl-24">
			<!-- <HomeEvent></HomeEvent> -->
			<HomeArticleSection></HomeArticleSection>
		</div>
	</div>
</Container>
