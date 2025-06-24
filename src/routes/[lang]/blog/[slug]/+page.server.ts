import type { LangAvailable } from '$lib/types.js';
import { loadArticles } from '$lib/utils/blog-loader-utils';

export async function entries() {
    const resolvedPostsEn = await loadArticles("en");
    const resolvedPostsIt = await loadArticles("it");

    const entries: { lang: LangAvailable, slug: string }[] = [];

    resolvedPostsEn.forEach(article => {
        if (article.slug) {
            entries.push({
                lang: "en",
                slug: article.slug
            });
        }
    });

    resolvedPostsIt.forEach(article => {
        if (article.slug) {
            entries.push({
                lang: "it",
                slug: article.slug
            });
        }
    });

    return entries;
}

export const prerender = true

