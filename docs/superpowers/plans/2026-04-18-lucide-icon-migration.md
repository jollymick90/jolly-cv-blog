# Lucide Icon Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the 3.8 MB render-blocking Material Symbols Outlined Google Font with `lucide-svelte` to eliminate the 7,701 ms critical path chain on slow networks.

**Architecture:** Install `lucide-svelte`, replace `MaterialIcon.svelte` with a thin `Icon.svelte` wrapper that accepts a Svelte component reference as its `icon` prop, update all 8 callsite files, and remove the two Google Fonts `<link>` tags from `app.html`. Dynamic icon cases (`badgeIcon()` and `area.icon` from JSON) are resolved by returning/mapping component references instead of strings.

**Tech Stack:** SvelteKit, Svelte 5 (runes), TypeScript, lucide-svelte 1.0.1, Tailwind CSS

---

## File Map

| File | Action |
|---|---|
| `src/lib/components/shell/MaterialIcon.svelte` | Replace content → becomes `Icon.svelte` logic |
| `src/app.html` | Remove 2 Google Fonts `<link>` tags + inline style block |
| `src/lib/components/shell/ThemeToggle.svelte` | Replace inline `<span class="material-symbols-outlined">` |
| `src/lib/components/shell/FloatingThemeToggle.svelte` | Same as ThemeToggle |
| `src/lib/components/shell/AppHeader.svelte` | Replace `<MaterialIcon name="terminal">` |
| `src/lib/components/shell/BottomNav.svelte` | Replace `<MaterialIcon>` + change icon array from string to Component |
| `src/routes/[lang]/cv/+page.svelte` | Replace two `<MaterialIcon>` usages |
| `src/routes/[lang]/project/+page.svelte` | Change `badgeIcon()` return type to `Component` |
| `src/routes/[lang]/+page.svelte` | Add `AREA_ICONS` map, replace `<MaterialIcon>` usages |

---

## Task 1: Install lucide-svelte

**Files:**
- Modify: `package.json` (via npm)

- [ ] **Step 1: Install the package**

```bash
npm install lucide-svelte
```

Expected output: `added 1 package` (or similar — lucide-svelte has no runtime dependencies).

- [ ] **Step 2: Verify it landed**

```bash
node -e "const p=require('./package.json'); console.log(p.dependencies['lucide-svelte'])"
```

Expected: `^1.0.1` (or similar semver range).

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: add lucide-svelte dependency"
```

---

## Task 2: Replace MaterialIcon.svelte with Icon.svelte

**Files:**
- Modify: `src/lib/components/shell/MaterialIcon.svelte` (repurpose as Icon.svelte)

The new wrapper accepts a Lucide component reference as `icon`, plus optional `size` (px) and `class`. It uses `<svelte:component>` for dynamic rendering which is the safe pattern in Svelte 5 for component-as-prop.

- [ ] **Step 1: Replace the file content**

Replace the entire content of `src/lib/components/shell/MaterialIcon.svelte` with:

```svelte
<script lang="ts">
  import type { Component } from 'svelte';

  const { icon: IconComponent, class: className = '', size = 20 } = $props<{
    icon: Component;
    class?: string;
    size?: number;
  }>();
</script>

<svelte:component this={IconComponent} {size} class={className} aria-hidden="true" />
```

- [ ] **Step 2: Run type check**

```bash
npm run check
```

Expected: errors only in files that still import MaterialIcon with the old `name` string prop (that's expected — we fix those in subsequent tasks).

- [ ] **Step 3: Commit**

```bash
git add src/lib/components/shell/MaterialIcon.svelte
git commit -m "refactor: replace MaterialIcon with Lucide Icon wrapper"
```

---

## Task 3: Remove Material Symbols from app.html

**Files:**
- Modify: `src/app.html`

- [ ] **Step 1: Remove the two Google Fonts entries and inline style**

In `src/app.html`, remove these lines entirely (lines 7–16 in the current file):

```html
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
```

Keep ONLY the Plus Jakarta Sans + Inter link (first one above). The `<head>` should look like:

```html
<head>
  <meta charset="utf-8" />
  <link rel="icon" href="%sveltekit.assets%/favicon.png" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet"/>
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
```

- [ ] **Step 2: Run type check**

```bash
npm run check
```

Expected: same result as Task 2 (existing import errors, no new ones).

- [ ] **Step 3: Commit**

```bash
git add src/app.html
git commit -m "perf: remove Material Symbols Google Font (3.8MB render-blocking resource)"
```

---

## Task 4: Update ThemeToggle and FloatingThemeToggle

**Files:**
- Modify: `src/lib/components/shell/ThemeToggle.svelte`
- Modify: `src/lib/components/shell/FloatingThemeToggle.svelte`

Both files use inline `<span class="material-symbols-outlined text-[20px]">` — replace with direct Lucide imports (no Icon wrapper needed here since the component is statically known).

- [ ] **Step 1: Rewrite ThemeToggle.svelte**

Replace the entire file content:

```svelte
<script lang="ts">
  import { Sun, Moon } from 'lucide-svelte';
  import { themeStore } from '$lib/stores/theme.store';
</script>

<button
  type="button"
  onclick={themeStore.toggle}
  class="flex items-center justify-center text-primary hover:text-tertiary transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
  aria-label={$themeStore === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
>
  {#if $themeStore === 'dark'}
    <Sun size={20} aria-hidden="true" />
  {:else}
    <Moon size={20} aria-hidden="true" />
  {/if}
</button>
```

- [ ] **Step 2: Rewrite FloatingThemeToggle.svelte**

Replace the entire file content:

```svelte
<script lang="ts">
  import { Sun, Moon } from 'lucide-svelte';
  import { themeStore } from '$lib/stores/theme.store';
</script>

<button
  type="button"
  onclick={themeStore.toggle}
  class="fixed bottom-6 right-6 z-50
         w-11 h-11 flex items-center justify-center
         rounded-xl
         bg-surface-container border border-outline-variant/15
         text-on-surface hover:text-tertiary
         transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
  aria-label={$themeStore === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
>
  {#if $themeStore === 'dark'}
    <Sun size={20} aria-hidden="true" />
  {:else}
    <Moon size={20} aria-hidden="true" />
  {/if}
</button>
```

- [ ] **Step 3: Run type check**

```bash
npm run check
```

Expected: no new errors from these two files.

- [ ] **Step 4: Commit**

```bash
git add src/lib/components/shell/ThemeToggle.svelte src/lib/components/shell/FloatingThemeToggle.svelte
git commit -m "feat: migrate ThemeToggle icons to lucide-svelte"
```

---

## Task 5: Update AppHeader.svelte

**Files:**
- Modify: `src/lib/components/shell/AppHeader.svelte`

- [ ] **Step 1: Replace the script block and icon usage**

Replace the entire file content:

```svelte
<script lang="ts">
  import { Terminal } from 'lucide-svelte';
  import { page } from '$app/state';
  import Icon from './MaterialIcon.svelte';
  import LangDropdown from './LangDropdown.svelte';
  import ThemeToggle from './ThemeToggle.svelte';
  import type { LangAvailable } from '$lib/types';

  const { lang }: { lang: LangAvailable } = $props();

  const navItems = $derived([
    { label: 'DEPLOYS', icon: 'rocket_launch', href: `/${lang}/project` },
    { label: 'BIO', icon: 'account_circle', href: `/${lang}/cv` },
    { label: 'COMMUNITY', icon: 'groups', href: `/${lang}/blog` }
  ]);

  function isActive(href: string): boolean {
    const path = page.url.pathname;
    return path === href || path.startsWith(href + '/');
  }
</script>

<header class="fixed top-0 w-full z-50 bg-surface-container-low flex justify-between items-center px-6 py-4 border-b border-outline-variant/15">
  <a href="/{lang}/" class="flex items-center gap-2 no-underline">
    <Icon icon={Terminal} class="text-primary" />
    <span class="text-base font-bold text-primary tracking-widest font-headline">MICHELE SCARPA</span>
  </a>

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

  <div class="flex items-center gap-4">
    <span class="hidden md:block text-[10px] font-bold text-primary tracking-widest opacity-60">
      STATUS: AVAILABLE
    </span>
    <ThemeToggle />
    <LangDropdown {lang} />
  </div>
</header>
```

- [ ] **Step 2: Run type check**

```bash
npm run check
```

Expected: no errors from AppHeader.

- [ ] **Step 3: Commit**

```bash
git add src/lib/components/shell/AppHeader.svelte
git commit -m "feat: migrate AppHeader terminal icon to lucide-svelte"
```

---

## Task 6: Update BottomNav.svelte

**Files:**
- Modify: `src/lib/components/shell/BottomNav.svelte`

The `navItems` array currently holds string icon names. Change to hold Lucide component references.

- [ ] **Step 1: Replace the entire file content**

```svelte
<script lang="ts">
  import { page } from '$app/state';
  import { Home, Rocket, CircleUser, Users } from 'lucide-svelte';
  import type { Component } from 'svelte';
  import Icon from './MaterialIcon.svelte';
  import type { LangAvailable } from '$lib/types';

  const { lang }: { lang: LangAvailable } = $props();

  const navItems: { label: string; icon: Component; href: string }[] = $derived([
    { label: 'HOME', icon: Home, href: `/${lang}` },
    { label: 'DEPLOYS', icon: Rocket, href: `/${lang}/project` },
    { label: 'BIO', icon: CircleUser, href: `/${lang}/cv` },
    { label: 'COMMUNITY', icon: Users, href: `/${lang}/blog` }
  ]);

  function isActive(href: string): boolean {
    const path = page.url.pathname;
    if (href === `/${lang}`) return path === href;
    return path === href || path.startsWith(href + '/');
  }
</script>

<nav class="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-2 bg-background/80 backdrop-blur-md z-50 border-t border-outline-variant/15">
  {#each navItems as item}
    <a
      href={item.href}
      class="flex flex-col items-center justify-center px-4 py-2 transition-all duration-200 hover:bg-surface-container-low
        {isActive(item.href) ? 'text-tertiary border-t-2 border-tertiary' : 'text-secondary'}"
    >
      <Icon icon={item.icon} size={22} />
      <span class="font-label text-[10px] font-medium tracking-widest uppercase mt-0.5">
        {item.label}
      </span>
    </a>
  {/each}
</nav>
```

- [ ] **Step 2: Run type check**

```bash
npm run check
```

Expected: no errors from BottomNav.

- [ ] **Step 3: Commit**

```bash
git add src/lib/components/shell/BottomNav.svelte
git commit -m "feat: migrate BottomNav icons to lucide-svelte"
```

---

## Task 7: Update cv/+page.svelte

**Files:**
- Modify: `src/routes/[lang]/cv/+page.svelte`

Two icons: `arrow_back` (ArrowLeft, size 14) and `terminal` (Terminal, size 20 with color class).

- [ ] **Step 1: Update the script imports**

Replace only the script block (lines 1–9):

```svelte
<script lang="ts">
  import { ArrowLeft, Terminal } from 'lucide-svelte';
  import Icon from '$lib/components/shell/MaterialIcon.svelte';
  import type { Profile } from '$lib/content/profile.d.ts';
  import { page } from '$app/stores';

  let { data }: { data: { profile: Profile } } = $props();
  const profile = $derived(data.profile);
  const lang = $derived($page.params.lang ?? 'en');
</script>
```

- [ ] **Step 2: Replace the arrow_back icon (line 20)**

Replace:
```svelte
<MaterialIcon name="arrow_back" class="text-sm" />
```

With:
```svelte
<Icon icon={ArrowLeft} size={14} />
```

- [ ] **Step 3: Replace the terminal icon (line 67)**

Replace:
```svelte
<MaterialIcon name="terminal" class="text-tertiary text-lg" />
```

With:
```svelte
<Icon icon={Terminal} size={20} class="text-tertiary" />
```

- [ ] **Step 4: Run type check**

```bash
npm run check
```

Expected: no errors from cv/+page.svelte.

- [ ] **Step 5: Commit**

```bash
git add src/routes/[lang]/cv/+page.svelte
git commit -m "feat: migrate cv page icons to lucide-svelte"
```

---

## Task 8: Update project/+page.svelte

**Files:**
- Modify: `src/routes/[lang]/project/+page.svelte`

`badgeIcon()` currently returns a `string`. Change it to return a Lucide `Component`.

- [ ] **Step 1: Replace the script block**

Replace lines 1–27 (entire `<script>` block):

```svelte
<script lang="ts">
  import { page } from '$app/state';
  import { ArrowRight, Zap, Lock, History } from 'lucide-svelte';
  import type { Component } from 'svelte';
  import Icon from '$lib/components/shell/MaterialIcon.svelte';
  import type { ProfileProject, ProjectStatus } from '$lib/content/profile.d.ts';

  let { data }: { data: { projects: ProfileProject[] } } = $props();
  const { projects } = data;
  const lang = $derived(page.params.lang ?? 'en');

  function badgeClass(status: ProjectStatus): string {
    switch (status) {
      case 'LIVE': return 'bg-tertiary text-on-tertiary';
      case 'BETA': return 'bg-surface-container-highest text-secondary';
      case 'PRIVATE': return 'border border-outline-variant text-outline-variant';
      case 'ARCHIVE': return 'border border-outline-variant/50 text-outline-variant/50';
    }
  }

  function badgeIcon(status: ProjectStatus): Component {
    switch (status) {
      case 'LIVE': return ArrowRight;
      case 'BETA': return Zap;
      case 'PRIVATE': return Lock;
      case 'ARCHIVE': return History;
    }
  }
</script>
```

- [ ] **Step 2: Replace the icon usage in the template (line 63)**

Replace:
```svelte
<MaterialIcon name={badgeIcon(project.status)} class="text-outline-variant group-hover:text-tertiary transition-colors shrink-0" />
```

With:
```svelte
<Icon icon={badgeIcon(project.status)} size={20} class="text-outline-variant group-hover:text-tertiary transition-colors shrink-0" />
```

- [ ] **Step 3: Run type check**

```bash
npm run check
```

Expected: no errors from project/+page.svelte.

- [ ] **Step 4: Commit**

```bash
git add src/routes/[lang]/project/+page.svelte
git commit -m "feat: migrate project page icons to lucide-svelte"
```

---

## Task 9: Update [lang]/+page.svelte (home page)

**Files:**
- Modify: `src/routes/[lang]/+page.svelte`

Two icon usages: `area.icon` from JSON data (resolved via `AREA_ICONS` map) and a static `terminal` icon.

- [ ] **Step 1: Update the script block**

Replace lines 1–12 (entire `<script>` block):

```svelte
<script lang="ts">
  import { t } from '$lib/i18n';
  import { Terminal, Monitor, Compass, Bot } from 'lucide-svelte';
  import type { Component } from 'svelte';
  import Icon from '$lib/components/shell/MaterialIcon.svelte';
  import Photos from '$lib/components/pages/home/Photos.svelte';
  import avatar from '$lib/img/photos/profilo-1-DSCF2646.webp';
  import { downloadCV } from '$lib/utils/download-pdf';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
  const profile = $derived(data.profile);
  const lang = $derived(data.lang ?? 'en');

  const AREA_ICONS: Record<string, Component> = {
    devices: Monitor,
    explore: Compass,
    smart_toy: Bot
  };
</script>
```

- [ ] **Step 2: Replace the coreAreas icon (line 95)**

Replace:
```svelte
<MaterialIcon name={area.icon} class="text-tertiary mb-6 block text-4xl" />
```

With:
```svelte
<Icon icon={AREA_ICONS[area.icon]} size={36} class="text-tertiary mb-6 block" />
```

- [ ] **Step 3: Replace the terminal icon (line 176)**

Replace:
```svelte
<MaterialIcon name="terminal" class="text-tertiary" />
```

With:
```svelte
<Icon icon={Terminal} size={20} class="text-tertiary" />
```

- [ ] **Step 4: Run type check**

```bash
npm run check
```

Expected: **zero errors** — this is the final callsite.

- [ ] **Step 5: Commit**

```bash
git add src/routes/[lang]/+page.svelte
git commit -m "feat: migrate home page icons to lucide-svelte"
```

---

## Task 10: Final verification

- [ ] **Step 1: Run the dev server and visually verify**

```bash
npm run dev
```

Open `http://localhost:5173/en` and check:
- Header `terminal` icon visible immediately
- Bottom nav icons (home, rocket, circle-user, users) render correctly
- Theme toggle sun/moon icons work
- `/en/cv` — ArrowLeft back link and terminal icon in Stack section
- `/en/project` — status badge icons (arrow-right, zap, lock, history)
- Home page coreAreas — three icons (monitor, compass, bot)

- [ ] **Step 2: Run full type check and build**

```bash
npm run check && npm run build
```

Expected: no errors, build completes to `build/`.

- [ ] **Step 3: Confirm Material Symbols is gone from the build**

```bash
grep -r "material-symbols\|fonts.googleapis.com.*Material" build/ || echo "CLEAN — no Material Symbols references"
```

Expected: `CLEAN — no Material Symbols references`

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete lucide-svelte migration — removes 3.8MB render-blocking font"
```
