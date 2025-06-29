import type { LangAvailable } from '$lib/types';
import { loadEvents } from '$lib/utils/event-loader-utils';

export async function entries() {
    const resolvedPostsEn = await loadEvents("en");
    const resolvedPostsIt = await loadEvents("it");

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
