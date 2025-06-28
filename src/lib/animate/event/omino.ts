import * as THREE from 'three';

export function createOmino(color = 0x5555ff) {
  const group = new THREE.Group();

  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.2, 16, 16),
    new THREE.MeshStandardMaterial({ color })
  );
  head.position.y = 1.4;

  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(0.15, 0.15, 0.6, 16),
    new THREE.MeshStandardMaterial({ color })
  );
  body.position.y = 0.9;

  group.add(head, body);
  return group;
}
