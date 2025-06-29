---
title: "GIS Portal for Public Institutions"
date: "2025-06-23"
description: "Design and development of a GIS web portal for displaying and querying nearly one million geospatial points across the national territory. The portal was used by public institutions to verify regulatory compliance, with a strong focus on map-based data visualization, role-based access control, and efficient handling of geographic datasets."

---

### 🗺️ GIS Portal for Public Institutions

**📆 Period:** 2024 (approx. 6 months)
**🏢 Context:** Project developed as part of a public sector software initiative during a company assignment.
**🎯 Goal:**
To build a web portal for displaying, managing, and querying geospatial data related to public infrastructure and environmental datasets. The system required user authentication with role-based access and high-performance interactive maps.

**🧱 Architecture:**

* **Frontend:** Angular with interactive maps powered by OpenLayers
* **Backend:** Java (Spring Boot), exposing REST APIs and integrating with a spatial database
* **GIS Infrastructure:** GeoServer configured for WMS/WFS services
* **Database:** PostgreSQL + PostGIS
* **Authentication:** Keycloak integration for user, role, and permission management
* **Deployment:** Kubernetes environment with custom Helm charts, ingress management, and shared namespaces

**🚀 My Role:**

* Designed and developed the Angular frontend, including WMS/WFS layer integration
* Deployed and fine-tuned GeoServer with advanced styling and filtering configurations
* Implemented REST APIs and PostGIS queries for spatial operations (bounding box, thematic layers, etc.)
* Integrated Keycloak for federated authentication and role-based access control
* Optimized system performance using caching strategies and spatial indexing

**💡 Key Challenges Solved:**

* Coordinated dynamic layer rendering with complex spatial queries
* Managed user-specific views and access restrictions per dataset
* Improved response time of spatial queries using materialized views

**🧰 Technologies:**
`Angular` · `OpenLayers` · `Java Spring Boot` · `PostgreSQL/PostGIS` · `GeoServer` · `Keycloak` · `Helm` · `Kubernetes`

