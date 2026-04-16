# Blog Rich Content Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the old zinc-style blog article layout with a Digital Blueprint design and add five rich content components (Callout, ImageCaption, VideoEmbed, Gallery, ArticleLayout) usable inside markdown posts.

**Architecture:** Extended frontmatter (`cover`, `tags`) + `readingTime` computed from raw markdown word count. Four self-contained Svelte components (`Callout`, `ImageCaption`, `VideoEmbed`, `Gallery`) live in `src/lib/components/blog/` and are imported explicitly in each post's `<script>` block. A new `ArticleLayout.svelte` wraps the rendered markdown with the Digital Blueprint design (cover, meta bar, prose column, prev/next nav). No mdsvex config changes.

**Tech Stack:** SvelteKit 2, Svelte 5 runes (`$props`, `$state`, `$derived`), Tailwind CSS with Tailwind Typography (`prose`), mdsvex, TypeScript. No automated test suite — verification is `npm run check` (0 errors) + `npm run dev` visual check.

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `src/lib/utils/reading-time.ts` | Create | Pure fn: strip frontmatter, count words, return minutes |
| `src/lib/content/content.d.ts` | Modify | Add `cover?`, `tags?` to `ArticleFormat.metadata` |
| `src/lib/components/blog/Callout.svelte` | Create | Note/tip/warn callout box with colored left border |
| `src/lib/components/blog/ImageCaption.svelte` | Create | Image with optional FIG.NN caption |
| `src/lib/components/blog/VideoEmbed.svelte` | Create | Lazy YouTube/Vimeo iframe, 16:9 aspect ratio |
| `src/lib/components/blog/Gallery.svelte` | Create | CSS grid of images with keyboard-navigable lightbox |
| `src/lib/components/blog/ArticleLayout.svelte` | Create | Full article page: back nav, cover, header, prose, prev/next |
| `src/routes/[lang]/blog/[slug]/+page.ts` | Modify | Load readingTime + prev/next alongside existing post load |
| `src/routes/[lang]/blog/[slug]/+page.svelte` | Modify | Wire new ArticleLayout, drop old import |
| `src/lib/components/pages/blog/ArticleLayout.svelte` | Delete | Replaced by new component above |

---

## Task 1: reading-time utility

**Files:**
- Create: `src/lib/utils/reading-time.ts`

- [ ] **Step 1: Create the file**

```typescript
// src/lib/utils/reading-time.ts

/**
 * Estimates reading time from raw markdown text.
 * Strips YAML frontmatter and HTML/Svelte tags before counting words.
 * Returns minutes (minimum 1).
 */
export function readingTime(rawMarkdown: string): number {
  // Remove YAML frontmatter (--- ... ---)
  const body = rawMarkdown.replace(/^---[\s\S]*?---\s*/, '');
  // Remove HTML/Svelte tags so <Callout> etc. don't inflate word count
  const text = body.replace(/<[^>]+>/g, ' ');
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
```

- [ ] **Step 2: Type-check**

```bash
npm run check
```

Expected: 0 errors (new file, no consumers yet — warnings from pre-existing files are fine).

- [ ] **Step 3: Commit**

```bash
git add src/lib/utils/reading-time.ts
git commit -m "feat(blog): add readingTime utility — word count / 200 wpm"
```

---

## Task 2: extend ArticleFormat types

**Files:**
- Modify: `src/lib/content/content.d.ts` (lines 1-9, the `ArticleFormat` type)

Current `content.d.ts`:
```ts
export type ArticleFormat = {
  slug: string;
  metadata: {
    title: string;
    date: string;
    description: string;
  }
}
```

- [ ] **Step 1: Add `cover` and `tags` to ArticleFormat metadata**

Replace the `ArticleFormat` type (lines 1–9) with:

```ts
export type ArticleFormat = {
  slug: string;
  metadata: {
    title: string;
    date: string;
    description: string;
    cover?: string;
    tags?: string[];
  };
};
```

Leave `ProjectFormat` and `EventFormat` unchanged.

- [ ] **Step 2: Type-check**

```bash
npm run check
```

Expected: 0 errors. The new optional fields are backwards-compatible.

- [ ] **Step 3: Commit**

```bash
git add src/lib/content/content.d.ts
git commit -m "feat(blog): extend ArticleFormat — add optional cover and tags fields"
```

---

## Task 3: Callout component

**Files:**
- Create: `src/lib/components/blog/Callout.svelte`

Usage in markdown:
```svelte
<Callout type="note">Important technical note here.</Callout>
<Callout type="tip">Use _.throttle from Lodash.</Callout>
<Callout type="warn">Avoid using in hot paths.</Callout>
```

- [ ] **Step 1: Create Callout.svelte**

```svelte
<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    type?: 'note' | 'tip' | 'warn';
    children: Snippet;
  }

  let { type = 'note', children }: Props = $props();

  const config = {
    note: { border: 'border-tertiary', label: 'text-tertiary', text: 'NOTE' },
    tip:  { border: 'border-secondary', label: 'text-secondary', text: 'TIP' },
    warn: { border: 'border-error',     label: 'text-error',     text: 'WARN' },
  } as const;

  const c = $derived(config[type]);
</script>

<div class="my-6 bg-surface-container-low border-l-4 {c.border} px-4 py-3">
  <div class="text-[8px] font-label tracking-[0.2em] font-bold {c.label} mb-2">{c.text}</div>
  <div class="text-sm text-on-surface leading-relaxed">
    {@render children()}
  </div>
</div>
```

- [ ] **Step 2: Type-check**

```bash
npm run check
```

Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/components/blog/Callout.svelte
git commit -m "feat(blog): add Callout component — note/tip/warn variants"
```

---

## Task 4: ImageCaption component

**Files:**
- Create: `src/lib/components/blog/ImageCaption.svelte`

Usage in markdown:
```svelte
<ImageCaption src="/blog/images/post/diagram.png" caption="FIG.01 — Description" />
<ImageCaption src="/blog/images/post/photo.jpg" />
```

Images must exist in `static/blog/images/{post-slug}/`. The path `/blog/images/...` is served directly from `static/`.

- [ ] **Step 1: Create ImageCaption.svelte**

```svelte
<script lang="ts">
  interface Props {
    src: string;
    alt?: string;
    caption?: string;
  }

  let { src, alt = '', caption }: Props = $props();
</script>

<figure class="my-8">
  <img {src} {alt} class="w-full object-cover" loading="lazy" />
  {#if caption}
    <figcaption class="mt-3 text-[10px] font-label text-secondary text-center tracking-widest uppercase">
      {caption}
    </figcaption>
  {/if}
</figure>
```

- [ ] **Step 2: Type-check**

```bash
npm run check
```

Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/components/blog/ImageCaption.svelte
git commit -m "feat(blog): add ImageCaption component — image with optional FIG.NN caption"
```

---

## Task 5: VideoEmbed component

**Files:**
- Create: `src/lib/components/blog/VideoEmbed.svelte`

Usage in markdown:
```svelte
<VideoEmbed url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />
<VideoEmbed url="https://youtu.be/dQw4w9WgXcQ" />
<VideoEmbed url="https://vimeo.com/123456789" />
```

- [ ] **Step 1: Create VideoEmbed.svelte**

```svelte
<script lang="ts">
  interface Props {
    url: string;
  }

  let { url }: Props = $props();

  function getEmbedUrl(raw: string): string | null {
    // YouTube: watch?v=ID, youtu.be/ID, or /embed/ID
    const yt = raw.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/
    );
    if (yt) return `https://www.youtube.com/embed/${yt[1]}`;

    // Vimeo: vimeo.com/ID or player.vimeo.com/video/ID
    const vm = raw.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (vm) return `https://player.vimeo.com/video/${vm[1]}`;

    return null;
  }

  const embedUrl = $derived(getEmbedUrl(url));
</script>

{#if embedUrl}
  <div class="my-8 aspect-video border border-outline-variant/15 overflow-hidden">
    <iframe
      src={embedUrl}
      class="w-full h-full"
      loading="lazy"
      allowfullscreen
      title="Embedded video"
    ></iframe>
  </div>
{:else}
  <div class="my-8 border-l-4 border-error bg-surface-container-low px-4 py-3 text-sm font-label text-error">
    INVALID_VIDEO_URL: {url}
  </div>
{/if}
```

- [ ] **Step 2: Type-check**

```bash
npm run check
```

Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/components/blog/VideoEmbed.svelte
git commit -m "feat(blog): add VideoEmbed component — lazy YouTube/Vimeo iframe"
```

---

## Task 6: Gallery component with lightbox

**Files:**
- Create: `src/lib/components/blog/Gallery.svelte`

Usage in markdown:
```svelte
<Gallery images={[
  { src: "/blog/images/post/01.jpg", alt: "Screenshot 1" },
  { src: "/blog/images/post/02.jpg", alt: "Screenshot 2" },
  { src: "/blog/images/post/03.jpg", alt: "Screenshot 3" }
]} />
```

- [ ] **Step 1: Create Gallery.svelte**

```svelte
<script lang="ts">
  interface GalleryImage {
    src: string;
    alt?: string;
  }

  interface Props {
    images: GalleryImage[];
  }

  let { images }: Props = $props();

  let lightboxIndex = $state<number | null>(null);

  function open(i: number) { lightboxIndex = i; }
  function close() { lightboxIndex = null; }

  function onKeydown(e: KeyboardEvent) {
    if (lightboxIndex === null) return;
    if (e.key === 'Escape') { close(); return; }
    if (e.key === 'ArrowRight') lightboxIndex = (lightboxIndex + 1) % images.length;
    if (e.key === 'ArrowLeft')  lightboxIndex = (lightboxIndex - 1 + images.length) % images.length;
  }
</script>

<svelte:window onkeydown={onKeydown} />

<!-- Grid -->
<div class="my-8 grid grid-cols-2 md:grid-cols-3 gap-1">
  {#each images as image, i (image.src)}
    <button
      class="overflow-hidden aspect-video bg-surface-container-low cursor-zoom-in"
      onclick={() => open(i)}
      aria-label="Open image {i + 1} of {images.length}"
    >
      <img
        src={image.src}
        alt={image.alt ?? ''}
        class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
    </button>
  {/each}
</div>

<!-- Lightbox -->
{#if lightboxIndex !== null}
  {@const current = images[lightboxIndex]}
  <div
    class="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
    role="dialog"
    aria-modal="true"
    aria-label="Image lightbox"
  >
    <!-- Backdrop -->
    <button
      class="absolute inset-0"
      onclick={close}
      aria-label="Close lightbox"
    ></button>

    <!-- Image -->
    <div class="relative z-10 max-w-5xl max-h-[90vh] mx-4 flex flex-col items-center">
      <img
        src={current.src}
        alt={current.alt ?? ''}
        class="max-w-full max-h-[80vh] object-contain"
      />
      {#if current.alt}
        <div class="mt-3 text-[10px] font-label text-secondary tracking-widest uppercase">
          {current.alt}
        </div>
      {/if}
    </div>

    <!-- Close -->
    <button
      class="absolute top-4 right-6 z-10 text-white/60 hover:text-white text-3xl leading-none"
      onclick={close}
      aria-label="Close"
    >✕</button>

    <!-- Prev / Next -->
    {#if images.length > 1}
      <button
        class="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white/60 hover:text-white text-4xl px-2 py-4"
        onclick={(e) => { e.stopPropagation(); lightboxIndex = ((lightboxIndex ?? 0) - 1 + images.length) % images.length; }}
        aria-label="Previous image"
      >‹</button>
      <button
        class="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white/60 hover:text-white text-4xl px-2 py-4"
        onclick={(e) => { e.stopPropagation(); lightboxIndex = ((lightboxIndex ?? 0) + 1) % images.length; }}
        aria-label="Next image"
      >›</button>
    {/if}
  </div>
{/if}
```

- [ ] **Step 2: Type-check**

```bash
npm run check
```

Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/components/blog/Gallery.svelte
git commit -m "feat(blog): add Gallery component — grid + keyboard-navigable lightbox"
```

---

## Task 7: new ArticleLayout

**Files:**
- Create: `src/lib/components/blog/ArticleLayout.svelte`

This component wraps rendered markdown content with the full Digital Blueprint article page structure: back nav → cover image → header (meta bar + title + description) → prose body → prev/next footer.

`prev` and `next` are `ArticleFormat | null` (type from `src/lib/content/content.d.ts` — has `.slug` and `.metadata.title`).

- [ ] **Step 1: Create ArticleLayout.svelte**

```svelte
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

  function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-GB', {
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
    <div class="w-full h-[240px] md:h-[380px] overflow-hidden">
      <img
        src={metadata.cover}
        alt={metadata.title}
        class="w-full h-full object-cover"
        loading="eager"
      />
    </div>
  {/if}

  <!-- Article header -->
  <div class="px-4 md:px-12 lg:px-24 max-w-[760px] mx-auto pt-10 pb-8">
    <!-- Meta bar: date · N MIN READ · tags -->
    <div class="flex flex-wrap items-center gap-3 mb-6 text-[10px] font-label tracking-widest text-secondary uppercase">
      <span>{formatDate(metadata.date)}</span>
      <span class="text-outline-variant/30">·</span>
      <span>{readingTime} MIN READ</span>
      {#if metadata.tags?.length}
        <span class="text-outline-variant/30">·</span>
        <div class="flex gap-2 flex-wrap">
          {#each metadata.tags as tag (tag)}
            <span class="px-2 py-0.5 bg-surface-container text-on-surface-variant">{tag}</span>
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
  <div class="px-4 md:px-12 lg:px-24 max-w-[760px] mx-auto pb-16">
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
      <div class="px-4 md:px-12 lg:px-24 max-w-[760px] mx-auto py-8 flex justify-between gap-8">
        {#if prev}
          <a href="/{lang}/blog/{prev.slug}" class="group flex-1 text-left">
            <div class="text-[9px] font-label tracking-widest text-secondary mb-1 uppercase">← Prev</div>
            <div class="text-sm font-headline font-bold text-on-surface group-hover:text-tertiary transition-colors line-clamp-2">
              {prev.metadata.title}
            </div>
          </a>
        {:else}
          <div class="flex-1"></div>
        {/if}
        {#if next}
          <a href="/{lang}/blog/{next.slug}" class="group flex-1 text-right">
            <div class="text-[9px] font-label tracking-widest text-secondary mb-1 uppercase">Next →</div>
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
```

- [ ] **Step 2: Type-check**

```bash
npm run check
```

Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/components/blog/ArticleLayout.svelte
git commit -m "feat(blog): add ArticleLayout — Digital Blueprint article page with cover, meta bar, prose, prev/next"
```

---

## Task 8: update +page.ts (reading time + prev/next)

**Files:**
- Modify: `src/routes/[lang]/blog/[slug]/+page.ts`

Current file loads only `post.metadata` and `post.default`. This task adds `readingTime` computation and `prev`/`next` article references.

- [ ] **Step 1: Replace the entire +page.ts**

```typescript
// src/routes/[lang]/blog/[slug]/+page.ts
import { loadArticles } from '$lib/utils/blog-loader-utils';
import { readingTime } from '$lib/utils/reading-time';
import { defaultLang } from '$lib/i18n/lang.store.js';
import type { PageLoad } from './$types';

export const prerender = true;

// Static raw glob resolved at build time — individual file selected at runtime
const rawGlob = import.meta.glob('/src/content/blog/**/*.md', { query: '?raw', import: 'default' });

export const load: PageLoad = async ({ params, parent }) => {
  const dataParent = await parent();
  const activeLang = dataParent.lang ?? defaultLang;
  const { slug } = params;

  const [post, articles] = await Promise.all([
    import(`../../../../content/blog/${activeLang}/${slug}.md`),
    loadArticles(activeLang)
  ]);

  const rawKey = `/src/content/blog/${activeLang}/${slug}.md`;
  const rawLoader = rawGlob[rawKey];
  const rawText = rawLoader ? String(await rawLoader()) : '';
  const minutes = readingTime(rawText);

  const idx = articles.findIndex(a => a.slug === slug);

  return {
    metadata: post.metadata,
    content: post.default,
    readingTime: minutes,
    prev: idx > 0 ? articles[idx - 1] : null,
    next: idx < articles.length - 1 ? articles[idx + 1] : null,
    lang: activeLang
  };
};
```

- [ ] **Step 2: Type-check**

```bash
npm run check
```

Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add src/routes/\[lang\]/blog/\[slug\]/+page.ts
git commit -m "feat(blog): update article loader — readingTime + prev/next navigation"
```

---

## Task 9: update +page.svelte + delete old ArticleLayout

**Files:**
- Modify: `src/routes/[lang]/blog/[slug]/+page.svelte`
- Delete: `src/lib/components/pages/blog/ArticleLayout.svelte`

- [ ] **Step 1: Replace the entire +page.svelte**

```svelte
<script lang="ts">
  import ArticleLayout from '$lib/components/blog/ArticleLayout.svelte';

  let { data } = $props();
</script>

<ArticleLayout
  metadata={data.metadata}
  readingTime={data.readingTime}
  lang={data.lang}
  prev={data.prev}
  next={data.next}
>
  <svelte:component this={data.content} />
</ArticleLayout>
```

- [ ] **Step 2: Delete the old ArticleLayout**

```bash
rm src/lib/components/pages/blog/ArticleLayout.svelte
```

- [ ] **Step 3: Check no other file imports the old path**

```bash
grep -r "components/pages/blog/ArticleLayout" src/
```

Expected: no output (only `+page.svelte` was importing it and that's now replaced).

- [ ] **Step 4: Type-check**

```bash
npm run check
```

Expected: 0 errors.

- [ ] **Step 5: Visual check**

```bash
npm run dev
```

Open `http://localhost:5173/en/blog/005-post-20240101` — verify:
- Article renders without old zinc/white styling
- Title, date, reading time visible in header
- No cover image (post has no `cover` in frontmatter — that's correct)
- Prose body readable
- Prev/Next links visible (if adjacent articles exist)

- [ ] **Step 6: Commit**

```bash
git add src/routes/\[lang\]/blog/\[slug\]/+page.svelte
git rm src/lib/components/pages/blog/ArticleLayout.svelte
git commit -m "feat(blog): wire new ArticleLayout, remove old zinc layout"
```

---

## Task 10: smoke-test a post with rich components

**Files:**
- Modify: `src/content/blog/en/005-post-20240101.md` (temporary smoke-test, will revert)

Verify all five components work together in a real post before declaring the feature done.

- [ ] **Step 1: Add frontmatter fields + component imports to an existing post**

Edit the top of `src/content/blog/en/005-post-20240101.md`:

```markdown
---
title: "Mastering Throttling: Optimizing Web Performance with Smarter Event Handling"
date: "2024-01-01"
description: "Discover how throttling can improve the performance of your web applications by controlling the frequency of function executions."
tags: ["PERFORMANCE", "JAVASCRIPT"]
---

<script>
  import Callout from '$lib/components/blog/Callout.svelte';
  import ImageCaption from '$lib/components/blog/ImageCaption.svelte';
  import VideoEmbed from '$lib/components/blog/VideoEmbed.svelte';
  import Gallery from '$lib/components/blog/Gallery.svelte';
</script>

<Callout type="note">Throttling ensures a function executes at most once per interval, regardless of how many times the event fires.</Callout>

<Callout type="tip">Use `_.throttle` from Lodash for production — handles edge cases automatically.</Callout>

<Callout type="warn">Do not throttle functions that must fire on every event (e.g., character-by-character validation).</Callout>

<VideoEmbed url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />

<Gallery images={[
  { src: "https://picsum.photos/seed/a/800/450", alt: "FIG.01 — Example diagram" },
  { src: "https://picsum.photos/seed/b/800/450", alt: "FIG.02 — Performance chart" },
  { src: "https://picsum.photos/seed/c/800/450", alt: "FIG.03 — Event timeline" }
]} />
```

_(Uses picsum.photos as placeholder since we have no real images in static/ yet. The Gallery component works with any URL.)_

- [ ] **Step 2: Visual check — all components**

```bash
npm run dev
```

Open `http://localhost:5173/en/blog/005-post-20240101` and verify:

- [ ] Tags appear in meta bar (`PERFORMANCE`, `JAVASCRIPT`)
- [ ] Reading time is displayed (should be ~6 MIN READ)
- [ ] Three `<Callout>` blocks render with correct border colors (green/gray/red)
- [ ] `<VideoEmbed>` renders an embedded YouTube player
- [ ] `<Gallery>` renders a 3-image grid; clicking opens lightbox; Escape closes it; arrow keys navigate
- [ ] Prev/next footer links work correctly

- [ ] **Step 3: Type-check**

```bash
npm run check
```

Expected: 0 errors.

- [ ] **Step 4: Commit smoke-test post**

```bash
git add src/content/blog/en/005-post-20240101.md
git commit -m "chore(blog): smoke-test rich components in post 005 — tags, callout, video, gallery"
```

---

## Definition of Done

- `npm run check` passes with 0 errors
- Article detail page renders in Digital Blueprint style (no zinc/white)
- Tags + reading time appear in meta bar
- `<Callout type="note|tip|warn">` renders with correct accent color
- `<ImageCaption src="" caption="" />` renders image + FIG.NN caption
- `<VideoEmbed url="">` works for YouTube and Vimeo URLs
- `<Gallery images={[]} />` grid + lightbox with keyboard navigation (←/→/Esc)
- Prev/Next footer navigates between adjacent articles
- Old `src/lib/components/pages/blog/ArticleLayout.svelte` deleted
