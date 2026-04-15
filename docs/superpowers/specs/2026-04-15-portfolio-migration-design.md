# Portfolio Migration Design — Digital Blueprint

**Date:** 2026-04-15  
**Approach:** B — Sequential Atomic Steps  
**Status:** Approved

---

## 1. Overview

Full migration of the portfolio site from the old Spotlight/zinc template to the "Digital Blueprint" design system defined in `stitch_portfolio_premium_redesign/`. The migration also centralizes all profile content currently scattered across multiple JSON files and hardcoded in `.svelte` components.

**Four sequential steps, each independently deployable:**

1. **Content Layer** — centralize profile data (no visual change)
2. **Shell** — replace header/layout with new design (no homepage change)
3. **Homepage** — connect to central data, complete sections
4. **Inner Pages** — DEPLOYS, BIO, COMMUNITY pages

---

## 2. Content Layer (Step 1)

### New file structure

```
src/content/profile/
  common.json   ← language-invariant data
  en.json       ← English localized text
  it.json       ← Italian localized text
```

Replaces: `src/content/resume/common.json`, `src/content/resume/en.json`, `src/content/resume/it.json`.  
After migration is complete, `src/content/resume/` directory is deleted.

### `common.json` schema

```json
{
  "contact": {
    "email": "...",
    "phone": "...",
    "city": "...",
    "github": "...",
    "linkedin": "..."
  },
  "stack": ["RUST", "TYPESCRIPT", "GOLANG", "..."],
  "skills": [{ "name": "...", "category": "..." }],
  "certifications": [{ "id": 1, "content": "...", "date": "..." }],
  "coreAreas": [
    {
      "icon": "devices",
      "tags": ["REACT / NEXT.JS", "FLUTTER CORE", "PROGRESSIVE WEB APPS"]
    }
  ],
  "projects": [
    {
      "id": "venezia-spatial",
      "slug": "venezia-spatial",
      "status": "LIVE",
      "tags": ["GIS", "POSTGIS"]
    }
  ]
}
```

### `en.json` / `it.json` schema

```json
{
  "name": "Michele Scarpa",
  "role": "Senior Software Engineer",
  "bio": "...",
  "experiences": [
    {
      "id": "startup-2026",
      "company": "...",
      "period": "2026",
      "label": "Current",
      "description": "..."
    }
  ],
  "projects": [
    {
      "id": "venezia-spatial",
      "title": "VeneziaSpatial_v4.0",
      "description": "..."
    }
  ],
  "coreAreas": [
    {
      "icon": "devices",
      "title": "Web & Mobile Ecosystems",
      "description": "..."
    }
  ],
  "community": [
    {
      "label": "Founder",
      "title": "Co-founder, BacaroTech",
      "description": "..."
    }
  ]
}
```

### Loader

`src/lib/utils/profile-utils.ts` — `getProfile(lang: LangType): Profile`

- Merges `common.json` with the lang-specific file
- Projects are joined by `id` (common provides `status`/`tags`, localized provides `title`/`description`)
- `coreAreas` are joined by `icon`
- Replaces and deprecates `getResumeLang()`

### TypeScript types

`src/lib/content/profile.d.ts` — defines `Profile`, `Experience`, `Project`, `CoreArea`, `CommunityEntry` interfaces.

---

## 3. Shell / Layout (Step 2)

### New components — `src/lib/components/shell/`

| Component | Description |
|---|---|
| `AppHeader.svelte` | Fixed top, `bg-[#131b2e]`, logo + desktop nav + `LangDropdown` |
| `AppFooter.svelte` | `bg-[#131b2e]`, system status + social links + download CV link |
| `BottomNav.svelte` | `md:hidden`, fixed bottom, 3 nav items, active state via left border `tertiary` |
| `LangDropdown.svelte` | Dropdown with IT/EN switch + dark/light theme toggle integrated |

### Navigation structure

3 items: **DEPLOYS** → `/[lang]/project` · **BIO** → `/[lang]/cv` · **COMMUNITY** → `/[lang]/blog`

Active item: no background pill — 2px left `tertiary` (#b3d17a) indicator (desktop: underline; mobile: left border on BottomNav).

### Layout replacement

`src/routes/[lang]/+layout.svelte` — remove the old `bg-white ring-zinc-100 dark:bg-zinc-900` wrapper. Replace with:

```svelte
<AppHeader lang={data.lang} />
<main class="pt-16 pb-20">
  {@render children()}
</main>
<AppFooter />
<BottomNav lang={data.lang} />
```

### Theme toggle

Dark/light toggle moved inside `LangDropdown`. The old standalone `ThemeToggle.svelte` is no longer used in the main shell (kept for the print routes which may still reference it).

### Material Symbols

Added as a Google Font in `src/app.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
```

A thin `MaterialIcon.svelte` wrapper component for consistent usage.

### Design rules enforced (from DESIGN.md)

- No `1px solid` borders for sectioning — use tonal surface shifts
- Ghost borders: `border-outline-variant/15` only when a visual anchor is required for accessibility
- No rounded corners larger than `xl` (0.75rem)
- No drop shadows except on modals (40px blur, 6% opacity, primary-tinted)
- Tertiary (#b3d17a) used only for active/success/highlight states

### Deprecated (not deleted in this step)

`src/lib/components/template/Header.svelte` and all `template/` components — kept because `/pdfen`, `/pdfit`, `/[lang]/print` routes may reference them. Removed in a follow-up cleanup.

---

## 4. Homepage (Step 3)

`src/routes/[lang]/+page.svelte` — already partially migrated visually. Needs:

| Section | Current state | Action |
|---|---|---|
| Hero (badge + title + uptime bar) | Present, hardcoded IT | Connect `bio`, `role` from `getProfile(lang)` |
| Terminal component | Present | Keep as-is |
| "Esperienza Recente" | Hardcoded IT | Connect `profile.experiences` |
| "Griglia Progetti" | Hardcoded, no links | Connect `profile.projects` + link to `/[lang]/project/[slug]` |
| "Skills Matrix" (coreAreas) | Hardcoded | Connect `profile.coreAreas` |
| "Community Builders" | Hardcoded IT | Connect `profile.community` |
| "Current Stack Config" | Missing | Add from `profile.stack` |

The `+page.ts` load function passes `getProfile(lang)` result as page data.

---

## 5. Inner Pages (Step 4)

### DEPLOYS — `/[lang]/project/`

- **List page:** card style `border-l-4 hover:border-tertiary`, badge for `status` (LIVE → `bg-tertiary text-on-tertiary` / BETA → `bg-surface-container-highest text-secondary` / PRIVATE → `border border-outline-variant text-outline-variant`)
- **Detail page:** existing `.md` via mdsvex, layout adapted to new shell (no zinc elements)

### BIO — `/[lang]/cv/`

- New route (renamed from `/[lang]/resume/`)
- Data from `getProfile(lang)` — experiences, certifications, skills
- Old route `/[lang]/resume` becomes a SvelteKit redirect to `/[lang]/cv` to avoid broken links
- Route `/[lang]/print` remains separate for PDF generation

### COMMUNITY — `/[lang]/blog/`

- Unified log-style list: blog articles + events on one page, with a type filter (ALL / ARTICLE / EVENT)
- Layout: two-column grid `grid-cols-[120px_1fr]` — date/label column on left, content on right with `border-l-2 border-transparent group-hover:border-tertiary` (same pattern as the "Impact & Community" section in the new design template)
- Card style consistent with DEPLOYS list (`bg-surface-container-low hover:bg-surface-container`)

---

## 6. What Is Not Changing

- `[lang]` routing and `sveltekit-i18n` — working correctly, no changes
- `.md` files in `src/content/blog/`, `src/content/events/` — glob loading pattern preserved
- Print/PDF routes (`/pdfen`, `/pdfit`, `/[lang]/print`) — kept intact
- Vercel adapter configuration
- Tailwind config color palette (already matches new design system)

---

## 7. Success Criteria

- No zinc/white elements visible in any non-print route
- All profile text (bio, experience, projects, community) sourced from `src/content/profile/` — zero hardcoded strings in `.svelte` files
- Homepage renders correctly in both IT and EN
- Nav active states work correctly across all 3 sections
- Theme toggle (dark/light) works from the `LangDropdown`
- Print/CV download routes unaffected
