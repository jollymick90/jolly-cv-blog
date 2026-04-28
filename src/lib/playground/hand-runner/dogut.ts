import type { Material, Mesh, PerspectiveCamera, Points, Scene, WebGLRenderer } from 'three';
import type { Hands, Results } from '@mediapipe/hands';

export type HandRunnerMode = 'hand' | 'manual';

export type HandRunnerOutput = {
	score: number;
	speed: number;
};

export type HandRunnerOptions = {
	sceneContainer: HTMLElement;
	videoElement: HTMLVideoElement;
	onUpdate: (out: HandRunnerOutput) => void;
	/**
	 * Fires once after `start()` has determined whether hand tracking is
	 * usable (MediaPipe loaded AND camera permission granted). Call site
	 * uses this to enable/disable the mode toggle UI.
	 */
	onTrackingChange?: (handTrackingAvailable: boolean) => void;
};

export type HandRunnerHandle = {
	/**
	 * Begins camera capture, MediaPipe load, and the render loop. Idempotent.
	 * Resolves successfully even if MediaPipe fails to load — the game stays
	 * playable in manual mode. Only rejects if the user denies the camera
	 * permission; on rejection the caller MUST still call `dispose()`.
	 * @throws DOMException — typically `NotAllowedError` for camera denial.
	 */
	start: () => Promise<void>;
	/** Switch between hand-tracking and manual control. No-op if hand mode
	 *  requested while tracking is unavailable. */
	setMode: (mode: HandRunnerMode) => void;
	clickLeft: () => void;
	clickRight: () => void;
	clickUp: () => void;
	clickDown: () => void;
	incrementSpeed: () => void;
	decrementSpeed: () => void;
	/** Reset score, speed, and torus to the initial state (no remount). */
	restart: () => void;
	dispose: () => void;
};

const INITIAL_SPEED = 5;
const STEP_SPEED = 5;
const TORUS_INNER_RADIUS = 1.5;
const STAR_COUNT = 1000;
const PLAYER_Z = -10;
const TORUS_RESET_Z = -50;
const HANDS_CDN_URL = 'https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js';

// Memoised across module invocations: avoids reloading the script on remount,
// retry-able if the network fails.
let handsScriptPromise: Promise<typeof Hands | undefined> | null = null;

function loadHandsFromCdn(): Promise<typeof Hands | undefined> {
	if (typeof document === 'undefined') return Promise.resolve(undefined);
	const existing = (globalThis as unknown as { Hands?: typeof Hands }).Hands;
	if (existing) return Promise.resolve(existing);
	if (handsScriptPromise) return handsScriptPromise;

	handsScriptPromise = new Promise((resolve) => {
		const script = document.createElement('script');
		script.src = HANDS_CDN_URL;
		script.async = true;
		script.crossOrigin = 'anonymous';
		script.onload = () => {
			resolve((globalThis as unknown as { Hands?: typeof Hands }).Hands);
		};
		script.onerror = () => {
			handsScriptPromise = null;
			resolve(undefined);
		};
		document.head.appendChild(script);
	});
	return handsScriptPromise;
}

export function createHandRunner(opts: HandRunnerOptions): HandRunnerHandle {
	const { sceneContainer, videoElement, onUpdate, onTrackingChange } = opts;

	let started = false;
	let disposed = false;
	let mode: HandRunnerMode = 'manual';
	let trackingAvailable = false;

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
	let prevTorusZ = TORUS_RESET_Z;

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
		prevTorusZ = TORUS_RESET_Z;
	}

	function detectIntersection() {
		if (!player || !torus) return;
		const dx = player.position.x - torus.position.x;
		const dy = player.position.y - torus.position.y;
		const distanceXY = Math.sqrt(dx * dx + dy * dy);
		const playerZ = player.position.z;
		// Z-plane crossing: invariant to per-frame step size, so high speeds
		// can no longer leap over the player's plane without registering a hit.
		const crossed = prevTorusZ < playerZ && torus.position.z >= playerZ;
		if (crossed && distanceXY < TORUS_INNER_RADIUS && !trigger) {
			speed += STEP_SPEED;
			counter += 1;
			trigger = true;
			emit();
		}
		prevTorusZ = torus.position.z;
	}

	function realSpeed() {
		return speed / 100;
	}

	function handleResults(results: Results) {
		// Skip while in manual mode: keyboard / D-pad clicks own the player
		// position and we don't want hand-tracking to fight them.
		if (mode !== 'hand' || !player) return;
		const list = results.multiHandLandmarks;
		if (list && list.length > 0) {
			const wrist = list[0][0];
			const x = (wrist.x - 0.5) * 20;
			const y = (0.5 - wrist.y) * 20;
			player.position.x = -x;
			player.position.y = y;
		}
	}

	async function sendVideoLoop() {
		if (disposed || !hands || mode !== 'hand') return;
		try {
			await hands.send({ image: videoElement });
		} catch {
			// MediaPipe transient error — ignore, next frame will retry
		}
		if (disposed || mode !== 'hand') return;
		requestAnimationFrame(() => {
			sendVideoLoop();
		});
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
		starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
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

		// Render loop runs regardless of MediaPipe / camera availability so the
		// game stays playable via keyboard + click controls in fallback mode.
		animate();

		// @mediapipe/hands ships as a Closure-compiled IIFE that registers
		// `globalThis.Hands` via `(function(){...}).call(this)`. Inside an ES
		// module top-level `this` is `undefined`, so a bundled `import()` never
		// produces the global in production. Loading the script as a classic
		// `<script>` from the CDN evaluates with `this === globalThis` and the
		// constructor lands on the global as designed.
		const HandsCtor = await loadHandsFromCdn();
		if (disposed) return;
		if (!HandsCtor) {
			console.warn('Hand Runner: @mediapipe/hands unavailable — manual mode only.');
			onTrackingChange?.(false);
			return;
		}

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
			locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
		});
		hands.setOptions({
			maxNumHands: 1,
			modelComplexity: 1,
			minDetectionConfidence: 0.5,
			minTrackingConfidence: 0.5
		});
		hands.onResults(handleResults);

		trackingAvailable = true;
		mode = 'hand';
		onTrackingChange?.(true);
		sendVideoLoop();
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

		disposeMesh(torus);
		torus = null;
		disposeMesh(player);
		player = null;
		disposePoints(stars);
		stars = null;

		scene = null;
		camera = null;
	}

	function setMode(next: HandRunnerMode) {
		if (next === mode) return;
		if (next === 'hand' && !trackingAvailable) return;
		const wasManual = mode === 'manual';
		mode = next;
		if (next === 'hand' && wasManual) {
			// Restart the MediaPipe pump, which had self-terminated.
			sendVideoLoop();
		}
	}

	return {
		start,
		setMode,
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
		incrementSpeed: () => {
			speed += STEP_SPEED;
			emit();
		},
		decrementSpeed: () => {
			speed -= STEP_SPEED;
			emit();
		},
		restart: () => {
			counter = 0;
			speed = INITIAL_SPEED;
			trigger = false;
			if (player) {
				player.position.x = 0;
				player.position.y = 0;
			}
			resetInitialTorus = true;
			resetTorusPosition();
			emit();
		},
		dispose
	};
}
