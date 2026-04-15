<script lang="ts">
  import AppHeader from '$lib/components/shell/AppHeader.svelte';
  import AppFooter from '$lib/components/shell/AppFooter.svelte';
  import BottomNav from '$lib/components/shell/BottomNav.svelte';
  import './tw.css';

  let { children, data } = $props();
  const { lang, isFullScreen } = data;
</script>

{#if isFullScreen}
  {@render children()}
{:else}
  <AppHeader {lang} />
  <main class="pt-16 pb-20 min-h-screen bg-background text-on-background">
    {@render children()}
  </main>
  <AppFooter {lang} />
  <BottomNav {lang} />
{/if}
