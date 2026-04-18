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
		prerender: {
			handleHttpError: ({ status, path }) => {
				// Profile projects in common.json may not have a detail page yet — ignore their 404s
				if (status === 404 && path.startsWith('/en/project/') || path.startsWith('/it/project/')) return;
				throw new Error(`${status} ${path}`);
			}
		},
		alias: {
            $content: path.resolve('./src/content')
        }

	}
};

export default config;
