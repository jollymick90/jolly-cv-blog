---
title: "Arcade Three.js — Building a 3D Browser Game"
date: "2024-01-15"
description: "Come ho costruito un gioco Arcade 3D con Three.js come regalo per il Secret Santa aziendale, convertendo prototipi Unity e Python in puro JavaScript browser-based."
---

# Arcade Three.js — Costruire un Gioco 3D nel Browser

**Canale:** BacaroTech (YouTube)  
**Lingua:** 🇮🇹 Italiano  
**Tipo:** Tutorial

---

## La Storia

Tutto è partito da un'idea per il Secret Santa aziendale: invece di comprare qualcosa, perché non costruire un gioco 3D giocabile nel browser?

Questo video documenta il percorso di costruzione di quel gioco usando **Three.js** — da un prototipo iniziale in Unity e Python (per il tracciamento di viso e mani) fino a un'esperienza completamente browser-based ospitata su GitHub Pages.

---

## Lo Stack Tecnologico

### Three.js
Three.js è una libreria 3D basata su WebGL che permette di costruire esperienze 3D interattive direttamente nel browser senza plugin o codice nativo.

Concetti chiave usati:
- **Scene, Camera, Renderer** — i tre pilastri di ogni app Three.js
- **Geometrie e Materiali** — box, sfere, MeshStandardMaterial
- **Illuminazione** — ambient, directional, point lights
- **Animation Loop** — loop di render basato su `requestAnimationFrame`
- **Raycasting** — per rilevare interazioni mouse/touch con oggetti 3D

### Da Dove Siamo Partiti

- **Unity** — Il prototipo originale era una scena Unity. Il porting al web significava sostituire l'intera engine con Three.js
- **Python (MediaPipe)** — Il tracciamento di mani e viso usava originalmente Python + MediaPipe. Per la versione browser siamo passati a `ml5.js` e `Handtrack.js`

---

## Le Sfide Principali

1. **Differenze nel Sistema di Coordinate** — Unity e Three.js usano entrambi Y-up ma la gerarchia della scena differisce
2. **Fisica Senza un Physics Engine** — Rilevamento collisioni implementato manualmente con bounding box
3. **Performance su Dispositivi Low-End** — Ottimizzazione del numero di geometrie e disabilitazione delle ombre su mobile
4. **Deployment** — GitHub Pages non supporta codice server-side, quindi tutto doveva essere pure client-side JS

---

## Cosa Imparerai

- Impostare un progetto Three.js da zero
- Creare e animare oggetti 3D
- Gestire l'input utente (tastiera e mouse) in un contesto 3D
- Pacchettizzare e deployare un progetto Three.js su GitHub Pages

---

## Risorse

- [Guarda su YouTube](https://www.youtube.com/watch?v=kq1VYA6-BWY)
- [Three.js Documentation](https://threejs.org/docs/)
- [BacaroTech YouTube Channel](https://www.youtube.com/@bacarotech)
