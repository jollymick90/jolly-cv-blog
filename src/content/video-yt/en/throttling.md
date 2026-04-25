---
title: "Throttling — What is it and Why Use it in Dev Tools?"
date: "2024-05-10"
description: "How to use Network Throttling in Chrome, Edge, and Firefox Dev Tools to simulate slow connections and verify loading states in your app."
---

# Throttling — What is it and Why Use it?

**Channel:** BacaroTech (YouTube)  
**Language:** 🇮🇹 Italian (subtitles not available)  
**Type:** Tutorial

---

## How to Enable Throttling

### Chrome / Edge

1. Open DevTools (`F12` or `Cmd+Option+I` on Mac)
2. Go to the **Network** tab
3. Click the **"No throttling"** dropdown in the top right
4. Select a preset (Fast 3G, Slow 3G, etc.)

### Available Presets

| Preset | Download | Upload | Latency |
|--------|----------|--------|---------|
| Fast 3G | 1.5 Mbps | 750 Kbps | 562ms |
| Slow 3G | 500 Kbps | 500 Kbps | 2000ms |
| Offline | 0 | 0 | — |

---

## What to Verify

- **Loading states** — Does your app show a spinner or skeleton during data fetching?
- **Images** — Do heavy images load progressively?
- **Waterfall** — Which resources block rendering?

---

## Resources

- [Watch on YouTube](https://www.youtube.com/watch?v=AKYsDMm-EbY)
- [Chrome DevTools Network Analysis](https://developer.chrome.com/docs/devtools/network/)
