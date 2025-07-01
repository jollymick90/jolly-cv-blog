<script lang="ts">
	import Cv from '$lib/components/pages/resume/CV.svelte';
	import ContainerPrint from '$lib/components/template/ContainerPrint.svelte';
	import { onMount } from 'svelte';

	const { data } = $props();
	onMount(() => {
		document.documentElement.setAttribute('data-theme', 'dark');
        document.documentElement.classList.toggle('dark', true);
	})
	
</script>

<svelte:head>
	<title>{data?.resume.title ?? 'Resume'}</title>
</svelte:head>

<ContainerPrint>
	 <Cv resume={data.resume} full={true} printable={true}/>
</ContainerPrint>