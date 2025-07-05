---
title: "AFSK - High-Altitude Balloon Challenge"
date: "2014-06-22"
description: "My bachelor's project was an interdisciplinary challenge with an ambitious goal: sending a cube to 40,000 meters altitude.
We didn’t quite make it — but I learned a lot along the way.
Today, that project lives on as an educational game to teach radio communication and geostationary coordinates."
---

# 🛰️ AFSK High‑Altitude Balloon Challenge

**Bachelor’s Thesis – Electronics & Telecommunications (2013‑2014)**

> *Designing and building an APRS‑based telemetry stack to track a stratospheric balloon at \~40 km altitude.*

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Mission Objectives](#mission-objectives)
3. [System Architecture](#system-architecture)
4. [Hardware Design](#hardware-design)
5. [Firmware & Protocols](#firmware--protocols)
6. [Ground Segment](#ground-segment)
7. [Testing & Validation](#testing--validation)
8. [Build & Run](#build--run)
9. [Key Outcomes & Lessons Learned](#key-outcomes--lessons-learned)
10. [Future Work](#future-work)
11. [License](#license)

---

## Project Overview

The **AFSK High‑Altitude Balloon Challenge** was an interdisciplinary endeavour combining embedded electronics, amateur‑radio communications, and atmospheric science. The goal was to **launch a 10 cm cube payload** to the stratosphere, transmit its live GPS coordinates over **APRS** (Automatic Packet Reporting System), and recover the balloon after burst.

Although regulatory constraints halted the actual launch, the payload hardware and firmware were fully realised and later repurposed as an **educational kit** for STEM workshops on RF telemetry.

## Mission Objectives

* **Real‑time tracking** of altitude, latitude, longitude and temperature up to \~40 km.
* Operate entirely within **amateur‑radio VHF** legal limits (144.800 MHz, 10 mW EIRP).
* Achieve an airtime autonomy of **≥ 4 hours** with Li‑Po batteries at −50 °C.
* Provide an **open‑source reference design** for students and hobbyists.

## System Architecture

```
┌──────────────┐        1200 baud AFSK          ┌──────────────┐
│   Payload    │  ···························▶ │    Ground    │
│ (Cube + RF)  │                             │ (SDR + PC)   │
└──────┬───────┘                               └─────┬────────┘
       │ GPS / I²C                                  │ USB
       ▼                                           ▼
┌──────────────┐                          ┌──────────────────┐
│   NEO‑6 GPS  │                          │ Digipeater / IGate│
└──────────────┘                          └──────────────────┘
```

*Data path:* **NEO‑6 GPS → Arduino Nano → AX.25 framing → AFSK modulator → VHF transmitter → SDR/receiver → Dire Wolf → Xastir**.

## Hardware Design

| Module          | Component(s)                                                      |
| --------------- | ----------------------------------------------------------------- |
| Microcontroller | **Arduino Nano** (ATmega328P @ 16 MHz)                            |
| RF Chain        | **Radiometrix HX1** 144.800 MHz FM transmitter, LPF, ¼‑wave whip  |
| Modulation      | Custom **1200 baud Bell‑202 AFSK** generation via DAC + RC filter |
| Positioning     | **u‑blox NEO‑6M** GPS (UART, 1 Hz)                                |
| Power           | 2 × 18650 Li‑Ion + TPS61090 boost, NTC for battery temp           |
| PCB             | 2‑layer FR‑4, KiCad 5, 50 × 50 mm                                 |

Detailed schematics and Gerber files are provided in [`/hardware`](hardware/) ⬅︎.

## Firmware & Protocols

* **Language:** Arduino C++ (AVR‑GCC) – written for ≤ 16 kB flash.
* **APRS Stack:**

  * NMEA parsing (`$GPGGA`, `$GPRMC`).
  * AX.25 UI frame construction with CRC‑16.
  * **NRZ‑I** bit‑stuffing and RZ shaping.
  * ***1200 baud AFSK*** tone generation (1200 Hz ≈ ‘mark’, 2200 Hz ≈ ‘space’).
* **Power Management:** Deep‑sleep between beacons (adjustable 30–120 s).
* **Reliability:** FEC via duplicate frames every 5th beacon; watchdog at 4 s.

Firmware source lives in [`/firmware`](firmware/) with full build scripts.

## Ground Segment

1. **Receiver:** RTL‑SDR v3 + quarter‑wave ground‑plane.
2. **Modem:** [**Dire Wolf**](https://github.com/wb2osz/direwolf) v1.7 in KISS TNC mode.
3. **Mapping:** [**Xastir**](https://github.com/Xastir/Xastir) or **YAAC** for live map.
4. **Optional IGate:** Forward frames to APRS‑IS for global tracking.

## Testing & Validation

* **Thermal Chamber:** −50 °C to +60 °C, 3 h cycles – battery & oscillator drift.
* **Vibration:** 15–55 Hz sweep, 5 g – connector and solder‑joint integrity.
* **Range Tests:** Ground‑to‑ground LOS @ 1 mW → > 35 km decode using hilltop.
* **EMC:** Conducted emission ≤ −36 dBm @ 144 MHz (CISPR‑11 class B).


See [`/docs/build.md`](docs/build.md) for full tool‑chain details.

## Key Outcomes & Lessons Learned

* **Hands‑on APRS/AX.25:** From bit‑stuffing to CRC‑16 and NRZ‑I.
* **Low‑temperature design:** Li‑Ion derating and quartz drift mitigation.
* **Modular pedagogy:** Payload now serves as a plug‑and‑play **classroom demo**, where students demodulate prerecorded AFSK and plot flight paths.

## Future Work

* Integrate **LoRa** at 433 MHz as an alternative downlink.
* Add **environmental sensors** (pressure, humidity) and compress via **Mic‑E**.
* Port firmware to **STM32** for higher duty‑cycle and SD logging.


---

*Made with curiosity and a bit of static.*
