# Portfolio Migration — Digital Blueprint Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the portfolio site from the old Spotlight/zinc template to the "Digital Blueprint" design system, centralizing all profile content into a single typed source of truth.

**Architecture:** Four sequential steps, each independently deployable: (1) content layer centralization, (2) shell/layout replacement, (3) homepage data connection, (4) inner pages migration. Each step has zero visual regressions on unmodified pages.

**Tech Stack:** SvelteKit 2, Svelte 5 (runes), TailwindCSS 3, TypeScript, mdsvex, sveltekit-i18n, Vercel adapter

**Spec:** `docs/superpowers/specs/2026-04-15-portfolio-migration-design.md`

---

## File Map

### Created
| File | Responsibility |
|---|---|
| `src/content/profile/common.json` | Language-invariant profile data |
| `src/content/profile/en.json` | English localized profile text |
| `src/content/profile/it.json` | Italian localized profile text |
| `src/lib/content/profile.d.ts` | TypeScript types for the profile data model |
| `src/lib/components/shell/AppHeader.svelte` | Fixed top header with nav + lang dropdown |
| `src/lib/components/shell/AppFooter.svelte` | Footer with status + social links |
| `src/lib/components/shell/BottomNav.svelte` | Mobile bottom navigation (md:hidden) |
| `src/lib/components/shell/LangDropdown.svelte` | IT/EN switch + dark/light toggle |
| `src/lib/components/shell/MaterialIcon.svelte` | Thin wrapper for Material Symbols font icons |

### Modified
| File | Change |
|---|---|
| `src/lib/utils/profile-utils.ts` | Add `getProfile(lang)`, deprecate `getResumeLang()` |
| `src/app.html` | Add Material Symbols Google Font link |
| `src/routes/[lang]/+layout.svelte` | Replace zinc wrapper with new shell components |
| `src/routes/[lang]/+page.ts` | Load profile data via `getProfile(lang)` |
| `src/routes/[lang]/+page.svelte` | Connect all sections to profile data |
| `src/routes/[lang]/cv/+page.svelte` | Update layout to new shell style |
| `src/routes/[lang]/cv/+page.ts` | Switch to `getProfile(lang)` |
| `src/routes/[lang]/project/+page.svelte` | DEPLOYS list in new style |
| `src/routes/[lang]/project/[slug]/+page.svelte` | Detail page adapted to new shell |
| `src/routes/[lang]/blog/+page.svelte` | COMMUNITY unified log page |
| `src/routes/[lang]/tw.css` | Add light mode palette overrides |

### Deleted (Step 1 end)
- `src/content/resume/common.json`
- `src/content/resume/en.json`
- `src/content/resume/it.json`

---

## STEP 1 — Content Layer

### Task 1: Define TypeScript types for the Profile model

**Files:**
- Create: `src/lib/content/profile.d.ts`

- [ ] **Step 1.1: Create the file**

```typescript
// src/lib/content/profile.d.ts

export type ProjectStatus = 'LIVE' | 'BETA' | 'PRIVATE' | 'ARCHIVE';

export interface ProfileContact {
  email: string;
  phone: string;
  city: string;
  github: string;
  linkedin: string;
}

export interface ProfileProject {
  id: string;
  slug: string;
  status: ProjectStatus;
  tags: string[];
  // From localized file (merged by id):
  title: string;
  description: string;
}

export interface ProfileCoreArea {
  icon: string; // Material Symbol name, e.g. "devices"
  tags: string[];
  // From localized file (merged by icon):
  title: string;
  description: string;
}

export interface ProfileExperience {
  id: string;
  period: string;
  label: string;
  company: string;
  description: string;
}

export interface ProfileCommunityEntry {
  label: string;
  title: string;
  description: string;
}

export interface ProfileCertification {
  id: number;
  content: string;
  date: string;
}

export interface Profile {
  // From common.json
  contact: ProfileContact;
  stack: string[];
  certifications: ProfileCertification[];
  // Merged (common + localized)
  projects: ProfileProject[];
  coreAreas: ProfileCoreArea[];
  // From localized only
  name: string;
  role: string;
  bio: string;
  experiences: ProfileExperience[];
  community: ProfileCommunityEntry[];
}
```

- [ ] **Step 1.2: Run type check**

```bash
npm run check
```
Expected: no errors related to this new file.

---

### Task 2: Create `common.json`

**Files:**
- Create: `src/content/profile/common.json`

- [ ] **Step 2.1: Create the file with language-invariant data**

```json
{
  "contact": {
    "email": "scarpa.michele.90@gmail.com",
    "phone": "+393483482541",
    "city": "Padova, Italy",
    "github": "https://github.com/jollymick90",
    "linkedin": "https://linkedin.com/in/michelescarpa90"
  },
  "stack": [
    "RUST",
    "GOLANG",
    "TYPESCRIPT",
    "DART",
    "DOCKER",
    "KUBERNETES",
    "LANGCHAIN",
    "PINECONE",
    "TURBOREPO",
    "POSTGRES"
  ],
  "certifications": [
    {
      "id": 3,
      "content": "AWS Certified Developer - Associate",
      "date": "December 2022"
    },
    {
      "id": 2,
      "content": "ISIPM Base - Istituto Italiano di Project Management",
      "date": "April 2022"
    },
    {
      "id": 1,
      "content": "Google Professional Data Engineering",
      "date": "March 2020"
    }
  ],
  "projects": [
    {
      "id": "venezia-spatial",
      "slug": "venezia-spatial",
      "status": "LIVE",
      "tags": ["GIS", "POSTGIS", "REAL-TIME"]
    },
    {
      "id": "core-engine-rust",
      "slug": "core-engine-rust",
      "status": "PRIVATE",
      "tags": ["RUST", "MIGRATION", "PERFORMANCE"]
    },
    {
      "id": "bacaro-os",
      "slug": "bacaro-os",
      "status": "LIVE",
      "tags": ["COMMUNITY", "PLATFORM"]
    },
    {
      "id": "ai-proxy-gateway",
      "slug": "ai-proxy-gateway",
      "status": "BETA",
      "tags": ["AI", "LLM", "GATEWAY"]
    }
  ],
  "coreAreas": [
    {
      "icon": "explore",
      "tags": ["JAVA / SPRING", "ANGULAR / REACT", "ENTERPRISE GIS (POSTGIS)"]
    },
    {
      "icon": "smart_toy",
      "tags": ["SVELTEKIT / TAILWIND CSS", "AI AUTOMATION", "CLAUDE CODE & CURSOR"]
    }
  ]
}
```

---

### Task 3: Create `en.json`

**Files:**
- Create: `src/content/profile/en.json`

- [ ] **Step 3.1: Create the localized English file**

```json
{
  "name": "Michele Scarpa",
  "role": "Senior Software Engineer",
  "bio": "Senior Full-stack Engineer with 10+ years of technical craftsmanship. Currently evolving from deep-code execution to architecting high-impact communities and engineering leadership.",
  "experiences": [
    {
      "id": "startup-2026",
      "period": "2026",
      "label": "CURRENT",
      "company": "Startup Engineer",
      "description": "Cloud infrastructure development on AWS using Terraform. Advanced performance testing with k6 framework. Full integration of voice chatbots based on OpenAI APIs to improve B2C experience and processes."
    },
    {
      "id": "dog-diet",
      "period": "2025",
      "label": "AI AUTOMATION",
      "company": "Dog Diet Calculator",
      "description": "Application developed entirely with an 'agentic' approach, actively leveraging Claude Code to auto-generate and execute complex nutritional diet calculation logic for veterinary use."
    }
  ],
  "coreAreas": [
    {
      "icon": "explore",
      "title": "Solid Foundation",
      "description": "Solid bases and scalable architectures for enterprise contexts."
    },
    {
      "icon": "smart_toy",
      "title": "Modern Stack & AI",
      "description": "Cutting-edge technologies for rapid prototyping and advanced automation."
    }
  ],
  "projects": [
    {
      "id": "venezia-spatial",
      "title": "VeneziaSpatial_v4.0",
      "description": "Enterprise real estate GIS platform managing 10k+ spatial nodes with real-time sync."
    },
    {
      "id": "core-engine-rust",
      "title": "Core_Engine_Rust",
      "description": "High-performance data transformation engine for legacy-to-modern database migrations."
    },
    {
      "id": "bacaro-os",
      "title": "BacaroOS_Platform",
      "description": "Community management infrastructure built for speed and distributed collaboration."
    },
    {
      "id": "ai-proxy-gateway",
      "title": "AI_Proxy_Gateway",
      "description": "Token-throttled API gateway for managing multiple LLM provider costs and fallbacks."
    }
  ],
  "community": [
    {
      "label": "FOUNDER",
      "title": "Co-founder, BacaroTech",
      "description": "Active promotion and co-founding of BacaroTech, a collective dedicated to accelerating tech development in Venice and aggregating expertise from multiple industry professionals."
    },
    {
      "label": "DEVREL",
      "title": "DevRel & GDG Speaker",
      "description": "Regular speaker at Google Developer Groups, sharing practices on SvelteKit, agentic optimizations and advanced Frontend methodologies."
    }
  ]
}
```

---

### Task 4: Create `it.json`

**Files:**
- Create: `src/content/profile/it.json`

- [ ] **Step 4.1: Create the localized Italian file**

```json
{
  "name": "Michele Scarpa",
  "role": "Senior Software Engineer",
  "bio": "Senior Software Engineer con 10 anni di esperienza. Specializzato in sistemi GIS enterprise e soluzioni AI agentiche. In evoluzione da esecutore tecnico ad architetto di community ad alto impatto.",
  "experiences": [
    {
      "id": "startup-2026",
      "period": "2026",
      "label": "CURRENT",
      "company": "Startup Engineer",
      "description": "Sviluppo di infrastrutture cloud su AWS tramite codice Terraform. Esecuzione di performance testing avanzato col framework k6. Pieno coinvolgimento nell'integrazione di chatbot vocali basati sulle API di OpenAI per migliorare l'esperienza e i processi B2C."
    },
    {
      "id": "dog-diet",
      "period": "2025",
      "label": "AI AUTOMATION",
      "company": "Dog Diet Calculator",
      "description": "Applicazione sviluppata interamente in ottica 'agentic', sfruttando attivamente Claude Code per autogenerare ed eseguire la logica di calcolo complessa delle diete nutrizionali ad uso veterinario."
    }
  ],
  "coreAreas": [
    {
      "icon": "explore",
      "title": "Solid Foundation",
      "description": "Basi solide e architetture scalabili per contesti enterprise."
    },
    {
      "icon": "smart_toy",
      "title": "Modern Stack & AI",
      "description": "Le tecnologie cutting-edge per rapid prototyping e automazione spinta."
    }
  ],
  "projects": [
    {
      "id": "venezia-spatial",
      "title": "VeneziaSpatial_v4.0",
      "description": "Piattaforma GIS immobiliare enterprise che gestisce 10k+ nodi spaziali con sync real-time."
    },
    {
      "id": "core-engine-rust",
      "title": "Core_Engine_Rust",
      "description": "Motore di trasformazione dati ad alte prestazioni per migrazioni da database legacy a moderni."
    },
    {
      "id": "bacaro-os",
      "title": "BacaroOS_Platform",
      "description": "Infrastruttura di community management costruita per velocità e collaborazione distribuita."
    },
    {
      "id": "ai-proxy-gateway",
      "title": "AI_Proxy_Gateway",
      "description": "API gateway con throttling token per gestire costi e fallback di più provider LLM."
    }
  ],
  "community": [
    {
      "label": "FOUNDER",
      "title": "Co-founder, BacaroTech",
      "description": "Promozione attiva e co-fondazione di BacaroTech, collettivo dedicato ad accelerare lo sviluppo tech in laguna e aggregare l'esperienza di molteplici professionisti del settore."
    },
    {
      "label": "DEVREL",
      "title": "DevRel & GDG Speaker",
      "description": "Speaker abituale presso Google Developer Groups, dove condivido pratiche su SvelteKit, ottimizzazioni agentiche e metodologie Frontend avanzate."
    }
  ]
}
```

---

### Task 5: Create `profile-utils.ts` with `getProfile()`

**Files:**
- Create: `src/lib/utils/profile-utils.ts` (new file, replaces `config-utils.ts` which stays for backward compat)

- [ ] **Step 5.1: Create the merge utility**

```typescript
// src/lib/utils/profile-utils.ts
import common from '$content/profile/common.json';
import profileEn from '$content/profile/en.json';
import profileIt from '$content/profile/it.json';
import type { Profile, ProfileProject, ProfileCoreArea } from '$lib/content/profile.d.ts';
import type { LangType } from '$lib/types';

export function getProfile(lang: LangType = 'en'): Profile {
  const localized = lang === 'it' ? profileIt : profileEn;

  // Merge projects: common provides id/slug/status/tags, localized provides title/description
  const projects: ProfileProject[] = common.projects.map((commonProject) => {
    const localizedProject = localized.projects.find((p) => p.id === commonProject.id);
    return {
      ...commonProject,
      title: localizedProject?.title ?? commonProject.id,
      description: localizedProject?.description ?? ''
    };
  });

  // Merge coreAreas: common provides icon/tags, localized provides title/description
  const coreAreas: ProfileCoreArea[] = common.coreAreas.map((commonArea) => {
    const localizedArea = localized.coreAreas.find((a) => a.icon === commonArea.icon);
    return {
      ...commonArea,
      title: localizedArea?.title ?? commonArea.icon,
      description: localizedArea?.description ?? ''
    };
  });

  return {
    contact: common.contact,
    stack: common.stack,
    certifications: common.certifications,
    projects,
    coreAreas,
    name: localized.name,
    role: localized.role,
    bio: localized.bio,
    experiences: localized.experiences,
    community: localized.community
  };
}
```

- [ ] **Step 5.2: Run type check**

```bash
npm run check
```
Expected: no errors. Fix any type import issues before proceeding.

---

### Task 6: Delete old resume directory

- [ ] **Step 6.1: Remove the old files**

```bash
rm -rf /Users/jollymick/SProject/jolly-cv-blog/src/content/resume
```

- [ ] **Step 6.2: Run type check to confirm nothing else imported from resume/**

```bash
npm run check
```
Expected: errors only in files that still import from `$content/resume/` — fix each one by replacing `getResumeLang(lang)` with `getProfile(lang)` and updating the type from `IResume` to `Profile`.

The files likely affected:
- `src/routes/[lang]/+layout.ts` (imports `getResumeLang`)
- `src/routes/[lang]/cv/+page.ts` (imports `getResumeLang`)

For each affected file, replace:
```typescript
// OLD
import { getResumeLang } from '$lib/utils/config-utils';
const resumeConfig: IResume = getResumeLang(lang);
return { resume: resumeConfig };

// NEW
import { getProfile } from '$lib/utils/profile-utils';
const profile = getProfile(lang);
return { profile };
```

- [ ] **Step 6.3: Final check**

```bash
npm run check
```
Expected: zero errors.

---

### Task 7: Commit Step 1

- [ ] **Step 7.1: Commit**

```bash
git add src/content/profile/ src/lib/content/profile.d.ts src/lib/utils/profile-utils.ts
git add src/routes/[lang]/+layout.ts src/routes/[lang]/cv/+page.ts
git commit -m "feat(content): centralize profile data — common.json + en/it.json + getProfile()"
```

---

## STEP 2 — Shell / Layout

### Task 8: Add Material Symbols font to app.html

**Files:**
- Modify: `src/app.html`

- [ ] **Step 8.1: Add font link inside `<head>`**

Open `src/app.html` and add inside `<head>` before `%sveltekit.head%`:

```html
<link
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
  rel="stylesheet"
/>
```

Also add this style block for the font variation settings:

```html
<style>
  .material-symbols-outlined {
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
  }
</style>
```

---

### Task 9: Create `MaterialIcon.svelte`

**Files:**
- Create: `src/lib/components/shell/MaterialIcon.svelte`

- [ ] **Step 9.1: Create the wrapper component**

```svelte
<!-- src/lib/components/shell/MaterialIcon.svelte -->
<script lang="ts">
  const { name, class: className = '' }: { name: string; class?: string } = $props();
</script>

<span class="material-symbols-outlined {className}" aria-hidden="true">{name}</span>
```

---

### Task 10: Create `LangDropdown.svelte`

This component combines the IT/EN switcher and dark/light theme toggle in one dropdown, replacing the old separate `ThemeToggle` and `LangSelect` components.

**Files:**
- Create: `src/lib/components/shell/LangDropdown.svelte`

- [ ] **Step 10.1: Create the component**

```svelte
<!-- src/lib/components/shell/LangDropdown.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import type { LangAvailable } from '$lib/types';

  const { lang }: { lang: LangAvailable } = $props();

  let open = $state(false);
  let isDark = $state(true);

  onMount(() => {
    isDark = document.documentElement.classList.contains('dark');
  });

  function toggleTheme() {
    isDark = !isDark;
    document.documentElement.classList.toggle('dark', isDark);
  }

  function switchLang(newLang: LangAvailable) {
    open = false;
    const currentPath = page.url.pathname;
    const newPath = currentPath.replace(`/${lang}`, `/${newLang}`);
    goto(newPath);
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') open = false;
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="relative">
  <button
    onclick={() => (open = !open)}
    class="flex items-center gap-1.5 px-3 py-1.5 bg-surface-container border border-outline-variant/30 text-primary text-[10px] font-label font-bold tracking-widest hover:bg-surface-container-high transition-colors"
    aria-label="Language and theme settings"
  >
    🌐 {lang.toUpperCase()} ▾
  </button>

  {#if open}
    <!-- Backdrop -->
    <button
      class="fixed inset-0 z-40"
      onclick={() => (open = false)}
      aria-label="Close menu"
      tabindex="-1"
    ></button>

    <!-- Dropdown panel -->
    <div
      class="absolute right-0 top-full mt-1 z-50 min-w-[160px] bg-surface-container-low border border-outline-variant/30 py-2"
    >
      <div class="px-3 pb-2 mb-2 border-b border-outline-variant/20">
        <p class="text-[9px] font-label tracking-widest text-on-surface-variant uppercase">Language</p>
      </div>

      {#each (['en', 'it'] as LangAvailable[]) as l}
        <button
          onclick={() => switchLang(l)}
          class="w-full text-left px-4 py-2 text-[11px] font-label tracking-wider transition-colors
            {lang === l ? 'text-tertiary font-bold' : 'text-secondary hover:text-on-surface hover:bg-surface-container'}"
        >
          {l === 'en' ? '🇬🇧 English' : '🇮🇹 Italiano'}
          {#if lang === l}<span class="ml-2 text-tertiary">✓</span>{/if}
        </button>
      {/each}

      <div class="px-3 pt-2 mt-2 border-t border-outline-variant/20">
        <p class="text-[9px] font-label tracking-widest text-on-surface-variant uppercase mb-2">Theme</p>
        <button
          onclick={toggleTheme}
          class="w-full flex items-center gap-2 px-1 py-1.5 text-[11px] font-label tracking-wider text-secondary hover:text-on-surface transition-colors"
        >
          {isDark ? '☀ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>
    </div>
  {/if}
</div>
```

**Note:** The `{#each}` block uses `l` as both iterator and variable — SvelteKit's `{@const}` can resolve this. If the linter complains, refactor to:
```svelte
{#each (['en', 'it'] as LangAvailable[]) as l}
```

---

### Task 11: Create `AppHeader.svelte`

**Files:**
- Create: `src/lib/components/shell/AppHeader.svelte`

- [ ] **Step 11.1: Create the header**

```svelte
<!-- src/lib/components/shell/AppHeader.svelte -->
<script lang="ts">
  import { page } from '$app/state';
  import MaterialIcon from './MaterialIcon.svelte';
  import LangDropdown from './LangDropdown.svelte';
  import type { LangAvailable } from '$lib/types';

  const { lang }: { lang: LangAvailable } = $props();

  const navItems = $derived([
    { label: 'DEPLOYS', icon: 'rocket_launch', href: `/${lang}/project` },
    { label: 'BIO', icon: 'account_circle', href: `/${lang}/cv` },
    { label: 'COMMUNITY', icon: 'groups', href: `/${lang}/blog` }
  ]);

  function isActive(href: string): boolean {
    return page.url.pathname.startsWith(href);
  }
</script>

<header class="fixed top-0 w-full z-50 bg-[#131b2e] flex justify-between items-center px-6 py-4 border-b border-outline-variant/15">
  <!-- Logo -->
  <a href="/{lang}/" class="flex items-center gap-2 no-underline">
    <MaterialIcon name="terminal" class="text-primary" />
    <span class="text-base font-bold text-primary tracking-widest font-headline">ENGINEER_CORE_V4</span>
  </a>

  <!-- Desktop Nav -->
  <nav class="hidden md:flex gap-6 items-center">
    {#each navItems as item}
      <a
        href={item.href}
        class="font-headline font-bold tracking-tight text-sm transition-colors
          {isActive(item.href)
            ? 'text-tertiary border-b-2 border-tertiary pb-0.5'
            : 'text-primary hover:text-tertiary'}"
      >
        {item.label}
      </a>
    {/each}
  </nav>

  <!-- Right controls -->
  <div class="flex items-center gap-4">
    <span class="hidden md:block text-[10px] font-bold text-primary tracking-widest opacity-60">
      STATUS: AVAILABLE
    </span>
    <LangDropdown {lang} />
  </div>
</header>
```

---

### Task 12: Create `BottomNav.svelte`

**Files:**
- Create: `src/lib/components/shell/BottomNav.svelte`

- [ ] **Step 12.1: Create the mobile bottom nav**

```svelte
<!-- src/lib/components/shell/BottomNav.svelte -->
<script lang="ts">
  import { page } from '$app/state';
  import MaterialIcon from './MaterialIcon.svelte';
  import type { LangAvailable } from '$lib/types';

  const { lang }: { lang: LangAvailable } = $props();

  const navItems = $derived([
    { label: 'DEPLOYS', icon: 'rocket_launch', href: `/${lang}/project` },
    { label: 'BIO', icon: 'account_circle', href: `/${lang}/cv` },
    { label: 'COMMUNITY', icon: 'groups', href: `/${lang}/blog` }
  ]);

  function isActive(href: string): boolean {
    return page.url.pathname.startsWith(href);
  }
</script>

<nav class="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-safe bg-background/80 backdrop-blur-md z-50 border-t border-outline-variant/15">
  {#each navItems as item}
    <a
      href={item.href}
      class="flex flex-col items-center justify-center px-4 py-2 transition-all duration-200 hover:bg-surface-container-low
        {isActive(item.href) ? 'text-tertiary border-l-2 border-tertiary' : 'text-secondary'}"
    >
      <MaterialIcon name={item.icon} class="text-[22px]" />
      <span class="font-label text-[10px] font-medium tracking-widest uppercase mt-0.5">
        {item.label}
      </span>
    </a>
  {/each}
</nav>
```

---

### Task 13: Create `AppFooter.svelte`

**Files:**
- Create: `src/lib/components/shell/AppFooter.svelte`

- [ ] **Step 13.1: Create the footer**

```svelte
<!-- src/lib/components/shell/AppFooter.svelte -->
<script lang="ts">
  import type { LangAvailable } from '$lib/types';
  const { lang }: { lang: LangAvailable } = $props();
</script>

<footer class="relative w-full py-12 bg-[#131b2e] flex flex-col items-center gap-4 px-8 pb-24 md:pb-12 text-center border-t border-outline-variant/15">
  <div class="text-tertiary font-mono text-xs mb-4 tracking-widest">SYSTEM_STATUS: ONLINE</div>

  <div class="flex flex-wrap justify-center gap-6 mb-8">
    <a
      href="https://github.com/jollymick90"
      target="_blank"
      rel="noopener noreferrer"
      class="text-secondary font-label text-[10px] tracking-widest hover:text-on-surface transition-colors uppercase"
    >GITHUB</a>
    <a
      href="https://linkedin.com/in/michelescarpa90"
      target="_blank"
      rel="noopener noreferrer"
      class="text-secondary font-label text-[10px] tracking-widest hover:text-on-surface transition-colors uppercase"
    >LINKEDIN</a>
    <a
      href="/{lang}/print"
      class="text-secondary font-label text-[10px] tracking-widest hover:text-on-surface transition-colors uppercase"
    >DOWNLOAD_CV</a>
  </div>

  <p class="text-primary font-label text-[10px] tracking-widest opacity-50">
    © {new Date().getFullYear()} Michele Scarpa
  </p>
</footer>
```

---

### Task 14: Add light mode palette and replace `[lang]/+layout.svelte`

**Files:**
- Modify: `src/routes/[lang]/tw.css`
- Modify: `src/routes/[lang]/+layout.svelte`

- [ ] **Step 14.1: Add light mode overrides to tw.css**

Open `src/routes/[lang]/tw.css` and append at the end:

```css
/* Light mode palette overrides — blueprint aesthetic adapted for light */
:root:not(.dark) {
  --color-background: #f0f2f8;
  --color-surface: #f0f2f8;
  --color-surface-container-low: #e4e7f0;
  --color-surface-container: #dde0ec;
  --color-surface-container-high: #d3d6e5;
  --color-surface-container-highest: #c8cbda;
  --color-on-surface: #1a2038;
  --color-on-surface-variant: #3d4158;
  --color-primary: #1a2038;
  --color-secondary: #3d4158;
  --color-outline-variant: #b0b3c8;
}

:root:not(.dark) body {
  background-color: var(--color-background);
  color: var(--color-on-surface);
}
```

**Note:** This approach requires that Tailwind color tokens reference CSS variables. If Tailwind resolves them statically (which it does by default), these overrides won't automatically apply to Tailwind classes. A pragmatic alternative: use `bg-[#131b2e]` for the header/footer (they stay dark in both modes as brand elements), and only the page background and surface containers adapt. Revise this step if visual testing shows conflicts.

- [ ] **Step 14.2: Replace the layout**

Replace the entire content of `src/routes/[lang]/+layout.svelte`:

```svelte
<!-- src/routes/[lang]/+layout.svelte -->
<script lang="ts">
  import AppHeader from '$lib/components/shell/AppHeader.svelte';
  import AppFooter from '$lib/components/shell/AppFooter.svelte';
  import BottomNav from '$lib/components/shell/BottomNav.svelte';
  import './tw.css';

  let { children, data } = $props();
  const { lang, isFullScreen } = data;
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
{/if}
```

- [ ] **Step 14.3: Start the dev server and visually verify the shell**

```bash
npm run dev
```

Open http://localhost:5173/en/ and verify:
- Fixed dark header with logo + desktop nav
- No white/zinc background wrapper
- Footer is visible at the bottom
- On mobile viewport (DevTools), bottom nav appears and header nav hides
- Lang dropdown opens with IT/EN switch and theme toggle
- Switching to Italian navigates to /it/

- [ ] **Step 14.4: Run type check**

```bash
npm run check
```
Expected: no errors.

---

### Task 15: Commit Step 2

- [ ] **Step 15.1: Commit**

```bash
git add src/app.html src/routes/[lang]/+layout.svelte src/routes/[lang]/tw.css
git add src/lib/components/shell/
git commit -m "feat(shell): replace old layout with Digital Blueprint shell — AppHeader, AppFooter, BottomNav, LangDropdown"
```

---

## STEP 3 — Homepage

### Task 16: Connect homepage to profile data

**Files:**
- Modify: `src/routes/[lang]/+page.ts`
- Modify: `src/routes/[lang]/+page.svelte`

- [ ] **Step 16.1: Update `+page.ts` to load profile**

Replace the content of `src/routes/[lang]/+page.ts`:

```typescript
// src/routes/[lang]/+page.ts
import { getProfile } from '$lib/utils/profile-utils';
import { defaultLang } from '$lib/i18n/lang.store';
import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async ({ parent }) => {
  const { lang } = await parent();
  const profile = getProfile(lang ?? defaultLang);
  return { profile };
};
```

- [ ] **Step 16.2: Rewrite `+page.svelte` using profile data**

Replace the content of `src/routes/[lang]/+page.svelte`:

```svelte
<!-- src/routes/[lang]/+page.svelte -->
<script lang="ts">
  import { t } from '$lib/i18n';
  import { page } from '$app/state';
  import Terminal from '$lib/components/Terminal.svelte';
  import MaterialIcon from '$lib/components/shell/MaterialIcon.svelte';
  import type { Profile } from '$lib/content/profile.d.ts';

  let { data }: { data: { profile: Profile } } = $props();
  const { profile } = $derived(data);
  const lang = $derived(page.params.lang ?? 'en');

  function badgeClass(status: string): string {
    switch (status) {
      case 'LIVE': return 'bg-tertiary text-on-tertiary';
      case 'BETA': return 'bg-surface-container-highest text-secondary';
      case 'PRIVATE': return 'border border-outline-variant text-outline-variant';
      default: return 'border border-outline-variant text-outline-variant';
    }
  }
</script>

<svelte:head>
  <title>{$t('home.title')}</title>
</svelte:head>

<div class="pt-12 pb-20 px-4 md:px-12 lg:px-24 max-w-7xl mx-auto">

  <!-- Hero Section -->
  <section class="mb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
    <div>
      <div class="inline-block px-2 py-1 mb-6 bg-surface-container-high border-l-2 border-tertiary">
        <span class="text-[10px] font-label font-bold tracking-[0.2em] text-tertiary uppercase">ARCHITECT_LOG_01</span>
      </div>
      <h2 class="font-headline text-5xl md:text-7xl font-extrabold tracking-tighter text-primary leading-none mb-8">
        Engineering Solutions<br /><span class="text-surface-bright">at Scale.</span>
      </h2>
      <p class="text-secondary leading-relaxed text-lg max-w-lg mb-8 font-body">
        {profile.name}. {profile.bio}
      </p>
      <div class="flex flex-col gap-2 p-4 bg-surface-container-low border border-outline-variant/15 w-full max-w-lg">
        <div class="flex justify-between items-center text-xs font-label tracking-widest opacity-50">
          <span>UPTIME</span><span>3650_DAYS+</span>
        </div>
        <div class="h-1 w-full bg-surface-container-highest">
          <div class="h-full bg-tertiary w-full"></div>
        </div>
        <div class="flex justify-between items-center text-[10px] font-label text-tertiary">
          <span>SENIOR_LEVEL</span><span>SYSTEM_STABLE</span>
        </div>
      </div>
    </div>
    <div class="h-[400px] lg:h-[450px]">
      <Terminal />
    </div>
  </section>

  <!-- Recent Experience -->
  <section class="mb-24">
    <div class="flex items-center gap-4 mb-12">
      <h3 class="font-headline text-xl font-bold tracking-widest text-primary uppercase">Recent Experience</h3>
      <div class="h-px grow bg-outline-variant/20"></div>
    </div>
    <div class="space-y-4">
      {#each profile.experiences as exp}
        <div class="block p-6 bg-surface-container-low hover:bg-surface-container group transition-all border-l-4 border-transparent hover:border-tertiary">
          <div class="flex items-center gap-3 mb-2">
            <span class="text-xl font-bold text-on-surface group-hover:text-tertiary transition-colors font-headline">{exp.company}</span>
            <span class="text-[9px] font-label px-2 py-0.5 font-bold tracking-widest uppercase {exp.label === 'CURRENT' ? 'bg-tertiary text-on-tertiary' : 'border border-tertiary text-tertiary'}">{exp.label}</span>
          </div>
          <p class="text-sm text-secondary/80 mt-2 max-w-3xl leading-relaxed">{exp.description}</p>
        </div>
      {/each}
    </div>
  </section>

  <!-- Core Architecture -->
  <section class="mb-24">
    <div class="flex items-center gap-4 mb-12">
      <h3 class="font-headline text-xl font-bold tracking-widest text-primary uppercase">Core Architecture</h3>
      <div class="h-px grow bg-outline-variant/20"></div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-1">
      {#each profile.coreAreas as area}
        <div class="p-8 bg-surface-container hover:bg-surface-container-high transition-colors group">
          <MaterialIcon name={area.icon} class="text-tertiary mb-6 block text-4xl" />
          <h4 class="text-lg font-bold text-on-surface mb-3 font-headline">{area.title}</h4>
          <p class="text-sm text-secondary/80 mb-6 font-body">{area.description}</p>
          <ul class="space-y-2 text-[11px] font-label tracking-wider text-on-surface-variant font-bold">
            {#each area.tags as tag}
              <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 bg-tertiary"></span> {tag}</li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  </section>

  <!-- Projects Grid -->
  <section class="mb-24">
    <div class="flex items-center justify-between mb-8">
      <h3 class="font-headline text-xl font-bold tracking-widest text-primary uppercase">Works</h3>
      <span class="text-[10px] font-label text-tertiary tracking-[0.2em]">{profile.projects.length.toString().padStart(2,'0')}_ACTIVE_NODES</span>
    </div>
    <div class="space-y-4">
      {#each profile.projects as project}
        <a
          href="/{lang}/project/{project.slug}"
          class="block p-6 bg-surface-container-low hover:bg-surface-container group transition-all border-l-4 border-transparent hover:border-tertiary"
        >
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div class="flex items-center gap-3 mb-1">
                <span class="text-lg font-bold text-on-surface group-hover:text-tertiary transition-colors">{project.title}</span>
                <span class="text-[9px] font-label px-2 py-0.5 font-bold tracking-tighter {badgeClass(project.status)}">{project.status}</span>
              </div>
              <p class="text-xs text-secondary/60">{project.description}</p>
            </div>
            <MaterialIcon name="arrow_forward" class="text-outline-variant group-hover:text-tertiary transition-colors" />
          </div>
        </a>
      {/each}
    </div>
  </section>

  <!-- Current Stack -->
  <section class="mb-24">
    <div class="p-8 bg-surface-container-lowest border border-outline-variant/10">
      <div class="flex items-center gap-2 mb-6">
        <MaterialIcon name="terminal" class="text-tertiary" />
        <h3 class="font-headline text-sm font-bold tracking-[0.3em] text-primary uppercase">Current Stack Config</h3>
      </div>
      <div class="rounded-lg overflow-hidden border border-outline-variant/30 bg-[#0d1117]">
        <div class="bg-[#161b22] px-4 py-2 flex items-center justify-between border-b border-outline-variant/20">
          <div class="flex gap-1.5">
            <div class="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
            <div class="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
            <div class="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
          </div>
          <div class="text-[10px] font-mono text-secondary/40 tracking-widest uppercase">stack.sh</div>
          <div class="w-10"></div>
        </div>
        <div class="p-6 font-mono text-sm space-y-1.5 md:grid md:grid-cols-2 md:gap-x-8 md:space-y-0">
          {#each profile.stack as tech}
            <div class="flex items-center gap-2">
              <span class="text-tertiary">root@mscarpa:~#</span>
              <span class="text-on-surface">{tech}</span>
            </div>
          {/each}
          <div class="flex items-center gap-2">
            <span class="text-tertiary animate-pulse">_</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Community -->
  <section class="mb-24">
    <div class="flex items-center gap-4 mb-12">
      <h3 class="font-headline text-xl font-bold tracking-widest text-primary uppercase">Community Builders</h3>
      <div class="h-px grow bg-outline-variant/20"></div>
    </div>
    <div class="space-y-1">
      {#each profile.community as entry}
        <div class="grid grid-cols-1 md:grid-cols-[140px_1fr] group">
          <div class="text-[10px] font-label py-6 opacity-40 group-hover:opacity-100 transition-opacity uppercase tracking-widest font-bold">{entry.label}</div>
          <div class="py-6 px-0 md:px-8 bg-surface-container-low border-l-2 border-transparent group-hover:border-tertiary group-hover:bg-surface-container transition-all">
            <h4 class="font-bold text-tertiary mb-1 font-headline">{entry.title}</h4>
            <p class="text-sm text-secondary font-body">{entry.description}</p>
          </div>
        </div>
      {/each}
    </div>
  </section>

</div>
```

- [ ] **Step 16.3: Visually verify homepage in EN and IT**

```bash
npm run dev
```

Open http://localhost:5173/en/ — verify all sections render with data from profile.
Open http://localhost:5173/it/ — verify Italian text displays correctly.
Check the projects section shows correct badges (LIVE=lime bg, BETA=dark bg, PRIVATE=outlined).

- [ ] **Step 16.4: Run type check**

```bash
npm run check
```

---

### Task 17: Commit Step 3

- [ ] **Step 17.1: Commit**

```bash
git add src/routes/[lang]/+page.ts src/routes/[lang]/+page.svelte
git commit -m "feat(homepage): connect all sections to centralized profile data — no more hardcoded text"
```

---

## STEP 4 — Inner Pages

### Task 18: Update BIO page (`/[lang]/cv/`)

The route already exists at `src/routes/[lang]/cv/`. It currently uses old `Container` and `Cv` components. Update it to use profile data and new layout style.

**Files:**
- Modify: `src/routes/[lang]/cv/+page.ts`
- Modify: `src/routes/[lang]/cv/+page.svelte`

- [ ] **Step 18.1: Update `+page.ts`**

```typescript
// src/routes/[lang]/cv/+page.ts
import { getProfile } from '$lib/utils/profile-utils';
import { defaultLang } from '$lib/i18n/lang.store';
import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async ({ parent }) => {
  const { lang } = await parent();
  const profile = getProfile(lang ?? defaultLang);
  return { profile };
};
```

- [ ] **Step 18.2: Rewrite `+page.svelte` in blueprint style**

```svelte
<!-- src/routes/[lang]/cv/+page.svelte -->
<script lang="ts">
  import MaterialIcon from '$lib/components/shell/MaterialIcon.svelte';
  import type { Profile } from '$lib/content/profile.d.ts';

  let { data }: { data: { profile: Profile } } = $props();
  const { profile } = $derived(data);
</script>

<svelte:head>
  <title>BIO — {profile.name}</title>
</svelte:head>

<div class="px-4 md:px-12 lg:px-24 max-w-7xl mx-auto py-12">

  <!-- Header -->
  <div class="mb-16">
    <div class="inline-block px-2 py-1 mb-4 bg-surface-container-high border-l-2 border-tertiary">
      <span class="text-[10px] font-label font-bold tracking-[0.2em] text-tertiary uppercase">BIO_LOG</span>
    </div>
    <h2 class="font-headline text-4xl font-extrabold tracking-tighter text-primary mb-3">{profile.name}</h2>
    <p class="text-secondary text-lg max-w-2xl leading-relaxed">{profile.bio}</p>
    <div class="mt-4 flex gap-4 text-[10px] font-label tracking-widest">
      <a href="mailto:{profile.contact.email}" class="text-tertiary hover:underline">{profile.contact.email}</a>
      <span class="text-outline">·</span>
      <span class="text-secondary">{profile.contact.city}</span>
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
    <!-- Left: Experiences -->
    <div>
      <div class="flex items-center gap-4 mb-8">
        <h3 class="font-headline text-sm font-bold tracking-[0.2em] text-primary uppercase">Experience</h3>
        <div class="h-px grow bg-outline-variant/20"></div>
      </div>
      <div class="space-y-1">
        {#each profile.experiences as exp}
          <div class="grid grid-cols-1 md:grid-cols-[120px_1fr] group">
            <div class="text-[10px] font-label py-6 opacity-40 group-hover:opacity-100 transition-opacity uppercase tracking-widest">{exp.period}</div>
            <div class="py-6 px-0 md:px-8 bg-surface-container-low border-l-2 border-transparent group-hover:border-tertiary group-hover:bg-surface-container transition-all">
              <div class="flex items-center gap-2 mb-1">
                <h4 class="font-bold text-on-surface font-headline">{exp.company}</h4>
                <span class="text-[9px] font-label px-2 py-0.5 bg-surface-container-highest text-secondary font-bold tracking-widest">{exp.label}</span>
              </div>
              <p class="text-sm text-secondary leading-relaxed">{exp.description}</p>
            </div>
          </div>
        {/each}
      </div>
    </div>

    <!-- Right: Skills + Certifications -->
    <div class="space-y-8">
      <!-- Stack -->
      <div class="p-6 bg-surface-container-lowest border border-outline-variant/10">
        <div class="flex items-center gap-2 mb-4">
          <MaterialIcon name="terminal" class="text-tertiary text-lg" />
          <h3 class="font-headline text-xs font-bold tracking-[0.3em] text-primary uppercase">Stack</h3>
        </div>
        <div class="flex flex-wrap gap-2">
          {#each profile.stack as tech}
            <span class="text-[10px] font-label px-2 py-1 bg-surface-container text-secondary tracking-widest border border-outline-variant/20">{tech}</span>
          {/each}
        </div>
      </div>

      <!-- Certifications -->
      <div>
        <div class="flex items-center gap-4 mb-6">
          <h3 class="font-headline text-xs font-bold tracking-[0.2em] text-primary uppercase">Certifications</h3>
          <div class="h-px grow bg-outline-variant/20"></div>
        </div>
        <div class="space-y-3">
          {#each profile.certifications as cert}
            <div class="p-4 bg-surface-container-low border-l-2 border-tertiary/30 hover:border-tertiary transition-colors">
              <p class="text-sm font-bold text-on-surface">{cert.content}</p>
              <p class="text-[10px] font-label text-tertiary mt-1 tracking-widest">{cert.date}</p>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>
```

- [ ] **Step 18.3: Verify the BIO page**

```bash
npm run dev
```
Open http://localhost:5173/en/cv — verify experiences, stack, certifications render.

---

### Task 19: Update DEPLOYS page (`/[lang]/project/`)

**Files:**
- Modify: `src/routes/[lang]/project/+page.svelte`
- Modify: `src/routes/[lang]/project/+page.ts`

- [ ] **Step 19.1: Update `+page.ts` to use getProfile**

```typescript
// src/routes/[lang]/project/+page.ts
import { getProfile } from '$lib/utils/profile-utils';
import { defaultLang } from '$lib/i18n/lang.store';
import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async ({ parent }) => {
  const { lang } = await parent();
  const profile = getProfile(lang ?? defaultLang);
  return { projects: profile.projects };
};
```

- [ ] **Step 19.2: Rewrite project list page**

Read the current `src/routes/[lang]/project/+page.svelte` first, then replace with:

```svelte
<!-- src/routes/[lang]/project/+page.svelte -->
<script lang="ts">
  import MaterialIcon from '$lib/components/shell/MaterialIcon.svelte';
  import type { ProfileProject } from '$lib/content/profile.d.ts';

  let { data }: { data: { projects: ProfileProject[] } } = $props();
  const { projects } = $derived(data);

  function badgeClass(status: string): string {
    switch (status) {
      case 'LIVE': return 'bg-tertiary text-on-tertiary';
      case 'BETA': return 'bg-surface-container-highest text-secondary';
      case 'PRIVATE': return 'border border-outline-variant text-outline-variant';
      default: return 'border border-outline-variant text-outline-variant';
    }
  }

  function badgeIcon(status: string): string {
    switch (status) {
      case 'LIVE': return 'arrow_forward';
      case 'PRIVATE': return 'lock';
      case 'BETA': return 'bolt';
      default: return 'code';
    }
  }
</script>

<svelte:head>
  <title>DEPLOYS — Projects</title>
</svelte:head>

<div class="px-4 md:px-12 lg:px-24 max-w-7xl mx-auto py-12">
  <div class="flex items-center justify-between mb-12">
    <div>
      <div class="inline-block px-2 py-1 mb-4 bg-surface-container-high border-l-2 border-tertiary">
        <span class="text-[10px] font-label font-bold tracking-[0.2em] text-tertiary uppercase">DEPLOY_LOG</span>
      </div>
      <h2 class="font-headline text-4xl font-extrabold tracking-tighter text-primary">Works</h2>
    </div>
    <span class="text-[10px] font-label text-tertiary tracking-[0.2em]">{String(projects.length).padStart(2,'0')}_ACTIVE_NODES</span>
  </div>

  <div class="space-y-4">
    {#each projects as project}
      <a
        href="project/{project.slug}"
        class="block p-6 bg-surface-container-low hover:bg-surface-container group transition-all border-l-4 border-transparent hover:border-tertiary"
      >
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-3 mb-1">
              <span class="text-lg font-bold text-on-surface group-hover:text-tertiary transition-colors">{project.title}</span>
              <span class="text-[9px] font-label px-2 py-0.5 font-bold tracking-tighter {badgeClass(project.status)}">{project.status}</span>
            </div>
            <p class="text-xs text-secondary/60 mb-2">{project.description}</p>
            <div class="flex gap-2 flex-wrap">
              {#each project.tags as tag}
                <span class="text-[9px] font-label px-2 py-0.5 bg-surface-container text-on-surface-variant tracking-widest">{tag}</span>
              {/each}
            </div>
          </div>
          <MaterialIcon name={badgeIcon(project.status)} class="text-outline-variant group-hover:text-tertiary transition-colors shrink-0" />
        </div>
      </a>
    {/each}
  </div>
</div>
```

---

### Task 20: Update project detail page layout

**Files:**
- Modify: `src/routes/[lang]/project/[slug]/+page.svelte`

- [ ] **Step 20.1: Read current file, then wrap content in blueprint-style container**

Read `src/routes/[lang]/project/[slug]/+page.svelte`. If it uses `Container` from old template, replace the wrapper:

```svelte
<!-- Replace old Container wrapper -->
<!-- OLD: -->
<Container className="mt-9">
  <!-- content -->
</Container>

<!-- NEW: -->
<div class="px-4 md:px-12 lg:px-24 max-w-7xl mx-auto py-12">
  <!-- same content inside -->
</div>
```

Also remove any import of `Container` from `template/Container.svelte` if present.

---

### Task 21: Rewrite COMMUNITY page (`/[lang]/blog/`)

**Files:**
- Modify: `src/routes/[lang]/blog/+page.svelte`
- Modify: `src/routes/[lang]/blog/+page.ts`

- [ ] **Step 21.1: Update `+page.ts` to load both blog and events**

Read the current `src/routes/[lang]/blog/+page.ts`. It likely only loads blog posts. Update to load both:

```typescript
// src/routes/[lang]/blog/+page.ts
import { loadArticles } from '$lib/utils/blog-loader-utils';
import { loadEvents } from '$lib/utils/event-loader-utils';
import { defaultLang } from '$lib/i18n/lang.store';
import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async ({ parent }) => {
  const { lang } = await parent();
  const activeLang = lang ?? defaultLang;
  const [articles, events] = await Promise.all([
    loadArticles(activeLang),
    loadEvents(activeLang)
  ]);

  // Merge into unified log with type tag
  const log = [
    ...articles.map(a => ({ ...a, type: 'ARTICLE' as const })),
    ...events.map(e => ({ ...e, type: 'EVENT' as const }))
  ].sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime());

  return { log };
};
```

- [ ] **Step 21.2: Rewrite `+page.svelte` as unified COMMUNITY log**

```svelte
<!-- src/routes/[lang]/blog/+page.svelte -->
<script lang="ts">
  let { data } = $props();
  const { log } = $derived(data);

  let filter = $state<'ALL' | 'ARTICLE' | 'EVENT'>('ALL');

  const filtered = $derived(
    filter === 'ALL' ? log : log.filter((item: any) => item.type === filter)
  );
</script>

<svelte:head>
  <title>COMMUNITY — Log</title>
</svelte:head>

<div class="px-4 md:px-12 lg:px-24 max-w-7xl mx-auto py-12">
  <div class="mb-12">
    <div class="inline-block px-2 py-1 mb-4 bg-surface-container-high border-l-2 border-tertiary">
      <span class="text-[10px] font-label font-bold tracking-[0.2em] text-tertiary uppercase">COMMUNITY_LOG</span>
    </div>
    <h2 class="font-headline text-4xl font-extrabold tracking-tighter text-primary mb-6">Community</h2>

    <!-- Filter -->
    <div class="flex gap-2">
      {#each (['ALL', 'ARTICLE', 'EVENT'] as const) as f}
        <button
          onclick={() => (filter = f)}
          class="text-[10px] font-label px-3 py-1.5 tracking-widest font-bold transition-colors
            {filter === f ? 'bg-tertiary text-on-tertiary' : 'bg-surface-container text-secondary hover:bg-surface-container-high'}"
        >
          {f}
        </button>
      {/each}
    </div>
  </div>

  <div class="space-y-1">
    {#each filtered as item}
      {@const slug = item.slug}
      {@const routeBase = item.type === 'ARTICLE' ? 'blog' : 'event'}
      <a
        href="{routeBase}/{slug}"
        class="grid grid-cols-1 md:grid-cols-[120px_1fr] group no-underline"
      >
        <div class="text-[10px] font-label py-6 opacity-40 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
          {item.metadata.date ? new Date(item.metadata.date).getFullYear() : '—'}
        </div>
        <div class="py-6 px-0 md:px-8 bg-surface-container-low border-l-2 border-transparent group-hover:border-tertiary group-hover:bg-surface-container transition-all">
          <div class="flex items-center gap-2 mb-1">
            <h4 class="font-bold text-on-surface group-hover:text-tertiary transition-colors font-headline">
              {item.metadata.title ?? slug}
            </h4>
            <span class="text-[9px] font-label px-2 py-0.5 bg-surface-container-highest text-secondary font-bold tracking-widest">{item.type}</span>
          </div>
          {#if item.metadata.description}
            <p class="text-sm text-secondary">{item.metadata.description}</p>
          {/if}
        </div>
      </a>
    {/each}
  </div>
</div>
```

- [ ] **Step 21.3: Check `event-loader-utils.ts` exists and exports `loadEvents`**

```bash
cat src/lib/utils/event-loader-utils.ts
```

If it doesn't export `loadEvents`, it's named differently. Read the file and adjust the import in `+page.ts` to match the actual export name.

- [ ] **Step 21.4: Run type check**

```bash
npm run check
```

---

### Task 22: Final visual verification

- [ ] **Step 22.1: Build and preview**

```bash
npm run build && npm run preview
```

Open http://localhost:4173 and verify:
- `/en/` — homepage with all sections, profile data in English
- `/it/` — same in Italian
- `/en/project` — DEPLOYS list with status badges
- `/en/cv` — BIO page with experiences, stack, certifications
- `/en/blog` — COMMUNITY log with filter buttons
- `/en/print` — print route still works (uses old shell via `isFullScreen`)
- Theme toggle (via LangDropdown) switches between dark and light
- Language switch from EN to IT and back preserves current route

- [ ] **Step 22.2: Run final check**

```bash
npm run check
```
Expected: zero errors.

---

### Task 23: Commit Step 4 and final cleanup

- [ ] **Step 23.1: Commit inner pages**

```bash
git add src/routes/[lang]/cv/ src/routes/[lang]/project/ src/routes/[lang]/blog/
git commit -m "feat(pages): migrate DEPLOYS, BIO, COMMUNITY pages to Digital Blueprint design"
```

- [ ] **Step 23.2: Final commit — mark migration complete**

```bash
git commit --allow-empty -m "chore: Digital Blueprint migration complete — all pages migrated, content centralized"
```

---

## Notes for Implementor

1. **`config-utils.ts`** — do not delete it yet. It still exports `getResumeLang()` which may be used by the print/PDF routes. After confirming print routes work, it can be removed in a follow-up.

2. **`template/` components** — the old `Header.svelte`, `Navigation.svelte`, `Container.svelte` etc. are left in place. They are used by `/[lang]/print` and the PDF generation routes. Remove them only after verifying those routes are unaffected.

3. **Project slugs** — the `slug` field in `common.json` must match the filename of the `.md` files in `src/content/project/[lang]/`. If a project in `common.json` has no corresponding `.md`, the detail link will 404. Add stub `.md` files for new projects as needed.

4. **Light mode** — the header and footer use hardcoded `bg-[#131b2e]` and intentionally stay dark in both modes (brand identity). Only the page `<main>` background adapts to light mode.

5. **`npm run check` after every task** — this is the only automated verification available. Do not skip it.
