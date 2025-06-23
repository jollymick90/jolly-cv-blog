import type { GlobalMDPage, LangAvailable, LoadResultMdPage } from "$lib/types";


export async function loadMdFiles(lang: 'en' | 'it', globMap: GlobalMDPage, defaultLang: LangAvailable):
Promise<LoadResultMdPage[]> {
    const files = globMap[lang] ?? globMap[defaultLang];

    const resolvedPosts = await Promise.all(
        Object.entries(files).map(async ([path, resolver]) => {
            const mod: any = await resolver();

            const metadata = mod.metadata ?? {};
            if (!metadata.date) {
                metadata.date = (new Date().toDateString());
            }
            return {
                metadata,
                slug: path.split('/').pop()?.replace('.md', '')
            };
        })
    );
    return resolvedPosts;
}