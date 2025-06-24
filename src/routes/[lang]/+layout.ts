import type { IResume } from '$lib/content';
import { defaultLang } from '$lib/i18n/lang.store';
import { getResumeLang } from '$lib/utils/config-utils';
import type { PageLoad } from './$types';
export const prerender = true;
export const load: PageLoad = async ({ parent }) => {
  const dataParent = await parent();  
  const lang = dataParent.lang ?? defaultLang; 

  const resumeConfig: IResume = getResumeLang(lang);

  return {
    resume: resumeConfig
  } as {
    resume: IResume
  };
}