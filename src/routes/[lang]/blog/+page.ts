import type { ArticleFormat } from '$lib/content/content';
import { defaultLang } from '$lib/i18n/lang.store';
import { loadArticles } from '$lib/utils/blog-loader-utils';

export const prerender = true;

export async function load({ parent }) {
  const dataParent = await parent();

  const lang = dataParent.lang ?? defaultLang; 
  
  const resolvedPosts: ArticleFormat[] = await loadArticles(lang);
  return {
    posts: resolvedPosts
  };
}
