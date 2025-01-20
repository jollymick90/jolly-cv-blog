import type { Config } from 'tailwindcss';

import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				transparent: 'transparent',
				current: 'currentColor',
				'white': '#ffffff',
				'jm': {
				  100: '#cffafe',
				  200: '#a5f3fc',
				  300: '#67e8f9',
				  400: '#22d3ee',
				  500: '#06b6d4',
				  600: '#0891b2',
				  700: '#0e7490',
				  800: '#155e75',
				  900: '#164e63',
				},
			  },
		}
	},

	plugins: [typography, forms, containerQueries]
} satisfies Config;
