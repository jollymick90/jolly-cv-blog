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
