# Blog Rich Content — Design Spec

**Date:** 2026-04-16  
**Status:** Approved  
**Scope:** Blog article reading experience + rich content components. Dark mode only. Light mode is a separate follow-up project.

---

## 1. Overview

The current blog article page uses `ArticleLayout.svelte` with old zinc/white template components and renders plain markdown with no image, video, or custom component support.

This spec redesigns the article detail page in Digital Blueprint style and introduces a library of rich content components usable inside any `.md` post.

**What changes:**
- New `ArticleLayout.svelte` in Digital Blueprint design (centered column, cover image, meta bar, prev/next nav)
- Five new Svelte components available in markdown posts: `Callout`, `ImageCaption`, `VideoEmbed`, `Gallery`
- Extended frontmatter schema: `cover`, `tags`
- Reading time computed automatically from word count
- Prev/next article navigation in detail page

**What does NOT change:**
- File structure: `src/content/blog/{lang}/*.md`
- Glob loading in `blog-loader-utils.ts`
- COMMUNITY list page (`/[lang]/blog/+page.svelte`)
- mdsvex configuration in `svelte.config.js`
- Speaker/event routes

---

## 2. Image Storage Convention

Images live in `static/blog/images/{post-slug}/`. Referenced with absolute paths in markdown:

```markdown
cover: "/blog/images/throttling/cover.jpg"
```

```svelte
<ImageCaption src="/blog/images/throttling/diagram.png" caption="FIG.01 — Description" />
```

No Vite import needed — files in `static/` are served directly by the dev server and copied to `build/` on production.

---

## 3. Extended Frontmatter Schema

```yaml
---
title: "Mastering Throttling"
date: "2024-01-01"
description: "Discover how throttling improves performance..."
cover: "/blog/images/throttling/cover.jpg"   # optional — absolute path in static/
tags: ["PERFORMANCE", "JAVASCRIPT"]           # optional — uppercase strings
---
```

`cover` and `tags` are optional. Posts without them render normally (no cover image, no tag row).

### TypeScript update — `content.d.ts`

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

---

## 4. Reading Time

Computed in `+page.ts` from raw markdown text using `import.meta.glob` with `{ query: '?raw' }`.

```ts
// src/lib/utils/reading-time.ts
export function readingTime(rawMarkdown: string): number {
  // Strip frontmatter block (--- ... ---)
  const body = rawMarkdown.replace(/^---[\s\S]*?---/, '');
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200)); // 200 wpm, minimum 1 min
}
```

The raw glob map is defined alongside the existing component glob map in `+page.ts`:

```ts
const rawFiles = import.meta.glob('/src/content/blog/**/*.md', { query: '?raw', import: 'default' });
```

---

## 5. New `ArticleLayout.svelte`

Replaces `src/lib/components/pages/blog/ArticleLayout.svelte`.

**Structure:**
```
← COMMUNITY_LOG               (back nav, links to /[lang]/blog)
[cover image full-width]      (conditional — only if metadata.cover)
─────────────────────────────
  max-w-[720px] mx-auto
  ┌ meta bar: date · N MIN READ · [TAG1] [TAG2]
  │ h1 title
  │ description
  ├──────────────────────────
  │ {children}  ← markdown content
  ├──────────────────────────
  └ prev/next footer
```

**Design tokens used:**
- Background: `bg-surface` (inherited from layout)
- Cover image container: `w-full h-[280px] md:h-[380px] object-cover`
- Back nav: `text-[10px] font-label tracking-[0.2em] text-tertiary`
- Meta bar: `text-[10px] font-label tracking-widest text-secondary`
- Tag badges: `bg-surface-container text-on-surface-variant text-[9px] font-label px-2 py-0.5`
- Title: `font-headline text-3xl md:text-4xl font-extrabold tracking-tighter text-primary`
- Description: `text-secondary text-base leading-relaxed`
- Divider: `border-t border-outline-variant/15`
- Prose body: `prose prose-invert max-w-none` (Tailwind typography plugin, already installed)
- Prev/next: `text-[10px] font-label tracking-widest text-secondary hover:text-tertiary`

**Props:**
```ts
interface ArticleLayoutProps {
  metadata: { title: string; date: string; description: string; cover?: string; tags?: string[] };
  readingTime: number;
  lang: string;
  prev: { slug: string; title: string } | null;
  next: { slug: string; title: string } | null;
  children: Snippet;
}
```

---

## 6. Rich Content Components

All components live in `src/lib/components/blog/`. Used inside `.md` files via a `<script>` block at the top of the post.

```markdown
<script>
  import Callout from '$lib/components/blog/Callout.svelte';
  import ImageCaption from '$lib/components/blog/ImageCaption.svelte';
</script>
```

### 6.1 `Callout.svelte`

```svelte
<!-- Usage -->
<Callout type="note">This is an important technical note.</Callout>
<Callout type="tip">Use _.throttle from Lodash.</Callout>
<Callout type="warn">Avoid using this in hot paths.</Callout>
```

Three `type` values → different accent color:
- `note` → `border-tertiary`, label `text-tertiary` → `NOTE`
- `tip` → `border-secondary`, label `text-secondary` → `TIP`
- `warn` → `border-error`, label `text-error` → `WARN`

Structure: `bg-surface-container-low border-l-3 px-4 py-3` + label row + children prose.

### 6.2 `ImageCaption.svelte`

```svelte
<ImageCaption src="/blog/images/slug/diagram.png" caption="FIG.01 — Throttle vs Debounce" />
```

Renders: full-width image + caption in `text-[10px] font-label text-secondary text-center tracking-widest` style. Caption is optional (omit for plain inline image).

### 6.3 `VideoEmbed.svelte`

```svelte
<VideoEmbed url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />
<VideoEmbed url="https://vimeo.com/123456789" />
```

Extracts video ID from YouTube (`watch?v=` or `youtu.be/`) and Vimeo URLs. Renders a lazy `<iframe>` (`loading="lazy"`) in a 16:9 aspect-ratio container (`aspect-video`). Border: `border border-outline-variant/15`.

### 6.4 `Gallery.svelte`

```svelte
<Gallery images={[
  { src: "/blog/images/slug/01.jpg", alt: "Screenshot 1" },
  { src: "/blog/images/slug/02.jpg", alt: "Screenshot 2" },
  { src: "/blog/images/slug/03.jpg", alt: "Screenshot 3" }
]} />
```

Renders a CSS grid (`grid-cols-2 md:grid-cols-3 gap-1`). Each image is clickable — click opens a fixed-position lightbox overlay showing the full image. Lightbox has a close button and closes on backdrop click or `Escape` key. Lightbox uses `$state` for open/selected index.

---

## 7. Updated `+page.ts` (blog/[slug])

```ts
export async function load({ params, parent }) {
  const { lang } = await parent();
  const activeLang = lang ?? defaultLang;
  const { slug } = params;

  // Static raw glob — Vite resolves at build time, we pick the right key at runtime
  const rawGlob = import.meta.glob('/src/content/blog/**/*.md', { query: '?raw', import: 'default' });

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
}
```

---

## 8. Updated `+page.svelte` (blog/[slug])

```svelte
<script lang="ts">
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

---

## 9. File Structure Summary

**Created:**
- `src/lib/components/blog/ArticleLayout.svelte`
- `src/lib/components/blog/Callout.svelte`
- `src/lib/components/blog/ImageCaption.svelte`
- `src/lib/components/blog/VideoEmbed.svelte`
- `src/lib/components/blog/Gallery.svelte`
- `src/lib/utils/reading-time.ts`

**Modified:**
- `src/lib/content/content.d.ts` — add `cover?`, `tags?` to `ArticleFormat.metadata`
- `src/routes/[lang]/blog/[slug]/+page.ts` — readingTime + prev/next
- `src/routes/[lang]/blog/[slug]/+page.svelte` — use new ArticleLayout

**Deleted:**
- `src/lib/components/pages/blog/ArticleLayout.svelte` — replaced by the new `src/lib/components/blog/ArticleLayout.svelte`

**Not changed:**
- `svelte.config.js`
- `src/lib/utils/blog-loader-utils.ts`

---

## 10. Success Criteria

- Article detail page renders in Digital Blueprint style — no zinc/white elements
- Cover image displays if `cover` is in frontmatter; hidden otherwise
- Tags and reading time appear in meta bar
- `<Callout>`, `<ImageCaption>`, `<VideoEmbed>`, `<Gallery>` usable in any post via `<script>` import
- Gallery lightbox opens/closes correctly, closes on Escape
- VideoEmbed works for YouTube and Vimeo URLs
- Prev/next navigation links work correctly
- `npm run check` passes with 0 errors
