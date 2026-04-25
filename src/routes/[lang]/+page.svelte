<script lang="ts">
  import { t } from '$lib/i18n';
  import { Terminal, Monitor, Compass, Bot, MonitorPlay } from 'lucide-svelte';
  import Photos from '$lib/components/pages/home/Photos.svelte';
  import avatar from '$lib/img/photos/profilo-1-DSCF2646.webp';
  import { downloadCV } from '$lib/utils/download-pdf';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
  const profile = $derived(data.profile);
  const lang = $derived(data.lang ?? 'en');

  const AREA_ICONS: Record<string, typeof Monitor> = {
    devices: Monitor,
    explore: Compass,
    smart_toy: Bot
  };
</script>

<svelte:head>
  <title>{$t('home.title')}</title>
  <meta name="description" content={$t('home.description')} />
</svelte:head>

<div class="pt-12 pb-20 px-4 md:px-12 lg:px-24 max-w-7xl mx-auto">

  <!-- Hero Section -->
  <section class="mb-24 min-h-[calc(100vh-80px)] flex items-center">
    <div class="w-full grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 lg:gap-16 items-center">

      <!-- Left: Content -->
      <div>
        <div class="flex items-center gap-2 mb-8">
          <span class="w-2 h-2 rounded-full bg-tertiary animate-pulse shrink-0"></span>
          <span class="text-[10px] font-label font-bold tracking-[0.2em] text-tertiary uppercase">Available for Architecture Review</span>
        </div>

        <h1 class="font-headline text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-none mb-6 text-primary">
          Senior Software<br />
          <em class="not-italic text-tertiary italic">Engineer</em>&<br />
          Solution Builder
        </h1>

        <p class="text-secondary leading-relaxed text-lg max-w-xl mb-10 font-body">
          {profile.bio}
        </p>

        <div class="flex flex-wrap gap-3 mb-12">
          <a
            href="/{lang}/project"
            class="flex items-center gap-2 px-5 py-2.5 bg-tertiary text-on-tertiary font-label font-bold text-xs tracking-widest uppercase hover:opacity-90 transition-opacity"
          >
            EXPLORE WORK →
          </a>
          <button
            type="button"
            onclick={() => downloadCV()}
            class="flex items-center gap-2 px-5 py-2.5 border border-outline-variant/40 text-secondary font-label font-bold text-xs tracking-widest uppercase hover:border-tertiary hover:text-tertiary transition-colors"
          >
            DOWNLOAD CV
          </button>
        </div>

        <div class="grid grid-cols-3 gap-6 max-w-sm">
          <div>
            <div class="font-headline text-3xl font-extrabold text-primary">10+</div>
            <div class="text-[10px] font-label text-secondary tracking-widest uppercase mt-1">Years Exp</div>
          </div>
          <div>
            <div class="font-headline text-3xl font-extrabold text-primary">500+</div>
            <div class="text-[10px] font-label text-secondary tracking-widest uppercase mt-1">Installations</div>
          </div>
          <div>
            <div class="font-headline text-3xl font-extrabold text-primary">5M+</div>
            <div class="text-[10px] font-label text-secondary tracking-widest uppercase mt-1">GIS Records</div>
          </div>
        </div>
      </div>

      <!-- Right: Photo -->
      <div class="relative w-full h-[420px] lg:h-[600px] overflow-hidden">
        <img
          src={avatar}
          alt="Michele Scarpa"
          class="w-full h-full object-cover object-top grayscale"
          fetchpriority="high"
          loading="eager"
        />
        <div class="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-surface to-transparent"></div>
      </div>

    </div>
  </section>

  <!-- Core Architecture -->
  <section class="mb-24">
    <div class="flex items-center gap-4 mb-12">
      <h3 class="font-headline text-xl font-bold tracking-widest text-primary uppercase">Core Architecture</h3>
      <div class="h-px grow bg-outline-variant/20"></div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-1">
      {#each profile.coreAreas as area (area.icon)}
        {@const AreaIcon = AREA_ICONS[area.icon]}
        <div class="p-8 bg-surface-container hover:bg-surface-container-high transition-colors group">
          <AreaIcon size={36} class="text-tertiary mb-6 block" aria-hidden="true" />
          <h4 class="text-lg font-bold text-on-surface mb-3 font-headline">{area.title}</h4>
          <p class="text-sm text-secondary/80 mb-6 font-body">{area.description}</p>
          <ul class="space-y-2 text-[11px] font-label tracking-wider text-on-surface-variant font-bold">
            {#each area.tags as tag}
              <li class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 bg-tertiary inline-block shrink-0"></span> {tag}
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  </section>

  <Photos />

  <!-- Featured Talks -->
  <section class="mb-24 mt-24">
    <div class="flex items-center justify-between mb-8">
      <h3 class="font-headline text-xl font-bold tracking-widest text-primary uppercase">Featured Talks & Videos</h3>
      <a href="/{lang}/video-yt" class="text-[10px] font-label text-tertiary hover:underline tracking-[0.2em]">VIEW_ALL_VIDEOS →</a>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      {#each profile.videos.filter(v => v.isFeatured) as video}
        <a
          href="/{lang}/video-yt/{video.id}"
          class="block p-8 bg-surface-container hover:bg-surface-container-high transition-all border-t-4 {video.id === 'devfest-torino' ? 'border-tertiary' : 'border-outline-variant/30 hover:border-tertiary'} group"
        >
          <div class="flex items-start gap-4 mb-4">
            <div class="p-3 bg-surface-container-highest rounded-lg group-hover:bg-tertiary/10 transition-colors">
              <MonitorPlay size={24} class="text-tertiary" aria-hidden="true" />
            </div>
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="text-[10px] font-label font-bold tracking-widest text-secondary uppercase">{video.type}</span>
                {#if video.id === 'devfest-torino'}
                  <span class="text-[8px] font-label px-1.5 py-0.5 bg-tertiary/20 text-tertiary uppercase tracking-tighter">Highlight</span>
                {/if}
              </div>
              <h4 class="text-lg font-bold text-on-surface group-hover:text-tertiary transition-colors font-headline leading-tight">
                {video.title}
              </h4>
            </div>
          </div>
          <p class="text-sm text-secondary/80 font-body">
            {video.description}
          </p>
        </a>
      {/each}
    </div>
  </section>

  <!-- Key Projects & Impact -->
  <section class="mb-24">
    <div class="flex items-center justify-between mb-8">
      <h3 class="font-headline text-xl font-bold tracking-widest text-primary uppercase">Key Projects & Impact</h3>
      <span class="text-[10px] font-label text-tertiary tracking-[0.2em]">{String(profile.projects.length).padStart(2, '0')}_ACTIVE_NODES</span>
    </div>
    <div class="space-y-1">
      {#each profile.projects as project (project.id)}
        <div class="p-6 bg-surface-container-low hover:bg-surface-container group transition-all border-l-4 border-transparent hover:border-tertiary">
          <div class="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div class="flex-1">
              <h4 class="text-lg font-bold text-on-surface group-hover:text-tertiary transition-colors font-headline mb-1">
                {project.title}
              </h4>
              <p class="text-sm text-secondary/70 mb-4 font-body">{project.description}</p>
              <!-- Metrics -->
              <ul class="flex flex-wrap gap-2">
                {#each project.metrics as metric}
                  <li class="text-[10px] font-label font-bold tracking-wider px-2 py-1 bg-surface-container-high text-tertiary uppercase">
                    {metric}
                  </li>
                {/each}
              </ul>
            </div>
            <!-- Tech stack -->
            <div class="flex flex-wrap gap-1 md:max-w-[180px] md:justify-end">
              {#each project.tech as techItem}
                <span class="text-[9px] font-mono px-2 py-0.5 border border-outline-variant/30 text-outline-variant">{techItem}</span>
              {/each}
            </div>
          </div>
        </div>
      {/each}
    </div>
  </section>

  <!-- Recent Experience -->
  <section class="mb-24">
    <div class="flex items-center gap-4 mb-12">
      <h3 class="font-headline text-xl font-bold tracking-widest text-primary uppercase">Experience</h3>
      <div class="h-px grow bg-outline-variant/20"></div>
    </div>
    <div class="space-y-1">
      {#each profile.experiences as exp (exp.id)}
        <div class="grid grid-cols-1 md:grid-cols-[120px_1fr] group">
          <div class="text-[10px] font-label py-6 opacity-40 group-hover:opacity-100 transition-opacity uppercase tracking-widest font-bold">
            {exp.period}
          </div>
          <div class="py-6 px-0 md:px-8 bg-surface-container-low border-l-2 border-transparent group-hover:border-tertiary group-hover:bg-surface-container transition-all">
            <div class="flex items-center gap-3 mb-2">
              <span class="font-bold text-on-surface group-hover:text-tertiary transition-colors font-headline">{exp.company}</span>
              <span class="text-[9px] font-label px-2 py-0.5 font-bold tracking-widest uppercase {exp.label === 'CURRENT' ? 'bg-tertiary text-on-tertiary' : 'border border-tertiary text-tertiary'}">{exp.label}</span>
            </div>
            <p class="text-sm text-secondary/80 max-w-3xl leading-relaxed font-body">{exp.description}</p>
          </div>
        </div>
      {/each}
    </div>
  </section>

  <!-- Current Stack -->
  <section class="mb-24">
    <div class="p-8 bg-surface-container-lowest border border-outline-variant/10">
      <div class="flex items-center gap-2 mb-6">
        <Terminal size={20} class="text-tertiary" aria-hidden="true" />
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
      <h3 class="font-headline text-xl font-bold tracking-widest text-primary uppercase">Community</h3>
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
