import { loadArticles } from '$lib/utils/blog-loader-utils';
import { loadEvents } from '$lib/utils/event-loader-utils';
import { defaultLang } from '$lib/i18n/lang.store';
import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async ({ parent }) => {
  const { lang } = await parent();
  const activeLang = lang ?? defaultLang;
  const [articles, events] = await Promise.all([
    loadArticles(activeLang),
    loadEvents(activeLang)
  ]);

  const log = [
    ...articles.map((a: any) => ({ ...a, type: 'ARTICLE' as const })),
    ...events.map((e: any) => ({ ...e, type: 'EVENT' as const }))
  ].sort((a: any, b: any) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime());

  return { log };
};
