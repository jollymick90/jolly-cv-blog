import {
	setLocale,
	setRoute
} from '$lib/i18n';

import type { Load } from '@sveltejs/kit';

export const prerender = true;

export const load: Load = async ({ url }) => {
  console.log("1 load layout shared lang")
  const { pathname } = url;

  const lang = `${pathname.match(/\w+?(?=\/|$)/) || ''}`;

  const route = pathname.replace(new RegExp(`^/${lang}`), '');

  await setLocale(lang);
  await setRoute(route);
  
  console.log(`2 set layout load setLocale=${lang} setRoute=${route}`);
  
  return { route, lang };
};