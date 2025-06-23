import { defaultLang } from '$lib/i18n/lang.store';
import type { LangType } from '$lib/types';
import { loadMdFiles } from './md-loader-utils';

export type EventBlogMD = {
    metadata: {
        title: string,
        date: string,
        description: string
    },
    slug: string | undefined
}

const globMap = {
    en: import.meta.glob('/src/content/events/en/*.md'),
    it: import.meta.glob('/src/content/events/it/*.md'),
};
export async function loadEvents(lang: LangType = defaultLang): Promise<EventBlogMD[]> {

    const resolvedPosts = await loadMdFiles(lang, globMap, defaultLang);

    resolvedPosts.sort((a, b) => {

        return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime();
    });

    return resolvedPosts as EventBlogMD[];
}