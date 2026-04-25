---
title: "Devfest Roma — Pokedex Comparison: DevEx & Web Vitals"
date: "2024-06-15"
description: "Comparing Svelte, React, and Angular by building the same Pokedex app. Analyzing Developer Experience and Core Web Vitals."
---

# Pokedex a confronto — DevEx e Web Vitals tra Svelte, React e Angular

**When:** June 2024 · DevFest Roma (GDG Roma)  
**Language:** 🇮🇹 Italian  
**Venue:** Roma, Italy

---

## Abstract

What better way to compare frontend frameworks than building the same application in all three? In this talk at DevFest Roma I built a Pokedex app using Svelte, React, and Angular, and measured both the developer experience (how it felt to write the code) and the final app performance using Core Web Vitals.

---

## The Metrics

### Core Web Vitals

**LCP — Largest Contentful Paint**  
Measures how long it takes for the largest visible content to load. A good LCP is under 2.5 seconds.

**INP — Interaction to Next Paint**  
Measures how responsive the page is to user interactions. Replaced FID in 2024.

**CLS — Cumulative Layout Shift**  
Measures visual stability — how much content unexpectedly shifts during loading.

---

## Developer Experience (DevEx)

Beyond raw numbers, the talk explored how each framework felt to develop with:

| Framework | Learning Curve | Boilerplate | Reactivity Model |
|-----------|---------------|-------------|-----------------|
| Svelte    | Low           | Minimal     | Reactive declarations |
| React     | Medium        | Moderate    | useState / hooks |
| Angular   | High          | More verbose | RxJS / Signals |

---

## Tools Used

- **Lighthouse** — Chrome's built-in performance auditing tool
- **Chrome DevTools** — Performance tab and rendering analysis
- **Svelte DevTools** — Component inspector and store visualization
- **React DevTools** — Profiler and component tree

---

## Resources

- [Talk Recording (YouTube)](https://www.youtube.com/watch?v=ANUi0fc49cA)
- [GDG Roma](https://gdg.community.dev/gdg-roma/)
- [Core Web Vitals documentation](https://web.dev/vitals/)
