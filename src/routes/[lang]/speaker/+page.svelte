<script lang="ts">
	import { t } from '$lib/i18n';
	import Events from '$lib/components/pages/event/Events.svelte';
	import Container from '$lib/components/template/Container.svelte';

	let { data } = $props();
	let { posts } = data;
</script>

<svelte:head>
	<title>{data?.profile?.name ?? 'Speaker'}</title>
	<meta name="description" content={$t('event.intro')} />
</svelte:head>

<Container className="mt-9">
	 <Events events={posts}/>
</Container>