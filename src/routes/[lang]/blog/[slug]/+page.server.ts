import { LANG_AVAILABLE } from '$lib/i18n/index.js';
import type { LangAvailable } from '$lib/types.js';
import { loadArticles } from '$lib/utils/blog-loader-utils';

export async function entries() {

    const resolvedPosts = await loadArticles();
    const entries: { lang: LangAvailable, slug: string }[] = [];
    resolvedPosts.forEach(articles => {
        LANG_AVAILABLE.forEach(lang => {
            if (articles.slug) {
                entries.push({
                    lang: lang,
                    slug: articles.slug
                })
            }

        })
    })

    console.log("----------entries", entries)

    return entries;
}