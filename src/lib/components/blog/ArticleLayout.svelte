<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { ArticleFormat } from '$lib/content/content';

  interface Props {
    metadata: ArticleFormat['metadata'];
    readingTime: number;
    lang: string;
    prev: ArticleFormat | null;
    next: ArticleFormat | null;
    children: Snippet;
  }

  let { metadata, readingTime, lang, prev, next, children }: Props = $props();

  const localeMap: Record<string, string> = { en: 'en-GB', it: 'it-IT' };

  function formatDate(dateStr: string): string {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString(localeMap[lang] ?? 'en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
</script>

<svelte:head>
  <title>{metadata.title}</title>
</svelte:head>

<article>
  <!-- Back nav -->
  <div class="px-4 md:px-12 py-4 border-b border-outline-variant/15">
    <a
      href="/{lang}/blog"
      class="text-[10px] font-label tracking-[0.2em] text-tertiary hover:text-on-surface transition-colors uppercase"
    >
      ← COMMUNITY_LOG
    </a>
  </div>

  <!-- Cover image (conditional) -->
  {#if metadata.cover}
    <div class="w-full h-[280px] md:h-[380px] overflow-hidden">
      <img
        src={metadata.cover}
        alt={metadata.title}
        class="w-full h-full object-cover"
        loading="eager"
      />
    </div>
  {/if}

  <!-- Article header -->
  <div class="px-4 md:px-12 lg:px-24 max-w-[720px] mx-auto pt-10 pb-8">
    <!-- Meta bar: date · N MIN READ · tags -->
    <div class="flex flex-wrap items-center gap-3 mb-6 text-[10px] font-label tracking-widest text-secondary uppercase">
      <span>{formatDate(metadata.date)}</span>
      <span class="text-outline-variant/30">·</span>
      <span>{readingTime} MIN READ</span>
      {#if metadata.tags?.length}
        <span class="text-outline-variant/30">·</span>
        <div class="flex gap-2 flex-wrap">
          {#each metadata.tags as tag (tag)}
            <span class="text-[9px] px-2 py-0.5 bg-surface-container text-on-surface-variant font-label">{tag}</span>
          {/each}
        </div>
      {/if}
    </div>

    <!-- Title -->
    <h1 class="font-headline text-3xl md:text-4xl font-extrabold tracking-tighter text-primary leading-tight mb-4">
      {metadata.title}
    </h1>

    <!-- Description -->
    <p class="text-base text-secondary leading-relaxed">
      {metadata.description}
    </p>

    <div class="mt-8 border-t border-outline-variant/15"></div>
  </div>

  <!-- Article body (prose) -->
  <div class="px-4 md:px-12 lg:px-24 max-w-[720px] mx-auto pb-16">
    <div class="prose prose-invert max-w-none
      prose-headings:font-headline prose-headings:tracking-tight prose-headings:text-primary
      prose-p:text-secondary prose-p:leading-relaxed
      prose-strong:text-on-surface
      prose-code:text-tertiary prose-code:bg-surface-container-low prose-code:px-1 prose-code:rounded-none prose-code:before:content-none prose-code:after:content-none
      prose-pre:bg-surface-container-lowest prose-pre:border prose-pre:border-outline-variant/15 prose-pre:rounded-none
      prose-a:text-tertiary prose-a:no-underline hover:prose-a:underline
      prose-blockquote:border-l-4 prose-blockquote:border-tertiary prose-blockquote:not-italic prose-blockquote:text-secondary prose-blockquote:bg-surface-container-low prose-blockquote:px-4 prose-blockquote:py-1
      prose-hr:border-outline-variant/20
      prose-img:my-8 prose-img:w-full">
      {@render children()}
    </div>
  </div>

  <!-- Prev / Next footer -->
  {#if prev || next}
    <div class="border-t border-outline-variant/15">
      <div class="px-4 md:px-12 lg:px-24 max-w-[720px] mx-auto py-8 flex justify-between gap-8">
        {#if prev}
          <a href="/{lang}/blog/{prev.slug}" class="group flex-1 text-left">
            <div class="text-[10px] font-label tracking-widest text-secondary mb-1 uppercase">← Prev</div>
            <div class="text-sm font-headline font-bold text-on-surface group-hover:text-tertiary transition-colors line-clamp-2">
              {prev.metadata.title}
            </div>
          </a>
        {:else}
          <div class="flex-1"></div>
        {/if}
        {#if next}
          <a href="/{lang}/blog/{next.slug}" class="group flex-1 text-right">
            <div class="text-[10px] font-label tracking-widest text-secondary mb-1 uppercase">Next →</div>
            <div class="text-sm font-headline font-bold text-on-surface group-hover:text-tertiary transition-colors line-clamp-2">
              {next.metadata.title}
            </div>
          </a>
        {:else}
          <div class="flex-1"></div>
        {/if}
      </div>
    </div>
  {/if}
</article>
