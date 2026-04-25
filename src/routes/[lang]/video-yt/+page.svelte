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
</script>

<svelte:head>
  <title>{$t('video-yt.title')}</title>
  <meta name="description" content={$t('video-yt.intro')} />
</svelte:head>

<div class="px-4 md:px-12 lg:px-24 max-w-7xl mx-auto py-12">
  <div class="flex items-center justify-between mb-12">
    <div>
      <div class="inline-block px-2 py-1 mb-4 bg-surface-container-high border-l-2 border-tertiary">
        <span class="text-[10px] font-label font-bold tracking-[0.2em] text-tertiary uppercase">VIDEO_LOG</span>
      </div>
      <h2 class="font-headline text-4xl font-extrabold tracking-tighter text-primary">{$t('video-yt.title')}</h2>
      <p class="text-sm text-secondary max-w-2xl mt-4">{$t('video-yt.intro')}</p>
    </div>
    <span class="text-[10px] font-label text-tertiary tracking-[0.2em]">{String(videos.length).padStart(2, '0')}_VIDEOS</span>
  </div>

  <div class="space-y-4">
    {#each videos as video (video.id)}
      {@const BadgeIcon = badgeIcon(video.type)}
      <a
        href={video.url || '#'}
        target={video.url ? "_blank" : "_self"}
        rel={video.url ? "noopener noreferrer" : ""}
        class="block p-6 bg-surface-container-low hover:bg-surface-container group transition-all border-l-4 border-transparent hover:border-tertiary"
      >
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-3 mb-1">
              <span class="text-lg font-bold text-on-surface group-hover:text-tertiary transition-colors">{video.title}</span>
              <span class="text-[9px] font-label px-2 py-0.5 font-bold tracking-tighter {badgeClass(video.type)}">{video.type}</span>
            </div>
            <p class="text-xs text-secondary/60 mb-2">{video.description}</p>
          </div>
          <BadgeIcon size={20} class="text-outline-variant group-hover:text-tertiary transition-colors shrink-0" aria-hidden="true" />
        </div>
      </a>
    {/each}
  </div>
</div>
