<script lang="ts">
  import AppHeader from '$lib/components/shell/AppHeader.svelte';
  import AppFooter from '$lib/components/shell/AppFooter.svelte';
  import BottomNav from '$lib/components/shell/BottomNav.svelte';
  import FloatingThemeToggle from '$lib/components/shell/FloatingThemeToggle.svelte';
  import { immersive } from '$lib/stores/immersive.store';
  import './tw.css';

  let { children, data } = $props();
  const lang = $derived(data.lang);
  const isFullScreen = $derived(data.isFullScreen);
</script>

{#if isFullScreen}
  {@render children()}
{:else}
  {#if !$immersive}
    <AppHeader {lang} />
  {/if}
  <main
    class="min-h-screen bg-background text-on-background"
    class:pt-16={!$immersive}
    class:pb-20={!$immersive}
  >
    {@render children()}
  </main>
  {#if !$immersive}
    <AppFooter {lang} />
    <BottomNav {lang} />
    <!-- <FloatingThemeToggle /> -->
  {/if}
{/if}
