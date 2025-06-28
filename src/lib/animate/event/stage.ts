import * as THREE from 'three';


export function createStage(scene: any, omino: any) {
  const palco = new THREE.Mesh(
    new THREE.BoxGeometry(5, 0.1, 1),
    new THREE.MeshStandardMaterial({ color: 0x222222 })
  );
  palco.position.y = 0.5;
  scene.add(palco);

  omino.position.y = 0.1;
}