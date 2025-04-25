<script module lang="ts">
	export type ThemeAvailable = 'dark' | 'light' | 'system';
</script>

<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { writable } from 'svelte/store';

	let resolvedTheme: ThemeAvailable = 'dark';
	let otherTheme = $state<ThemeAvailable>('light');
	let mounted = $state(false);
	let isDark = $state(true); ;

	// Store per gestire il tema
	export const theme = writable<ThemeAvailable>('dark');

	onMount(() => {
		mounted = true;
		let media = window.matchMedia('(prefers-color-scheme: dark)');

		function onMediaChange() {
			const systemTheme = media.matches ? 'dark' : 'light';
		}

		onMediaChange();
		media.addEventListener('change', onMediaChange);

		onDestroy(() => {
			media.removeEventListener('change', onMediaChange);
		});

		theme.subscribe((value) => {
			document.documentElement.setAttribute('data-theme', value);
            document.documentElement.classList.toggle('dark', value === 'dark');

		});
	});

	function setTheme(newTheme: ThemeAvailable): any {
		theme.set(newTheme);
		resolvedTheme = newTheme;
		otherTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
		isDark = resolvedTheme === 'dark';
	}
</script>

<button
	type="button"
	aria-label={mounted ? `Switch to ${otherTheme} theme` : 'Toggle theme'}
	onclick={() => setTheme(otherTheme)}
	class="group rounded-full bg-white/90 px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-sm transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
>
	{#if isDark}
		<!-- MoonIcon -->
		<svg
			viewBox="0 0 24 24"
			class="h-6 w-6 fill-zinc-700 stroke-zinc-500 transition dark:block [@media(prefers-color-scheme:dark)]:group-hover:stroke-zinc-400 [@media_not_(prefers-color-scheme:dark)]:fill-teal-400/10 [@media_not_(prefers-color-scheme:dark)]:stroke-teal-500"
		>
			<path
				d="M17.25 16.22a6.937 6.937 0 0 1-9.47-9.47 7.451 7.451 0 1 0 9.47 9.47ZM12.75 7C17 7 17 2.75 17 2.75S17 7 21.25 7C17 7 17 11.25 17 11.25S17 7 12.75 7Z"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			></path>
		</svg>
	{:else}
		<!-- SunIcon -->
		<svg
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="ìh-6 w-6 fill-zinc-100 stroke-zinc-500 transition group-hover:fill-zinc-200 group-hover:stroke-zinc-700 dark:hidden [@media(prefers-color-scheme:dark)]:fill-teal-50 [@media(prefers-color-scheme:dark)]:stroke-teal-500 [@media(prefers-color-scheme:dark)]:group-hover:fill-teal-50 [@media(prefers-color-scheme:dark)]:group-hover:stroke-teal-600"
		>
			<path
				d="M8 12.25A4.25 4.25 0 0 1 12.25 8v0a4.25 4.25 0 0 1 4.25 4.25v0a4.25 4.25 0 0 1-4.25 4.25v0A4.25 4.25 0 0 1 8 12.25v0Z"
			></path>
			<path
				d="M12.25 3v1.5M21.5 12.25H20M18.791 18.791l-1.06-1.06M18.791 5.709l-1.06 1.06M12.25 20v1.5M4.5 12.25H3M6.77 6.77 5.709 5.709M6.77 17.73l-1.061 1.061"
				fill="none"
			></path>
		</svg>
	{/if}
</button>
