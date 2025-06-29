<script lang="ts">
	import '../app.css';
	import { injectAnalytics } from '@vercel/analytics/sveltekit'

	import { langStore } from '$lib/i18n/lang.store';
    import { dev } from '$app/environment';

    // Inject the Analytics functionality
    injectAnalytics({ mode: dev ? 'development' : 'production' });

	let { children, data } = $props();
	langStore.set(data.lang);
	
</script>
{@render children()}

