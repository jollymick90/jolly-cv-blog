<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import type { LangAvailable } from '$lib/types';

  const { lang }: { lang: LangAvailable } = $props();

  let open = $state(false);
  let isDark = $state(true);

  onMount(() => {
    isDark = document.documentElement.classList.contains('dark');
  });

  function toggleTheme() {
    isDark = !isDark;
    document.documentElement.classList.toggle('dark', isDark);
  }

  function switchLang(newLang: LangAvailable) {
    open = false;
    const currentPath = page.url.pathname;
    const newPath = currentPath.replace(`/${lang}`, `/${newLang}`);
    goto(newPath);
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') open = false;
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="relative">
  <button
    onclick={() => (open = !open)}
    class="flex items-center gap-1.5 px-3 py-1.5 bg-surface-container border border-outline-variant/30 text-primary text-[10px] font-label font-bold tracking-widest hover:bg-surface-container-high transition-colors"
    aria-label="Language and theme settings"
  >
    🌐 {lang.toUpperCase()} ▾
  </button>

  {#if open}
    <button
      class="fixed inset-0 z-40"
      onclick={() => (open = false)}
      aria-label="Close menu"
      tabindex="-1"
    ></button>

    <div
      class="absolute right-0 top-full mt-1 z-50 min-w-[160px] bg-surface-container-low border border-outline-variant/30 py-2"
    >
      <div class="px-3 pb-2 mb-2 border-b border-outline-variant/20">
        <p class="text-[9px] font-label tracking-widest text-on-surface-variant uppercase">Language</p>
      </div>

      {#each (['en', 'it'] as LangAvailable[]) as l}
        <button
          onclick={() => switchLang(l)}
          class="w-full text-left px-4 py-2 text-[11px] font-label tracking-wider transition-colors
            {lang === l ? 'text-tertiary font-bold' : 'text-secondary hover:text-on-surface hover:bg-surface-container'}"
        >
          {l === 'en' ? '🇬🇧 English' : '🇮🇹 Italiano'}
          {#if lang === l}<span class="ml-2 text-tertiary">✓</span>{/if}
        </button>
      {/each}

      <div class="px-3 pt-2 mt-2 border-t border-outline-variant/20">
        <p class="text-[9px] font-label tracking-widest text-on-surface-variant uppercase mb-2">Theme</p>
        <button
          onclick={toggleTheme}
          class="w-full flex items-center gap-2 px-1 py-1.5 text-[11px] font-label tracking-wider text-secondary hover:text-on-surface transition-colors"
        >
          {isDark ? '☀ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>
    </div>
  {/if}
</div>
