import { defaultLang } from '$lib/i18n/lang.store';
import { loadArticles } from '$lib/utils/blog-loader-utils';

export const prerender = false;

// export function entries() {
//   return ['it', 'en'].map(lang => ({ lang }));
// }
export async function load({ parent }) {
  const dataParent = await parent();

  const lang = dataParent.lang ?? defaultLang; 
  
  const resolvedPosts: any = await loadArticles(lang);
  return {
    posts: resolvedPosts
  };
}
