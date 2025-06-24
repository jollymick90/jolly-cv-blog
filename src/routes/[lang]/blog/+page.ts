import { defaultLang } from '$lib/i18n/lang.store';
import { loadArticles, type ArticleBlogMD } from '$lib/utils/blog-loader-utils';

export const prerender = false;

export async function load({ parent }) {
  const dataParent = await parent();

  const lang = dataParent.lang ?? defaultLang; 
  
  const resolvedPosts: ArticleBlogMD[] = await loadArticles(lang);
  return {
    posts: resolvedPosts
  };
}
