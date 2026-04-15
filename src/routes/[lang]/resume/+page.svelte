<script lang="ts">
	import Container from '$lib/components/template/Container.svelte';
	import Resume from '$lib/components/pages/resume/Resume.svelte';
	import { profileToResume } from '$lib/utils/config-utils';

	let { data } = $props();
	function downloadResume() {
	}
</script>

<svelte:head>
	<title>{data?.profile?.name ?? 'Resume'}</title>
</svelte:head>

<Container className="mt-9">
	<Resume resume={profileToResume(data.profile)}/>
</Container>
