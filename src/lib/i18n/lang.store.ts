import type { LangAvailable } from '$lib/types';
import { writable } from 'svelte/store';

export const defaultLang: LangAvailable = 'en';
export const langStore = writable<LangAvailable>(defaultLang);
