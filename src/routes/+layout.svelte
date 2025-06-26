<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/template/Header.svelte';
	import { langStore } from '$lib/i18n/lang.store';
	let { children, data } = $props();
	langStore.set(data.lang);
	
</script>
{@render children()}

