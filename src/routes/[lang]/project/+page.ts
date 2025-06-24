import type { ProjectFormat } from '$lib/content/content';
import { defaultLang } from '$lib/i18n/lang.store';
import { loadProjects } from '$lib/utils/project-loader-utils.js';

export const prerender = true


export async function load({ parent }) {
  const dataParent = await parent();

  const lang = dataParent.lang ?? defaultLang; 
  
  const resolvedPosts: ProjectFormat[] = await loadProjects(lang);
  return {
    posts: resolvedPosts
  };
}
