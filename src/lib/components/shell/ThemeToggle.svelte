<script lang="ts">
  import { Sun, Moon } from 'lucide-svelte';
  import { themeStore } from '$lib/stores/theme.store';
</script>

<button
  type="button"
  onclick={themeStore.toggle}
  class="flex items-center justify-center text-primary hover:text-tertiary transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
  aria-label={$themeStore === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
>
  {#if $themeStore === 'dark'}
    <Sun size={20} aria-hidden="true" />
  {:else}
    <Moon size={20} aria-hidden="true" />
  {/if}
</button>
