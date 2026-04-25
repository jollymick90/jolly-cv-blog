---
title: "Keycloak — React Theme Customization (PT2): Working Login"
date: "2024-03-24"
description: "Complete implementation of React in a Keycloak theme: from Vite to building assets, mapping Action URLs for a working login."
---

# Keycloak — React Theme Customization PT2: Working Login

**Channel:** BacaroTech (YouTube)  
**Language:** 🇮🇹 Italian (subtitles not available)  
**Type:** Tutorial

---

## The Login Form in React

The crucial step is using `loginAction` as the form's `action`. Keycloak expects a traditional `POST` request (not fetch/XHR) to that URL.

```tsx
export function LoginForm() {
  const loginAction = document.getElementById('react-login-form')
    ?.dataset.action ?? '';

  return (
    <form method="post" action={loginAction}>
      <input name="username" type="text" autoComplete="username" />
      <input name="password" type="password" autoComplete="current-password" />
      <button type="submit">Sign In</button>
    </form>
  );
}
```

> **Important:** Don't use `fetch` or `axios` for submission! Keycloak handles the OAuth flow with redirects, so the form must do a native submit.

---

## Resources

- [BacaroTech YouTube Channel](https://www.youtube.com/@bacarotech)
- [keycloakify](https://www.keycloakify.dev/) — dedicated library for React themes in Keycloak
