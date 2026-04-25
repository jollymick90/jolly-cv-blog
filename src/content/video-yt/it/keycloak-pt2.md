---
title: "Keycloak — Customizzazione Temi (PT2): JavaScript nei Template"
date: "2024-02-24"
description: "Iniettare JavaScript nei template FreeMarker (ftl) di Keycloak. Binding tra variabili Java e JS, uso di Vite, Webpack e Alpine.js."
---

# Keycloak — Customizzazione Temi PT2: JavaScript nei Template

**Canale:** BacaroTech (YouTube)  
**Lingua:** 🇮🇹 Italiano  
**Tipo:** Tutorial

---

## Dove Eravamo Rimasti

Nel PT1 abbiamo visto come clonare il tema base di Keycloak e iniettare Tailwind CSS per personalizzare l'aspetto visivo della pagina di login.

In questa seconda parte entriamo nel lato dinamico: come iniettare JavaScript nei template `.ftl` e come far comunicare le variabili generate lato server (Java) con il codice client.

---

## Il Binding Server → Client

Keycloak genera variabili nel contesto FreeMarker che possiamo "esportare" verso JavaScript:

```html
<script>
  var kcContext = {
    realm: "${realm.name}",
    url: {
      loginAction: "${url.loginAction}"
    }
  };
</script>
```

Questi valori vengono interpolati dal motore FreeMarker prima di servire la pagina, rendendoli disponibili come variabili JavaScript globali.

---

## Errori Comuni di Sintassi

Attenzione alla sintassi FreeMarker: le variabili vengono interpolate con `${}` ma in JavaScript questo può confondersi con i template literal ES6.

**Problema:**
```js
const url = `${url.loginAction}`; // ERRORE: FreeMarker interpreta ${...}
```

**Soluzione:**
```js
const url = kcContext.url.loginAction; // Corretto
```

---

## Usare Bundler con Keycloak

Invece di scrivere vanilla JS direttamente nel file `.ftl`, possiamo usare un bundler per una developer experience migliore.

### Con Vite

```json
// vite.config.js
export default {
  build: {
    outDir: 'themes/my-theme/login/resources',
    rollupOptions: {
      input: 'src/main.js'
    }
  }
}
```

Dopo il build, i file JS e CSS vengono copiati nella cartella `resources` del tema.

### Con Alpine.js

Alpine.js è una scelta eccellente per aggiungere interattività alle pagine Keycloak senza un bundler complesso:

```html
<script src="${url.resourcesPath}/js/alpine.min.js" defer></script>

<div x-data="{ showPassword: false }">
  <input :type="showPassword ? 'text' : 'password'" name="password" />
  <button @click="showPassword = !showPassword">Toggle</button>
</div>
```

---

## Cosa Vedremo nel PT3

Nella terza parte integreremo **React** come framework UI per il tema Keycloak, affrontando la sfida di far convivere una SPA con il rendering server-side di Keycloak.

---

## Risorse

- [BacaroTech YouTube Channel](https://www.youtube.com/@bacarotech)
- [Alpine.js Documentation](https://alpinejs.dev/)
- [Vite Documentation](https://vitejs.dev/)
