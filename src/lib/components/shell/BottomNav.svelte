<script lang="ts">
  import { page } from '$app/state';
  import {
    Home,
    Rocket,
    CircleUser,
    Users,
    Hamburger,
    Video,
    Gamepad2
  } from 'lucide-svelte';
  import Icon from './MaterialIcon.svelte';
  import type { LangAvailable } from '$lib/types';

  const { lang }: { lang: LangAvailable } = $props();

  let menuOpen = $state(false);

  const primaryItems: { label: string; icon: typeof Home; href: string }[] = $derived([
    { label: 'HOME', icon: Home, href: `/${lang}` },
    { label: 'DEPLOYS', icon: Rocket, href: `/${lang}/project` },
    { label: 'BIO', icon: CircleUser, href: `/${lang}/cv` },
    { label: 'COMMUNITY', icon: Users, href: `/${lang}/blog` }
  ]);

  const moreItems: { label: string; icon: typeof Home; href: string }[] = $derived([
    { label: 'VIDEO', icon: Video, href: `/${lang}/video-yt` },
    { label: 'PLAYGROUND', icon: Gamepad2, href: `/${lang}/playground` }
  ]);

  function isActive(href: string): boolean {
    const path = page.url.pathname;
    if (href === `/${lang}`) return path === href;
    return path === href || path.startsWith(href + '/');
  }

  const moreActive = $derived(moreItems.some((it) => isActive(it.href)));

  $effect(() => {
    // Close the expanded panel whenever the route changes.
    page.url.pathname;
    menuOpen = false;
  });
</script>

<nav
  class="md:hidden fixed bottom-0 left-0 w-full flex flex-col bg-background/80 backdrop-blur-md z-50 border-t border-outline-variant/15"
>
  {#if menuOpen}
    <div
      class="flex justify-around items-center px-4 pt-2 border-b border-outline-variant/15"
    >
      {#each moreItems as item}
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
    </div>
  {/if}

  <div class="flex justify-around items-center px-4 pb-2">
    {#each primaryItems as item}
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
    <button
      type="button"
      onclick={() => (menuOpen = !menuOpen)}
      aria-expanded={menuOpen}
      aria-label="More navigation"
      class="flex flex-col items-center justify-center px-4 py-2 transition-all duration-200 hover:bg-surface-container-low
        {moreActive || menuOpen ? 'text-tertiary border-t-2 border-tertiary' : 'text-secondary'}"
    >
      <Icon icon={Hamburger} size={22} />
      <span class="font-label text-[10px] font-medium tracking-widest uppercase mt-0.5">
        MORE
      </span>
    </button>
  </div>
</nav>
