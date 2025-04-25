import {
	setLocale,
	setRoute
} from '$lib/i18n';
import { defaultLang } from '$lib/i18n/lang.store';
import type { LangAvailable } from '$lib/types';

import type { Load } from '@sveltejs/kit';

export const prerender = true;

export const load: Load = async ({ url }) => {
  const { pathname } = url;

  const _lang = `${pathname.match(/\w+?(?=\/|$)/) || ''}`;
  const lang: LangAvailable = (_lang === 'it' || _lang === 'en') ? _lang as LangAvailable : defaultLang;

  const route = pathname.replace(new RegExp(`^/${lang}`), '');

  await setLocale(lang);
  await setRoute(route);
  
  return { route, lang  };
};