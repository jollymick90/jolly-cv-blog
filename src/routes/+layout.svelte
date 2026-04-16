<script lang="ts">
	import { onMount } from 'svelte';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import { langStore } from '$lib/i18n/lang.store';
	import { dev } from '$app/environment';
	import { themeStore } from '$lib/stores/theme.store';

	injectAnalytics({ mode: dev ? 'development' : 'production' });

	let { children, data } = $props();
	langStore.set(data.lang);

	onMount(() => {
		themeStore.init();
	});
</script>
{@render children()}

