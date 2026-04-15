<script lang="ts">
	import Container from '$lib/components/template/Container.svelte';
	import Cv from '$lib/components/pages/resume/CV.svelte';
	import { profileToResume } from '$lib/utils/config-utils';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data?.profile?.name ?? 'Resume'}</title>
</svelte:head>

<Container className="mt-9">

	 <Cv resume={profileToResume(data.profile)} printable={false}/>
</Container>
