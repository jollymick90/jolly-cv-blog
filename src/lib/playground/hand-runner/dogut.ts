import type { Material, Mesh, PerspectiveCamera, Points, Scene, WebGLRenderer } from 'three';
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
	/**
	 * Begins camera capture, MediaPipe load, and the render loop. Idempotent.
	 * @throws DOMException — typically `NotAllowedError` if the user denies
	 *   webcam permission. May also reject for other camera/MediaPipe errors.
	 *   On rejection, the caller MUST call `dispose()` to release any partially
	 *   acquired resources (MediaStream, listeners, renderer).
	 */
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

		// The RAF id below is intentionally not captured: the loop self-terminates
		// on the next frame via the `disposed` guard. One trailing frame after
		// dispose() is acceptable; capturing the id would buy a one-frame win.
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

		disposeMesh(torus);
		torus = null;
		disposeMesh(player);
		player = null;
		disposePoints(stars);
		stars = null;

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
