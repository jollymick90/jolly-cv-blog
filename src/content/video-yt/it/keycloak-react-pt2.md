---
title: "Keycloak — Customizzazione Temi React (PT2): Login Funzionante"
date: "2024-03-24"
description: "Implementazione completa di React in un tema Keycloak: da Vite alla compilazione degli asset, mappatura degli Action URL per un login funzionante."
---

# Keycloak — Customizzazione Temi React PT2: Login Funzionante

**Canale:** BacaroTech (YouTube)  
**Lingua:** 🇮🇹 Italiano  
**Tipo:** Tutorial

---

## Il Momento della Verità

Nei precedenti episodi abbiamo gettato le basi teoriche. Ora implementiamo tutto: un tema Keycloak con React che funziona davvero, con il form di login che invia i dati correttamente al server.

---

## Step 1: Creare il Progetto Vite

```bash
npm create vite@latest keycloak-react-theme -- --template react-ts
cd keycloak-react-theme
npm install
```

Configuriamo `vite.config.ts` per produrre i file nella cartella del tema:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../themes/my-theme/login/resources',
    emptyOutDir: false,
    rollupOptions: {
      input: 'src/main.tsx',
      output: {
        entryFileNames: 'js/bundle.js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) return 'css/bundle.css';
          return 'assets/[name][extname]';
        }
      }
    }
  }
});
```

---

## Step 2: Leggere il Context Keycloak

In `src/kcContext.ts`, leggiamo le variabili iniettate da Keycloak:

```ts
interface KcContext {
  url: {
    loginAction: string;
  };
  realm: {
    name: string;
  };
  message?: {
    type: 'success' | 'warning' | 'error' | 'info';
    summary: string;
  };
}

declare global {
  interface Window {
    kcContext?: KcContext;
  }
}

export const kcContext = window.kcContext;
```

---

## Step 3: Il Form di Login React

Il passaggio cruciale è usare il `loginAction` come `action` del form HTML. Keycloak si aspetta una richiesta `POST` tradizionale (non fetch/XHR) a quell'URL.

```tsx
import { kcContext } from './kcContext';

export function LoginForm() {
  if (!kcContext) return null;

  return (
    <form method="post" action={kcContext.url.loginAction}>
      <div>
        <label htmlFor="username">Username</label>
        <input id="username" name="username" type="text" autoComplete="username" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" autoComplete="current-password" />
      </div>
      <button type="submit">Accedi</button>
    </form>
  );
}
```

> **Attenzione:** Non usare `fetch` o `axios` per il submit! Keycloak gestisce il flusso OAuth con redirect, quindi il form deve fare un submit nativo.

---

## Step 4: Build e Deploy

```bash
npm run build
```

I file vengono copiati automaticamente nella cartella del tema. Riavviamo Keycloak e selezioniamo il nostro tema nel realm settings.

---

## Risultato

Un form di login completamente personalizzato con React, che mantiene tutta la sicurezza e la gestione del flusso OAuth di Keycloak, con libertà totale sul design.

---

## Risorse

- [BacaroTech YouTube Channel](https://www.youtube.com/@bacarotech)
- [keycloakify](https://www.keycloakify.dev/) — libreria dedicata per temi React in Keycloak
- [Keycloak Admin Console](https://www.keycloak.org/docs/latest/server_admin/)
