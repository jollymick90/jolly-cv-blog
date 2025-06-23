import { defaultLang } from '$lib/i18n/lang.store';
import type { LangType } from '$lib/types';
import { loadMdFiles } from './md-loader-utils';

export type ProjectBlogMD = {
    metadata: {
        title: string,
        date: string,
        description: string
    },
    slug: string | undefined
}

const globMap = {
    en: import.meta.glob('/src/content/project/en/*.md'),
    it: import.meta.glob('/src/content/project/it/*.md'),
};
export async function loadProjects(lang: LangType = defaultLang): Promise<ProjectBlogMD[]> {

    const resolvedPosts = await loadMdFiles(lang, globMap, defaultLang);

    resolvedPosts.sort((a, b) => {

        return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime();
    });

    return resolvedPosts as ProjectBlogMD[];
}
