import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'theme';
const DEFAULT_THEME: Theme = 'dark';

function createThemeStore() {
  const { subscribe, set } = writable<Theme>(DEFAULT_THEME);

  return {
    subscribe,
    init() {
      if (!browser) return;
      const saved = localStorage.getItem(STORAGE_KEY);
      const theme: Theme = saved === 'light' || saved === 'dark' ? saved : DEFAULT_THEME;
      document.documentElement.setAttribute('data-theme', theme);
      set(theme);
    },
    toggle() {
      if (!browser) return;
      let current: Theme = DEFAULT_THEME;
      const unsub = subscribe((v) => (current = v));
      unsub();
      const next: Theme = current === 'dark' ? 'light' : 'dark';
      localStorage.setItem(STORAGE_KEY, next);
      document.documentElement.setAttribute('data-theme', next);
      set(next);
    }
  };
}

export const themeStore = createThemeStore();
