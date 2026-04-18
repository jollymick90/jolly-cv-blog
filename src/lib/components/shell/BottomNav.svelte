<script lang="ts">
  import { page } from '$app/state';
  import { Home, Rocket, CircleUser, Users } from 'lucide-svelte';
  import Icon from './MaterialIcon.svelte';
  import type { LangAvailable } from '$lib/types';

  const { lang }: { lang: LangAvailable } = $props();

  const navItems: { label: string; icon: typeof Home; href: string }[] = $derived([
    { label: 'HOME', icon: Home, href: `/${lang}` },
    { label: 'DEPLOYS', icon: Rocket, href: `/${lang}/project` },
    { label: 'BIO', icon: CircleUser, href: `/${lang}/cv` },
    { label: 'COMMUNITY', icon: Users, href: `/${lang}/blog` }
  ]);

  function isActive(href: string): boolean {
    const path = page.url.pathname;
    if (href === `/${lang}`) return path === href;
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
      <Icon icon={item.icon} size={22} />
      <span class="font-label text-[10px] font-medium tracking-widest uppercase mt-0.5">
        {item.label}
      </span>
    </a>
  {/each}
</nav>
