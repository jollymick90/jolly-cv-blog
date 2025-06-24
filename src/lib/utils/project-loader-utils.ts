import type { ProjectFormat } from '$lib/content/content';
import { defaultLang } from '$lib/i18n/lang.store';
import type { LangType } from '$lib/types';

import { loadMdFiles } from './md-loader-utils';

const globMap = {
    en: import.meta.glob('/src/content/project/en/*.md'),
    it: import.meta.glob('/src/content/project/it/*.md'),
};
export async function loadProjects(lang: LangType = defaultLang): Promise<ProjectFormat[]> {

    const resolvedPosts = await loadMdFiles(lang, globMap, defaultLang);

    resolvedPosts.sort((a, b) => {

        return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime();
    });

    return resolvedPosts as ProjectFormat[];
}
