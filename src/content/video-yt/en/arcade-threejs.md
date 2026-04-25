---
title: "Arcade Three.js — Building a 3D Browser Game"
date: "2024-01-15"
description: "How I built a 3D Arcade game with Three.js as a Secret Santa gift. Converting Unity + Python prototypes to pure browser JavaScript."
---

# Arcade Three.js — Building a 3D Browser Game

**Channel:** BacaroTech (YouTube)  
**Language:** 🇮🇹 Italian  
**Type:** Tutorial

---

## The Story

It started as a corporate Secret Santa gift idea: what if instead of buying something, I built a playable 3D game that runs in the browser?

This video documents the journey of building that game using **Three.js** — from an initial prototype in Unity and Python (for face and hand tracking) to a fully browser-based experience hosted on GitHub Pages.

---

## The Tech Stack

### Three.js
Three.js is a WebGL-based 3D library that makes it possible to build interactive 3D experiences directly in the browser without any plugins or native code.

Key concepts used:
- **Scene, Camera, Renderer** — the three pillars of any Three.js app
- **Geometries and Materials** — boxes, spheres, MeshStandardMaterial
- **Lighting** — ambient, directional, point lights
- **Animation Loop** — `requestAnimationFrame` based render loop
- **Raycasting** — for detecting mouse/touch interactions with 3D objects

### What We Ported Away From

- **Unity** — Original prototype was a Unity scene. Porting to the web meant replacing the entire engine with Three.js
- **Python (MediaPipe)** — Hand and face tracking originally used Python + MediaPipe. For the browser version, we switched to `ml5.js` and `Handtrack.js`

---

## Key Challenges

1. **Coordinate System Differences** — Unity uses Y-up, Three.js uses Y-up too but the scene hierarchy differs
2. **Physics Without a Physics Engine** — Simple collision detection implemented manually with bounding boxes
3. **Performance on Low-End Devices** — Had to optimize geometry count and disable shadows on mobile
4. **Deployment** — GitHub Pages doesn't support server-side code, so everything had to be pure client-side JS

---

## What You'll Learn

- Setting up a Three.js project from scratch
- Creating and animating 3D objects
- Handling user input (keyboard and mouse) in a 3D context
- Packaging and deploying a Three.js project to GitHub Pages

---

## Resources

- [Watch on YouTube](https://www.youtube.com/watch?v=kq1VYA6-BWY)
- [Three.js Documentation](https://threejs.org/docs/)
- [BacaroTech YouTube Channel](https://www.youtube.com/@bacarotech)
