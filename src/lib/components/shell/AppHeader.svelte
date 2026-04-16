<script lang="ts">
  import { page } from '$app/state';
  import MaterialIcon from './MaterialIcon.svelte';
  import LangDropdown from './LangDropdown.svelte';
  import ThemeToggle from './ThemeToggle.svelte';
  import type { LangAvailable } from '$lib/types';

  const { lang }: { lang: LangAvailable } = $props();

  const navItems = $derived([
    { label: 'DEPLOYS', icon: 'rocket_launch', href: `/${lang}/project` },
    { label: 'BIO', icon: 'account_circle', href: `/${lang}/cv` },
    { label: 'COMMUNITY', icon: 'groups', href: `/${lang}/blog` }
  ]);

  function isActive(href: string): boolean {
    const path = page.url.pathname;
    return path === href || path.startsWith(href + '/');
  }
</script>

<header class="fixed top-0 w-full z-50 bg-surface-container-low flex justify-between items-center px-6 py-4 border-b border-outline-variant/15">
  <a href="/{lang}/" class="flex items-center gap-2 no-underline">
    <MaterialIcon name="terminal" class="text-primary" />
    <span class="text-base font-bold text-primary tracking-widest font-headline">ENGINEER_CORE_V4</span>
  </a>

  <nav class="hidden md:flex gap-6 items-center">
    {#each navItems as item}
      <a
        href={item.href}
        class="font-headline font-bold tracking-tight text-sm transition-colors
          {isActive(item.href)
            ? 'text-tertiary border-b-2 border-tertiary pb-0.5'
            : 'text-primary hover:text-tertiary'}"
      >
        {item.label}
      </a>
    {/each}
  </nav>

  <div class="flex items-center gap-4">
    <span class="hidden md:block text-[10px] font-bold text-primary tracking-widest opacity-60">
      STATUS: AVAILABLE
    </span>
    <ThemeToggle />
    <LangDropdown {lang} />
  </div>
</header>
