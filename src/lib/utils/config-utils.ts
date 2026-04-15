import { defaultLang } from '$lib/i18n/lang.store';

import type { LangType } from '../types';

/**
 * @deprecated Use getProfile() from '$lib/utils/profile-utils' instead.
 * This function is kept for backward compatibility with print routes.
 */
export function getResumeLang(
  lang: LangType = defaultLang
): any {
  // Stub — resume data has been migrated to profile-utils.ts
  return {};
}
