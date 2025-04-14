import type { LangAvailable } from '$lib/types';
import type { Config } from 'sveltekit-i18n';
import i18n from 'sveltekit-i18n';

import en from './en/en.json';
import it from './it/it.json';
import lang from './lang.json';

const loaders = [
  {
    locale: 'en',
    key: 'common',
    loader: async () => (
      await import('./en/common.json')
    ).default,
  },
  {
    locale: 'en',
    key: 'home',
    routes: ['/'], // you can use regexes as well!
    loader: async () => (
      await import('./en/home.json')
    ).default,
  },
  {
    locale: 'en',
    key: 'blog',
    routes: ['/blog'], // you can use regexes as well!
    loader: async () => (
      await import('./en/blog.json')
    ).default,
  },
  {
    locale: 'en',
    key: 'resume',
    routes: ['/resume'],
    loader: async () => (
      await import('./en/resume.json')
    ).default,
  },
  {
    locale: 'it',
    key: 'common',
    loader: async () => (
      await import('./it/common.json')
    ).default,
  },
  {
    locale: 'it',
    key: 'home',
    routes: ['/'],
    loader: async () => (
      await import('./it/home.json')
    ).default,
  },
  {
    locale: 'it',
    key: 'blog',
    routes: ['/blog'], // you can use regexes as well!
    loader: async () => (
      await import('./it/blog.json')
    ).default,
  },
  {
    locale: 'it',
    key: 'resume',
    routes: ['/resume'],
    loader: async () => (
      await import('./it/resume.json')
    ).default,
  },
]
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
    console.log('Loading translations...');

    await loading.toPromise();
    console.log('Updated translations', translations.get());
  }
});
