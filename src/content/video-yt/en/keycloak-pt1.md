---
title: "Keycloak — Theme Customization (PT1): FreeMarker & Tailwind"
date: "2024-02-10"
description: "How to customize the Keycloak login page. Cloning the base theme, understanding FreeMarker Templates (ftl), and injecting Tailwind CSS."
---

# Keycloak — Theme Customization PT1

**Channel:** BacaroTech (YouTube)  
**Language:** 🇮🇹 Italian (subtitles not available)  
**Type:** Tutorial

---

## What is Keycloak?

Keycloak is an open-source identity provider developed by Red Hat, offering SSO (Single Sign-On), OAuth2, OpenID Connect, and user management out of the box.

It's widely used in enterprise contexts to centralize authentication without reinventing the wheel in every application.

---

## The Problem: The Default Login Page

By default, Keycloak shows its standard login page. If you're building a product with a precise brand identity, this page "breaks" the user's visual experience.

The solution is to customize the Keycloak **theme**.

---

## How the Theme System Works

Keycloak manages themes through **FreeMarker Template (ftl)** files — a Java template engine. The `.ftl` files are the foundation of every page shown by Keycloak: login, registration, errors, etc.

Basic theme structure:

```
themes/
└── my-theme/
    └── login/
        ├── theme.properties
        ├── login.ftl
        └── resources/
            ├── css/
            └── js/
```

---

## Cloning the Base Theme

1. Navigate to `standalone/deployments/` (or the correct path for your version)
2. Copy the base theme folder to the `themes/` directory
3. Rename the folder with your theme name
4. In `theme.properties`, set `parent=keycloak` to inherit non-overridden resources

---

## Injecting Tailwind CSS

Once the theme is cloned, we can override the CSS by including Tailwind.

In `login.ftl`, add a reference to our custom stylesheet:

```html
<link rel="stylesheet" href="${url.resourcesPath}/css/custom.css">
```

The `custom.css` file contains Tailwind utility classes (generated with the CLI or copied from the CDN for simplicity).

---

## Resources

- [BacaroTech YouTube Channel](https://www.youtube.com/@bacarotech)
- [Keycloak Documentation](https://www.keycloak.org/docs/)
- [FreeMarker Template Docs](https://freemarker.apache.org/)
