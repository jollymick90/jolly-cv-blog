import { getProfile } from '$lib/utils/profile-utils';
import { defaultLang } from '$lib/i18n/lang.store';
import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async ({ parent }) => {
  const { lang } = await parent();
  const profile = getProfile(lang ?? defaultLang);
  return { profile };
};
