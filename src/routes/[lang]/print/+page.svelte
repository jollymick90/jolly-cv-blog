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
	<title>{data?.profile?.name ?? 'Resume'}</title>
</svelte:head>

<ContainerPrint>
	 <Cv resume={data.profile as any} printable={true} full={false}/>
</ContainerPrint>
