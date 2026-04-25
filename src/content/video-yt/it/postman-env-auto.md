---
title: "Postman — Come Aggiornare Automaticamente le Variabili d'Ambiente?"
date: "2024-04-05"
description: "Trick per ottimizzare i test API su Postman: usa i Test scripts per catturare l'Access Token e salvarlo automaticamente nelle variabili di ambiente."
---

# Postman — Come Aggiornare Automaticamente le Variabili d'Ambiente?

**Canale:** BacaroTech (YouTube)  
**Lingua:** 🇮🇹 Italiano  
**Tipo:** Tutorial

---

## Il Problema

Stai testando un'API protetta da autenticazione. Ogni volta che il tuo token scade devi:

1. Chiamare l'endpoint di login
2. Copiare il token dalla risposta
3. Incollarlo nella variabile di ambiente
4. Richiamare l'endpoint che vuoi testare

Questo processo manuale è lento, ripetitivo e interrompe il flusso di lavoro. C'è un modo migliore.

---

## La Soluzione: Test Scripts di Postman

Postman permette di eseguire codice JavaScript dopo ogni risposta tramite la tab **Tests**. Possiamo sfruttarlo per aggiornare automaticamente le variabili di ambiente.

---

## Configurazione Passo-Passo

### 1. Crea l'Environment in Postman

Nel pannello "Environments" crea un nuovo environment con una variabile `access_token` (lasciala vuota per ora).

### 2. Configura la Request di Login

Crea una request POST al tuo endpoint di login (es. `/auth/login`) con le credenziali nel body.

### 3. Aggiungi il Test Script

Nella tab **Tests** della request di login, incolla:

```javascript
// Leggi il body della risposta come JSON
const jsonData = pm.response.json();

// Estrai il token
const token = jsonData.access_token;

// Salva nella variabile d'ambiente corrente
pm.environment.set("access_token", token);

// Log per debug
console.log("Token salvato:", token.substring(0, 20) + "...");
```

### 4. Usa il Token nelle Altre Request

In tutte le altre request, imposta l'header di autorizzazione:

```
Authorization: Bearer {{access_token}}
```

---

## Variante: Pre-Request Script

Se vuoi che il token venga aggiornato *prima* di chiamare un endpoint (in caso di scadenza), puoi usare un **Pre-request Script**:

```javascript
// Controlla se il token è ancora valido
const token = pm.environment.get("access_token");
if (!token) {
  // Chiama l'endpoint di login
  pm.sendRequest({
    url: pm.environment.get("base_url") + "/auth/login",
    method: "POST",
    header: { "Content-Type": "application/json" },
    body: {
      mode: "raw",
      raw: JSON.stringify({
        username: pm.environment.get("username"),
        password: pm.environment.get("password")
      })
    }
  }, (err, res) => {
    pm.environment.set("access_token", res.json().access_token);
  });
}
```

---

## Risorse

- [Guarda su YouTube](https://www.youtube.com/watch?v=KA6e8PAksYw)
- [BacaroTech YouTube Channel](https://www.youtube.com/@bacarotech)
- [Postman Scripting Documentation](https://learning.postman.com/docs/writing-scripts/intro-to-scripts/)
