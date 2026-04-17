---
title: "Getting Started with Svelte: A Game-Changer for Web Developers"
date: "2025-11-01"
description: "Svelte è un framework a componenti, ma anche un compilatore, una libreria con tutto il necessario per creare un'applicazione, e una filosofia di sviluppo web."
---

**Quando:** GDG DevFest Lecce 2025  
**Dove:** Lecce

---

## La storia di Molly

Molly è una giovane frontend developer. Come molti di noi, ha imparato HTML, poi CSS, poi JavaScript — e si è ritrovata a dover scegliere tra React, Angular, Vue, framework e librerie. Un giorno un collega le dice: *"Try a new framework — change your frontend developer life."* E compare il logo di Svelte.

---

## Cosa è Svelte

> *"Svelte is a UI framework that uses a compiler to let you write breathtakingly concise components that do minimal work in the browser, using languages you already know — HTML, CSS and JS. It's a love letter to web development."*

La parola chiave che distingue Svelte dagli altri? **Compiler.**

Svelte è quattro cose insieme:

| | |
|---|---|
| **Component Framework** — framework a componenti | **Compiler** — ma è anche un compilatore |
| **Meta Framework** — ha tutto il necessario per costruire un'app | **Development Style** — una nuova filosofia di sviluppo web |

---

## Come funziona il compilatore

Il compilatore di Svelte trasforma i file `.svelte` in JavaScript e CSS ottimizzati:

```
.svelte → [Parse] → [Analyze] → [Transform] → JS + CSS Ottimizzato
                       ↓               ↑
                      AST            Model
```

1. **Parse** — genera l'Abstract Syntax Tree
2. **Analyze** — estrae variabili reattive, CSS scopato (hash `.svelte-xyz`)
3. **Transform** — genera codice CSR o SSR; nessun Virtual DOM, operazioni dirette sul DOM reale

Il risultato: bundle minimo, performance misurabili tra le migliori nei benchmark.

---

## Come si scrive un componente Svelte

Un componente vive in un unico file `.svelte`:

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

- `<script>` — logica del componente
- HTML — markup
- `<style>` — CSS **automaticamente isolato** al componente (niente CSS-in-JS, niente classi uniche a mano)

---

## Reattività: da Svelte 3 a Svelte 5

**Svelte 3** — reattività implicita, basta assegnare:
```svelte
<script>
    let count = 0
</script>
<button onclick={() => count += 1}>clicks: {count}</button>
```

**Svelte 5** — reattività esplicita con le **Runes**:
```svelte
<script>
    let count = $state(0)
    let double = $derived(count * 2)
</script>
<button onclick={() => count += 1}>clicks: {count} — double: {double}</button>
```

> *rune /ruːn/ — A letter or mark used as a mystical or magic symbol.*

Le Runes portano Svelte verso un modello basato sui **signals**, usabili anche in `.svelte.ts` al di fuori dei componenti.

---

## Template syntax

```svelte
<!-- if/else -->
{#if showIf}
  <p>Visibile</p>
{:else}
  <p>Alternativa</p>
{/if}

<!-- each -->
{#each items as item (item.id)}
  <li>{item.label}</li>
{/each}

<!-- await -->
{#await promise}
  <p>Caricamento…</p>
{:then result}
  <p>{result}</p>
{:catch err}
  <p>Errore: {err?.message}</p>
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

SvelteKit è il meta-framework ufficiale di Svelte. Offre:

- **Filesystem-based routing** — la struttura delle cartelle è la configurazione del routing
- TypeScript integration
- SSR, SSG, CSR, Hydration
- Data fetching con `load()`
- Service Worker
- Build ottimizzati per qualsiasi hosting provider

```bash
npx sv create my-app
```

### Routing

```
src/routes/
    ├── about/+page.svelte        → /about
    ├── products/+page.svelte     → /products
    └── products/[id]/+page.svelte → /products/:id
```

### Data loading

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

## Timeline di Svelte

| Anno | Versione | Nota |
|------|----------|------|
| 2016 | Svelte 1.0 | First release — Rich Harris (The Guardian / NY Times) |
| 2019 | Svelte 3.0 | "Rethinking reactivity" — compilatore in primo piano |
| 2024 | Svelte 5.0 | Runes — reactivity esplicita basata su signals |

> *"Frameworks are not tools for organizing your code, they are tools for organizing your mind."* — Rich Harris

---

## Conclusioni

Svelte non è solo un'alternativa a React o Angular — è una **scelta di filosofia**. Fa tutto il lavoro in anticipo (compile time), produce bundle minimali e offre una developer experience tra le più concise del panorama frontend.

SvelteKit aggiunge tutto ciò che manca: routing, SSR, data loading. Con le batterie incluse, meno dipendenze, meno decisional fatigue.

*È il momento di provarlo.*
