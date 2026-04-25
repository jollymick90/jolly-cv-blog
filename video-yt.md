# BacaroTech: Guida allo Sviluppo Frontend e Strumenti Dev

# Video YouTube - BacaroTech

### 1. Arcade THREEJS - PT1
* **Link:** [Arcade ThreeJS PT1](https://www.youtube.com/watch?v=kq1VYA6-BWY)
* **Titolo:** Arcade THREEJS - PT1
* **Descrizione:** Il video illustra lo sviluppo di un videogioco Arcade 3D usando Three.js, nato come regalo per un "Secret Santa" aziendale [1]. Vengono descritte le sfide tecniche incontrate nel convertire prototipi originariamente scritti in Unity e librerie Python per il riconoscimento facciale e dei movimenti della mano, in puro JavaScript funzionante via web browser e ospitato su GitHub Pages [2-4].

### 2. Devfest Roma Città - Pokedex a confronto
* **Link:** *[Devfest Roma Città - Pokedex a confronto](https://www.youtube.com/watch?v=ANUi0fc49cA)*
* **Titolo:** Devfest Roma Città - Pokedex a confronto - DevEx e Web Vitals tra Svelte, React e Angular by Michele
* **Descrizione:** Talk tenuto al DevFest Roma in cui Michele Scarpa confronta i framework Svelte, React e Angular sviluppando la medesima applicazione Pokedex [5, 6]. L'analisi si concentra sulla Developer Experience (DevEx) e sulla misurazione delle performance sfruttando i Core Web Vitals (Largest Contentful Paint, Interaction to Next Paint, Cumulative Layout Shift) [7, 8]. Mostra anche l'utilizzo pratico di Lighthouse e Chrome Dev Tools per testare il rendering di tabelle di grandi dimensioni [9, 10].

### 3. Devfest Torino - Frontend On Stage
* **Link:** *[DevFest Torino Frontend On Stage](https://www.youtube.com/watch?v=vdcdNBGncZU)*
* **Titolo:** Devfest Torino - Frontend On Stage: Mastering Performance with Svelte, Angular, React by Michele
* **Descrizione:** Versione del talk sui framework frontend portata al Devfest Torino. L'intervento spiega i concetti di base di Svelte (compilazione senza runtime pesante), Angular (Change Detection) e React (Virtual DOM) [11, 12]. Vengono eseguiti degli stress-test prestazionali su una UI complessa e confrontati i relativi benchmark di velocità ed efficienza del browser [13, 14].

### 4. Frontend Dilemma Live Discord
* **Link:** *[Frontend Dilemma Live Discord](https://www.youtube.com/watch?v=oRLkna9Fa5Y)*
* **Titolo:** Frontend Dilemma Live Discord
* **Descrizione:** Registrazione del primo evento live del 2025 su Discord. Oltre all'annuncio della "Bacaro Gym" (un appuntamento settimanale su LeetCode) [15, 16], include un talk approfondito su come scegliere il miglior framework frontend per la propria carriera [17, 18]. Esplora l'evoluzione di JavaScript da jQuery ai framework attuali, spiegando differenze cruciali come Client-Side Rendering vs Server-Side Rendering e l'uso del DOM Virtuale [19-21]. 

### 5. Keycloak - customizzazione temi - PT1
* **Link:** *[Keycloak - customizzazione temi - PT1](https://www.youtube.com/watch?v=QURPrrrgLFY)*
* **Titolo:** Keycloak - customizzazione temi - PT1
* **Descrizione:** Prima parte di un tutorial dedicato a Keycloak, l'identity provider open-source. Spiega come personalizzare la pagina di login standard clonando il tema base [22, 23]. Illustra il funzionamento dei file FreeMarker Template (ftl) basati su Java e dimostra come iniettare Tailwind CSS per sovrascrivere il design originario dell'interfaccia modificando i file di properties [24-26].

### 6. Keycloak - customizzazione temi - PT2
* **Link:** *[Keycloak - customizzazione temi - PT2](https://www.youtube.com/watch?v=ibOxgwizqKc)*
* **Titolo:** Keycloak - customizzazione temi - PT2
* **Descrizione:** Seguito del tutorial su Keycloak, focalizzato sull'iniezione di codice JavaScript all'interno delle pagine ftl [27]. Si analizza il binding tra le variabili generate lato server (in Java) e JavaScript, mostrando i tipici errori di sintassi [28, 29]. Introduce poi l'uso dei bundler come Vite e Webpack e cita Alpine.js per effettuare manipolazioni snelle del DOM senza dover sovraccaricare la pagina [30, 31].

### 7. Keycloak - customizzazione temi react - PT1
* **Link:** *[Keycloak - customizzazione temi react - PT1](https://www.youtube.com/watch?v=-qzWNqQvibo)*
* **Titolo:** Keycloak - customizzazione temi react - PT1
* **Descrizione:** Terzo episodio della serie Keycloak, che prepara il terreno all'integrazione di React per i temi personalizzati. Chiarisce le logiche dietro le Single Page Applications (SPA) rispetto al Server-Side Rendering utilizzato da Keycloak (ftl) [32, 33]. Spiega inoltre come i bundler JavaScript preparino il codice affinché possa essere correttamente fornito alla pagina di login [34, 35].

### 8. Keycloak - customizzazione temi react - pt 2
* **Link:** *[Keycloak - customizzazione temi react - pt 2](https://www.youtube.com/watch?v=GipzcBWhBUE)*
* **Titolo:** Keycloak - customizzazione temi react - pt 2
* **Descrizione:** Capitolo finale dell'integrazione di React in Keycloak. Mostra la procedura completa: dalla creazione di un progetto con Vite, alla compilazione e collegamento degli asset React (JS e CSS) nel tema Keycloak [36-38]. Il passaggio cruciale consiste nel mappare correttamente gli URL di sessione generati in backend (Action URL) mettendoli a disposizione di React per far funzionare concretamente l'invio della login [39, 40].

### 9. Postman - Come aggiornare automaticamente le variabili d'ambiente?
* **Link:** *[Postman - Come aggiornare automaticamente le variabili d'ambiente?](https://www.youtube.com/watch?v=sVSQSY57s8w)*
* **Titolo:** Postman - Come aggiornare automaticamente le variabili d'ambiente?
* **Descrizione:** Breve trucco (tip) su come ottimizzare i test API su Postman [41]. Sfrutta i "Tests" e i pre-request scripts in JavaScript per catturare l'Access Token restituito dal JSON di una chiamata di login, salvandolo in automatico nel "Current Value" delle variabili di ambiente, così da essere utilizzato direttamente nelle richieste successive senza copia-incolla [42, 43].

### 10. Postman - come usare le variabili d'ambiente?
* **Link:** *[Postman - come usare le variabili d'ambiente?](https://www.youtube.com/watch?v=KA6e8PAksYw)*
* **Titolo:** Postman - come usare le variabili d'ambiente?
* **Descrizione:** Guida introduttiva sull'uso delle variabili di ambiente (environments) all'interno di Postman. Mostra come parametrizzare URL e Token di autenticazione (es. per testare rotte differenziate tra un utente e un admin), velocizzando lo sviluppo ed evitando di dover aggiornare le credenziali manualmente per ogni singola request API [44-46].

### 11. Throttoling - che cos'è e a cosa serve?
* **Link:** *[Throttoling - che cos'è e a cosa serve?](https://www.youtube.com/watch?v=AKYsDMm-EbY)*
* **Titolo:** Throttoling - che cos'è e a cosa serve?
* **Descrizione:** Tutorial orientato all'esperienza utente (UI) che illustra come utilizzare il "Network Throttling" all'interno dei Dev Tools (su Chrome, Edge e Firefox) [47, 48]. Spiega l'utilità di simulare connessioni lente (come Fast 3G o Slow 3G) in fase di sviluppo per verificare visivamente l'implementazione degli stati di caricamento (loader/spinner) in applicazioni web con recupero dati dinamico [49, 50].
Saved responses are view only