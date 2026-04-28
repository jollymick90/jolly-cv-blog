# Hand Runner Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Three.js webcam hand-tracking endless-runner game as a sub-page of `/[lang]/playground`, refactored from the standalone `dogut.start.ts` into an idiomatic Svelte 5 module with proper cleanup. Convert the parent `/[lang]/playground` into a hub of Three.js experiments.

**Architecture:** A factory function `createHandRunner(opts)` returns a handle with `{start, clickLeft/Right/Up/Down, dispose}`. The factory takes refs to a scene container `<div>` and a `<video>` element from the page; it never reaches into the global DOM. `start()` does the I/O (camera permissions, MediaPipe load, scene setup); `dispose()` is fully idempotent and tears down every resource (RAF, listeners, MediaStream, MediaPipe Hands worker, Three.js renderer/geometries/materials). Three.js and `@mediapipe/hands` are dynamically imported inside `start()` so the hub page does not pay their bundle cost.

**Tech Stack:** SvelteKit, Svelte 5 (runes), TypeScript, sveltekit-i18n, three ^0.177.0, @mediapipe/hands ^0.4, Tailwind CSS.

**Quality gate:** This repo has no automated tests; `npm run check` (TypeScript + Svelte) and `npm run lint` (Prettier) are the gates, plus a manual browser smoke test at the end.

---

## File Map

| File | Action |
|---|---|
| `package.json` / `package-lock.json` | Add `@mediapipe/hands` dependency |
| `src/lib/i18n/en/en.json` | Add `playground` namespace |
| `src/lib/i18n/it/it.json` | Add `playground` namespace |
| `src/lib/playground/hand-runner/dogut.ts` | Create — refactored module |
| `src/routes/[lang]/playground/hand-runner/+page.svelte` | Create — game page |
| `src/routes/[lang]/playground/hand-runner/+page.ts` | Create — `prerender = true` |
| `src/routes/[lang]/playground/+page.svelte` | Refactor — hub of experiments |
| `dogut.start.ts` (root) | Delete |

`src/lib/aipredictor/**` is intentionally NOT touched (preserved for future use).

---

## Task 1: Install @mediapipe/hands

**Files:**
- Modify: `package.json`, `package-lock.json` (via npm)

- [ ] **Step 1: Install the package**

```bash
npm install @mediapipe/hands
```

Expected output: `added N packages` (no errors). The MediaPipe Hands package ships JS + TypeScript definitions but loads its WASM/binary models from CDN at runtime.

- [ ] **Step 2: Verify it landed in package.json**

```bash
node -e "console.log(require('./package.json').dependencies['@mediapipe/hands'])"
```

Expected: a semver string like `^0.4.1675469240` (exact value may vary).

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat(deps): add @mediapipe/hands for hand-runner experiment"
```

---

## Task 2: Add i18n strings (en + it)

**Files:**
- Modify: `src/lib/i18n/en/en.json`
- Modify: `src/lib/i18n/it/it.json`

We add a top-level `playground` namespace with two children: `hub` (used by the playground hub page) and `handRunner` (used by the new game page). Inserted after the existing `event` block and before `common`, preserving JSON key order.

- [ ] **Step 1: Edit `src/lib/i18n/en/en.json`**

Insert this block immediately after the closing `}` of the `"event"` object and before `"common"`. Add a comma after `event`'s closing brace.

```json
    "playground": {
        "hub": {
            "title": "Playground",
            "intro": "Three.js experiments and interactive sketches."
        },
        "handRunner": {
            "title": "Hand Runner",
            "cardDesc": "Endless runner controlled by your hand via webcam.",
            "intro": "Guide the sphere through the doughnuts. Move your hand in front of the camera.",
            "controlsHeading": "Controls",
            "controlHand": "Hand: move in front of webcam",
            "controlArrows": "Arrows: move",
            "controlS": "S: pause / resume",
            "controlAD": "A / D: increase / decrease speed",
            "controlR": "R: reset doughnut center",
            "score": "Score",
            "speed": "Speed",
            "start": "Start",
            "loading": "Loading…",
            "errorCamera": "Cannot access webcam. Check browser permissions.",
            "errorGeneric": "Something went wrong. Try reloading."
        }
    },
```

- [ ] **Step 2: Edit `src/lib/i18n/it/it.json`**

Same position (after `event`, before `common`):

```json
    "playground": {
        "hub": {
            "title": "Playground",
            "intro": "Esperimenti Three.js e schizzi interattivi."
        },
        "handRunner": {
            "title": "Hand Runner",
            "cardDesc": "Endless runner controllato dalla mano via webcam.",
            "intro": "Guida la sfera attraverso le ciambelle. Muovi la mano davanti alla webcam.",
            "controlsHeading": "Controlli",
            "controlHand": "Mano: muovi davanti alla webcam",
            "controlArrows": "Frecce: movimento",
            "controlS": "S: pausa / riprendi",
            "controlAD": "A / D: aumenta / diminuisci velocità",
            "controlR": "R: resetta centro ciambella",
            "score": "Punteggio",
            "speed": "Velocità",
            "start": "Avvia",
            "loading": "Caricamento…",
            "errorCamera": "Impossibile accedere alla webcam. Controlla i permessi.",
            "errorGeneric": "Qualcosa è andato storto. Riprova."
        }
    },
```

- [ ] **Step 3: Validate JSON syntax**

```bash
node -e "JSON.parse(require('fs').readFileSync('src/lib/i18n/en/en.json','utf8')); JSON.parse(require('fs').readFileSync('src/lib/i18n/it/it.json','utf8')); console.log('ok')"
```

Expected: `ok`. If you get a `SyntaxError`, you likely missed a comma or have a trailing one.

- [ ] **Step 4: Commit**

```bash
git add src/lib/i18n/en/en.json src/lib/i18n/it/it.json
git commit -m "feat(i18n): add playground.hub and playground.handRunner strings"
```

---

## Task 3: Create the hand-runner module

**Files:**
- Create: `src/lib/playground/hand-runner/dogut.ts`

The module exports a factory `createHandRunner(opts)` returning `{start, clickLeft, clickRight, clickUp, clickDown, dispose}`. It uses dynamic `import()` for `three` and `@mediapipe/hands` so the page bundle stays lean.

**Key invariants:**
- Constructor is synchronous and pure (no I/O, no DOM mutation beyond receiving refs).
- `start()` is idempotent (re-calling is a no-op once started).
- `dispose()` is idempotent and safe to call after a failed `start()`.
- A `disposed` flag short-circuits in-flight RAF and async callbacks so they cannot touch torn-down resources.

- [ ] **Step 1: Create the directory**

```bash
mkdir -p src/lib/playground/hand-runner
```

- [ ] **Step 2: Write `src/lib/playground/hand-runner/dogut.ts`**

```ts
import type {
  Material,
  Mesh,
  PerspectiveCamera,
  Points,
  Scene,
  WebGLRenderer
} from 'three';
import type { Hands, Results } from '@mediapipe/hands';

export type HandRunnerOutput = {
  score: number;
  speed: number;
};

export type HandRunnerOptions = {
  sceneContainer: HTMLElement;
  videoElement: HTMLVideoElement;
  onUpdate: (out: HandRunnerOutput) => void;
};

export type HandRunnerHandle = {
  start: () => Promise<void>;
  clickLeft: () => void;
  clickRight: () => void;
  clickUp: () => void;
  clickDown: () => void;
  dispose: () => void;
};

const INITIAL_SPEED = 5;
const STEP_SPEED = 5;
const TORUS_INNER_RADIUS = 1.5;
const HIT_DEPTH_TOLERANCE = 0.1;
const STAR_COUNT = 1000;
const PLAYER_Z = -10;
const TORUS_RESET_Z = -50;

export function createHandRunner(opts: HandRunnerOptions): HandRunnerHandle {
  const { sceneContainer, videoElement, onUpdate } = opts;

  let started = false;
  let disposed = false;

  let counter = 0;
  let speed = INITIAL_SPEED;
  let stop = false;
  let trigger = false;
  let resetInitialTorus = false;

  let scene: Scene | null = null;
  let camera: PerspectiveCamera | null = null;
  let renderer: WebGLRenderer | null = null;
  let torus: Mesh | null = null;
  let player: Mesh | null = null;
  let stars: Points | null = null;

  let hands: Hands | null = null;
  let mediaStream: MediaStream | null = null;

  let rafId: number | null = null;
  let onResize: (() => void) | null = null;
  let onKeyDown: ((e: KeyboardEvent) => void) | null = null;

  function emit() {
    onUpdate({ score: counter, speed });
  }

  function resetTorusPosition() {
    if (!torus) return;
    torus.position.z = TORUS_RESET_Z;
    if (resetInitialTorus) {
      torus.position.x = 0;
      torus.position.y = 0;
      resetInitialTorus = false;
    } else {
      torus.position.x = (Math.random() - 0.5) * 10;
      torus.position.y = (Math.random() - 0.5) * 10;
    }
  }

  function detectIntersection() {
    if (!player || !torus) return;
    const dx = player.position.x - torus.position.x;
    const dy = player.position.y - torus.position.y;
    const distanceXY = Math.sqrt(dx * dx + dy * dy);
    if (
      Math.abs(player.position.z - torus.position.z) < HIT_DEPTH_TOLERANCE &&
      distanceXY < TORUS_INNER_RADIUS &&
      !trigger
    ) {
      speed += STEP_SPEED;
      counter += 1;
      trigger = true;
      emit();
    }
  }

  function realSpeed() {
    return speed / 100;
  }

  function handleResults(results: Results) {
    if (!player) return;
    const list = results.multiHandLandmarks;
    if (list && list.length > 0) {
      const wrist = list[0][0];
      const x = (wrist.x - 0.5) * 20;
      const y = (0.5 - wrist.y) * 20;
      player.position.x = -x;
      player.position.y = y;
    }
  }

  function animate() {
    if (disposed) return;
    rafId = requestAnimationFrame(animate);
    if (!stop && torus) torus.position.z += realSpeed();
    detectIntersection();
    if (torus && camera && torus.position.z > camera.position.z + 5) {
      trigger = false;
      resetTorusPosition();
    }
    if (stars) {
      stars.position.z += 0.1;
      if (stars.position.z > 50) stars.position.z = -50;
    }
    if (renderer && scene && camera) renderer.render(scene, camera);
  }

  async function start() {
    if (started || disposed) return;
    started = true;

    const THREE = await import('three');
    const { Hands: HandsCtor } = await import('@mediapipe/hands');
    if (disposed) return;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      75,
      sceneContainer.clientWidth / sceneContainer.clientHeight,
      0.1,
      1000
    );
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);
    sceneContainer.appendChild(renderer.domElement);

    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff });
    const starVertices: number[] = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      starVertices.push(
        (Math.random() - 0.5) * 200,
        (Math.random() - 0.5) * 200,
        (Math.random() - 0.5) * 200
      );
    }
    starGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(starVertices, 3)
    );
    stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    const torusGeo = new THREE.TorusGeometry(2, 0.5, 16, 100);
    const torusMat = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    torus = new THREE.Mesh(torusGeo, torusMat);
    scene.add(torus);

    const sphereGeo = new THREE.SphereGeometry(1.5, 32, 32);
    const sphereMat = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    player = new THREE.Mesh(sphereGeo, sphereMat);
    player.rotation.x = Math.PI / 2;
    player.position.z = PLAYER_Z;
    scene.add(player);

    camera.position.z = 5;
    emit();

    onResize = () => {
      if (!camera || !renderer) return;
      camera.aspect = sceneContainer.clientWidth / sceneContainer.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);
    };
    window.addEventListener('resize', onResize);

    onKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'KeyS') {
        stop = !stop;
      } else if (e.code === 'KeyA') {
        speed += STEP_SPEED;
        emit();
      } else if (e.code === 'KeyD') {
        speed -= STEP_SPEED;
        emit();
      } else if (e.code === 'KeyR') {
        resetInitialTorus = true;
      }
    };
    window.addEventListener('keydown', onKeyDown);

    mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (disposed) {
      mediaStream.getTracks().forEach((t) => t.stop());
      mediaStream = null;
      return;
    }
    videoElement.srcObject = mediaStream;
    await videoElement.play();
    if (disposed) return;

    hands = new HandsCtor({
      locateFile: (file: string) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
    });
    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });
    hands.onResults(handleResults);

    const sendVideo = async () => {
      if (disposed || !hands) return;
      try {
        await hands.send({ image: videoElement });
      } catch {
        // MediaPipe transient error — ignore, next frame will retry
      }
      if (disposed) return;
      requestAnimationFrame(sendVideo);
    };
    sendVideo();

    animate();
  }

  function disposeMesh(mesh: Mesh | null) {
    if (!mesh) return;
    mesh.geometry.dispose();
    (mesh.material as Material).dispose();
  }

  function disposePoints(p: Points | null) {
    if (!p) return;
    p.geometry.dispose();
    (p.material as Material).dispose();
  }

  function dispose() {
    if (disposed) return;
    disposed = true;

    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }

    if (mediaStream) {
      mediaStream.getTracks().forEach((t) => t.stop());
      mediaStream = null;
    }
    if (videoElement) videoElement.srcObject = null;

    if (hands) {
      hands.close().catch(() => {});
      hands = null;
    }

    if (onResize) {
      window.removeEventListener('resize', onResize);
      onResize = null;
    }
    if (onKeyDown) {
      window.removeEventListener('keydown', onKeyDown);
      onKeyDown = null;
    }

    if (renderer) {
      renderer.dispose();
      if (renderer.domElement.parentElement === sceneContainer) {
        sceneContainer.removeChild(renderer.domElement);
      }
      renderer = null;
    }

    disposeMesh(torus); torus = null;
    disposeMesh(player); player = null;
    disposePoints(stars); stars = null;

    scene = null;
    camera = null;
  }

  return {
    start,
    clickLeft: () => {
      if (player) player.position.x -= 1;
    },
    clickRight: () => {
      if (player) player.position.x += 1;
    },
    clickUp: () => {
      if (player) player.position.y += 1;
    },
    clickDown: () => {
      if (player) player.position.y -= 1;
    },
    dispose
  };
}
```

- [ ] **Step 3: Type-check**

```bash
npm run check
```

Expected: `0 errors, 0 warnings`. If errors mention missing types from `@mediapipe/hands` (e.g. `Results`), check that Task 1 was committed and `node_modules/@mediapipe/hands/index.d.ts` exists; reinstall if not.

- [ ] **Step 4: Lint**

```bash
npm run lint
```

Expected: clean. If it complains about formatting, run `npm run format` and re-stage.

- [ ] **Step 5: Commit**

```bash
git add src/lib/playground/hand-runner/dogut.ts
git commit -m "feat(playground): add hand-runner module (createHandRunner factory)"
```

---

## Task 4: Create the hand-runner sub-page

**Files:**
- Create: `src/routes/[lang]/playground/hand-runner/+page.svelte`
- Create: `src/routes/[lang]/playground/hand-runner/+page.ts`

The page mounts the canvas container and `<video>`, attaches the global `keydown` listener for the arrows, and exposes a Start overlay. Errors are stored as i18n keys (not pre-translated strings) so they re-render correctly on locale change.

- [ ] **Step 1: Create the directory**

```bash
mkdir -p src/routes/[lang]/playground/hand-runner
```

- [ ] **Step 2: Write `+page.ts`**

```ts
export const prerender = true;
```

- [ ] **Step 3: Write `+page.svelte`**

```svelte
<script lang="ts">
  import { onMount } from 'svelte';
  import { t } from '$lib/i18n';
  import {
    createHandRunner,
    type HandRunnerHandle
  } from '$lib/playground/hand-runner/dogut';

  let sceneContainer = $state<HTMLDivElement | null>(null);
  let videoElement = $state<HTMLVideoElement | null>(null);
  let started = $state(false);
  let starting = $state(false);
  let errorKey = $state<string | null>(null);
  let score = $state(0);
  let speed = $state(5);

  let handle: HandRunnerHandle | null = null;

  onMount(() => {
    function onKey(e: KeyboardEvent) {
      if (!handle) return;
      switch (e.code) {
        case 'ArrowLeft':
          e.preventDefault();
          handle.clickLeft();
          break;
        case 'ArrowRight':
          e.preventDefault();
          handle.clickRight();
          break;
        case 'ArrowUp':
          e.preventDefault();
          handle.clickUp();
          break;
        case 'ArrowDown':
          e.preventDefault();
          handle.clickDown();
          break;
      }
    }
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      handle?.dispose();
      handle = null;
    };
  });

  async function handleStart() {
    if (started || starting) return;
    if (!sceneContainer || !videoElement) return;
    starting = true;
    errorKey = null;
    handle = createHandRunner({
      sceneContainer,
      videoElement,
      onUpdate: ({ score: s, speed: sp }) => {
        score = s;
        speed = sp;
      }
    });
    try {
      await handle.start();
      started = true;
    } catch (e) {
      const isPermission = (e as DOMException)?.name === 'NotAllowedError';
      errorKey = isPermission
        ? 'playground.handRunner.errorCamera'
        : 'playground.handRunner.errorGeneric';
      handle.dispose();
      handle = null;
    } finally {
      starting = false;
    }
  }
</script>

<svelte:head>
  <title>{$t('playground.handRunner.title')}</title>
</svelte:head>

<div class="relative h-screen w-full overflow-hidden bg-black">
  <div bind:this={sceneContainer} class="absolute inset-0"></div>

  <video
    bind:this={videoElement}
    class="absolute top-4 right-4 w-48 aspect-video rounded-lg border border-white/20 shadow-lg z-10 {started
      ? ''
      : 'hidden'}"
    playsinline
    muted
  ></video>

  {#if started}
    <div
      class="absolute top-4 left-4 z-10 px-3 py-2 rounded-lg bg-black/50 backdrop-blur-sm
             text-white font-mono text-sm space-y-1 border border-white/10"
    >
      <div>{$t('playground.handRunner.score')}: {score}</div>
      <div>{$t('playground.handRunner.speed')}: {speed}</div>
    </div>
  {/if}

  {#if !started}
    <div
      class="absolute inset-0 z-20 flex items-center justify-center
             bg-black/60 backdrop-blur-sm px-4"
    >
      <div
        class="max-w-md w-full bg-surface-container/90 text-on-surface
               p-6 rounded-2xl border border-white/20 shadow-2xl space-y-4"
      >
        <h1 class="text-2xl font-headline">
          {$t('playground.handRunner.title')}
        </h1>
        <p class="text-sm opacity-80">
          {$t('playground.handRunner.intro')}
        </p>
        <div class="space-y-1">
          <h2 class="text-sm font-semibold">
            {$t('playground.handRunner.controlsHeading')}
          </h2>
          <ul class="text-xs opacity-70 space-y-0.5 list-disc list-inside">
            <li>{$t('playground.handRunner.controlHand')}</li>
            <li>{$t('playground.handRunner.controlArrows')}</li>
            <li>{$t('playground.handRunner.controlS')}</li>
            <li>{$t('playground.handRunner.controlAD')}</li>
            <li>{$t('playground.handRunner.controlR')}</li>
          </ul>
        </div>
        <button
          onclick={handleStart}
          disabled={starting}
          class="w-full px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500
                 disabled:opacity-60 disabled:cursor-not-allowed
                 text-white font-medium transition"
        >
          {starting
            ? $t('playground.handRunner.loading')
            : $t('playground.handRunner.start')}
        </button>
        {#if errorKey}
          <p class="text-sm text-red-400">{$t(errorKey)}</p>
        {/if}
      </div>
    </div>
  {/if}
</div>
```

- [ ] **Step 4: Type-check**

```bash
npm run check
```

Expected: `0 errors, 0 warnings`.

- [ ] **Step 5: Lint**

```bash
npm run lint
```

If it complains, run `npm run format`.

- [ ] **Step 6: Commit**

```bash
git add 'src/routes/[lang]/playground/hand-runner/+page.svelte' 'src/routes/[lang]/playground/hand-runner/+page.ts'
git commit -m "feat(playground): add hand-runner sub-page with Start overlay and HUD"
```

---

## Task 5: Refactor the parent playground into a hub

**Files:**
- Modify: `src/routes/[lang]/playground/+page.svelte` (full rewrite)

The current page is the AI sphere demo (untracked). We replace it with a card grid of experiments. Only one entry now (`hand-runner`); the array shape supports adding more later. `src/lib/aipredictor/` is preserved as decided.

- [ ] **Step 1: Replace the entire content of `src/routes/[lang]/playground/+page.svelte` with:**

```svelte
<script lang="ts">
  import { t, locale } from '$lib/i18n';

  type Experiment = {
    slug: string;
    titleKey: string;
    descKey: string;
    accent: string;
  };

  const experiments: Experiment[] = [
    {
      slug: 'hand-runner',
      titleKey: 'playground.handRunner.title',
      descKey: 'playground.handRunner.cardDesc',
      accent: 'from-blue-500/20 to-purple-500/20'
    }
  ];
</script>

<svelte:head>
  <title>{$t('playground.hub.title')}</title>
</svelte:head>

<section class="min-h-screen px-6 py-16 max-w-6xl mx-auto">
  <h1 class="text-4xl font-headline mb-2">{$t('playground.hub.title')}</h1>
  <p class="text-on-surface/70 mb-10">{$t('playground.hub.intro')}</p>

  <ul class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    {#each experiments as exp (exp.slug)}
      <li>
        <a
          href={`/${$locale}/playground/${exp.slug}`}
          class="block p-6 rounded-2xl border border-white/10
                 bg-gradient-to-br {exp.accent}
                 hover:border-white/30 hover:scale-[1.02]
                 transition-transform"
        >
          <h2 class="text-xl font-headline mb-2">{$t(exp.titleKey)}</h2>
          <p class="text-sm text-on-surface/70">{$t(exp.descKey)}</p>
        </a>
      </li>
    {/each}
  </ul>
</section>
```

- [ ] **Step 2: Type-check**

```bash
npm run check
```

Expected: `0 errors, 0 warnings`.

- [ ] **Step 3: Lint**

```bash
npm run lint
```

If needed: `npm run format`.

- [ ] **Step 4: Commit**

```bash
git add 'src/routes/[lang]/playground/+page.svelte'
git commit -m "feat(playground): convert playground page into Three.js experiments hub"
```

---

## Task 6: Delete the legacy /dogut.start.ts and final verification

**Files:**
- Delete: `dogut.start.ts` (project root)

The legacy file was the original prototype; its logic now lives in `src/lib/playground/hand-runner/dogut.ts` with proper cleanup.

- [ ] **Step 1: Delete the file**

```bash
git rm dogut.start.ts
```

If `git rm` fails because the file was never committed, fall back to: `rm dogut.start.ts`.

- [ ] **Step 2: Verify no references remain**

```bash
grep -rn "dogut.start" src/ docs/ 2>/dev/null || echo "no references"
```

Expected: `no references`. The only place it should be mentioned now is the spec file (`docs/superpowers/specs/2026-04-28-hand-runner-design.md`), which intentionally references it as the original. That match is fine.

- [ ] **Step 3: Type-check + Lint + Build**

```bash
npm run check && npm run lint && npm run build
```

Expected: all three pass cleanly. The build must succeed because routes have `prerender = true` — any SSR-incompatible top-level browser code in `dogut.ts` would surface here.

- [ ] **Step 4: Manual smoke test**

```bash
npm run dev
```

In a browser at `http://localhost:5173/en/playground`:

1. **Hub renders:** see the heading "Playground" and a single card "Hand Runner" with description.
2. **Card link works:** click the card → URL is `/en/playground/hand-runner`, you see the Start overlay (controls list, button).
3. **Start flow:** click **Start**.
   - Browser asks for camera permission → grant it.
   - The overlay disappears, the canvas shows torus + stars + sphere, the mini-video appears top-right, the HUD (Score/Speed) appears top-left.
   - Wave a hand in front of the camera → the blue sphere tracks the wrist.
   - Press `ArrowLeft/Right/Up/Down` → the sphere nudges by 1 unit each press; arrow keys do not scroll the page.
   - Press `S` to pause/resume torus motion. Press `A`/`D` to bump speed (HUD updates). Press `R` to recenter the torus.
   - When the sphere passes through a torus' inner ring, Score increments and Speed bumps by 5.
4. **Cleanup verification:** navigate back to `/en/playground`, then forward to `/en/playground/hand-runner` again, click Start again. The old MediaStream/RAF must NOT linger — verify in browser devtools "Memory" or "Performance" panel that there is exactly one render loop and one camera permission dot in the tab. Check the `<video>` element in the browser inspector after navigation away — its `srcObject` must be `null`.
5. **Italian locale:** navigate to `/it/playground/hand-runner` → controls list and labels are in Italian.
6. **Permission denial:** in a fresh tab (or after revoking permission), click Start and **deny** camera → the Start overlay should reappear with the localized "Cannot access webcam" / "Impossibile accedere alla webcam" message and Start button enabled to retry.

- [ ] **Step 5: Stop the dev server, commit the deletion**

```bash
git add -u dogut.start.ts
git commit -m "chore: remove legacy /dogut.start.ts (moved to src/lib/playground/hand-runner)"
```

(`git add -u` stages the deletion. If `git rm` already staged it in step 1, the commit will be a no-op for staging; just run the commit.)

---

## Self-review notes

- **Spec coverage:** every section of `docs/superpowers/specs/2026-04-28-hand-runner-design.md` maps to a task: §3 file touchpoints → file map; §4 module contract → Task 3; §5 page structure → Task 4; §6 hub → Task 5; §7 i18n → Task 2; §8 deps → Task 1; §9 cleanup checklist → encoded inside `dispose()` in Task 3 (RAF cancel, MediaStream stop, hands.close, listener removal, renderer/geometry/material disposal); §10 errors → handled in Task 4 `handleStart`; §11 quality gates → Task 6 step 3+4; §12 out-of-scope → respected (no localStorage, audio, pause overlay UI, mobile d-pad, automated tests, aipredictor removal).
- **No placeholders:** every code block is the actual content. No "TODO", "TBD", or "implement later".
- **Type consistency:** `HandRunnerOptions`/`HandRunnerOutput`/`HandRunnerHandle` names and shapes match between Task 3 (export) and Task 4 (import). `clickLeft/Right/Up/Down` names are identical in module and page. i18n keys used in Task 4/5 (`playground.handRunner.*`, `playground.hub.*`) all exist in the JSON written in Task 2.
- **Listener cleanup:** module's `keydown` (S/A/D/R) and `resize` are removed in `dispose()`; page's `keydown` (Arrow*) is removed in the `onMount` return. No leak path between unmount/remount cycles.
