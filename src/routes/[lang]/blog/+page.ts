import { loadArticles } from '$lib/utils/blog-loader-utils';

export async function load() {
  const resolvedPosts: any = await loadArticles();
  return {
    posts: resolvedPosts
  };
}
