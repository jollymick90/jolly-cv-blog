import { defaultLang } from '$lib/i18n/lang.store';
import type { LangType } from '$lib/types';
import { loadMdFiles } from './md-loader-utils';

export type ArticleBlogMD = {
    metadata: {
        title: string,
        date: string,
        description: string
    },
    slug: string | undefined
}

const globMap = {
    en: import.meta.glob('/src/content/blog/en/*.md'),
    it: import.meta.glob('/src/content/blog/it/*.md'),
};
export async function loadArticles(lang: LangType = defaultLang): Promise<ArticleBlogMD[]> {

    const files = globMap[lang] ?? globMap[defaultLang];

    // const resolvedPosts = await Promise.all(
    //     Object.entries(files).map(async ([path, resolver]) => {
    //         const mod: any = await resolver();

    //         const metadata = mod.metadata ?? {};
    //         if (!metadata.date) {
    //             metadata.date = (new Date().toDateString())
    //         }
    //         return {
    //             metadata,
    //             slug: path.split('/').pop()?.replace('.md', '')
    //         };
    //     })
    // );

        const resolvedPosts = await loadMdFiles(lang, globMap, defaultLang);
    
        resolvedPosts.sort((a, b) => {
    
            return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime();
        });

    resolvedPosts.sort((a, b) => {

        return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime();
    });

    return resolvedPosts as ArticleBlogMD[];
}


export async function loadArticlesOld(): Promise<ArticleBlogMD[]> {


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