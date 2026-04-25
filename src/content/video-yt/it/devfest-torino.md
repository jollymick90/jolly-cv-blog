---
title: "Devfest Torino — Frontend On Stage: Mastering Performance"
date: "2024-11-09"
description: "Un'analisi approfondita delle performance di Svelte, Angular e React sotto stress test reali, presentata al Google DevFest Torino 2024 (talk in inglese)."
---

# Frontend On Stage: Mastering Performance with Svelte, Angular, React

**Quando:** Novembre 2024 · DevFest Torino (GDG Torino)  
**Lingua:** 🇬🇧 Inglese  
**Sede:** Torino, Italia

---

## Abstract

Quando si sceglie un framework frontend, le performance sono uno dei fattori chiave che separa le soluzioni production-ready dai prototipi. Ma quanto differiscono davvero Svelte, Angular e React a runtime?

In questo talk al DevFest Torino ho guidato il pubblico attraverso una sessione di benchmark live, costruendo la stessa UI sotto stress in tutti e tre i framework e confrontando i risultati in tempo reale — coprendo velocità di rendering, dimensione dei bundle ed efficienza nel browser.

---

## Concetti Chiave

### Svelte — Performance a Compile-Time
Svelte non ha Virtual DOM né runtime pesante. Compila i componenti in JavaScript ottimizzato minimale al build time.

**In pratica:**
- Meno JavaScript inviato al browser
- Nessun overhead di riconciliazione
- Footprint in memoria ridotto

### Angular — Change Detection e Zone.js
Angular usa un sistema di change detection basato su zone. Con la strategia `OnPush` e i nuovi `signals`, si può ottimizzare significativamente.

**In pratica:**
- State management prevedibile e strutturato
- L'overhead di Zone.js si mitiga con la strategia giusta
- Approccio TypeScript-first e DI robusto

### React — Virtual DOM e Riconciliazione
Il Virtual DOM di React confronta il render precedente e quello successivo applicando solo i cambiamenti minimi al DOM reale.

**In pratica:**
- Ecosistema enorme
- Hooks API per ottimizzazioni granulari
- Concurrent rendering con React 18+

---

## Lo Stress Test

Abbiamo renderizzato una tabella con **10.000 righe** di dati dinamici e confrontato i framework:

| Framework | Primo Render | Update (1 cella) | Bundle Size |
|-----------|-------------|------------------|-------------|
| Svelte    | Il più veloce | Il più veloce   | Il più piccolo |
| React     | Medio       | Medio            | Medio       |
| Angular   | Leggermente più lento | Dipende dalla strategia | Il più grande |

---

## Takeaway

1. **Svelte vince sulle performance pure** — ma l'ecosistema è più piccolo
2. **React è la scelta pragmatica** — ecosistema enorme, collaudato in scala
3. **Angular è enterprise-ready** — strutturato e ideale per team grandi
4. **Il contesto conta** — il miglior framework è quello che il tuo team conosce bene

---

## Risorse

- [Guarda su YouTube](https://www.youtube.com/watch?v=vdcdNBGncZU)
- [GDG Torino](https://gdg.community.dev/gdg-torino/)
