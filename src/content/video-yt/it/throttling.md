---
title: "Throttling — Che Cos'è e a Cosa Serve nei Dev Tools?"
date: "2024-05-10"
description: "Come usare il Network Throttling nei Dev Tools di Chrome, Edge e Firefox per simulare connessioni lente e verificare i loading state della tua app."
---

# Throttling — Che Cos'è e a Cosa Serve?

**Canale:** BacaroTech (YouTube)  
**Lingua:** 🇮🇹 Italiano  
**Tipo:** Tutorial  
**Link:** [Guarda su YouTube](https://www.youtube.com/watch?v=AKYsDMm-EbY)

---

## Il Problema

Sviluppi su una connessione veloce. Il tuo laptop ha fibra, i dati vengono caricati in millisecondi. Vai in produzione e gli utenti si lamentano: "l'app si blocca", "non vedo il loading", "la pagina è bianca per tre secondi".

Il problema? Non hai mai testato la tua app su connessioni reali.

---

## Cos'è il Network Throttling?

Il **throttling** (strozzamento della banda) è una funzionalità dei browser developer tools che simula artificialmente una connessione più lenta.

Puoi limitare:
- **Velocità di download** — quanto velocemente arrivano i dati
- **Velocità di upload** — quanto velocemente vengono inviati
- **Latenza** — il ritardo prima che la risposta inizi ad arrivare

---

## Come Aprire il Network Throttling

### Chrome / Edge

1. Apri DevTools (`F12` o `Cmd+Option+I` su Mac)
2. Vai nella tab **Network**
3. Clicca sul dropdown **"No throttling"** in alto a destra
4. Seleziona un preset (Fast 3G, Slow 3G, ecc.) o crea un profilo custom

### Firefox

1. Apri DevTools (`F12`)
2. Vai nella tab **Network**
3. Clicca sull'icona del **throttling** (⚡) nella toolbar
4. Seleziona la velocità desiderata

---

## I Preset Disponibili

| Preset | Download | Upload | Latenza |
|--------|----------|--------|---------|
| Fast 3G | 1.5 Mbps | 750 Kbps | 562ms |
| Slow 3G | 500 Kbps | 500 Kbps | 2000ms |
| Offline | 0 | 0 | — |

---

## Cosa Verificare con il Throttling

### 1. Loading States

La tua app mostra uno spinner o uno skeleton durante il caricamento? Con la connessione veloce questi durano millisecondi — quasi invisibili. Con il throttling puoi verificare che siano implementati correttamente e che l'UX sia fluida.

```svelte
{#if loading}
  <div class="skeleton-card"></div>
{:else}
  <UserCard user={data} />
{/if}
```

### 2. Immagini

Le immagini pesanti si caricano progressivamente? Sono ottimizzate per connessioni lente?

### 3. Waterfall Analysis

Il tab Network con throttling attivo ti mostra la **waterfall** delle richieste: puoi vedere quali risorse bloccano il rendering e ottimizzarle.

### 4. Perceived Performance

Come si sente l'utente durante il caricamento? Una pagina che mostra subito qualcosa (anche se non ancora completa) si percepisce molto più veloce di una pagina bianca.

---

## Best Practice

1. **Testa sempre con Slow 3G** prima di fare deploy
2. **Implementa sempre un loading state** per ogni operazione asincrona
3. **Usa lazy loading** per immagini e componenti non critici
4. **Imposta Content-Length** correttamente per mostrare progress bar accurate

---

## Risorse

- [Guarda su YouTube](https://www.youtube.com/watch?v=AKYsDMm-EbY)
- [BacaroTech YouTube Channel](https://www.youtube.com/@bacarotech)
- [Chrome DevTools Network Analysis](https://developer.chrome.com/docs/devtools/network/)
- [Core Web Vitals - LCP](https://web.dev/lcp/)
