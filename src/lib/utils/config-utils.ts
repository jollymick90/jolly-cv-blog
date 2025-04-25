import resumeEn from '$content/resume/en.json';
import resumeIt from '$content/resume/it.json';
import { defaultLang } from '$lib/i18n/lang.store';

import type { LangType } from '../types';

export function getResumeLang(
  lang: LangType = defaultLang
): any {
  // Ritorna la parte di config corrispondente
  if (lang === 'en') {
    return resumeEn;
  } else if (lang === 'it') {
    return resumeIt;
  }

  return resumeIt;

}
