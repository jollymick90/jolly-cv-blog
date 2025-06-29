import type { EventFormat } from '$lib/content/content';
import { defaultLang } from '$lib/i18n/lang.store';
import { loadEvents } from '$lib/utils/event-loader-utils';

export const prerender = true


export async function load({ parent }) {
  const dataParent = await parent();

  const lang = dataParent.lang ?? defaultLang;
  
  const resolvedPosts: EventFormat[] = await loadEvents(lang);
  return {
    posts: resolvedPosts
  };
}
