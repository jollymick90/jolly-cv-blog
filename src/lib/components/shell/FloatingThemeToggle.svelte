<script lang="ts">
  import { Sun, Moon } from 'lucide-svelte';
  import { themeStore } from '$lib/stores/theme.store';
</script>

<button
  type="button"
  onclick={themeStore.toggle}
  class="fixed bottom-6 right-6 z-50
         w-11 h-11 flex items-center justify-center
         rounded-xl
         bg-surface-container border border-outline-variant/15
         text-on-surface hover:text-tertiary
         transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
  aria-label={$themeStore === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
>
  {#if $themeStore === 'dark'}
    <Sun size={20} aria-hidden="true" />
  {:else}
    <Moon size={20} aria-hidden="true" />
  {/if}
</button>
