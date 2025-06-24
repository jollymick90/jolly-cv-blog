import type { LangAvailable } from '$lib/types.js';
import { loadProjects } from '$lib/utils/project-loader-utils';

export async function entries() {
    const resolvedPostsEn = await loadProjects("en");
    const resolvedPostsIt = await loadProjects("it");

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
