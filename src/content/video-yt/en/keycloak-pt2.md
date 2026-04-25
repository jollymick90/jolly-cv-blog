---
title: "Keycloak — Theme Customization (PT2): JavaScript in Templates"
date: "2024-02-24"
description: "Injecting JavaScript into Keycloak FreeMarker (ftl) templates. Binding between Java server variables and JS, using Vite, Webpack, and Alpine.js."
---

# Keycloak — Theme Customization PT2: JavaScript in Templates

**Channel:** BacaroTech (YouTube)  
**Language:** 🇮🇹 Italian (subtitles not available)  
**Type:** Tutorial

---

## The Server → Client Binding

Keycloak generates variables in the FreeMarker context that we can "export" to JavaScript:

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

---

## Common Syntax Errors

Watch out for FreeMarker syntax: variables are interpolated with `${}` but in JavaScript this can conflict with ES6 template literals.

**Problem:**
```js
const url = `${url.loginAction}`; // ERROR: FreeMarker interprets ${...}
```

**Solution:**
```js
const url = kcContext.url.loginAction; // Correct
```

---

## Using Alpine.js

Alpine.js is an excellent choice for adding interactivity to Keycloak pages without a complex bundler:

```html
<script src="${url.resourcesPath}/js/alpine.min.js" defer></script>

<div x-data="{ showPassword: false }">
  <input :type="showPassword ? 'text' : 'password'" name="password" />
  <button @click="showPassword = !showPassword">Toggle</button>
</div>
```

---

## Resources

- [BacaroTech YouTube Channel](https://www.youtube.com/@bacarotech)
- [Alpine.js Documentation](https://alpinejs.dev/)
