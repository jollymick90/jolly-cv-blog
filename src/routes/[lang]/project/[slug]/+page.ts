import { error } from '@sveltejs/kit';
import { defaultLang } from '$lib/i18n/lang.store.js';

export const prerender = true;

const projectModules = import.meta.glob('/src/content/project/**/*.md');

export async function load({ params, parent }) {
  const dataParent = await parent();
  const lang = dataParent.lang ?? defaultLang;
  const { slug } = params;

  const key = `/src/content/project/${lang}/${slug}.md`;
  const loader = projectModules[key];

  if (!loader) {
    error(404, 'Project not found');
  }

  const post = await loader() as any;
  return {
    metadata: post.metadata,
    content: post.default
  };
}
