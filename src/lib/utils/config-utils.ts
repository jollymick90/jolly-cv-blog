import resumeEn from '$content/resume/en.json';
import resumeIt from '$content/resume/it.json';
import common from '$content/resume/common.json';

import { defaultLang } from '$lib/i18n/lang.store';

import type { LangType } from '../types';

export function getResumeLang(
  lang: LangType = defaultLang
): any {

  if (lang === 'en') {
    return { ...resumeEn, ...common };
  } else if (lang === 'it') {
    return  { ...resumeIt, ...common };
  }

  return { ...resumeEn, ...common };

}
