# Hand Runner — Design Spec

**Date:** 2026-04-28
**Status:** Approved (pending user review of this document)
**Topic:** Sub-page del playground: gioco "endless runner" Three.js controllato dalla mano via webcam (MediaPipe Hands).

## 1. Obiettivo

Trasformare lo script standalone `dogut.start.ts` (alla root del repo) in un esperimento integrato nel sito:

- Una nuova route `/[lang]/playground/hand-runner` che ospita il gioco.
- Il modulo Three.js è refattorizzato per essere idiomatico Svelte 5 (ref espliciti, cleanup completo, niente DOM globals).
- La pagina parent `/[lang]/playground` viene convertita in un **hub** di esperimenti Three.js (la sfera AI corrente viene rimossa; il modulo `aipredictor` è conservato per uso futuro).
- I18n completa (en/it) tramite `sveltekit-i18n`.

## 2. Decisioni di brainstorming

| Topic | Scelta |
|---|---|
| Refactor approach | Wrap idiomatico Svelte 5 (ref espliciti, dispose, no globals) |
| Route | `/[lang]/playground/hand-runner` |
| Module location | `src/lib/playground/hand-runner/dogut.ts` |
| Avvio | Overlay con bottone **Start** (richiede user gesture per `getUserMedia`) |
| HUD | Minimale: score+speed in alto a sinistra, mini-video webcam in alto a destra |
| Mobile/touch d-pad | Out of scope |
| i18n | Sì, namespace `playground.handRunner.*` (+ `playground.hub.*`) |
| Parent playground | Diventa hub di esperimenti; sfera AI corrente cancellata |
| `src/lib/aipredictor/` | Conservato (non usato dopo questo cambio, riusabile in futuro) |

## 3. File touchpoints

**Nuovi:**
```
src/lib/playground/hand-runner/dogut.ts
src/routes/[lang]/playground/hand-runner/+page.svelte
src/routes/[lang]/playground/hand-runner/+page.ts
docs/superpowers/specs/2026-04-28-hand-runner-design.md   (questo file)
```

**Modificati:**
```
src/routes/[lang]/playground/+page.svelte    (refactor in hub)
src/lib/i18n/en/en.json                      (aggiunge playground.*)
src/lib/i18n/it/it.json                      (aggiunge playground.*)
package.json + package-lock.json             (aggiunge @mediapipe/hands)
```

**Cancellati:**
```
/dogut.start.ts                              (logica spostata in src/lib/playground/hand-runner/dogut.ts)
```

**NON toccati:**
```
src/lib/aipredictor/**                       (preservato)
src/lib/components/shell/AppHeader.svelte    (modifica già in corso fuori da questa feature)
```

## 4. Contratto del modulo `dogut.ts`

```ts
// src/lib/playground/hand-runner/dogut.ts
import * as THREE from 'three';
import type { Results } from '@mediapipe/hands';

export type HandRunnerOutput = {
  score: number;
  speed: number;
};

export type HandRunnerOptions = {
  /** Container DOM in cui montare il canvas Three.js (riempito al 100% del parent). */
  sceneContainer: HTMLElement;
  /** <video> element gestito esternamente — il modulo lo collega al MediaStream. */
  videoElement: HTMLVideoElement;
  /** Callback HUD; chiamata su ogni cambio di score o speed. */
  onUpdate: (out: HandRunnerOutput) => void;
};

export type HandRunnerHandle = {
  /** Avvia camera, MediaPipe e il loop di animazione. Risolve dopo permessi camera. */
  start: () => Promise<void>;
  clickLeft: () => void;
  clickRight: () => void;
  clickUp: () => void;
  clickDown: () => void;
  /** Ferma tutto e libera ogni risorsa. Sicuro chiamare anche se start() è fallita. */
  dispose: () => void;
};

export function createHandRunner(opts: HandRunnerOptions): HandRunnerHandle;
```

**Invarianti:**

- `createHandRunner` è **sincrono** e **non fa I/O**: solo stato e factory di scene/torus/player/stars.
- `start()` è **idempotente**: chiamarlo due volte non avvia due loop.
- `dispose()` è **idempotente** e **safe-after-error**: chiamarlo dopo `start()` fallita libera comunque le risorse parzialmente create.
- L'import dinamico di `three` e `@mediapipe/hands` avviene dentro `start()`, non al modulo top-level (ottimizzazione bundle/Web Vitals).

**Mapping rispetto a `dogut.start.ts` originale:**

| Originale | Nuovo |
|---|---|
| `getElementById('videoElement')` | `opts.videoElement` |
| `getElementById('video-area')` | dimensioni dal `videoElement.parentElement` |
| `querySelector('#speed').innerHTML = ...` | rimosso — solo `onUpdate({score, speed})` |
| `output({score, msg: ['Speed: …']})` | `onUpdate({score, speed})` (separati e tipati) |
| `window.addEventListener('resize', …)` senza cleanup | listener salvato e rimosso in `dispose()` |
| Camera stream non chiusa | `getTracks().forEach(t => t.stop())` in `dispose()` |
| `hands` non chiusa | `await hands.close()` in `dispose()` |
| `requestAnimationFrame` non cancellato | `cancelAnimationFrame(rafId)` in `dispose()` |
| `diskGeometry`/`diskMaterial` non usati | rimossi (dead code) |
| Tasti S/A/D/R gestiti da `keyDown(code)` interno | il modulo registra un proprio `window.addEventListener('keydown', …)` solo per S/A/D/R (debug); il listener è rimosso in `dispose()` |
| `ArrowLeft/Right/Up/Down` letti da window | non più ascoltati dal modulo; esposti come `clickLeft/Right/Up/Down` e chiamati **dalla pagina** che ha il proprio `keydown` listener (con cleanup in `onMount` return) |

**Parametri di gioco** (invariati rispetto all'originale):
- `speed` iniziale: 5; `stepSpeed`: 5; speed reale: `speed / 100`
- Torus reset a `z = -50` con random `x`/`y` in `[-5, 5]` (`z` di `camera.position` è 5)
- Hit detection: `|Δz| < 0.1` AND distanza XY `< 1.5` (raggio interno torus)
- Sfondo stelle: 1000 punti random in cubo 200³, scroll su Z, wrap a `z > 50` → `z = -50`
- Player: `THREE.SphereGeometry(1.5, 32, 32)` con `MeshBasicMaterial` blu (`0x0000ff`)
- Torus: `TorusGeometry(2, 0.5, 16, 100)` verde (`0x00ff00`)

## 5. Pagina `/[lang]/playground/hand-runner/+page.svelte`

**Stato Svelte 5:**
```ts
let sceneContainer = $state<HTMLDivElement | null>(null);
let videoElement   = $state<HTMLVideoElement | null>(null);
let started        = $state(false);
let starting       = $state(false);
let error          = $state<string | null>(null);
let score          = $state(0);
let speed          = $state(5);
let handle: HandRunnerHandle | null = null;
```

**Lifecycle:**
- `onMount`:
  - registra un `keydown` listener globale che mappa `ArrowLeft/Right/Up/Down` → `handle?.click*()`
  - return cleanup: `removeEventListener` + `handle?.dispose()`
- `handleStart()` (click bottone):
  - `if (started || starting) return` (idempotenza)
  - `starting = true`
  - `handle = createHandRunner({sceneContainer, videoElement, onUpdate})`
  - `try { await handle.start(); started = true } catch (e) { error = i18n key adatto; handle.dispose(); handle = null } finally { starting = false }`

**Layout:**
- Background nero `h-screen w-full`
- `<div bind:this={sceneContainer} class="absolute inset-0">` — Three.js canvas appeso qui dal modulo
- `<video bind:this={videoElement} class="absolute top-4 right-4 w-48 aspect-video ... {started ? '' : 'hidden'}" playsinline muted>`
- HUD score/speed: `absolute top-4 left-4 z-10` (visibile solo se `started`)
- Overlay Start: `absolute inset-0 z-20 bg-black/60 backdrop-blur-sm`, contiene title/intro/controlli/bottone Start (visibile solo se `!started`)
- Errore: paragrafo rosso dentro l'overlay

**`+page.ts`:**
```ts
export const prerender = true;
```

## 6. Hub playground (parent)

`src/routes/[lang]/playground/+page.svelte` viene refattorizzato:

- Rimosso: `aiPredictor` import, `canvas`, `userInput`, `status`, `sphere`, `onMount` Three.js, `updateScene`.
- Aggiunto: array `experiments: Experiment[]` con un solo entry (`hand-runner`) e una griglia responsive di card-link (`md:grid-cols-2 lg:grid-cols-3`).
- Ogni card: titolo + descrizione corta + accent gradient; `<a href={'/' + $locale + '/playground/' + slug}>`.
- Tipo locale `Experiment = { slug; titleKey; descKey; accent }` per estendibilità futura.

`src/lib/aipredictor/aipredictor.ts` e `src/lib/aipredictor/chrome-ai.d.ts` restano sul disco ma non sono più importati da nessun file. Sono comunque untracked (mai committati), quindi resteranno tali.

## 7. i18n

**Strutture aggiunte a `src/lib/i18n/en/en.json` e `src/lib/i18n/it/it.json`** (chiavi identiche, valori localizzati):

```json
{
  "playground": {
    "hub": {
      "title":  "Playground" / "Playground",
      "intro":  "Three.js experiments and interactive sketches." / "Esperimenti Three.js e schizzi interattivi."
    },
    "handRunner": {
      "title":           "Hand Runner",
      "cardDesc":        "Endless runner controlled by your hand via webcam." / "Endless runner controllato dalla mano via webcam.",
      "intro":           "Guide the sphere through the doughnuts. Move your hand in front of the camera." / "Guida la sfera attraverso le ciambelle. Muovi la mano davanti alla webcam.",
      "controlsHeading": "Controls" / "Controlli",
      "controlHand":     "Hand: move in front of webcam" / "Mano: muovi davanti alla webcam",
      "controlArrows":   "Arrows: move" / "Frecce: movimento",
      "controlS":        "S: pause / resume" / "S: pausa / riprendi",
      "controlAD":       "A / D: increase / decrease speed" / "A / D: aumenta / diminuisci velocità",
      "controlR":        "R: reset doughnut center" / "R: resetta centro ciambella",
      "score":           "Score" / "Punteggio",
      "speed":           "Speed" / "Velocità",
      "start":           "Start" / "Avvia",
      "loading":         "Loading…" / "Caricamento…",
      "errorCamera":     "Cannot access webcam. Check browser permissions." / "Impossibile accedere alla webcam. Controlla i permessi.",
      "errorGeneric":    "Something went wrong. Try reloading." / "Qualcosa è andato storto. Riprova."
    }
  }
}
```

## 8. Dipendenze

- **Aggiunta:** `@mediapipe/hands` (`^0.4.x`).
- **Già presente:** `three` (`^0.177.0`), `@types/three`.
- **Asset MediaPipe**: caricati a runtime da CDN via `locateFile: file => 'https://cdn.jsdelivr.net/npm/@mediapipe/hands/' + file` (pattern dell'originale, mantenuto). ~5MB scaricati solo dopo click su Start.

## 9. Cleanup checklist (`handle.dispose()`)

In ordine:
1. Set flag interno `disposed = true` (così callback in volo da MediaPipe / RAF non eseguono).
2. `cancelAnimationFrame(rafId)` se presente.
3. Stop camera: `videoElement.srcObject?.getTracks().forEach(t => t.stop())` poi `videoElement.srcObject = null`.
4. `await hands.close()` se `hands` è stato istanziato.
5. `window.removeEventListener('resize', onResize)` e `window.removeEventListener('keydown', onKeyDown)` (S/A/D/R debug).
6. Three.js: `renderer.dispose()`; `geometry.dispose()` per torus, player, starGeometry; `material.dispose()` per torus, player, starMaterial.
7. `sceneContainer.removeChild(renderer.domElement)` se ancora presente.

## 10. Errori gestiti

| Errore | UX |
|---|---|
| `NotAllowedError` (utente nega webcam) | `error = $t('playground.handRunner.errorCamera')`, overlay Start riappare |
| MediaPipe load failure | `error = $t('playground.handRunner.errorGeneric')`, overlay Start riappare |
| Browser senza `getUserMedia` | catch generico → `errorGeneric` |

In tutti i casi: `started = false`, `handle?.dispose()`, `handle = null`, l'utente può ritentare.

## 11. Quality gates

- `npm run check` deve passare (TypeScript + Svelte type-check).
- `npm run lint` deve passare (Prettier).
- Smoke test manuale: `npm run dev`, navigare a `/en/playground` (vedere card), cliccare card → `/en/playground/hand-runner` → cliccare Start → permessi webcam → gioco parte → score incrementa quando la sfera attraversa la ciambella → navigare via → tornare → riavviare (verifica niente leak/handler doppi).

## 12. Out of scope (esplicito)

- High score persistito (localStorage)
- Audio / SFX
- Pause overlay UI (resta solo il tasto S)
- Game over / lives
- Mobile fallback senza webcam (niente touch d-pad)
- Test automatici (il repo non ne ha)
- Rifattorizzare lo styling del repo o aggiungere temi
- Rimuovere `src/lib/aipredictor/` (conservato esplicitamente)
