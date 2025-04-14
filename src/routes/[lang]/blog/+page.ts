import { loadArticles } from '$lib/utils/blog-loader-utils';

export const prerender = false;

// export function entries() {
//   return ['it', 'en'].map(lang => ({ lang }));
// }
export async function load() {
  const resolvedPosts: any = await loadArticles();
  return {
    posts: resolvedPosts
  };
}
