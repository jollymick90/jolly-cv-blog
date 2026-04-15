import type { EntryGenerator } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => {
    return [
        { lang: 'it' },
        { lang: 'en' }
    ];
};