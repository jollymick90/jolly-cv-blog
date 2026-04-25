---
title: "Devfest Torino — Frontend On Stage: Mastering Performance"
date: "2024-11-09"
description: "A deep dive into Svelte, Angular, and React performance under real stress-test conditions, presented at Google DevFest Torino 2024."
---

# Frontend On Stage: Mastering Performance with Svelte, Angular, React

**When:** November 2024 · DevFest Torino (GDG Torino)  
**Language:** 🇬🇧 English  
**Venue:** Torino, Italy

---

## Abstract

When choosing a frontend framework, performance is one of the key factors that separates production-ready solutions from prototypes. But how much do Svelte, Angular, and React actually differ at runtime?

In this talk I walked the DevFest Torino audience through a live benchmark session, building the same stress-test UI in all three frameworks and comparing the results in real time — covering rendering speed, bundle size, and browser efficiency.

---

## Key Concepts Covered

### Svelte — Compile-Time Performance
Svelte has no virtual DOM and no heavy runtime. It compiles your components into minimal, optimized JavaScript at build time. This translates to incredibly small bundles and near-native DOM manipulation speed.

**What this means in practice:**
- Less JavaScript sent to the browser
- No reconciliation overhead
- Smaller memory footprint

### Angular — Change Detection & Zone.js
Angular uses a zone-based change detection system. By default, it checks for changes across the entire component tree. With `OnPush` strategy and `signals`, you can fine-tune this significantly.

**What this means in practice:**
- Predictable, structured state management
- Zone.js overhead can be mitigated with proper strategy
- Strong DI system and TypeScript-first approach

### React — Virtual DOM & Reconciliation
React's virtual DOM diffs the previous and next render trees and applies only the minimal set of DOM changes. With `React.memo`, `useMemo`, and `useCallback` you can optimize render cycles.

**What this means in practice:**
- Large ecosystem and community
- Hooks API enables fine-grained optimizations
- Concurrent rendering (React 18+) for smoother UX

---

## The Stress Test

I rendered a table with **10,000 rows**, each containing dynamic data. Here is a summary of what we observed:

| Framework | First Render | Update (1 cell change) | Bundle Size |
|-----------|-------------|------------------------|-------------|
| Svelte    | Fastest     | Fastest                | Smallest    |
| React     | Mid         | Mid                    | Mid         |
| Angular   | Slightly slower | Depends on strategy | Largest     |

> **Note:** These benchmarks are illustrative and depend heavily on how you use each framework. Angular with OnPush + signals closes the gap significantly.

---

## Takeaways

1. **Svelte wins on raw performance** — but its ecosystem is smaller
2. **React is the pragmatic choice** — huge ecosystem, proven at scale
3. **Angular is enterprise-ready** — opinionated, structured, perfect for large teams
4. **Context matters** — the best framework is the one your team knows well and that fits your project's lifecycle

---

## Resources

- [Talk Recording (YouTube)](https://www.youtube.com/watch?v=vdcdNBGncZU)
- [GDG Torino](https://gdg.community.dev/gdg-torino/)
- [Svelte docs](https://svelte.dev)
- [Angular performance guide](https://angular.io/guide/performance)
- [React profiler](https://react.dev/reference/react/Profiler)
