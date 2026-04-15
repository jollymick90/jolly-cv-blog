<script lang="ts">
  import { page } from '$app/state';
  import MaterialIcon from './MaterialIcon.svelte';
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

<nav class="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-2 bg-background/80 backdrop-blur-md z-50 border-t border-outline-variant/15">
  {#each navItems as item}
    <a
      href={item.href}
      class="flex flex-col items-center justify-center px-4 py-2 transition-all duration-200 hover:bg-surface-container-low
        {isActive(item.href) ? 'text-tertiary border-t-2 border-tertiary' : 'text-secondary'}"
    >
      <MaterialIcon name={item.icon} class="text-[22px]" />
      <span class="font-label text-[10px] font-medium tracking-widest uppercase mt-0.5">
        {item.label}
      </span>
    </a>
  {/each}
</nav>
