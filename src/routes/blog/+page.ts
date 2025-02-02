// src/routes/blog/+page.ts
// export async function load() {
//   // const posts = Object.entries(import.meta.glob('./*.md'));
//   // posts avrà un elenco di [path, funzione di import]

import { loadArticles } from '$lib/blog/loader';

export async function load() {
  const resolvedPosts = await loadArticles();
  return {
    posts: resolvedPosts
  };
}
