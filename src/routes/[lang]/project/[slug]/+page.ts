import { defaultLang } from '$lib/i18n/lang.store.js';

// export const prerender = false;
export const prerender = true;

export async function load({ params, parent }) {
  const dataParent = await parent();
  const lang = dataParent.lang ?? defaultLang;
  const { slug } = params;

  try {
    const post = await import(`../../../../content/project/${lang}/${slug}.md`);

    return {
      metadata: post.metadata,
      content: post.default
    };
  } catch (e) {
    console.error(e);
    return {
      status: 404,
      error: new Error('Post non trovato')
    };
  }
}
