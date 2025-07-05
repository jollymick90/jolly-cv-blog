---
title: "Web GIS Portal"
date: "2025-06-23"
description: "Design and development of a web GIS portal for displaying and querying almost one million geospatial points across the national territory. The solution focuses on map-centric data visualisation, role-based access control and efficient handling of large geographic datasets."
---

### 🗺️ Web GIS Portal

**📆 Period:** 2024 (approx. 6 months)  
**🎯 Goal:** Create a web platform to display, manage and query geospatial data related to infrastructure and environmental layers, providing user authentication with role-based access and high-performance interactive maps.

**🧱 Architecture**

* **Frontend:** Angular with interactive maps powered by OpenLayers  
* **Backend:** Java (Spring Boot) exposing REST APIs and integrating with a spatial database  
* **GIS Infrastructure:** GeoServer configured for WMS/WFS services  
* **Database:** PostgreSQL + PostGIS  
* **Authentication:** Keycloak for user, role and permission management  
* **Deployment:** Kubernetes with custom Helm charts, ingress management and shared namespaces  

**🚀 My Role**

* Designed and developed the Angular frontend, including WMS/WFS layer integration  
* Deployed and fine-tuned GeoServer with advanced styling and filtering  
* Implemented REST APIs and PostGIS queries for spatial operations (bounding box, thematic layers, etc.)  
* Integrated Keycloak for federated authentication and role-based access control  
* Optimised system performance through caching strategies and spatial indexing  

**💡 Key Challenges Solved**

* Coordinated dynamic layer rendering with complex spatial queries  
* Managed user-specific views and access restrictions per dataset  
* Reduced spatial-query response times using materialised views  

**🧰 Technologies**  
`Angular` · `OpenLayers` · `Java Spring Boot` · `PostgreSQL/PostGIS` · `GeoServer` · `Keycloak` · `Helm` · `Kubernetes`
