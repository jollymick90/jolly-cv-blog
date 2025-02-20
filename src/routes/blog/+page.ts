import { loadArticles } from '$lib/blog/loader';

export async function load() {
  const resolvedPosts: any = await loadArticles();
  return {
    posts: resolvedPosts
  };
}
