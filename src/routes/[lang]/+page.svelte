
<script lang="ts">
	import { t } from '$lib/i18n';
	import Container from '$lib/components/template/Container.svelte';
	import HomeArticleSection from '$lib/components/pages/home/HomeArticleSection.svelte';
	import HomeHeadings from '$lib/components/pages/home/HomeHeadings.svelte';
	import HomeNewsLetterSection from '$lib/components/pages/home/HomeNewsLetterSection.svelte';
	import HomeResume from '$lib/components/pages/home/HomeResume.svelte';

	import Photos from '$lib/components/pages/home/Photos.svelte';

	let { data } = $props();
	let resume = data.resume;
</script>

<svelte:head>
	<title>
		{$t('home.title')}
	</title>
</svelte:head>

<Container className="mt-9">
	<HomeHeadings
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
</Container>
