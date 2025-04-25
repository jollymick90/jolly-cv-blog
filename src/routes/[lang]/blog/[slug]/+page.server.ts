// import { LANG_AVAILABLE } from '$lib/i18n/index.js';
// import type { LangAvailable } from '$lib/types.js';
// import { loadArticles } from '$lib/utils/blog-loader-utils';

// export async function entries() {

//     const resolvedPosts = await loadArticles();
//     const entries: { lang: LangAvailable, slug: string }[] = [];
//     resolvedPosts.forEach(articles => {
//         LANG_AVAILABLE.forEach(lang => {
//             if (articles.slug) {
//                 entries.push({
//                     lang: lang,
//                     slug: articles.slug
//                 })
//             }

//         })
//     })
//     return entries;
// }

import type { EntryGenerator } from './$types';

export const prerender = true
export const entries: EntryGenerator = () => {
    return [
        { lang: 'it', slug: '006-post-20241230' },
        { lang: 'en', slug: '006-post-20241230' },
        { lang: 'it', slug: '005-post-20240101' },
        { lang: 'en', slug: '005-post-20240101' },
        { lang: 'it', slug: '001-post-20250401' },
        { lang: 'en', slug: '001-post-20250401' },
        { lang: 'it', slug: '002-post-20250401' },
        { lang: 'en', slug: '002-post-20250401' },
        { lang: 'it', slug: '003-post-20250401' },
        { lang: 'en', slug: '003-post-20250401' },
        { lang: 'it', slug: '004-post-20250401' },
        { lang: 'en', slug: '004-post-20250401' },
        { lang: 'it', slug: '007-post-20230401' },
        { lang: 'en', slug: '007-post-20230401' }
    ];
};