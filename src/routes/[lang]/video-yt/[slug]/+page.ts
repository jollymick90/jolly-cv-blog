import { defaultLang } from '$lib/i18n/lang.store';
import type { PageLoad } from './$types';

// Static glob maps - Vite requires static paths for analysis
const globEn = import.meta.glob('/src/content/video-yt/en/*.md');
const globIt = import.meta.glob('/src/content/video-yt/it/*.md');

export const prerender = true;

export const load: PageLoad = async ({ params, parent }) => {
  const dataParent = await parent();
  const lang = dataParent.lang ?? defaultLang;
  const { slug } = params;

  const globMap: Record<string, typeof globEn> = { en: globEn, it: globIt };
  const files = globMap[lang] ?? globEn;
  const key = `/src/content/video-yt/${lang}/${slug}.md`;
  const fallbackKey = `/src/content/video-yt/en/${slug}.md`;

  let post: { metadata: any; default: any } | null = null;

  if (files[key]) {
    post = (await files[key]()) as any;
  } else if (globEn[fallbackKey]) {
    post = (await globEn[fallbackKey]()) as any;
  }

  // Find the video data from the profile
  const video = (dataParent.profile?.videos ?? []).find((v: any) => v.id === slug);

  return {
    metadata: post?.metadata ?? null,
    content: post?.default ?? null,
    video: video ?? null
  };
};
