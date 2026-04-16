<script lang="ts">
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
         transition-colors"
  aria-label={$themeStore === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
>
  {#if $themeStore === 'dark'}
    <span class="material-symbols-outlined text-[20px]">light_mode</span>
  {:else}
    <span class="material-symbols-outlined text-[20px]">dark_mode</span>
  {/if}
</button>
