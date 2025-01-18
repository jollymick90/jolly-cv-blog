// src/routes/blog/+page.ts
export async function load() {
    const posts = Object.entries(import.meta.glob('./*.md'));
    // posts avrà un elenco di [path, funzione di import]
  
    const resolvedPosts = await Promise.all(
      Object.entries(import.meta.glob('./*.md')).map(async ([path, resolver]) => {
        const mod: any = await resolver();
        return {
          metadata: mod.metadata,
          component: mod.default,
          slug: path.split('/').pop()?.replace('.md', '')
        };
      })
    );
  
    // Ordina magari per data
    resolvedPosts.sort((a, b) => {
      return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime();
    });
  
    return {
      posts: resolvedPosts
    };
  }
  