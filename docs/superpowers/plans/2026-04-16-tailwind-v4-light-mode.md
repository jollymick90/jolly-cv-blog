# Tailwind v4 Migration + Light Mode Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate Tailwind CSS from v3 to v4, introduce a "Digital Whitepaper" light mode alongside the existing "Digital Blueprint" dark mode, and add a persistent theme toggle in the header and floating.

**Architecture:** CSS-first theming via CSS custom properties in `tw.css`. Semantic color tokens live in `@theme` (light values as default) and are overridden in `[data-theme=dark]`. A Svelte store manages localStorage persistence and writes `data-theme` to `<html>`. Tailwind v4 is loaded via `@tailwindcss/vite` Vite plugin — no PostCSS config needed.

**Tech Stack:** Tailwind CSS v4, `@tailwindcss/vite`, SvelteKit 2, Svelte 5 runes, `$app/environment`, localStorage

---

## Context

**Current state:**
- `tailwindcss@^3.4.17` via PostCSS plugin (`postcss.config.js`)
- All colors hardcoded as hex in `tailwind.config.ts` — always dark (Blueprint)
- `@custom-variant dark` already written in `tw.css` but is a no-op in v3 (v4-only syntax)
- `src/app.html` has `data-theme="dark"` already set on `<html>`
- `AppHeader` and `AppFooter` have `bg-[#131b2e]` hardcoded (dark-only)
- `ArticleLayout.svelte` uses `prose prose-invert` (dark-only)

**After migration:**
- `tailwindcss@^4` via `@tailwindcss/vite` Vite plugin
- All semantic tokens as CSS variables in `tw.css`; light = default, dark = `[data-theme=dark]` override
- `@custom-variant dark` becomes functional
- Theme toggle in `AppHeader` + floating `fixed bottom-6 right-6`
- Preference persisted in `localStorage` key `theme`

---

## File Map

| File | Action |
|---|---|
| `package.json` | Remove `tailwindcss@3`, `autoprefixer`; add `tailwindcss@4`, `@tailwindcss/vite` |
| `vite.config.ts` | Add `tailwindcss()` plugin (before `sveltekit()`) |
| `postcss.config.js` | **Delete** |
| `tailwind.config.ts` | **Delete** (plugins move to `@plugin` in tw.css) |
| `src/routes/[lang]/tw.css` | **Full rewrite**: `@import 'tailwindcss'`, `@plugin`, `@custom-variant`, `@theme`, `[data-theme=dark]` |
| `src/app.html` | Remove `.dark` class from `<html>`; add inline `<script>` for FWOT |
| `src/lib/stores/theme.store.ts` | **Create**: writable store with `init()` and `toggle()` |
| `src/routes/+layout.svelte` | Add `onMount(() => themeStore.init())` |
| `src/lib/components/shell/ThemeToggle.svelte` | **Create**: compact sun/moon button |
| `src/lib/components/shell/FloatingThemeToggle.svelte` | **Create**: fixed-position toggle |
| `src/lib/components/shell/AppHeader.svelte` | Fix `bg-[#131b2e]` → `bg-surface-container-low`; add `<ThemeToggle />` |
| `src/lib/components/shell/AppFooter.svelte` | Fix `bg-[#131b2e]` → `bg-surface-container-low` |
| `src/lib/components/blog/ArticleLayout.svelte` | Fix `prose-invert` → `dark:prose-invert` |
| `src/routes/[lang]/+layout.svelte` | Add `<FloatingThemeToggle />` |

---

## Task 1: Build system — Tailwind v4 packages

**Files:**
- Modify: `package.json`
- Modify: `vite.config.ts`
- Delete: `postcss.config.js`
- Delete: `tailwind.config.ts`

- [ ] **Step 1: Update package.json dependencies**

Remove `tailwindcss@3` and `autoprefixer`, add `tailwindcss@4` and `@tailwindcss/vite`:

```bash
cd /path/to/jolly-cv-blog
npm uninstall tailwindcss autoprefixer
npm install -D tailwindcss@^4 @tailwindcss/vite
```

- [ ] **Step 2: Update `vite.config.ts`**

Replace the entire file content:

```ts
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()]
});
```

Note: `tailwindcss()` MUST come before `sveltekit()`.

- [ ] **Step 3: Delete `postcss.config.js`**

```bash
rm postcss.config.js
```

- [ ] **Step 4: Delete `tailwind.config.ts`**

```bash
rm tailwind.config.ts
```

Plugins will be declared via `@plugin` in `tw.css` in Task 2.

- [ ] **Step 5: Verify the build doesn't crash yet**

```bash
npm run build 2>&1 | head -40
```

Expected: build may fail because `tw.css` still imports v3 paths. That is fine — Task 2 fixes it. If the error is ONLY about CSS imports, proceed. If there are TypeScript errors, investigate before continuing.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json vite.config.ts
git rm postcss.config.js tailwind.config.ts
git commit -m "build: migrate to Tailwind v4 via @tailwindcss/vite"
```

---

## Task 2: tw.css — full rewrite with @theme and dark override

**Files:**
- Rewrite: `src/routes/[lang]/tw.css`

This is the single source of truth for all design tokens.

- [ ] **Step 1: Replace `src/routes/[lang]/tw.css` with the following content**

```css
@import 'tailwindcss';
@import "/node_modules/flag-icons/css/flag-icons.min.css";

@plugin "@tailwindcss/typography";
@plugin "@tailwindcss/forms";
@plugin "@tailwindcss/container-queries";

@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));

@theme {
  /* ── Typography scale ── */
  --text-xs: 0.8125rem;
  --text-xs--line-height: 1.5rem;
  --text-sm: 0.875rem;
  --text-sm--line-height: 1.5rem;
  --text-base: 1rem;
  --text-base--line-height: 1.75rem;
  --text-lg: 1.125rem;
  --text-lg--line-height: 1.75rem;
  --text-xl: 1.25rem;
  --text-xl--line-height: 2rem;
  --text-2xl: 1.5rem;
  --text-2xl--line-height: 2rem;
  --text-3xl: 1.875rem;
  --text-3xl--line-height: 2.25rem;
  --text-4xl: 2rem;
  --text-4xl--line-height: 2.5rem;
  --text-5xl: 3rem;
  --text-5xl--line-height: 3.5rem;
  --text-6xl: 3.75rem;
  --text-6xl--line-height: 1;
  --text-7xl: 4.5rem;
  --text-7xl--line-height: 1;
  --text-8xl: 6rem;
  --text-8xl--line-height: 1;
  --text-9xl: 8rem;
  --text-9xl--line-height: 1;

  /* ── Font families ── */
  --font-headline: "Plus Jakarta Sans";
  --font-body: "Inter";
  --font-label: "Inter";

  /* ── Custom variants (print/screen breakpoints) ── */
  --breakpoint-print: print;
  --breakpoint-screen: screen;

  /* ══════════════════════════════════════════════════
     SEMANTIC TOKENS — Light default (Digital Whitepaper)
     ══════════════════════════════════════════════════ */
  --color-background: #faf8ff;
  --color-on-background: #131b2e;
  --color-surface: #faf8ff;
  --color-surface-dim: #e8eaf6;
  --color-surface-bright: #ffffff;
  --color-surface-container-lowest: #ffffff;
  --color-surface-container-low: #f2f3ff;
  --color-surface-container: #eaedff;
  --color-surface-container-high: #e2e7ff;
  --color-surface-container-highest: #dae2fd;
  --color-surface-variant: #e3e4f4;
  --color-on-surface: #131b2e;
  --color-on-surface-variant: #44464e;
  --color-inverse-surface: #2e3192;
  --color-inverse-on-surface: #f1f0f7;
  --color-outline: #74757d;
  --color-outline-variant: #c3c5d9;

  --color-primary: #0046c9;
  --color-on-primary: #ffffff;
  --color-primary-container: #dce1ff;
  --color-on-primary-container: #001258;

  --color-secondary: #5f6377;
  --color-on-secondary: #ffffff;
  --color-secondary-container: #e3e4f7;
  --color-on-secondary-container: #1b1e30;

  --color-tertiary: #465a00;
  --color-on-tertiary: #ffffff;
  --color-tertiary-container: #c6ef83;
  --color-on-tertiary-container: #132000;

  --color-error: #ba1a1a;
  --color-on-error: #ffffff;
  --color-error-container: #ffdad6;
  --color-on-error-container: #410002;

  /* ══════════════════════════════════════════════════
     STATIC TOKENS — Custom palettes (never change with theme)
     ══════════════════════════════════════════════════ */
  --color-white: #ffffff;
  --color-cv-primary: #C7AB95;
  --color-cv-secondary: #BABABA;
  --color-exp-base: #67e8f9;
  --color-exp-work: #57cc99;
  --color-exp-pro: #84574a;

  --color-cv-50: #f9f6f3;
  --color-cv-100: #f1eae3;
  --color-cv-200: #e1d3c7;
  --color-cv-300: #c7ab95;
  --color-cv-400: #ba947d;
  --color-cv-500: #ac7c63;
  --color-cv-600: #9e6b58;
  --color-cv-700: #84574a;
  --color-cv-800: #6c4840;
  --color-cv-900: #583d36;
  --color-cv-950: #2f1f1b;

  --color-jm: #22d3ee;
  --color-jm-100: #cffafe;
  --color-jm-200: #a5f3fc;
  --color-jm-300: #67e8f9;
  --color-jm-400: #22d3ee;
  --color-jm-500: #06b6d4;
  --color-jm-600: #0891b2;
  --color-jm-700: #0e7490;
  --color-jm-800: #155e75;
  --color-jm-900: #164e63;

  --color-lapislazuli: #22577a;
  --color-lapislazuli-100: #071219;
  --color-lapislazuli-200: #0e2331;
  --color-lapislazuli-300: #15354a;
  --color-lapislazuli-400: #1c4663;
  --color-lapislazuli-500: #22577a;
  --color-lapislazuli-600: #327fb2;
  --color-lapislazuli-700: #5aa1d1;
  --color-lapislazuli-800: #91c1e0;
  --color-lapislazuli-900: #c8e0f0;

  --color-verdigris: #38a3a5;
  --color-verdigris-100: #0b2021;
  --color-verdigris-200: #164141;
  --color-verdigris-300: #226162;
  --color-verdigris-400: #2d8183;
  --color-verdigris-500: #38a3a5;
  --color-verdigris-600: #52c2c4;
  --color-verdigris-700: #7dd1d3;
  --color-verdigris-800: #a8e0e1;
  --color-verdigris-900: #d4f0f0;

  --color-emerald: #57cc99;
  --color-emerald-100: #0e2c1f;
  --color-emerald-200: #1b593e;
  --color-emerald-300: #29855d;
  --color-emerald-400: #37b27c;
  --color-emerald-500: #57cc99;
  --color-emerald-600: #79d6ad;
  --color-emerald-700: #9ae0c2;
  --color-emerald-800: #bcead6;
  --color-emerald-900: #ddf5eb;

  --color-lightgreen: #80ed99;
  --color-lightgreen-100: #094016;
  --color-lightgreen-200: #12812c;
  --color-lightgreen-300: #1cc142;
  --color-lightgreen-400: #42e468;
  --color-lightgreen-500: #80ed99;
  --color-lightgreen-600: #9bf1af;
  --color-lightgreen-700: #b4f4c3;
  --color-lightgreen-800: #cdf8d7;
  --color-lightgreen-900: #e6fbeb;

  --color-teagreen: #c7f9cc;
  --color-teagreen-100: #095110;
  --color-teagreen-200: #11a220;
  --color-teagreen-300: #25e839;
  --color-teagreen-400: #76f183;
  --color-teagreen-500: #c7f9cc;
  --color-teagreen-600: #d3fad7;
  --color-teagreen-700: #defce1;
  --color-teagreen-800: #e9fdeb;
  --color-teagreen-900: #f4fef5;
}

/* ══════════════════════════════════════════════════
   Dark override (Digital Blueprint)
   Applied when <html data-theme="dark">
   ══════════════════════════════════════════════════ */
[data-theme=dark] {
  --color-background: #0b1326;
  --color-on-background: #dae2fd;
  --color-surface: #0b1326;
  --color-surface-dim: #0b1326;
  --color-surface-bright: #31394d;
  --color-surface-container-lowest: #060e20;
  --color-surface-container-low: #131b2e;
  --color-surface-container: #171f33;
  --color-surface-container-high: #222a3d;
  --color-surface-container-highest: #2d3449;
  --color-surface-variant: #2d3449;
  --color-on-surface: #dae2fd;
  --color-on-surface-variant: #c6c6cd;
  --color-inverse-surface: #dae2fd;
  --color-inverse-on-surface: #283044;
  --color-outline: #909097;
  --color-outline-variant: #45464d;

  --color-primary: #bec6e0;
  --color-on-primary: #283044;
  --color-primary-container: #0f172a;
  --color-on-primary-container: #798098;

  --color-secondary: #b9c7e0;
  --color-on-secondary: #233144;
  --color-secondary-container: #3c4a5e;
  --color-on-secondary-container: #abb9d2;

  --color-tertiary: #b3d17a;
  --color-on-tertiary: #243600;
  --color-tertiary-container: #101b00;
  --color-on-tertiary-container: #6f8a3c;

  --color-error: #ffb4ab;
  --color-on-error: #690005;
  --color-error-container: #93000a;
  --color-on-error-container: #ffdad6;
}

/* ── Global ── */
@media print { body { -webkit-print-color-adjust: exact; } }
html { scroll-behavior: smooth; }
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build 2>&1 | tail -20
```

Expected: build completes successfully. If there are errors about missing utilities, check if the utility name changed in v4 (e.g., `text-ellipsis` instead of `overflow-ellipsis`).

- [ ] **Step 3: Verify type-check passes**

```bash
npm run check 2>&1 | tail -20
```

Expected: 0 errors (pre-existing warnings about unrelated files are acceptable).

- [ ] **Step 4: Commit**

```bash
git add src/routes/\[lang\]/tw.css
git commit -m "feat: migrate all design tokens to tw.css @theme with light/dark CSS variables"
```

---

## Task 3: FWOT prevention — inline theme script in app.html

**Files:**
- Modify: `src/app.html`

Without this inline script, users with a saved `light` preference will see a dark flash on page load (because `data-theme="dark"` is the HTML default). The script runs synchronously before paint.

- [ ] **Step 1: Update `src/app.html`**

Replace the entire file content:

```html
<!doctype html>
<html lang="en" class="h-full antialiased" data-theme="dark">
	<head>
		<meta charset="utf-8" />
		<link rel="icon" href="%sveltekit.assets%/favicon.png" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet"/>
		<link
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
  rel="stylesheet"
/>
<style>
  .material-symbols-outlined {
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
  }
</style>
		<script>
			(function() {
				var t = localStorage.getItem('theme');
				if (t === 'light' || t === 'dark') {
					document.documentElement.setAttribute('data-theme', t);
				}
			})();
		</script>
		%sveltekit.head%
	</head>
	<body class="flex flex-col min-h-screen bg-background text-on-background font-body selection:bg-tertiary selection:text-on-tertiary"
	 	data-sveltekit-preload-data="hover">
		<div style="display: contents">%sveltekit.body%</div>
	</body>
</html>
```

Key changes from original:
- Removed `dark` class from `<html>` (was Tailwind v3 approach, no longer needed)
- Added inline `<script>` before `%sveltekit.head%` that reads localStorage and applies `data-theme`
- `data-theme="dark"` remains as the HTML default (no flash for dark users)

- [ ] **Step 2: Verify no build errors**

```bash
npm run build 2>&1 | tail -10
```

Expected: successful build, no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app.html
git commit -m "feat: add inline theme script to prevent flash of wrong theme"
```

---

## Task 4: Theme store + root layout init

**Files:**
- Create: `src/lib/stores/theme.store.ts`
- Modify: `src/routes/+layout.svelte`

- [ ] **Step 1: Create `src/lib/stores/theme.store.ts`**

```ts
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
      const current = localStorage.getItem(STORAGE_KEY) === 'light' ? 'light' : 'dark';
      const next: Theme = current === 'dark' ? 'light' : 'dark';
      localStorage.setItem(STORAGE_KEY, next);
      document.documentElement.setAttribute('data-theme', next);
      set(next);
    }
  };
}

export const themeStore = createThemeStore();
```

- [ ] **Step 2: Update `src/routes/+layout.svelte`**

Replace the entire file content:

```svelte
<script lang="ts">
	import { onMount } from 'svelte';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import { langStore } from '$lib/i18n/lang.store';
	import { dev } from '$app/environment';
	import { themeStore } from '$lib/stores/theme.store';

	injectAnalytics({ mode: dev ? 'development' : 'production' });

	let { children, data } = $props();
	langStore.set(data.lang);

	onMount(() => {
		themeStore.init();
	});
</script>
{@render children()}
```

- [ ] **Step 3: Type-check**

```bash
npm run check 2>&1 | grep -E "error|Error"
```

Expected: no errors related to the new store or layout.

- [ ] **Step 4: Commit**

```bash
git add src/lib/stores/theme.store.ts src/routes/+layout.svelte
git commit -m "feat: add theme store with localStorage persistence"
```

---

## Task 5: ThemeToggle components

**Files:**
- Create: `src/lib/components/shell/ThemeToggle.svelte`
- Create: `src/lib/components/shell/FloatingThemeToggle.svelte`

- [ ] **Step 1: Create `src/lib/components/shell/ThemeToggle.svelte`**

Compact toggle for the header. Shows `light_mode` icon when in dark (to switch to light), `dark_mode` icon when in light (to switch to dark).

```svelte
<script lang="ts">
  import { themeStore } from '$lib/stores/theme.store';
</script>

<button
  onclick={themeStore.toggle}
  class="flex items-center justify-center text-primary hover:text-tertiary transition-colors"
  aria-label={$themeStore === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
>
  {#if $themeStore === 'dark'}
    <span class="material-symbols-outlined text-[20px]">light_mode</span>
  {:else}
    <span class="material-symbols-outlined text-[20px]">dark_mode</span>
  {/if}
</button>
```

- [ ] **Step 2: Create `src/lib/components/shell/FloatingThemeToggle.svelte`**

Fixed-position toggle, visible on all pages. Larger hit target for mobile.

```svelte
<script lang="ts">
  import { themeStore } from '$lib/stores/theme.store';
</script>

<button
  onclick={themeStore.toggle}
  class="fixed bottom-6 right-6 z-50
         w-11 h-11 flex items-center justify-center
         bg-surface-container border border-outline-variant/15
         text-on-surface hover:text-tertiary
         transition-colors"
  aria-label={$themeStore === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
>
  {#if $themeStore === 'dark'}
    <span class="material-symbols-outlined text-[20px]">light_mode</span>
  {:else}
    <span class="material-symbols-outlined text-[20px]">dark_mode</span>
  {/if}
</button>
```

- [ ] **Step 3: Type-check**

```bash
npm run check 2>&1 | grep -E "error|Error"
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/lib/components/shell/ThemeToggle.svelte src/lib/components/shell/FloatingThemeToggle.svelte
git commit -m "feat: add ThemeToggle and FloatingThemeToggle components"
```

---

## Task 6: Fix hardcoded colors and prose

**Files:**
- Modify: `src/lib/components/shell/AppHeader.svelte`
- Modify: `src/lib/components/shell/AppFooter.svelte`
- Modify: `src/lib/components/blog/ArticleLayout.svelte`

These files have dark-only hardcoded values that break in light mode.

- [ ] **Step 1: Fix `AppHeader.svelte` — background color**

In `src/lib/components/shell/AppHeader.svelte`, line 21, find:
```svelte
<header class="fixed top-0 w-full z-50 bg-[#131b2e] flex justify-between items-center px-6 py-4 border-b border-outline-variant/15">
```

Replace with:
```svelte
<header class="fixed top-0 w-full z-50 bg-surface-container-low flex justify-between items-center px-6 py-4 border-b border-outline-variant/15">
```

- [ ] **Step 2: Fix `AppFooter.svelte` — background color**

In `src/lib/components/shell/AppFooter.svelte`, line 6, find:
```svelte
<footer class="relative w-full py-12 bg-[#131b2e] flex flex-col items-center gap-4 px-8 pb-24 md:pb-12 text-center border-t border-outline-variant/15">
```

Replace with:
```svelte
<footer class="relative w-full py-12 bg-surface-container-low flex flex-col items-center gap-4 px-8 pb-24 md:pb-12 text-center border-t border-outline-variant/15">
```

- [ ] **Step 3: Fix `ArticleLayout.svelte` — prose invert**

In `src/lib/components/blog/ArticleLayout.svelte`, find the prose div (around line 88):
```svelte
    <div class="prose prose-invert max-w-none
```

Replace with:
```svelte
    <div class="prose dark:prose-invert max-w-none
```

`prose` alone styles for light mode. `dark:prose-invert` adds dark overrides when `[data-theme=dark]` is active.

- [ ] **Step 4: Type-check**

```bash
npm run check 2>&1 | grep -E "error|Error"
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/lib/components/shell/AppHeader.svelte \
        src/lib/components/shell/AppFooter.svelte \
        src/lib/components/blog/ArticleLayout.svelte
git commit -m "fix: replace hardcoded dark colors with semantic tokens; fix prose invert"
```

---

## Task 7: Layout integration + final verification

**Files:**
- Modify: `src/lib/components/shell/AppHeader.svelte`
- Modify: `src/routes/[lang]/+layout.svelte`

- [ ] **Step 1: Add `<ThemeToggle />` to `AppHeader.svelte`**

In `src/lib/components/shell/AppHeader.svelte`, add the import and the toggle component.

Add import after the existing imports in `<script>`:
```svelte
<script lang="ts">
  import { page } from '$app/state';
  import MaterialIcon from './MaterialIcon.svelte';
  import LangDropdown from './LangDropdown.svelte';
  import ThemeToggle from './ThemeToggle.svelte';
  import type { LangAvailable } from '$lib/types';
  // ... rest of script unchanged
```

In the `<div class="flex items-center gap-4">` section (the right side of header), add `<ThemeToggle />` next to `<LangDropdown />`:
```svelte
  <div class="flex items-center gap-4">
    <span class="hidden md:block text-[10px] font-bold text-primary tracking-widest opacity-60">
      STATUS: AVAILABLE
    </span>
    <ThemeToggle />
    <LangDropdown {lang} />
  </div>
```

- [ ] **Step 2: Add `<FloatingThemeToggle />` to `src/routes/[lang]/+layout.svelte`**

Replace entire file content:

```svelte
<script lang="ts">
  import AppHeader from '$lib/components/shell/AppHeader.svelte';
  import AppFooter from '$lib/components/shell/AppFooter.svelte';
  import BottomNav from '$lib/components/shell/BottomNav.svelte';
  import FloatingThemeToggle from '$lib/components/shell/FloatingThemeToggle.svelte';
  import './tw.css';

  let { children, data } = $props();
  const lang = $derived(data.lang);
  const isFullScreen = $derived(data.isFullScreen);
</script>

{#if isFullScreen}
  {@render children()}
{:else}
  <AppHeader {lang} />
  <main class="pt-16 pb-20 min-h-screen bg-background text-on-background">
    {@render children()}
  </main>
  <AppFooter {lang} />
  <BottomNav {lang} />
  <FloatingThemeToggle />
{/if}
```

- [ ] **Step 3: Full type-check**

```bash
npm run check
```

Expected: 0 errors (pre-existing unrelated warnings are acceptable).

- [ ] **Step 4: Build**

```bash
npm run build
```

Expected: successful build, no errors.

- [ ] **Step 5: Start dev server and verify manually**

```bash
npm run dev
```

Open `http://localhost:5173/en`. Verify:
1. Site loads in dark mode (Blueprint) by default
2. Theme toggle appears in header (top right, next to language selector)
3. Floating toggle appears bottom-right
4. Clicking either toggle switches to light mode (Whitepaper — off-white background, dark text)
5. Clicking again returns to dark mode
6. Refresh the page — theme preference is preserved (no flash)
7. Open a blog article (`/en/blog/005-post-20240101`) — verify prose is readable in both modes
8. Check AppHeader and AppFooter backgrounds switch correctly with theme

- [ ] **Step 6: Final commit**

```bash
git add src/lib/components/shell/AppHeader.svelte \
        src/routes/\[lang\]/+layout.svelte
git commit -m "feat: integrate ThemeToggle into header and floating position"
```
