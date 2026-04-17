---
title: "Getting Started with Svelte: A Game-Changer for Web Developers"
date: "2025-11-01"
description: "Svelte is a component framework, but also a compiler, a library of everything you need to build an application, and a philosophy for building web apps."
---

**When:** GDG DevFest Lecce 2025  
**Where:** Lecce, Italy

---

## Molly's Story

Molly is a young frontend developer. Like many of us, she learned HTML, then CSS, then JavaScript — and found herself lost choosing between React, Angular, Vue, frameworks and libraries. One day a colleague tells her: *"Try a new framework — change your frontend developer life."* The Svelte logo appears.

---

## What is Svelte

> *"Svelte is a UI framework that uses a compiler to let you write breathtakingly concise components that do minimal work in the browser, using languages you already know — HTML, CSS and JS. It's a love letter to web development."*

The keyword that sets Svelte apart? **Compiler.**

Svelte is four things at once:

| | |
|---|---|
| **Component Framework** — write components naturally | **Compiler** — it compiles away the framework |
| **Meta Framework** — everything you need to ship an app | **Development Style** — a new philosophy for the web |

---

## How the Compiler Works

Svelte transforms `.svelte` files into optimized JavaScript and CSS:

```
.svelte → [Parse] → [Analyze] → [Transform] → Optimized JS + CSS
                       ↓               ↑
                      AST            Model
```

1. **Parse** — generates the Abstract Syntax Tree
2. **Analyze** — extracts reactive variables, scoped CSS (hashed `.svelte-xyz`)
3. **Transform** — generates CSR or SSR code; no Virtual DOM, direct real DOM operations

The result: minimal bundle size, benchmark-leading performance.

---

## How to Write a Svelte Component

A component lives in a single `.svelte` file:

```svelte
<script>
    let name = $state('Molly');
    let count = $state(0);
</script>

<h1>Hello {name}!</h1>

<button onclick={() => count++}>
    clicks: {count}
</button>

<style>
    h1 { color: tomato; }
</style>
```

- `<script>` — component logic
- HTML — markup
- `<style>` — CSS **automatically scoped** to the component (no CSS-in-JS, no manual unique class names)

---

## Reactivity: from Svelte 3 to Svelte 5

**Svelte 3** — implicit reactivity, just assign:
```svelte
<script>
    let count = 0
</script>
<button onclick={() => count += 1}>clicks: {count}</button>
```

**Svelte 5** — explicit reactivity with **Runes**:
```svelte
<script>
    let count = $state(0)
    let double = $derived(count * 2)
</script>
<button onclick={() => count += 1}>clicks: {count} — double: {double}</button>
```

> *rune /ruːn/ — A letter or mark used as a mystical or magic symbol.*

Runes bring Svelte to a **signals-based** model, usable in `.svelte.ts` files outside components too.

---

## Template Syntax

```svelte
<!-- if/else -->
{#if condition}
  <p>Visible</p>
{:else}
  <p>Alternative</p>
{/if}

<!-- each -->
{#each items as item (item.id)}
  <li>{item.label}</li>
{/each}

<!-- await -->
{#await promise}
  <p>Loading…</p>
{:then result}
  <p>{result}</p>
{:catch err}
  <p>Error: {err?.message}</p>
{/await}

<!-- snippet (Svelte 5) -->
{#snippet figure(image)}
    <figure>
        <img src={image.src} alt={image.caption} />
        <figcaption>{image.caption}</figcaption>
    </figure>
{/snippet}
{@render figure(image)}
```

---

## SvelteKit

SvelteKit is the official meta-framework built on Svelte. It provides:

- **Filesystem-based routing** — folder structure is your route config
- TypeScript integration
- SSR, SSG, CSR, Hydration
- Data fetching with `load()`
- Service Worker support
- Optimized builds for any hosting provider

```bash
npx sv create my-app
```

### Routing

```
src/routes/
    ├── about/+page.svelte         → /about
    ├── products/+page.svelte      → /products
    └── products/[id]/+page.svelte → /products/:id
```

### Data Loading

```js
// src/routes/blog/+page.server.js
export function load() {
    const posts = [ /* ... */ ];
    return {
        summaries: posts.map(p => ({ slug: p.slug, title: p.title }))
    };
}
```

---

## Svelte Timeline

| Year | Version | Note |
|------|---------|------|
| 2016 | Svelte 1.0 | First release — Rich Harris (The Guardian / NY Times) |
| 2019 | Svelte 3.0 | "Rethinking reactivity" — compiler front and center |
| 2024 | Svelte 5.0 | Runes — explicit signals-based reactivity |

> *"Frameworks are not tools for organizing your code, they are tools for organizing your mind."* — Rich Harris

---

## Key Takeaways

Svelte is not just an alternative to React or Angular — it's a **philosophical choice**. It does all the work ahead of time (compile time), produces minimal bundles, and offers one of the most concise developer experiences in the frontend landscape.

SvelteKit adds everything else: routing, SSR, data loading. Batteries included, fewer dependencies, less decisional fatigue.

*It's time to try it out.*
