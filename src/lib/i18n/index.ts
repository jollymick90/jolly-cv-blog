import type { LangAvailable } from '$lib/types';
import type { Config } from 'sveltekit-i18n';
import i18n from 'sveltekit-i18n';

import en from './en/en.json';
import it from './it/it.json';
import lang from './lang.json';

const config: Config = ({
  translations: {
    en: { 
      ...en,
      lang 
    },
    it: { 
      ...it, 
      lang 
    }
  },
});

export const LANG_AVAILABLE: LangAvailable[] = ['it', 'en'];

export const {
  t,
  locale,
  locales,
  loading,
  addTranslations,
  loadTranslations,
  translations,
  setRoute,
  setLocale
} = new i18n(config);

// Translations logs
loading.subscribe(async ($loading) => {
  if ($loading) {

    await loading.toPromise();
  }
});
