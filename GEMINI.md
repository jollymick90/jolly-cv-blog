# Project Overview

This project (`jolly-cv-blog`) is a personal portfolio, blog, and curriculum vitae built with **SvelteKit** (using Svelte 5). It relies on **Vite** for fast development and building, and is currently configured with `@sveltejs/adapter-vercel` for deployment on Vercel.

## Key Technologies

- **Framework**: Svelte 5 & SvelteKit
- **Language**: TypeScript
- **Styling**: Tailwind CSS (with `typography`, `forms`, and `container-queries` plugins). Custom themes and color palettes (e.g., `jm`, `lapislazuli`, `cv-primary`) are defined in `tailwind.config.ts`.
- **Content Parsing**: [MDSVex](https://mdsvex.pngwn.io/) is used to parse Markdown files (`.md`) as Svelte components, heavily utilized for blog posts, project descriptions, and event details.
- **Internationalization (i18n)**: Uses `sveltekit-i18n` for language support. The site structure supports at least English (`en`) and Italian (`it`).
- **PDF Generation**: Incorporates `puppeteer`, `html2pdf.js`, and `@sparticuz/chromium` for automated PDF resume generation.
- **Extras**: Includes `reveal.js` for deck/presentations, `three.js` for 3D elements, and `@svelte-put/qr` for QR code generation.

## Architecture

- **Routing System**: Uses SvelteKit's file-based routing (`src/routes/`). The core logic is structured around localized routes (e.g., `src/routes/[lang]/`).
- **Content**: Content is decoupled from the UI.
  - Markdown files for articles, projects, and events are in `src/content/`.
  - JSON data for resumes is in `src/content/resume/`.
  - An alias `$content` is mapped to `src/content` via `svelte.config.js`.
- **Components**: Reusable UI components, icons, theme logic, and utilities reside in `src/lib/`.
- **Static Assets**: All public-facing static files (images, generated PDFs, favicons) are stored in the `static/` directory.

## Building and Running

You can use standard `npm` commands to interact with the project:

- **Start Dev Server**: `npm run dev` (or `npm start` to open the browser automatically)
- **Build for Production**: `npm run build`
- **Preview Production Build**: `npm run preview`
- **Type Checking**: `npm run check` (Runs `svelte-check` and `svelte-kit sync`)
- **Formatting**: `npm run format` (Formats files using Prettier)
- **Linting**: `npm run lint` (Checks formatting using Prettier)

## Development Conventions

- **Component Styling**: Rely on Tailwind CSS utility classes rather than raw CSS or SCSS blocks whenever possible. Utilize the custom color tokens specified in `tailwind.config.ts`.
- **Svelte 5 Best Practices**: Because this project uses Svelte 5, prefer modern runes (`$state`, `$derived`, `$props`, `$effect`, etc.) and snippets over Svelte 4 APIs.
- **Adding Content**:
  - **Blog/Project/Event**: Add a new `.md` file with appropriate frontmatter in the `src/content/` directory under the correct language subfolder (`en/` or `it/`).
  - **Resume Data**: Update `src/content/resume/en.json` or `it.json`.
- **Type Safety**: Maintain strict typing across components and utility functions via TypeScript.
