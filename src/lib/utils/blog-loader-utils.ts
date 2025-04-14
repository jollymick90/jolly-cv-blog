export type ArticleBlogMD = {
    metadata: {
        title: string,
        date: string,
        description: string
    },
    slug: string | undefined
}
export async function loadArticles(): Promise<ArticleBlogMD[]> {

    const resolvedPosts = await Promise.all(
        Object.entries(import.meta.glob('/src/content/blog/*.md')).map(async ([path, resolver]) => {
            const mod: any = await resolver();
            
            let metadata = {
                ...mod.metadata
            }
            if (!metadata.date) {
                metadata.date = (new Date().toDateString())
            }
            return {
                metadata,
                // component: mod.default,
                slug: path.split('/').pop()?.replace('.md', '')
            };
        })
    );

    // Ordina magari per data
    resolvedPosts.sort((a, b) => {
        
        return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime();
    });

    return resolvedPosts as ArticleBlogMD[];
}
