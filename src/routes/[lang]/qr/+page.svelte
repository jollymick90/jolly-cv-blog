<script lang="ts">
	import Container from '$lib/components/template/Container.svelte';
	import QrLink from '$lib/components/utils/QRLink.svelte';
		
</script>

<svelte:head>
	<title>QrLink</title>
</svelte:head>

<Container className="mt-9">
	<QrLink qrUrlLink="https://michele-scarpa.vercel.app/"></QrLink>
</Container>