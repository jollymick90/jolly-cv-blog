# Tailwind v4 Migration + Light Mode Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate from Tailwind CSS v3 to v4, and add a "Digital Whitepaper" light mode alongside the existing "Digital Blueprint" dark mode, with a persistent theme toggle in the header and floating.

**Architecture:** CSS-first theming via CSS custom properties in `tw.css`. The `[data-theme=dark]` attribute on `<html>` drives all theme switching — no `dark:` class prefixes needed on components. A Svelte store manages localStorage persistence and DOM sync. Tailwind v4 is loaded via `@tailwindcss/vite` plugin instead of PostCSS.

**Tech Stack:** Tailwind CSS v4, `@tailwindcss/vite`, SvelteKit 2, Svelte 5 runes, localStorage

---

## Design Decisions

### Theme system
- **Default:** Dark (Digital Blueprint) — the portfolio's primary identity
- **Persistence:** `localStorage` key `theme`, values `"dark"` | `"light"`
- **Mechanism:** `data-theme` attribute on `<html>` element, driven by a Svelte store
- **SSR safety:** Store initializes only in browser (`if (browser)` guard from `$app/environment`); `data-theme="dark"` is the HTML default to prevent flash of wrong theme (FWOT)

### Color strategy
- Semantic tokens (surface, primary, tertiary, etc.) are CSS variables defined in `@theme` with light (Whitepaper) values as default
- `[data-theme=dark]` block overrides all semantic tokens with dark (Blueprint) values
- Custom palettes (`cv`, `jm`, `lapislazuli`, `verdigris`, `emerald`, `lightgreen`, `teagreen`) are static — defined once in `@theme`, do not change with theme
- Font families and screens are also static in `@theme`

### Components
- All existing Digital Blueprint components remain unchanged — `bg-surface`, `text-primary` etc. adapt automatically via CSS variables
- No `dark:` prefix classes in new code — theme is purely CSS-variable driven
- Old legacy components (Resume v1-v4, old layouts) are removed as part of total migration

### Fonts
- Same fonts for both themes: `Plus Jakarta Sans` (headline), `Inter` (body/label)
- The "Digital Whitepaper" spec suggests Space Grotesk + Public Sans but this diverges from the established brand — fonts are kept consistent

---

## Files

### Deleted
- `postcss.config.js` — replaced by `@tailwindcss/vite`

### Modified

| File | Change |
|---|---|
| `package.json` | Remove `tailwindcss@^3`, add `tailwindcss@^4` + `@tailwindcss/vite` |
| `vite.config.ts` | Add `tailwindcss()` from `@tailwindcss/vite` as first plugin |
| `tailwind.config.ts` | Keep only plugin list (`typography`, `forms`, `container-queries`); remove all theme config |
| `src/routes/[lang]/tw.css` | Full rewrite: `@import 'tailwindcss'`, `@theme` with all tokens (light default), `[data-theme=dark]` override block |
| `src/lib/components/shell/AppHeader.svelte` | Add `<ThemeToggle />` next to `<LangSelect />` |
| `src/routes/[lang]/+layout.svelte` | Add `<FloatingThemeToggle />` outside `<main>` |
| `src/routes/+layout.svelte` | Call `initTheme()` in `onMount` to sync store with localStorage |
| `src/app.html` | Add inline `<script>` before `<body>` to set `data-theme` synchronously (prevents FWOT) |

### Created

| File | Purpose |
|---|---|
| `src/lib/stores/theme.store.ts` | Writable store: reads localStorage, writes `data-theme` to `<html>`, exposes `toggleTheme()` |
| `src/lib/components/shell/ThemeToggle.svelte` | Compact sun/moon toggle for AppHeader |
| `src/lib/components/shell/FloatingThemeToggle.svelte` | Fixed-position `bottom-6 right-6` toggle for mobile/global access |

---

## Color Token Mapping

### Semantic tokens (change with theme)

| Token | Light — Digital Whitepaper | Dark — Digital Blueprint |
|---|---|---|
| `background` | `#faf8ff` | `#0b1326` |
| `on-background` | `#131b2e` | `#dae2fd` |
| `surface` | `#faf8ff` | `#0b1326` |
| `surface-dim` | `#e8eaf6` | `#0b1326` |
| `surface-bright` | `#ffffff` | `#31394d` |
| `surface-container-lowest` | `#ffffff` | `#060e20` |
| `surface-container-low` | `#f2f3ff` | `#131b2e` |
| `surface-container` | `#eaedff` | `#171f33` |
| `surface-container-high` | `#e2e7ff` | `#222a3d` |
| `surface-container-highest` | `#dae2fd` | `#2d3449` |
| `surface-variant` | `#e3e4f4` | `#2d3449` |
| `on-surface` | `#131b2e` | `#dae2fd` |
| `on-surface-variant` | `#44464e` | `#c6c6cd` |
| `inverse-surface` | `#2e3192` | `#dae2fd` |
| `inverse-on-surface` | `#f1f0f7` | `#283044` |
| `outline` | `#74757d` | `#909097` |
| `outline-variant` | `#c3c5d9` | `#45464d` |
| `primary` | `#0046c9` | `#bec6e0` |
| `on-primary` | `#ffffff` | `#283044` |
| `primary-container` | `#dce1ff` | `#0f172a` |
| `on-primary-container` | `#001258` | `#798098` |
| `secondary` | `#5f6377` | `#b9c7e0` |
| `on-secondary` | `#ffffff` | `#233144` |
| `secondary-container` | `#e3e4f7` | `#3c4a5e` |
| `on-secondary-container` | `#1b1e30` | `#abb9d2` |
| `tertiary` | `#465a00` | `#b3d17a` |
| `on-tertiary` | `#ffffff` | `#243600` |
| `tertiary-container` | `#c6ef83` | `#101b00` |
| `on-tertiary-container` | `#132000` | `#6f8a3c` |
| `error` | `#ba1a1a` | `#ffb4ab` |
| `on-error` | `#ffffff` | `#690005` |
| `error-container` | `#ffdad6` | `#93000a` |
| `on-error-container` | `#410002` | `#ffdad6` |

### Static tokens (never change)

Custom palettes stay in `@theme` without any dark override:
- `cv` (10 shades: `#f9f6f3` → `#2f1f1b`)
- `jm` (10 shades: `#cffafe` → `#164e63`)
- `lapislazuli` (10 shades)
- `verdigris` (10 shades)
- `emerald` (10 shades)
- `lightgreen` (10 shades)
- `teagreen` (10 shades)
- `exp-base`, `exp-work`, `exp-pro`, `cv-primary`, `cv-secondary`
- `white: #ffffff`

### Font families (static)

```css
@theme {
  --font-headline: "Plus Jakarta Sans";
  --font-body: "Inter";
  --font-label: "Inter";
}
```

### Screens (static)

```css
@theme {
  --breakpoint-print: print;
  --breakpoint-screen: screen;
}
```

---

## tw.css Target Structure

```css
@import 'tailwindcss';
@import "/node_modules/flag-icons/css/flag-icons.min.css";

@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));

@theme {
  /* Typography scale */
  --text-xs: 0.8125rem;
  /* ... existing type scale ... */

  /* Fonts */
  --font-headline: "Plus Jakarta Sans";
  --font-body: "Inter";
  --font-label: "Inter";

  /* Screens */
  --breakpoint-print: print;
  --breakpoint-screen: screen;

  /* Light (Whitepaper) — default */
  --color-surface: #faf8ff;
  --color-on-surface: #131b2e;
  /* ... all semantic tokens with light values ... */

  /* Static palettes */
  --color-cv-50: #f9f6f3;
  /* ... etc ... */
}

/* Dark (Blueprint) — override */
[data-theme=dark] {
  --color-surface: #0b1326;
  --color-on-surface: #dae2fd;
  /* ... all semantic tokens with dark values ... */
}

/* Global */
@media print { body { -webkit-print-color-adjust: exact; } }
html { scroll-behavior: smooth; }
```

---

## Theme Store Interface

```ts
// src/lib/stores/theme.store.ts
export type Theme = 'dark' | 'light';

export const theme: Readable<Theme>;
export function toggleTheme(): void;
export function initTheme(): void; // called in onMount in root layout
```

`initTheme()` reads `localStorage`, applies `data-theme` to `document.documentElement`, and syncs the store. Called once in `onMount` of `src/routes/+layout.svelte` to avoid SSR issues.

---

## ThemeToggle Component Spec

**`ThemeToggle.svelte`** (header variant):
- Renders a `<button>` with sun icon (☀) when current theme is `dark`, moon icon (☾) when `light`
- On click: calls `toggleTheme()`
- Classes: `text-secondary hover:text-on-surface transition-colors` — matches AppHeader style
- Size: same as LangSelect button (`text-sm`)

**`FloatingThemeToggle.svelte`** (floating variant):
- `fixed bottom-6 right-6 z-50`
- Slightly larger hit target (44px min) for mobile
- Background: `bg-surface-container border border-outline-variant/15` — works in both themes via CSS variables
- Same icon logic as header variant

---

## SSR / Prerender Safety

The site uses `export const prerender = true` everywhere. To avoid FWOT (flash of wrong theme):

1. `<html>` tag has no `data-theme` attribute in the HTML template by default — the store sets it on `onMount`
2. Since default is `dark` and the CSS variables in `[data-theme=dark]` require the attribute, the `:root` (light) values will flash briefly on first load if there's no saved preference
3. **Solution:** Inline script in `src/app.html` that runs synchronously before paint:
   ```html
   <script>
     const t = localStorage.getItem('theme') ?? 'dark';
     document.documentElement.setAttribute('data-theme', t);
   </script>
   ```
   This is the standard technique for theme persistence without FWOT in SSG/SSR apps.

---

## Tailwind v4 Plugin Config

`tailwind.config.ts` after migration:

```ts
import type { Config } from 'tailwindcss';
import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

export default {
  plugins: [typography, forms, containerQueries]
} satisfies Config;
```

Everything else moves to `tw.css`.

---

## Out of Scope

- Changing fonts per theme (same fonts for both themes by design decision)
- Light/dark variants for CV print layout — print styles unchanged
- Animations or transition effects on theme switch (beyond CSS `transition` on color properties if desired)
- Per-component `dark:` class overrides — the CSS variable system handles everything
