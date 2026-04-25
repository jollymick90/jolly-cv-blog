---
title: "Postman — Come Usare le Variabili d'Ambiente?"
date: "2024-04-20"
description: "Guida introduttiva alle variabili di ambiente in Postman: parametrizzare URL, token e credenziali per velocizzare il testing API."
---

# Postman — Come Usare le Variabili d'Ambiente?

**Canale:** BacaroTech (YouTube)  
**Lingua:** 🇮🇹 Italiano  
**Tipo:** Tutorial  
**Link:** [Guarda su YouTube](https://www.youtube.com/watch?v=KA6e8PAksYw)

---

## Perché le Variabili di Ambiente?

Quando testi API, ti trovi spesso a fare la stessa cosa con configurazioni diverse:

- Base URL diverso in locale vs staging vs produzione
- Token diverso per utente admin vs utente normale
- Credenziali diverse per ambienti diversi

Copiare e incollare manualmente questi valori è lento e porta a errori. Le **variabili di ambiente** di Postman risolvono questo problema.

---

## Anatomy di un Environment

Un **Environment** in Postman è un insieme di coppie chiave-valore che puoi attivare e cambiare con un click.

Esempio di environment per sviluppo locale:

| Variable | Initial Value | Current Value |
|----------|--------------|---------------|
| `base_url` | `http://localhost:3000` | `http://localhost:3000` |
| `access_token` | `` | `eyJhbGc...` |
| `admin_token` | `` | `eyJhbGc...` |

---

## Creare un Environment

1. Click su **Environments** nel pannello laterale sinistro
2. Click su **+** per creare un nuovo environment
3. Dai un nome significativo (es. `Local Dev`, `Staging`, `Production`)
4. Aggiungi le variabili che ti servono

---

## Usare le Variabili nelle Request

Ovunque in Postman puoi usare la sintassi `{{nome_variabile}}`:

**URL:**
```
{{base_url}}/api/users
```

**Headers:**
```
Authorization: Bearer {{access_token}}
```

**Body (JSON):**
```json
{
  "user_id": "{{test_user_id}}",
  "role": "admin"
}
```

---

## Gestire Più Ambienti

Il vantaggio principale è poter **switchare** tra ambienti con un dropdown. Ad esempio, puoi avere:

- `Local` → `base_url: http://localhost:3000`
- `Staging` → `base_url: https://staging.api.myapp.com`
- `Production` → `base_url: https://api.myapp.com`

Cambi environment e tutte le tue request usano automaticamente i nuovi valori.

---

## Differenza tra Initial e Current Value

- **Initial Value:** Viene condiviso se esporti l'environment (visibile a chi importa la collection)
- **Current Value:** È locale al tuo Postman, non viene condiviso. Usalo per i token e le password.

> ⚠️ **Sicurezza:** Non mettere mai token o password nell'Initial Value se condividi la collection con altri!

---

## Risorse

- [BacaroTech YouTube Channel](https://www.youtube.com/@bacarotech)
- [Postman Environments Documentation](https://learning.postman.com/docs/sending-requests/managing-environments/)
