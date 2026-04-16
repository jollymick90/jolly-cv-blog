// src/routes/[lang]/blog/[slug]/+page.ts
import { error } from '@sveltejs/kit';
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

  let post;
  try {
    post = await import(`../../../../content/blog/${activeLang}/${slug}.md`);
  } catch {
    error(404, 'Post not found');
  }

  const articles = await loadArticles(activeLang);

  const rawKey = `/src/content/blog/${activeLang}/${slug}.md`;
  const rawLoader = rawGlob[rawKey];
  const rawText = rawLoader ? String(await rawLoader()) : '';
  const minutes = readingTime(rawText);

  // articles is sorted newest-first (descending by date).
  // idx - 1 → newer post (Next →), idx + 1 → older post (← Prev)
  const idx = articles.findIndex(a => a.slug === slug);

  return {
    metadata: post.metadata,
    content: post.default,
    readingTime: minutes,
    prev: idx < articles.length - 1 ? articles[idx + 1] : null,
    next: idx > 0 ? articles[idx - 1] : null,
    lang: activeLang
  };
};
