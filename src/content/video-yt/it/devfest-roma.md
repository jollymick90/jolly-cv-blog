---
title: "Devfest Roma — Pokedex a Confronto: DevEx e Web Vitals"
date: "2024-06-15"
description: "Confronto tra Svelte, React e Angular costruendo la stessa app Pokedex. Analisi della Developer Experience e dei Core Web Vitals con Lighthouse e Chrome DevTools."
---

# Pokedex a Confronto — DevEx e Web Vitals tra Svelte, React e Angular

**Quando:** Giugno 2024 · DevFest Roma (GDG Roma)  
**Lingua:** 🇮🇹 Italiano  
**Sede:** Roma, Italia

---

## Abstract

Quale modo migliore di confrontare i framework frontend se non costruendo la stessa applicazione in tutti e tre? In questo talk al DevFest Roma ho costruito una Pokedex con Svelte, React e Angular, misurando sia la developer experience che le performance finali dell'app tramite i Core Web Vitals.

---

## Le Metriche

### Core Web Vitals

**LCP — Largest Contentful Paint**  
Misura il tempo necessario affinché il contenuto visibile più grande venga caricato. Un buon LCP è sotto i 2,5 secondi.

**INP — Interaction to Next Paint**  
Misura la reattività della pagina alle interazioni dell'utente. Ha sostituito il FID nel 2024.

**CLS — Cumulative Layout Shift**  
Misura la stabilità visiva — quanto il contenuto si sposta inaspettatamente durante il caricamento.

---

## Developer Experience (DevEx)

Oltre ai numeri puri, il talk ha esplorato come si è sentito sviluppare con ogni framework:

| Framework | Curva d'apprendimento | Boilerplate | Modello di reattività |
|-----------|-----------------------|-------------|----------------------|
| Svelte    | Bassa                 | Minimo      | Dichiarazioni reattive |
| React     | Media                 | Moderato    | useState / hooks |
| Angular   | Alta                  | Più verboso | RxJS / Signals |

---

## Strumenti Usati

- **Lighthouse** — Tool di audit delle performance integrato in Chrome
- **Chrome DevTools** — Tab Performance e analisi del rendering
- **Svelte DevTools** — Inspector dei componenti e visualizzazione degli store
- **React DevTools** — Profiler e albero dei componenti

---

## La Pokedex

L'app costruita in tutti e tre i framework prevedeva:
- Fetch dalla [PokéAPI](https://pokeapi.co/)
- Rendering di una lista di Pokémon con immagini
- Ricerca e filtro per tipo
- Navigazione al dettaglio del singolo Pokémon

Stessa funzionalità, stesso design, tre implementazioni diverse — confrontabili in modo equo.

---

## Risorse

- [Guarda su YouTube](https://www.youtube.com/watch?v=ANUi0fc49cA)
- [GDG Roma](https://gdg.community.dev/gdg-roma/)
- [Core Web Vitals](https://web.dev/vitals/)
