---
title: "Keycloak — Customizzazione Temi (PT1)"
date: "2024-02-10"
description: "Come personalizzare il tema di login di Keycloak. FreeMarker Templates (ftl) e iniezione di Tailwind CSS per sovrascrivere il design originario."
---

# Keycloak — Customizzazione Temi PT1

**Canale:** BacaroTech (YouTube)  
**Lingua:** 🇮🇹 Italiano  
**Tipo:** Tutorial

---

## Cos'è Keycloak?

Keycloak è un identity provider open-source sviluppato da Red Hat che offre SSO (Single Sign-On), OAuth2, OpenID Connect e gestione degli utenti out of the box.

È ampiamente usato in contesti enterprise per centralizzare l'autenticazione senza dover reinventare la ruota in ogni applicazione.

---

## Il Problema: La Pagina di Login Bruttina

Di default, Keycloak mostra la sua pagina di login standard. Se stai costruendo un prodotto con una brand identity precisa, questa pagina "rompe" l'esperienza visiva dell'utente.

La soluzione è personalizzare il **tema** di Keycloak.

---

## Come Funziona il Sistema di Temi

Keycloak gestisce i temi tramite file **FreeMarker Template (ftl)** — un motore di template Java. I file `.ftl` sono la base di ogni pagina mostrata da Keycloak: login, registrazione, errori, ecc.

La struttura base di un tema:

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

## Clonare il Tema Base

Il primo passo è clonare il tema base (`keycloak`) per avere tutti i file come punto di partenza:

1. Naviga in `standalone/deployments/` (o il percorso corretto per la tua versione)
2. Copia la cartella del tema base nella directory `themes/`
3. Rinomina la cartella con il nome del tuo tema
4. In `theme.properties`, imposta `parent=keycloak` per ereditare le risorse non sovrascritte

---

## Iniettare Tailwind CSS

Una volta clonato il tema, possiamo sovrascrivere il CSS includendo Tailwind.

Nel file `login.ftl`, aggiungiamo il riferimento alla nostra stylesheet personalizzata:

```html
<link rel="stylesheet" href="${url.resourcesPath}/css/custom.css">
```

Il file `custom.css` conterrà le utility class di Tailwind (generate con la CLI o copiate dal CDN per semplicità).

---

## Cosa Vedremo nel PT2

Nella seconda parte andremo più in profondità, introducendo JavaScript nelle pagine ftl e capendo come fare il binding tra variabili server-side (Java) e il codice client.

---

## Risorse

- [BacaroTech YouTube Channel](https://www.youtube.com/@bacarotech)
- [Keycloak Documentation](https://www.keycloak.org/docs/)
- [FreeMarker Template Docs](https://freemarker.apache.org/)
