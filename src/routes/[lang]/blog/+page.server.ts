// import type { EntryGenerator } from './$types';

import type { LangAvailable } from '$lib/types';

import type { EntryGenerator } from './$types';

// import { LANG_AVAILABLE } from '$lib/i18n';

const LANG_AVAILABLE: LangAvailable[] = ['it', 'en'];

// export const entries: EntryGenerator = () => {
// 	return [
// 		{ lang: 'it' },
// 		{ lang: 'en' }
// 	];
// };



export const prerender = true;

export const entries: EntryGenerator = () => {
	return [
		{ lang: 'it' },
		{ lang: 'en' }
	];
};