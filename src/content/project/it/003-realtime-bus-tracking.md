---
title: "Tracciamento in tempo reale di mezzi pubblici"
date: "2019-06-23"
description: "Realizzare una funzionalità mobile per tracciare in tempo reale la posizione di un autobus durante la corsa, visualizzandone il movimento su mappa e fornendo informazioni sulle fermate successive."

---

### 🚌 Tracciamento in tempo reale di mezzi pubblici

**📆 Periodo:** 2019
**🏢 Contesto:** Sviluppo di una funzionalità all’interno di un sistema più ampio di digital signage per il settore dei trasporti.
**🎯 Obiettivo:**
Realizzare una funzionalità mobile per tracciare in tempo reale la posizione di un autobus durante la corsa, visualizzandone il movimento su mappa e fornendo informazioni sulle fermate successive.

**🧱 Architettura:**

* **Piattaforma:** Android (app nativa)
* **Dispositivo:** Minicomputer embedded con sistema Android e modulo GPS integrato
* **Dati in ingresso:** Coordinate GPS fornite da hardware proprietario
* **Funzionalità chiave:**

  * Scaricamento e gestione dei tracciati predefiniti del percorso
  * Visualizzazione dinamica della posizione corrente sulla mappa
  * Evidenziazione delle fermate future lungo il percorso

**🚀 Cosa ho fatto:**

* Gestito l’integrazione con hardware esterno per l’acquisizione dei dati GPS
* Implementato la logica per il download dei tracciati e la loro visualizzazione
* Sviluppato una funzione per seguire automaticamente la posizione del mezzo sulla mappa
* Creato un simulatore di corsa per effettuare test in assenza di GPS reale
* Gestito la logica per mostrare in tempo reale le fermate future

**💡 Sfide risolte:**

* Sincronizzazione precisa tra dati GPS reali e mappa
* Simulazione fluida degli spostamenti per validare l’esperienza utente
* Ottimizzazione della resa grafica su dispositivi embedded a risorse limitate

**🧰 Tecnologie:**
`Android SDK` · `Google Maps / OpenStreetMap` · `Kotlin/Java` · `Custom GPS integration` · `JSON/REST`

**📎 Link:** *(non disponibile per progetto aziendale)*
