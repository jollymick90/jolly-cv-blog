<script lang="ts">
  import { themeStore } from '$lib/stores/theme.store';
</script>

<button
  type="button"
  onclick={themeStore.toggle}
  class="flex items-center justify-center text-primary hover:text-tertiary transition-colors"
  aria-label={$themeStore === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
>
  {#if $themeStore === 'dark'}
    <span class="material-symbols-outlined text-[20px]">light_mode</span>
  {:else}
    <span class="material-symbols-outlined text-[20px]">dark_mode</span>
  {/if}
</button>
