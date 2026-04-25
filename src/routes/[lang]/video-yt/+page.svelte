<script lang="ts">
  import { page } from '$app/state';
  import { t } from '$lib/i18n';
  import { PlayCircle, MonitorPlay, Film } from 'lucide-svelte';
  import type { ProfileVideo } from '$lib/content/profile';

  let { data }: { data: { videos: ProfileVideo[] } } = $props();
  const { videos } = data;
  const lang = $derived(page.params.lang ?? 'en');

  function badgeClass(type: string): string {
    switch (type) {
      case 'CONFERENCE': return 'bg-tertiary text-on-tertiary';
      case 'TUTORIAL': return 'bg-surface-container-highest text-secondary';
      case 'LIVE': return 'border border-outline-variant text-outline-variant';
      default: return 'bg-surface-container-highest text-secondary';
    }
  }

  function badgeIcon(type: string) {
    switch (type) {
      case 'CONFERENCE': return MonitorPlay;
      case 'TUTORIAL': return PlayCircle;
      case 'LIVE': return Film;
      default: return PlayCircle;
    }
  }

  function getYouTubeId(url: string): string | null {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }
</script>

<svelte:head>
  <title>{$t('video-yt.title')}</title>
  <meta name="description" content={$t('video-yt.intro')} />
</svelte:head>

<div class="px-4 md:px-12 lg:px-24 max-w-7xl mx-auto py-12">
  <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
    <div>
      <div class="inline-block px-2 py-1 mb-4 bg-surface-container-high border-l-2 border-tertiary">
        <span class="text-[10px] font-label font-bold tracking-[0.2em] text-tertiary uppercase">VIDEO_LOG</span>
      </div>
      <h2 class="font-headline text-4xl font-extrabold tracking-tighter text-primary">{$t('video-yt.title')}</h2>
      <p class="text-sm text-secondary max-w-2xl mt-4">{$t('video-yt.intro')}</p>
    </div>
    <div class="flex items-center gap-4">
      <span class="text-[10px] font-label text-tertiary tracking-[0.2em] font-bold">{String(videos.length).padStart(2, '0')}_VIDEOS</span>
    </div>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each videos as video (video.id)}
      {@const BadgeIcon = badgeIcon(video.type)}
      {@const ytId = getYouTubeId(video.url || '')}
      <a
        href="/{lang}/video-yt/{video.id}"
        class="group flex flex-col h-full bg-surface-container-low hover:bg-surface-container transition-all duration-300 border border-outline-variant/10 hover:border-tertiary/30 rounded-xl overflow-hidden"
      >
        <!-- Thumbnail Section -->
        <div class="relative aspect-video overflow-hidden bg-surface-dim">
          {#if ytId}
            <img 
              src="https://img.youtube.com/vi/{ytId}/mqdefault.jpg" 
              alt={video.title}
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          {:else}
            <div class="w-full h-full flex items-center justify-center text-outline-variant">
              <MonitorPlay size={48} strokeWidth={1} />
            </div>
          {/if}
          
          <!-- Play Overlay -->
          <div class="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
             <div class="bg-white/90 p-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
               <PlayCircle class="text-primary" size={32} />
             </div>
          </div>

          <!-- Type Badge Overlay -->
          <div class="absolute top-3 left-3 flex gap-2">
            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 text-[9px] font-label font-bold tracking-tighter rounded-md backdrop-blur-md {badgeClass(video.type)}">
              <BadgeIcon size={12} />
              {video.type}
            </span>
            {#if video.isFeatured}
              <span class="text-[8px] font-label px-1.5 py-1 bg-tertiary/20 text-tertiary uppercase tracking-tighter backdrop-blur-md rounded-md">Featured</span>
            {/if}
          </div>
        </div>

        <!-- Content Section -->
        <div class="p-5 flex flex-col flex-grow">
          <h3 class="font-headline text-lg font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-2 mb-3 leading-tight">
            {video.title}
          </h3>
          <p class="text-xs text-secondary/70 line-clamp-3 leading-relaxed mb-4 flex-grow">
            {video.description}
          </p>
          
          <div class="flex items-center justify-between mt-auto pt-4 border-t border-outline-variant/10">
            <span class="text-[9px] font-label text-outline-variant font-bold tracking-widest uppercase">Watch on YouTube</span>
            <div class="w-8 h-8 rounded-full bg-surface-container-high group-hover:bg-tertiary group-hover:text-on-tertiary flex items-center justify-center transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </div>
          </div>
        </div>
      </a>
    {/each}
  </div>
</div>
