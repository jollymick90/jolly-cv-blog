---
title: "Static Site Generation for Svelte Portfolio Blog"
date: "2025-06-22"
description: "Vi parlo di come ho costruito proprio questo sito. Delle sfide e delle varie decisioni che ho preso"
---

**Progetto personale – Studio su SSR & SSG (2023 – presente)**

> Una web‑app full‑stack in **SvelteKit** che unisce *Server‑Side Rendering* (SSR) e *Static Site Generation* (SSG) per generare automaticamente un portfolio e un blog personalizzabili a partire da file Markdown.

---

## TL;DR

* Volevo un sito personale veloce, *SEO‑friendly* e facile da estendere.
* Ho scelto **SvelteKit** come laboratorio per imparare SSR/SSG.
* Gli articoli sono file **`.md`**: la pagina viene creata in fase di build tramite **mdsvex**; niente HTML manuale.
* Il progetto mi ha fatto ripensare l’architettura rispetto a SPA e microservizi.
* È tuttora in evoluzione: ogni commit riflette una nuova lezione appresa.

---

## 1. Obiettivi

| # | Descrizione                                                                          |
| - | ------------------------------------------------------------------------------------ |
| 1 | Centralizzare CV, portfolio e articoli tecnici in un unico dominio                   |
| 2 | Garantire caricamenti rapidissimi sfruttando SSG dove possibile                      |
| 3 | Mantenere la flessibilità di SSR per sezioni dinamiche (es. form di contatto)        |
| 4 | Permettere la **scrittura in Markdown** senza toccare il codice                      |
| 5 | Avere un playground per sperimentare **SvelteKit**, **TypeScript** e **TailwindCSS** |

---

## 2. Architettura ad alto livello

```txt
┌──────────────────────────────────────┐
│          SvelteKit App (Vite)        │
│  ┌──────────────┐    ┌────────────┐  │
│  │  SSR Routes  │    │  SSG Pages │  │
│  └──────────────┘    └────────────┘  │
│          ▲                ▲          │
│          │                │          │
│  Markdown + Front‑Matter  │          │
│       (mdsvex)            │          │
│          ▼                │          │
│     Content Layer         │          │
└─────────┬──────────────────┴─────────┘
          │  Static Assets (Vercel Edge)
          ▼
    CDN / Edge Network
```

* **SSR**: route `/projects/[slug]` per recuperare dati JSON aggiornati (es. GitHub stars).
* **SSG**: route `/blog/[slug]` pre‑renderizzata; ogni file `src/posts/*.md` diventa una pagina durante `npm run build`.
* **TailwindCSS**: utility‑first styling con *purge* per ridurre la dimensione finale del CSS.
* **Vercel**: deploy continuo; preview per branch.

---

## 3. Pipeline di build

1. **Import Markdown 🔄**
   Grazie a **mdsvex** ogni file Markdown viene trasformato in componente Svelte con supporto JSX‑like.
2. **Parsing Front‑Matter 📑**
   Titolo, data, tag e slug vengono estratti e inseriti nell’*content map*.
3. **Generazione Rotte ➕**
   In `src/routes/blog/[slug]/+page.ts` uso `load()` per recuperare il contenuto già serializzato; SvelteKit produce la pagina statica.
4. **Build & Prerender 🚀**
   `svelte-kit build` esegue il prerender per tutte le rotte marcate come `prerender = true`.
5. **Deploy su Vercel 🌐**
   L’artefatto viene inviato; Vercel serve le pagine SSG via CDN e i percorsi SSR tramite edge functions.

---

## 4. Personalizzazione

| Area         | Come si modifica                                                    |
| ------------ | ------------------------------------------------------------------- |
| **Articoli** | Aggiungi un nuovo `.md` in `src/posts/` con front‑matter YAML       |
| **Progetti** | Aggiorna `src/lib/data/projects.ts` (o collegalo a un CMS headless) |
| **Theme**    | Edita `tailwind.config.js` + variabili CSS in `app.css`             |
| **SEO**      | File `+layout.ts` imposta meta tag Open Graph e JSON‑LD             |

La separazione dei contenuti dal codice permette a chiunque di collaborare scrivendo semplici Markdown senza conoscere Svelte.

---

## 5. Principali Decisioni Tecniche

1. **mdsvex** al posto di `@sveltejs/adapter-static` + remark custom ⇒ parsing flessibile e componenti React‑like in Markdown.
2. **Dynamic import** dei post per ridurre il bundle iniziale e abilitare *code‑splitting*.
3. **`prerender` configurabile per route**: se voglio rendere un articolo privato, basta disattivare la prerender flag.
4. **`load` functions typed** con `PageData` & `LoadEvent` per evitare *runtime errors*.
5. **Testing end‑to‑end** con **Playwright** per validare sia SSR che pagine statiche.

---

## 6. Sfide Affrontate

| Sfida                                                     | Soluzione                                                         |
| --------------------------------------------------------- | ----------------------------------------------------------------- |
| Gestire **hydration mismatch** tra HTML statico e runtime | Evitare logica client‑only nei componenti caricati in SSG         |
| Creare slugs internazionalizzati                          | Funzione `slugify()` con fallback per caratteri accentati         |
| Configurare percorsi SSG in **CI**                        | Script Node che elenca `posts/*.md` e imposta `prerender.entries` |
| **SEO** per pagine SSR & SSG                              | Gestione centralizzata dei meta in `hooks.server.ts`              |

---

## 7. Stack Tecnologico

`SvelteKit` · `TypeScript` · `mdsvex` · `TailwindCSS` · `Vite` · `Playwright` · `Vercel`

---

## 8. Come eseguire in locale

```bash
# Clona il repo
$ git clone https://github.com/jollymick90/jolly-cv-blog
$ cd jolly-cv-blog

# Installa le dipendenze
$ npm install

# Avvia in modalità dev (SSR)
$ npm run dev

# Build + SSG preview
$ npm run build
$ npm run preview
```

---

## 9. Prossimi Passi

* **Commenti** via [Utterances](https://utteranc.es/) + GitHub Issues
* **Dark mode** persistente con `localStorage`
* **Search** client‑side indicizzata con `FlexSearch`
* **CMS headless** opzionale (es. Sanity) collegato via API

---

## 10. Licenza

Distribuito sotto licenza **MIT**.

> *“Stay curious, ship often, refine forever.”*
