import { mdsvex } from 'mdsvex';
import path from 'path';

import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extension: '.md'
		})
	],
	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter({
			fallback: '200.html', //null
			pages: 'build',
			assets: 'build',
			precompress: false,
			strict: false
		}),
		// prerender: {
		// 	entries: ['*']
		// },
		alias: {
            $content: path.resolve('./src/content')
        }

	}
};

export default config;
