import { loadArticles } from '$lib/utils/blog-loader-utils';
import { loadEvents } from '$lib/utils/event-loader-utils';
import { defaultLang } from '$lib/i18n/lang.store';
import type { ArticleFormat, EventFormat } from '$lib/content/content';
import type { PageLoad } from './$types';

export const prerender = true;

type LogEntry = (ArticleFormat | EventFormat) & { type: 'ARTICLE' | 'EVENT' };

export const load: PageLoad = async ({ parent }) => {
  const { lang } = await parent();
  const activeLang = lang ?? defaultLang;
  const [articles, events] = await Promise.all([
    loadArticles(activeLang),
    loadEvents(activeLang)
  ]);

  const log: LogEntry[] = [
    ...articles.map((a) => ({ ...a, type: 'ARTICLE' as const })),
    ...events.map((e) => ({ ...e, type: 'EVENT' as const }))
  ].sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime());

  return { log };
};
