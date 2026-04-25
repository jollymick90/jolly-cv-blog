---
title: "Keycloak — Customizzazione Temi React (PT1): SPA vs SSR"
date: "2024-03-10"
description: "Preparare l'integrazione di React per i temi Keycloak. Differenze tra SPA e Server-Side Rendering. Come i bundler preparano il codice per le pagine di login."
---

# Keycloak — Customizzazione Temi React PT1: SPA vs SSR

**Canale:** BacaroTech (YouTube)  
**Lingua:** 🇮🇹 Italiano  
**Tipo:** Tutorial

---

## Il Problema Fondamentale

React è pensato per costruire **Single Page Applications (SPA)**: una singola pagina HTML che carica un bundle JS, e poi React si occupa di tutta la navigazione e il rendering lato client.

Keycloak, invece, usa **FreeMarker Templates** — un approccio Server-Side Rendering dove il server genera HTML pronto all'uso per ogni pagina.

Come facciamo convivere i due approcci?

---

## SPA vs SSR: La Differenza Chiave

### SPA (Come funziona React di default)

```
Browser → Request → Server → index.html (vuoto)
Browser → Scarica bundle.js → React monta il DOM → Pagina visibile
```

**Problema con Keycloak:** Keycloak ha bisogno di controllare l'HTML che serve, non può delegare tutto al client.

### SSR (Come funziona Keycloak)

```
Browser → Request → Server (Java + FreeMarker) → HTML completo
Browser → Riceve HTML pronto → Pagina visibile subito
```

**Opportunità:** Possiamo usare Keycloak per il rendering base e "idratare" con React solo le parti interattive.

---

## La Strategia: React come Enhancement Layer

Invece di usare `ReactDOM.createRoot(document.getElementById('root'))` su una div vuota, montiamo React su un elemento già presente nell'HTML generato da Keycloak.

```js
// main.js (bundlato con Vite)
import React from 'react';
import { createRoot } from 'react-dom/client';
import LoginForm from './LoginForm.jsx';

const container = document.getElementById('react-login-form');
if (container) {
  createRoot(container).render(<LoginForm />);
}
```

Nel file `.ftl`:
```html
<div id="react-login-form" 
     data-action="${url.loginAction}"
     data-realm="${realm.name}">
</div>
<script src="${url.resourcesPath}/js/bundle.js"></script>
```

---

## Come i Bundler Preparano il Codice

I bundler (Vite, Webpack, esbuild) prendono il tuo codice JSX/TSX e lo trasformano in JavaScript puro che il browser può eseguire.

Il processo:

1. **Input:** `src/LoginForm.tsx` (JSX + TypeScript)
2. **Transpile:** JSX → `React.createElement(...)` calls
3. **Bundle:** Tutti i moduli importati uniti in un singolo file
4. **Output:** `resources/js/bundle.js` (JavaScript puro, no JSX)

---

## Cosa Vedremo nel PT2

Nel PT2 andremo all'implementazione concreta: creiamo un progetto React con Vite, colleghiamo gli **Action URL** di Keycloak a React, e vediamo il login funzionare davvero.

---

## Risorse

- [BacaroTech YouTube Channel](https://www.youtube.com/@bacarotech)
- [Keycloak Themes Guide](https://www.keycloak.org/docs/latest/server_development/#_themes)
- [Vite Documentation](https://vitejs.dev/)
