---
title: "AFSK - High-Altitude Balloon Challenge"
date: "2014-06-22"
description: "La mia tesi di laurea è stata una sfida interdisciplinare, con obbiettivo alto. Portare un cubo a 40mila metri. Non ci siamo riusciti ma ho imparato molto. Ora è un gioco per insegnare la radio e le coordinate geostazionarie"
---


# 🛰️ Sfida Pallone Stratosferico AFSK

**Tesi di Laurea – Elettronica & Telecomunicazioni (2013‑2014)**

> *Progettazione e realizzazione di un sistema di telemetria basato su APRS per tracciare un pallone stratosferico fino a \~40 km di quota.*

---

## Panoramica del Progetto 

La **Sfida Pallone Stratosferico AFSK** è stata un’iniziativa interdisciplinare che ha unito elettronica embedded, comunicazioni radioamatoriali e scienza atmosferica. L’obiettivo era **lanciare un payload cubico da 10 cm** nella stratosfera, trasmetterne in tempo reale le coordinate GPS tramite **APRS** (Automatic Packet Reporting System) e recuperare il pallone dopo lo scoppio.

Sebbene i vincoli normativi abbiano bloccato il lancio effettivo, l’hardware e il firmware del payload sono stati completati e successivamente riutilizzati come **kit didattico** per workshop STEM sulla telemetria RF.

## Obiettivi della Missione

* **Tracciamento in tempo reale** di quota, latitudine, longitudine e temperatura fino a \~40 km.
* Operare interamente entro i limiti legali **VHF radioamatoriali** (144,800 MHz, 10 mW EIRP).
* Garantire un’autonomia in volo di **≥ 4 ore** con batterie Li‑Po a −50 °C.
* Fornire un **design open‑source** di riferimento per studenti e hobbisti.

## Architettura del Sistema

```
┌──────────────┐        AFSK 1200 baud          ┌──────────────┐
│    Payload   │  ···························▶ │    Terra     │
│ (Cubo + RF)  │                              │ (SDR + PC)   │
└──────┬───────┘                               └─────┬────────┘
       │ GPS / I²C                                   │ USB
       ▼                                            ▼
┌──────────────┐                           ┌──────────────────┐
│   NEO‑6 GPS  │                           │ Digipeater / IGate│
└──────────────┘                           └──────────────────┘
```

*Flusso dati:* **NEO‑6 GPS → Arduino Nano → incapsulamento AX.25 → modulatore AFSK → trasmettitore VHF → SDR/ricevitore → Dire Wolf → Xastir**.

## Progettazione Hardware

| Modulo           | Componenti                                                      |
| ---------------- | --------------------------------------------------------------- |
| Microcontrollore | **Arduino Nano** (ATmega328P @ 16 MHz)                          |
| Catena RF        | **Radiometrix HX1** 144,800 MHz FM, LPF, antenna ¼ d’onda       |
| Modulazione      | **AFSK Bell‑202 1200 baud** generato via DAC + filtro RC        |
| Posizionamento   | **u‑blox NEO‑6M** GPS (UART, 1 Hz)                              |
| Alimentazione    | 2 × 18650 Li‑Ion + boost TPS61090, NTC per temperatura batterie |
| PCB              | FR‑4 a 2 strati, KiCad 5, 50 × 50 mm                            |


## Firmware & Protocolli

* **Linguaggio:** Arduino C++ (AVR‑GCC) – entro 16 kB di flash.
* **Stack APRS:**

  * Parsing NMEA (`$GPGGA`, `$GPRMC`).
  * Costruzione frame AX.25 UI con CRC‑16.
  * Bit‑stuffing **NRZ‑I** e shaping RZ.
  * Generazione toni ***AFSK 1200 baud*** (1200 Hz = “mark”, 2200 Hz = “space”).
* **Gestione energia:** Deep‑sleep tra i beacon (30–120 s regolabile).
* **Affidabilità:** FEC tramite frame duplicati ogni 5° beacon; watchdog a 4 s.

## Segmento di Terra

1. **Ricevitore:** RTL‑SDR v3 + ground‑plane ¼ d’onda.
2. **Modem:** [**Dire Wolf**](https://github.com/wb2osz/direwolf) v1.7 in modalità KISS TNC.
3. **Mappatura:** [**Xastir**](https://github.com/Xastir/Xastir) o **YAAC** per la mappa live.
4. **IGate opzionale:** Inoltra i frame su APRS‑IS per il tracciamento globale.

## Test & Validazione

* **Camera climatica:** −50 °C → +60 °C, cicli da 3 h – drift batteria & oscillatore.
* **Vibrazioni:** sweep 15–55 Hz, 5 g – integrità connettori e saldature.
* **Test di portata:** Terra‑terra LOS @ 1 mW → > 35 km decodifica da crinale.
* **EMC:** Emissioni condotte ≤ −36 dBm @ 144 MHz (CISPR‑11 classe B).

## Compilazione & Esecuzione


## Risultati Chiave & Lezioni Apprese

* **APRS/AX.25 hands‑on:** dal bit‑stuffing al CRC‑16 e NRZ‑I.
* **Progettazione a basse temperature:** derating Li‑Ion e mitigazione drift del quarzo.
* **Pedagogia modulare:** il payload ora è un **demo plug‑and‑play** in classe: gli studenti demodulano AFSK registrato e tracciano le traiettorie.

## Lavori Futuri

* Integrare **LoRa** a 433 MHz come downlink alternativo.
* Aggiungere **sensori ambientali** (pressione, umidità) con compressione **Mic‑E**.
* Portare il firmware su **STM32** per duty‑cycle maggiore e logging su SD.


---

*Creato con curiosità e un pizzico di statica.*
