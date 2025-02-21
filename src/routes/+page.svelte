<script lang="ts">
	import Container from '$lib/components/template/Container.svelte';
	import HomeArticleSection from '$lib/components/pages/home/HomeArticleSection.svelte';
	import HomeHeadings from '$lib/components/pages/home/HomeHeadings.svelte';
	import HomeNewsLetterSection from '$lib/components/pages/home/HomeNewsLetterSection.svelte';
	import HomeResume from '$lib/components/pages/home/HomeResume.svelte';
	
	import Photos from '$lib/components/pages/home/Photos.svelte';

	export let data;
	let config = data.config;
</script>

<svelte:head>
	<title>{config?.title ?? 'Landing Page'}</title>
</svelte:head>

<Container className="mt-9">
	<HomeHeadings {data}></HomeHeadings>
</Container>
<Photos></Photos>

<Container className="mt-24 md:mt-28">


<div class="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div class="flex flex-col gap-16">
            <HomeArticleSection></HomeArticleSection>
          </div>
          <div class="space-y-10 lg:pl-16 xl:pl-24">
            <HomeNewsLetterSection></HomeNewsLetterSection>
            <HomeResume></HomeResume>
          </div>
        </div>
</Container>
