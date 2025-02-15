export async function loadArticles() {
    // const posts = Object.entries(import.meta.glob('./*.md'));
    // posts avrà un elenco di [path, funzione di import]

    const resolvedPosts = await Promise.all(
        Object.entries(import.meta.glob('/src/content/*.md')).map(async ([path, resolver]) => {
            const mod: any = await resolver();
            console.log("-- mod", mod)
            return {
                metadata: mod.metadata,
                // component: mod.default,
                slug: path.split('/').pop()?.replace('.md', '')
            };
        })
    );

    // Ordina magari per data
    resolvedPosts.sort((a, b) => {
        return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime();
    });

    return resolvedPosts;
}
