# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server (localhost:5173)
npm run build        # Production build (outputs to build/)
npm run preview      # Preview the production build
npm run check        # TypeScript + Svelte type-check
npm run lint         # Check formatting with Prettier
npm run format       # Auto-fix formatting
```

There are no automated tests. Type-checking (`npm run check`) is the primary correctness gate.

## Architecture

This is a **SvelteKit portfolio/blog** deployed to **Vercel** with static prerendering. All pages set `export const prerender = true`.

### Routing and Internationalization

All content routes live under `src/routes/[lang]/` where `lang` is `en` or `it`. Language detection happens in `src/routes/+layout.ts`, which reads the first URL path segment and sets the locale via `sveltekit-i18n`. The default language is `en` (set in `src/lib/i18n/lang.store.ts`).

UI strings live in `src/lib/i18n/en/en.json` and `src/lib/i18n/it/it.json`. Access them in components with the `$t('key')` store from `$lib/i18n`.

### Content Loading Pattern

All content types (blog, projects, events) follow the same pattern:

1. Markdown files live in `src/content/{type}/{lang}/*.md` with YAML frontmatter
2. A loader utility in `src/lib/utils/*-loader-utils.ts` uses `import.meta.glob()` to enumerate files at build time via `src/lib/utils/md-loader-utils.ts`
3. `[slug]/+page.ts` does a dynamic `import(\`../../content/{type}/${lang}/${slug}.md\`)` to load the individual file

**mdsvex** (configured in `svelte.config.js`) treats `.md` files as Svelte components, making the `metadata` export available from frontmatter and `default` as the rendered component.

### Resume / CV Data

Resume data is JSON-based, not Markdown. Files in `src/content/resume/` (`en.json`, `it.json`, `common.json`) are merged at load time in `src/lib/utils/config-utils.ts`. `common.json` holds skills and shared data; the lang-specific files hold localized text.

### Path Aliases

- `$lib` → `src/lib/`
- `$content` → `src/content/` (configured in `svelte.config.js`)

### Styling

Tailwind CSS with a custom dark-mode-first design system. The color palette uses Material Design 3 surface token naming (`surface`, `surface-container`, `on-surface`, etc.) plus custom palettes (`cv`, `jm`, `lapislazuli`, `verdigris`). Dark mode is toggled via the `dark` class on the root element.

Custom fonts: `Plus Jakarta Sans` (headline), `Inter` (body/label) — both set as Tailwind `fontFamily` extensions.

Print-specific styles use the custom `print:` Tailwind variant (defined in `tailwind.config.ts` as a media query breakpoint).

### Special Routes

- `src/routes/[lang]/cv/` — interactive CV/resume page
- `src/routes/[lang]/print/` — print-optimized resume layout
- `src/routes/pdfen/` and `src/routes/pdfit/` — PDF generation routes using Puppeteer/html-to-pdf
- `src/routes/welcome/` — standalone welcome page (outside `[lang]`)
- `src/routes/animate/` — Three.js animation experiments

### Adding New Content

To add a new blog post or project:
1. Create `src/content/{type}/{lang}/{slug}.md` with appropriate frontmatter (`title`, `date`, `description`)
2. Create both `en/` and `it/` versions (the loader falls back to `defaultLang` if the lang version is missing)
3. No route registration needed — glob loading picks it up automatically
