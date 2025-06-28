	import * as THREE from 'three';


export function createStage(scene: any, omino: any) {
    // Palco sotto lo speaker
const palco = new THREE.Mesh(
  new THREE.BoxGeometry(2, 0.1, 1),
  new THREE.MeshStandardMaterial({ color: 0x222222 })
);
palco.position.y = 0.2;
scene.add(palco);

// Sposta su l'omino per stare sopra il palco
omino.position.y = 0.1;
}