# GDG DevFest Lecce 2025 — Getting Started with Svelte

---

## Slide 1 — Welcome

- Welcome Everyone...
- ...Please find a seat so we can get started...
- **Getting Started with Svelte — A Game-Changer for Web Developer**

---

## Slide 2 — Molly's Story (intro narrative)

**Personaggio: Molly** — giovane frontend developer (simbolo del dog 🐕)

Sequenza narrativa:
1. Immagine di Molly il cane
2. Molly — Web Site / Frontend developer
3. *What should Molly learn first??*
4. HTML
5. HTML → CSS
6. HTML → CSS → JS
7. Molly va al lavoro (dog → briefcase)
8. Molly affronta i framework... *(vedi slide RFrameworkComponent)*
9. Torna alla lista: HTML, CSS, JS
10. Aggiunge: **Typescript**
11. Aggiunge: **Framework**
12. Aggiunge: **Library**
13. Aggiunge: **Component**
14. Torna a lavoro, incontra un collega (me!)
15. Il collega dice: *"Try a new framework!"*
16. **"Change your frontend developer life"** → Logo Svelte

**Note speaker:** Molly è la nostra protagonista. Mi ha sentito parlare di React, Angular ecc. ed ha preso questa decisione. La sfida: cosa dovrebbe imparare un frontend developer?

---

## Slide 3 — About Me (Michele Scarpa)

- Foto profilo
- **Michele Scarpa**
- Software Engineer - Web Developer
- Stack: Angular, Java, JS, Svelte, React, Vue
- GDG Lecce logo — Thank you, organizers! Great event, guys!
- **BacaroTech** — community fondata insieme ad altri

```
class Bacarotech {
    team = [
      "Giorgio", "Michele", "Moreno", "Vittorio",
      "Lorenzo", "Davide", "Danilo", "Antonio"
    ]
    technologies = [
      'Frontend', 'Backend', 'DotNet', 'Data Eng',
      'AI', 'DevOps', 'Kotlin', '...'
    ]
    social = ['instagram', 'youtube', 'tiktok', 'linkedin']
    eventi = ['speaker', 'interviste', 'media partner', 'podcast']

    giveMeSomethings() {
      return {"Spritz", "Polpetta"}
    }
}
```

- QR code → https://bacarotech.github.io/

---

## Slide 4 — Agenda

1. **What is** Svelte / SvelteKit
2. **How to Write** a Svelte Component
3. **How to Create** a Svelte Application

---

## Slide 5 — Cosa è Svelte (Definizione)

> *"Svelte is a UI framework that uses a compiler to let you write breathtakingly concise components that do minimal work in the browser, using languages you already know — HTML, CSS and JS. It's a love letter to web development."*

Parole chiave evidenziate: **breathtakingly** / **love letter**

Confronto definizioni di altri framework:
- **Angular** → "Angular is a web framework that empowers developers to build fast, reliable applications."
- **React** → "The library for web and native user interfaces"
- **Vue** → "Un framework accessibile, performante e versatile per la creazione di interfacce utente web."

La parola chiave di Svelte: → **compiler**

---

## Slide 6 — Svelte in 4 Key Ideas

| | |
|---|---|
| **COMPONENT** — It's a component framework | **COMPILER** — but it's also a compiler |
| **META FRAMEWORK** — library of things you need when building an application | **DEVELOPMENT STYLE** — a philosophy of building web apps |

**Note speaker:** Svelte è: un framework a componenti, un compilatore, un kit con tutto il necessario per creare un'applicazione, una nuova filosofia di sviluppo web.

---

## Slide 7 — Base Definitions: Library vs Framework

**Library:**
> *A library is a collection of code, data, or tools created to be reused by different programs, instead of rewriting the same functionality from scratch.*

**Framework:**
> *A reusable structure for software development. A framework is a predesigned structure that provides a foundation for building applications. It defines how different components should interact, offering reusable patterns and conventions.*

**Differenza chiave:**
- Library → **Developer CALL library** (sei tu a chiamare il codice)
- Framework → **"Don't call us, we'll call you"** — *Hollywood Principle*

---

## Slide 8 — The Story of Svelte (Timeline)

| Anno | Versione | Nota |
|------|----------|------|
| **2016** | Svelte 1.0 | First release — **Rich Harris** (Graphic Designer, Guardian / New York Times) |
| **2018** | Svelte 2.0 | |
| **2019** | Svelte 3.0 | **Compiler** — "Rethinking reactivity" |
| **2023** | Svelte 4.0 | |
| **2024** | Svelte 5.0 | **Runes** |

> *"Frameworks are not tools for organizing your code, they are tools for organizing your mind"*

---

## Slide 9 — How the Compiler Works (Performance)

Svelte migliora:
1. **Performance** — No Overhead, No Runtime, Component PURE JS
2. **Dev Experience**

### Pipeline del compilatore

```
.svelte → [Parse] → [Analyze] → [Transform] → JS + CSS Ottimizzato
                       ↓               ↑
                      AST            Model
```

Fasi:
1. **Parse** → genera l'AST (Abstract Syntax Tree)
2. **Analyze** → estrae variabili reattive, scope locale/globale, CSS scopato (hash `.svelte-xyz`), costruisce il Model
3. **Transform** → genera codice CSR o SSR; Output: `App.js` (JS minimale) + `App.css` (stili necessari, hashati); No Virtual DOM → operazioni dirette sul DOM reale

**Risultati benchmark:** js-framework-benchmark mostra Svelte tra i più performanti per velocità, memoria e dimensione bundle.

---

## Slide 10 — How To Write a Svelte Component

Un componente Svelte vive in un unico file `.svelte`:

```svelte
<script>
    import { $state } from 'svelte/state';
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

- `<script>` — logica del componente (opzionale)
- HTML — markup (opzionale)
- `<style>` — CSS isolato al componente (opzionale)

Esempio minimo (solo HTML):
```svelte
<h1>Hello GDG Lecce!</h1>
```

---

## Slide 11 — Scoped Style

CSS automaticamente isolato al componente. Non serve generare classi uniche a mano o usare CSS-in-JS.

```svelte
<h1>Hello Svelte</h1>
<style>
  h1 {
    color: hotpink;
  }
</style>
```

Con componenti nested — `App.svelte`:
```svelte
<h1>Hello Svelte</h1>
<Nested></Nested>
<style>
  h1 { color: hotpink; }
</style>
```

`Nested.svelte` (stile indipendente):
```svelte
<h1>Hello GDG Lecce</h1>
<style>
  h1 { color: white; }
</style>
```

---

## Slide 12 — Reactivity

**Analogia della lavagna:**
- `var numero1 = 10`, `var numero2 = 10`
- `var TOTAL = numero1 + numero2 = 20`
- Se `numero2` cambia a `15`, il TOTAL non si aggiorna da solo → devi riscrivere

**Reattività in altri framework:**

React:
```js
import { useState } from 'react';
const [age, setAge] = useState(28);
setAge(a => a + 1)
```

Vue:
```js
import { ref } from 'vue'
const count = ref(0)
count.value++
```

Angular:
```js
import {signal} from '@angular/core';
const count = signal(0);
```

SolidJS / Preact signals:
```js
import { createSignal } from "solid-js";
const [count, setCount] = createSignal(0);

import { signal } from "@preact/signals-core";
const counter = signal(0);
counter.value = 1;
```

**Svelte 3 (reattività implicita):**
```svelte
<script>
    let name = "Michele"
    let count = 0
</script>
<h1>Hello {name}!</h1>
<input bind:value={name} />
<button onclick={() => count += 1}>clicks: {count}</button>
```

**Svelte 5 (runes — reattività esplicita):**
```svelte
<script>
    let name = $state("Michele")
    let count = $state(0)
</script>
<h1>Hello {name}!</h1>
<input bind:value={name} />
<button onclick={() => count += 1}>clicks: {count}</button>
```

**Runes:**
> *rune /ruːn/ noun — A letter or mark used as a mystical or magic symbol.*

- Usabili in `.svelte` e `.svelte.js` / `.svelte.ts`
- Svelte 5 usa un modello basato sui **signals**

**Deep Reactivity con `$derived`:**
```svelte
<script>
    let numbers = $state([1, 2, 3, 4]);
    let total = $derived(numbers.reduce((t, n) => t + n, 0));

    function addNumber() {
        numbers.push(numbers.length + 1);
    }
</script>
<p>I numeri sono: {numbers.join(' + ')}</p>
<p>Il totale è: {total}</p>
<button onclick={addNumber}>Aggiungi un numero</button>
```

---

## Slide 13 — Binding & Directive

**Binding:**
- One Way Binding: From Parent to Child
- Two Way Binding: From Child to Parent

```svelte
<script>
    let name = $state('Molly');
</script>
// From parent to child
<h1>Benvenuta, {name}!</h1>
// From child to parent
<p>Inserisci il nome:</p>
<input bind:value={name} />
```

**Template syntax — if/else:**
```svelte
{#if showIf}
  <p in:fade>Visibile</p>
{:else}
  <p in:fade>Alternativa</p>
{/if}
```

**Template syntax — each:**
```svelte
<ul>
  {#each items as n (n)}
    <li animate:flip>Elemento {n}</li>
  {:else}
    <li>Nessun elemento</li>
  {/each}
</ul>
```

**Template syntax — await:**
```svelte
{#await p}
  <p>Caricamento…</p>
{:then result}
  <p>{result}</p>
{:catch err}
  <p>Errore: {err?.message}</p>
{/await}
```

**Template syntax — snippet:**
```svelte
{#snippet figure(image)}
    <figure>
        <img src={image.src} alt={image.caption} />
        <figcaption>{image.caption}</figcaption>
    </figure>
{/snippet}
{@render figure(image)}
```

**Altre direttive:**
```svelte
<!-- render children o fallback -->
{#if children}
    {@render children()}
{:else}
    <p>fallback content</p>
{/if}

<!-- HTML grezzo -->
<p>{@html raw}</p>

<!-- debug -->
{@debug debugVar}
```

---

## Slide 14 — Learning by Doing (Playground)

- Svelte REPL Playground — https://svelte.dev/playground

---

## Slide 15 — SvelteKit

> SvelteKit è il framework ufficiale costruito su Svelte.

- Helps you write less code
- Helps guides you with smart conventions
- Free you from boilerplate setup
- Official framework built on Svelte

---

## Slide 16 — Creare un'Applicazione SvelteKit

```bash
npx sv create bacaro-svelte
```

**Wizard di creazione:**

```
◆  Which template would you like?
│  ● SvelteKit minimal
│  ○ SvelteKit demo
│  ○ Svelte library

◆  Add type checking with TypeScript?
│  ● Yes, using TypeScript syntax
│  ○ Yes, using JavaScript with JSDoc comments
│  ○ No

◆  What would you like to add to your project?
│  ◻ prettier  ◻ eslint  ◻ vitest  ◻ playwright
│  ◻ tailwindcss  ◻ sveltekit-adapter  ◻ devtools-json
│  ◻ drizzle  ◻ lucia  ◻ mdsvex  ◻ paraglide  ◻ storybook

◆  Which package manager?
│  ● npm  ○ yarn  ○ pnpm  ○ bun  ○ deno
```

---

## Slide 17 — SvelteKit Routing

**Routing tramite libreria (approccio alternativo):**
```js
import { Router, Route, Link } from "svelte-routing";
import Home from "./pages/Home.svelte";
import About from "./pages/About.svelte";

<Router>
    <Route path="/" component={Home} />
    <Route path="/about" component={About} />
</Router>
```

**SvelteKit Routing — Filesystem-based router:**
- La struttura delle cartelle È la configurazione del routing

```
src/routes/
    ├── about/
    ├── products/
```
→ `https://bacarosvelte/about`  
→ `https://bacarosvelte/products`

**Struttura completa:**
```
src/
├── app.css
├── app.html
├── lib/
│   ├── components/
│   │   └── Header.svelte
│   └── utils/
│       └── helpers.js
└── routes/
    ├── about/
    │   └── +page.svelte
    ├── products/
    │   ├── [id]/
    │   │   └── +page.svelte
    │   └── +page.svelte
    ├── +layout.svelte
    ├── +page.server.js
    └── +page.svelte
```

**File di routing SvelteKit:**
- `+page.svelte` → UI: la pagina!
- `+page.server.js` → Caricamento dati lato server e config prerendering
- `+layout.svelte` → Struttura comune tra pagine (header, footer, sidebar...)
- `+server.js` → Build your API REST-like

---

## Slide 18 — SvelteKit Page Configuration

```js
// configurazione di base
export const ssr = true/false;
export const csr = true/false;
export const prerendering = true/false;
```

**Client-Side Rendering (CSR) Only:**
```js
export const ssr = false;
export const csr = true;
export const prerendering = false;
```

**Server-Side Rendering (SSR):**
```js
export const ssr = true;
export const csr = false;
export const prerendering = false;
```

**Static Site Generation (SSG):**
```js
export const ssr = false;
export const csr = false;
export const prerendering = true;
```

**Hybrid / Hydration:**
```js
export const ssr = true;
export const csr = true;
export const prerendering = false;
```

---

## Slide 19 — SvelteKit Data Loading

```js
// src/routes/blog/+page.server.js
import { error } from '@sveltejs/kit';

export function load() {
  const posts = [ /*... dati fittizi... */ ];
  if (!posts) {
    error(404, 'Post non trovati');
  }
  return {
    summaries: posts.map((post) => ({
      slug: post.slug,
      title: post.title,
    }))
  };
}
```

Il file `+page.server.js` viene eseguito solo sul server. La funzione `load` restituisce un oggetto automaticamente passato come prop alla pagina Svelte.

---

## Slide 20 — SvelteKit Features (Overview)

- Routing
- Typescript Integration
- Service Worker
- Server-side Rendering (SSR)
- Static Site Generation (SSG)
- Client-side Rendering (CSR)
- Hydration
- Data fetching
- Library packaging
- Optimised production builds
- Deploying to different hosting provider
- ....

---

## Slide 21 — Key Takeaways / Conclusion

| | |
|---|---|
| **Svelte VS Other** (NextJS, NuxtJS, Angular) | **Ecosystem** (UI Library, State Management, Styling) |
| **Production** (Enterprise, ???) | **It's time to try it out.** |

**Note speaker:**
- La scelta tra Svelte e Next.js è una scelta di filosofia. Svelte fa tutto il lavoro in anticipo (compile time), Next.js usa Virtual DOM con runtime più grande ma ecosistema enorme.
- SvelteKit è "con le batterie incluse": routing, state management già integrati — meno dipendenze esterne, meno decisional fatigue.

---

## Slide 22 — Thanks / QR Code

- QR Code contatto: Michele Scarpa
- Fine presentazione
