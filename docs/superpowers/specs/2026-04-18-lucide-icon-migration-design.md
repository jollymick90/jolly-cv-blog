# Lucide Svelte Icon Migration

**Date:** 2026-04-18  
**Goal:** Replace Material Symbols Outlined (Google Fonts icon font, ~3.8 MB) with `lucide-svelte` to eliminate a render-blocking 7,701 ms critical path chain on slow networks.

---

## Problem

`app.html` loads Material Symbols Outlined as a render-blocking `<link rel="stylesheet">`. The browser cannot paint until it fetches the Google Fonts CSS (822 ms) and then the 3.8 MB variable font file (7,701 ms total critical path). This is the primary cause of slow FCP/LCP on mobile.

---

## Solution

Install `lucide-svelte`, replace the `MaterialIcon.svelte` string-based wrapper with a new `Icon.svelte` component-prop wrapper, update all callsites, and remove the Google Fonts entries from `app.html`.

---

## Architecture

### New `Icon.svelte` wrapper

**Location:** `src/lib/components/shell/Icon.svelte`  
**API:** accepts a Svelte component reference (`icon` prop) + optional `size` and `class`.

```svelte
<script lang="ts">
  import type { Component } from 'svelte';
  const { icon: IconComponent, class: className = '', size = 20 } = $props<{
    icon: Component;
    class?: string;
    size?: number;
  }>();
</script>
<IconComponent size={size} class={className} aria-hidden="true" />
```

Callsite pattern:
```svelte
import { Terminal } from 'lucide-svelte';
import Icon from '$lib/components/shell/Icon.svelte';

<Icon icon={Terminal} class="text-primary" />
```

This keeps tree-shaking fully effective — imports are static at each callsite.

---

## Icon Mapping

| Material Symbol | Lucide component | Used in |
|---|---|---|
| `terminal` | `Terminal` | AppHeader, cv page, home page |
| `arrow_back` | `ArrowLeft` | cv page |
| `home` | `Home` | BottomNav |
| `rocket_launch` | `Rocket` | BottomNav |
| `account_circle` | `CircleUser` | BottomNav |
| `groups` | `Users` | BottomNav |
| `light_mode` | `Sun` | ThemeToggle, FloatingThemeToggle |
| `dark_mode` | `Moon` | ThemeToggle, FloatingThemeToggle |
| `arrow_forward` | `ArrowRight` | project page (LIVE status) |
| `bolt` | `Zap` | project page (BETA status) |
| `lock` | `Lock` | project page (PRIVATE status) |
| `history` | `History` | project page (ARCHIVE status) |
| `devices` | `Monitor` | home page (coreAreas) |
| `explore` | `Compass` | home page (coreAreas) |
| `smart_toy` | `Bot` | home page (coreAreas) |

---

## Dynamic Icon Cases

### `badgeIcon(status)` — `project/+page.svelte`

Change function return type from `string` to `Component`. Return Lucide components directly:

```ts
import { ArrowRight, Zap, Lock, History } from 'lucide-svelte';
import type { Component } from 'svelte';

function badgeIcon(status: ProjectStatus): Component {
  switch (status) {
    case 'LIVE': return ArrowRight;
    case 'BETA': return Zap;
    case 'PRIVATE': return Lock;
    case 'ARCHIVE': return History;
  }
}
```

### `area.icon` — `[lang]/+page.svelte`

`area.icon` is a string from `common.json` (`"devices"`, `"explore"`, `"smart_toy"`). Add a local map:

```ts
import { Monitor, Compass, Bot } from 'lucide-svelte';
import type { Component } from 'svelte';

const AREA_ICONS: Record<string, Component> = {
  devices: Monitor,
  explore: Compass,
  smart_toy: Bot
};
```

Usage: `<Icon icon={AREA_ICONS[area.icon]} />`

---

## Files Changed

| File | Change |
|---|---|
| `package.json` | Add `lucide-svelte` dependency |
| `src/app.html` | Remove 2 Google Fonts `<link>` tags for Material Symbols + inline `.material-symbols-outlined` style block |
| `src/lib/components/shell/MaterialIcon.svelte` | Replace file content with new `Icon.svelte` implementation |
| `src/lib/components/shell/AppHeader.svelte` | Import `Terminal`, use `<Icon>` |
| `src/lib/components/shell/BottomNav.svelte` | Import `Home`, `Rocket`, `CircleUser`, `Users` |
| `src/lib/components/shell/ThemeToggle.svelte` | Import `Sun`, `Moon`; replace inline spans |
| `src/lib/components/shell/FloatingThemeToggle.svelte` | Same as ThemeToggle |
| `src/routes/[lang]/cv/+page.svelte` | Import `ArrowLeft`, `Terminal` |
| `src/routes/[lang]/project/+page.svelte` | Change `badgeIcon()` to return `Component` |
| `src/routes/[lang]/+page.svelte` | Add `AREA_ICONS` map, import 3 icons |

---

## Out of Scope

- Text fonts (Plus Jakarta Sans, Inter) — small files (47 KB + 27 KB), low impact. Not changed.
- `fetchpriority=high` on LCP image — separate concern, separate task.
- Icon sizes in `common.json` — string keys remain as-is, mapped at component level.
