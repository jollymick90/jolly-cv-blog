<script lang="ts">
  import { page } from '$app/state';
  import { t } from '$lib/i18n';
  import { ArrowLeft, ExternalLink, MonitorPlay, PlayCircle, Film } from 'lucide-svelte';
  import type { ProfileVideo } from '$lib/content/profile';

  interface PageData {
    metadata: { title: string; date: string; description?: string } | null;
    content: any;
    video: ProfileVideo | null;
  }

  let { data }: { data: PageData } = $props();
  const lang = $derived(page.params.lang ?? 'en');

  const { metadata, content: ArticleContent, video } = data;

  function getYoutubeEmbedUrl(url: string): string | null {
    if (!url) return null;
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  }

  const embedUrl = $derived(video?.url ? getYoutubeEmbedUrl(video.url) : null);

  function badgeIcon(type: string) {
    switch (type) {
      case 'CONFERENCE': return MonitorPlay;
      case 'LIVE': return Film;
      default: return PlayCircle;
    }
  }

  function typeBadgeClass(type: string) {
    switch (type) {
      case 'CONFERENCE': return 'bg-tertiary text-on-tertiary';
      case 'LIVE': return 'border border-outline-variant text-outline-variant';
      default: return 'bg-surface-container-highest text-secondary';
    }
  }
</script>

<svelte:head>
  <title>{metadata?.title ?? video?.title ?? 'Video'} — Michele Scarpa</title>
  <meta name="description" content={metadata?.description ?? video?.description ?? ''} />
</svelte:head>

<div class="px-4 md:px-12 lg:px-24 max-w-5xl mx-auto py-12">

  <!-- Back -->
  <a
    href="/{lang}/video-yt"
    class="inline-flex items-center gap-2 text-[10px] font-label font-bold tracking-widest uppercase text-secondary hover:text-tertiary transition-colors mb-10"
  >
    <ArrowLeft size={14} />
    VIDEO_LOG
  </a>

  <!-- Header -->
  <div class="mb-8">
    {#if video}
      <div class="flex items-center gap-2 mb-4">
        <span class="text-[9px] font-label px-2 py-0.5 font-bold tracking-tighter {typeBadgeClass(video.type)}">
          {video.type}
        </span>
        {#if video.isFeatured}
          <span class="text-[8px] font-label px-1.5 py-0.5 bg-tertiary/20 text-tertiary uppercase tracking-tighter">
            Featured
          </span>
        {/if}
        {#if video.lang === 'en'}
          <span class="text-[9px] font-label px-2 py-0.5 border border-tertiary/40 text-tertiary tracking-tighter">🇬🇧 EN</span>
        {:else}
          <span class="text-[9px] font-label px-2 py-0.5 border border-outline-variant/40 text-secondary tracking-tighter">🇮🇹 IT</span>
        {/if}
      </div>
    {/if}
    <h1 class="font-headline text-3xl md:text-4xl font-extrabold tracking-tighter text-primary mb-4">
      {metadata?.title ?? video?.title ?? ''}
    </h1>
    {#if metadata?.description}
      <p class="text-secondary text-base leading-relaxed max-w-3xl">{metadata.description}</p>
    {/if}
  </div>

  <!-- YouTube Embed -->
  {#if embedUrl}
    <div class="mb-12">
      <div class="aspect-video w-full bg-surface-container-low overflow-hidden">
        <iframe
          src={embedUrl}
          title={metadata?.title ?? video?.title ?? 'Video'}
          class="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
      {#if video?.url}
        <div class="mt-3 flex justify-end">
          <a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 text-[10px] font-label font-bold tracking-widest text-tertiary hover:underline uppercase"
          >
            OPEN_ON_YOUTUBE
            <ExternalLink size={12} />
          </a>
        </div>
      {/if}
    </div>
  {:else if video?.url === ''}
    <!-- Video coming soon -->
    <div class="mb-12 aspect-video w-full bg-surface-container-low flex flex-col items-center justify-center gap-4 border border-dashed border-outline-variant/30">
      <PlayCircle size={48} class="text-outline-variant/40" />
      <span class="text-[11px] font-label text-secondary tracking-widest uppercase">Video not available yet</span>
    </div>
  {/if}

  <!-- Article Content -->
  {#if ArticleContent}
    <div class="border-t border-outline-variant/20 pt-12">
      <div class="inline-block px-2 py-1 mb-8 bg-surface-container-high border-l-2 border-tertiary">
        <span class="text-[10px] font-label font-bold tracking-[0.2em] text-tertiary uppercase">ARTICLE</span>
      </div>
      <div class="prose prose-invert max-w-none
        prose-headings:font-headline prose-headings:text-primary prose-headings:tracking-tight
        prose-h1:text-2xl prose-h2:text-xl prose-h2:mt-10
        prose-p:text-secondary prose-p:leading-relaxed
        prose-a:text-tertiary prose-a:no-underline hover:prose-a:underline
        prose-strong:text-on-surface
        prose-code:text-tertiary prose-code:bg-surface-container-high prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-code:font-mono
        prose-pre:bg-[#0d1117] prose-pre:border prose-pre:border-outline-variant/20
        prose-blockquote:border-tertiary prose-blockquote:text-secondary
        prose-table:text-sm prose-th:text-primary prose-td:text-secondary
        prose-li:text-secondary prose-li:marker:text-tertiary">
        <ArticleContent />
      </div>
    </div>
  {/if}

</div>
