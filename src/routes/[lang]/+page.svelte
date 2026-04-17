<script lang="ts">
  import { t } from '$lib/i18n';
  import { page } from '$app/state';
  import MaterialIcon from '$lib/components/shell/MaterialIcon.svelte';
  import type { Profile, ProjectStatus } from '$lib/content/profile.d.ts';

  let { data }: { data: { profile: Profile } } = $props();
  const profile = $derived(data.profile);
  const lang = $derived(page.params.lang ?? 'en');

  function badgeClass(status: ProjectStatus): string {
    switch (status) {
      case 'LIVE': return 'bg-tertiary text-on-tertiary';
      case 'BETA': return 'bg-surface-container-highest text-secondary';
      case 'PRIVATE': return 'border border-outline-variant text-outline-variant';
      default: return 'border border-outline-variant text-outline-variant';
    }
  }
</script>

<svelte:head>
  <title>{$t('home.title')}</title>
</svelte:head>

<div class="pt-12 pb-20 px-4 md:px-12 lg:px-24 max-w-7xl mx-auto">

  <!-- Hero Section -->
  <section class="mb-24">
    <div class="max-w-3xl">
      <div class="inline-block px-2 py-1 mb-6 bg-surface-container-high border-l-2 border-tertiary">
        <span class="text-[10px] font-label font-bold tracking-[0.2em] text-tertiary uppercase">ARCHITECT_LOG_01</span>
      </div>
      <h2 class="font-headline text-5xl md:text-7xl font-extrabold tracking-tighter text-primary leading-none mb-8">
        Engineering Solutions<br /><span class="text-surface-bright">at Scale.</span>
      </h2>
      <p class="text-secondary leading-relaxed text-lg max-w-lg mb-8 font-body">
        {profile.name}. {profile.bio}
      </p>
      <div class="flex flex-col gap-2 p-4 bg-surface-container-low border border-outline-variant/15 w-full max-w-lg">
        <div class="flex justify-between items-center text-xs font-label tracking-widest opacity-50">
          <span>UPTIME</span><span>3650_DAYS+</span>
        </div>
        <div class="h-1 w-full bg-surface-container-highest">
          <div class="h-full bg-tertiary w-full"></div>
        </div>
        <div class="flex justify-between items-center text-[10px] font-label text-tertiary">
          <span>SENIOR_LEVEL</span><span>SYSTEM_STABLE</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Core Architecture -->
  <section class="mb-24">
    <div class="flex items-center gap-4 mb-12">
      <h3 class="font-headline text-xl font-bold tracking-widest text-primary uppercase">Core Architecture</h3>
      <div class="h-px grow bg-outline-variant/20"></div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-1">
      {#each profile.coreAreas as area (area.icon)}
        <div class="p-8 bg-surface-container hover:bg-surface-container-high transition-colors group">
          <MaterialIcon name={area.icon} class="text-tertiary mb-6 block text-4xl" />
          <h4 class="text-lg font-bold text-on-surface mb-3 font-headline">{area.title}</h4>
          <p class="text-sm text-secondary/80 mb-6 font-body">{area.description}</p>
          <ul class="space-y-2 text-[11px] font-label tracking-wider text-on-surface-variant font-bold">
            {#each area.tags as tag}
              <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 bg-tertiary inline-block"></span> {tag}</li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  </section>

  <!-- Recent Experience -->
  <section class="mb-24">
    <div class="flex items-center gap-4 mb-12">
      <h3 class="font-headline text-xl font-bold tracking-widest text-primary uppercase">Recent Experience</h3>
      <div class="h-px grow bg-outline-variant/20"></div>
    </div>
    <div class="space-y-4">
      {#each profile.experiences as exp (exp.id)}
        <div class="block p-6 bg-surface-container-low hover:bg-surface-container group transition-all border-l-4 border-transparent hover:border-tertiary">
          <div class="flex items-center gap-3 mb-2">
            <span class="text-xl font-bold text-on-surface group-hover:text-tertiary transition-colors font-headline">{exp.company}</span>
            <span class="text-[9px] font-label px-2 py-0.5 font-bold tracking-widest uppercase {exp.label === 'CURRENT' ? 'bg-tertiary text-on-tertiary' : 'border border-tertiary text-tertiary'}">{exp.label}</span>
          </div>
          <p class="text-sm text-secondary/80 mt-2 max-w-3xl leading-relaxed">{exp.description}</p>
        </div>
      {/each}
    </div>
  </section>

  <!-- Projects -->
  <section class="mb-24">
    <div class="flex items-center justify-between mb-8">
      <h3 class="font-headline text-xl font-bold tracking-widest text-primary uppercase">Works</h3>
      <span class="text-[10px] font-label text-tertiary tracking-[0.2em]">{String(profile.projects.length).padStart(2, '0')}_ACTIVE_NODES</span>
    </div>
    <div class="space-y-4">
      {#each profile.projects as project (project.id)}
        <a
          href="/{lang}/project/{project.slug}"
          class="block p-6 bg-surface-container-low hover:bg-surface-container group transition-all border-l-4 border-transparent hover:border-tertiary"
        >
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div class="flex items-center gap-3 mb-1">
                <span class="text-lg font-bold text-on-surface group-hover:text-tertiary transition-colors">{project.title}</span>
                <span class="text-[9px] font-label px-2 py-0.5 font-bold tracking-tighter {badgeClass(project.status)}">{project.status}</span>
              </div>
              <p class="text-xs text-secondary/60">{project.description}</p>
            </div>
            <MaterialIcon name="arrow_forward" class="text-outline-variant group-hover:text-tertiary transition-colors shrink-0" />
          </div>
        </a>
      {/each}
    </div>
  </section>

  <!-- Current Stack -->
  <section class="mb-24">
    <div class="p-8 bg-surface-container-lowest border border-outline-variant/10">
      <div class="flex items-center gap-2 mb-6">
        <MaterialIcon name="terminal" class="text-tertiary" />
        <h3 class="font-headline text-sm font-bold tracking-[0.3em] text-primary uppercase">Current Stack Config</h3>
      </div>
      <div class="rounded-lg overflow-hidden border border-outline-variant/30 bg-[#0d1117]">
        <div class="bg-[#161b22] px-4 py-2 flex items-center justify-between border-b border-outline-variant/20">
          <div class="flex gap-1.5">
            <div class="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
            <div class="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
            <div class="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
          </div>
          <div class="text-[10px] font-mono text-secondary/40 tracking-widest uppercase">stack.sh</div>
          <div class="w-10"></div>
        </div>
        <div class="p-6 font-mono text-sm space-y-1.5 md:grid md:grid-cols-2 md:gap-x-8 md:space-y-0">
          {#each profile.stack as tech (tech)}
            <div class="flex items-center gap-2">
              <span class="text-tertiary">root@mscarpa:~#</span>
              <span class="text-on-surface">{tech}</span>
            </div>
          {/each}
          <div class="flex items-center gap-2">
            <span class="text-tertiary animate-pulse">_</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Community -->
  <section class="mb-24">
    <div class="flex items-center gap-4 mb-12">
      <h3 class="font-headline text-xl font-bold tracking-widest text-primary uppercase">Community Builders</h3>
      <div class="h-px grow bg-outline-variant/20"></div>
    </div>
    <div class="space-y-1">
      {#each profile.community as entry (entry.label)}
        <div class="grid grid-cols-1 md:grid-cols-[140px_1fr] group">
          <div class="text-[10px] font-label py-6 opacity-40 group-hover:opacity-100 transition-opacity uppercase tracking-widest font-bold">{entry.label}</div>
          <div class="py-6 px-0 md:px-8 bg-surface-container-low border-l-2 border-transparent group-hover:border-tertiary group-hover:bg-surface-container transition-all">
            <h4 class="font-bold text-tertiary mb-1 font-headline">{entry.title}</h4>
            <p class="text-sm text-secondary font-body">{entry.description}</p>
          </div>
        </div>
      {/each}
    </div>
  </section>

</div>
