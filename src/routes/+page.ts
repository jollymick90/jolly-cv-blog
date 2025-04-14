import { defaultLang } from '$lib/i18n/lang.store';

import { redirect } from '@sveltejs/kit';

export function load() {
  throw redirect(307, '/' + defaultLang);
}