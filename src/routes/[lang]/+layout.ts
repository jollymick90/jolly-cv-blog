import { defaultLang } from '$lib/i18n/lang.store';
import { getProfile } from '$lib/utils/profile-utils';
import type { LayoutLoad } from './$types';
export const prerender = true;

export const load: LayoutLoad = async ({ parent }) => {
  const dataParent = await parent();
  const lang = dataParent.lang ?? defaultLang;

  const profile = getProfile(lang);

  return {
    profile
  };
}
