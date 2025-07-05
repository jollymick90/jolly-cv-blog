---
title: "Portale GIS Web"
date: "2025-06-23"
description: "Progettazione e sviluppo di un portale GIS web per visualizzare e interrogare quasi un milione di punti geospaziali sul territorio nazionale. La soluzione pone l'accento sulla visualizzazione su mappa, sul controllo degli accessi basato sui ruoli e sulla gestione efficiente di grandi dataset geografici."
---

### 🗺️ Portale GIS Web

**📆 Periodo:** 2024 (circa 6 mesi)  
**🎯 Obiettivo:** Creare una piattaforma web per visualizzare, gestire e interrogare dati geospaziali relativi a infrastrutture e strati ambientali, garantendo autenticazione con accesso basato sui ruoli e mappe interattive ad alte prestazioni.

**🧱 Architettura**

* **Frontend:** Angular con mappe interattive basate su OpenLayers  
* **Backend:** Java (Spring Boot) che espone API REST e si integra con un database spaziale  
* **Infrastruttura GIS:** GeoServer configurato per servizi WMS/WFS  
* **Database:** PostgreSQL + PostGIS  
* **Autenticazione:** Keycloak per la gestione di utenti, ruoli e permessi  
* **Deployment:** Kubernetes con chart Helm personalizzati, gestione ingress e namespace condivisi  

**🚀 Il mio ruolo**

* Progettazione e sviluppo del frontend Angular, inclusa l'integrazione dei layer WMS/WFS  
* Deploy e ottimizzazione di GeoServer con configurazioni avanzate di stile e filtri  
* Implementazione di API REST e query PostGIS per operazioni spaziali (bounding box, layer tematici, ecc.)  
* Integrazione di Keycloak per autenticazione federata e controllo accessi basato sui ruoli  
* Ottimizzazione delle prestazioni mediante strategie di caching e indicizzazione spaziale  

**💡 Sfide principali risolte**

* Coordinamento del rendering dinamico dei layer con query spaziali complesse  
* Gestione di viste e restrizioni di accesso specifiche per utente e dataset  
* Riduzione dei tempi di risposta delle query spaziali tramite materialized view  

**🧰 Tecnologie**  
`Angular` · `OpenLayers` · `Java Spring Boot` · `PostgreSQL/PostGIS` · `GeoServer` · `Keycloak` · `Helm` · `Kubernetes`
