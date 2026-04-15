import type { Config } from 'tailwindcss';

import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			    
			screens: {
      			print: { raw: 'print' },
      			screen: { raw: 'screen' },
    		},
			colors: {
				transparent: 'transparent',
				current: 'currentColor',
				'background': '#0b1326',
				'on-background': '#dae2fd',
				'surface': '#0b1326',
				'surface-dim': '#0b1326',
				'surface-bright': '#31394d',
				'surface-container-lowest': '#060e20',
				'surface-container-low': '#131b2e',
				'surface-container': '#171f33',
				'surface-container-high': '#222a3d',
				'surface-container-highest': '#2d3449',
				'surface-variant': '#2d3449',
				'on-surface': '#dae2fd',
				'on-surface-variant': '#c6c6cd',
				'inverse-surface': '#dae2fd',
				'inverse-on-surface': '#283044',
				'outline': '#909097',
				'outline-variant': '#45464d',
				'primary': '#bec6e0',
				'on-primary': '#283044',
				'primary-container': '#0f172a',
				'on-primary-container': '#798098',
				'secondary': '#b9c7e0',
				'on-secondary': '#233144',
				'secondary-container': '#3c4a5e',
				'on-secondary-container': '#abb9d2',
				'tertiary': '#b3d17a',
				'on-tertiary': '#243600',
				'tertiary-container': '#101b00',
				'on-tertiary-container': '#6f8a3c',
				'error': '#ffb4ab',
				'on-error': '#690005',
				'error-container': '#93000a',
				'on-error-container': '#ffdad6',
				'cv-primary': '#C7AB95',
				'cv-secondary': '#BABABA',
				'exp-base': '#67e8f9',
				'exp-work': '#57cc99',
				'exp-pro': '#84574a',
				'cv': {
					'50': '#f9f6f3',
					'100': '#f1eae3',
					'200': '#e1d3c7',
					'300': '#c7ab95',
					'400': '#ba947d',
					'500': '#ac7c63',
					'600': '#9e6b58',
					'700': '#84574a',
					'800': '#6c4840',
					'900': '#583d36',
					'950': '#2f1f1b',
				},
				'white': '#ffffff',
				'jm': {
					DEFAULT: '#22d3ee',
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
				'lapislazuli': {
					DEFAULT: '#22577a',
					100: '#071219',
					200: '#0e2331',
					300: '#15354a',
					400: '#1c4663',
					500: '#22577a',
					600: '#327fb2',
					700: '#5aa1d1',
					800: '#91c1e0',
					900: '#c8e0f0'
				},
				'verdigris': {
					DEFAULT: '#38a3a5',
					100: '#0b2021',
					200: '#164141',
					300: '#226162',
					400: '#2d8183',
					500: '#38a3a5',
					600: '#52c2c4',
					700: '#7dd1d3',
					800: '#a8e0e1',
					900: '#d4f0f0'
				},
				'emerald': {
					DEFAULT: '#57cc99',
					100: '#0e2c1f',
					200: '#1b593e',
					300: '#29855d',
					400: '#37b27c',
					500: '#57cc99',
					600: '#79d6ad',
					700: '#9ae0c2',
					800: '#bcead6',
					900: '#ddf5eb'
				},
				'lightgreen': {
					DEFAULT: '#80ed99',
					100: '#094016',
					200: '#12812c',
					300: '#1cc142',
					400: '#42e468',
					500: '#80ed99',
					600: '#9bf1af',
					700: '#b4f4c3',
					800: '#cdf8d7',
					900: '#e6fbeb'
				},
				'teagreen': {
					DEFAULT: '#c7f9cc',
					100: '#095110',
					200: '#11a220',
					300: '#25e839',
					400: '#76f183',
					500: '#c7f9cc',
					600: '#d3fad7',
					700: '#defce1',
					800: '#e9fdeb',
					900: '#f4fef5'
				}
			},
			fontFamily: {
				headline: ["Plus Jakarta Sans"],
				body: ["Inter"],
				label: ["Inter"]
			}
		}
	},

	plugins: [typography, forms, containerQueries]
} satisfies Config;
