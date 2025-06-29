---
title: "Portale GIS per enti pubblici"
date: "2025-06-23"
description: "Progettazione e sviluppo di un portale GIS per la visualizzazione e l'interrogazione di quasi un milione di punti geospaziali distribuiti su tutto il territorio nazionale. Il portale è stato utilizzato da enti pubblici per la verifica di conformità normativa, con particolare attenzione alla rappresentazione cartografica, all'accesso differenziato per ruolo e alla gestione efficiente dei dati geografici."
---

### 🗺️ Portale GIS per enti pubblici

**📆 Periodo:** 2024 (circa 6 mesi)  
**🏢 Contesto:** Progetto realizzato durante un’esperienza lavorativa in ambito pubblico.  
**🎯 Obiettivo:**  
Creare un portale web per la visualizzazione, gestione e interrogazione di dati geospaziali relativi a strutture pubbliche e dati ambientali. Il sistema doveva essere consultabile da utenti autenticati, con ruoli differenziati, e gestire mappe interattive ad alte prestazioni.

**🧱 Architettura:**

- **Frontend:** Angular con mappe interattive basate su OpenLayers
    
- **Backend:** Java (Spring Boot) con esposizione di API REST e integrazione con database geografico
    
- **Infrastruttura GIS:** GeoServer configurato per servire WMS/WFS
    
- **Database:** PostgreSQL + PostGIS
    
- **Autenticazione:** Integrazione con Keycloak per gestione utenti, ruoli e permessi
    
- **Deployment:** Ambiente Kubernetes con Helm chart dedicati, ingress, e gestione namespaces condivisi
    

**🚀 Cosa ho fatto:**

- Progettato e sviluppato il frontend Angular, inclusa la parte interattiva con layer WMS/WFS
    
- Gestito il deploy e tuning di GeoServer, con configurazioni avanzate per stili e filtri
    
- Implementato le API REST e l'integrazione con PostGIS per interrogazioni spaziali (bounding box, layer tematici, ecc.)
    
- Integrato Keycloak per l’autenticazione federata e la gestione degli accessi differenziati
    
- Ottimizzato le performance del portale tramite strategie di caching e indicizzazione spaziale
    

**💡 Sfide risolte:**

- Coordinamento tra layer dinamici e interrogazioni complesse su dataset geografici
    
- Separazione delle viste utente con differenze di accesso ai layer
    
- Ottimizzazione di viste materializzate per interrogazioni rapide lato frontend
    

**🧰 Tecnologie:**  
`Angular` · `OpenLayers` · `Java Spring Boot` · `PostgreSQL/PostGIS` · `GeoServer` · `Keycloak` · `Helm` · `Kubernetes`