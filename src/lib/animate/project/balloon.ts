import * as THREE from 'three';

export function createBalloon(color = 0xff4444) {
  const group = new THREE.Group();

  // Pallone (leggermente schiacciato)
  const balloon = new THREE.Mesh(
    new THREE.SphereGeometry(0.6, 32, 32),
    new THREE.MeshStandardMaterial({ color, flatShading: true })
  );
  balloon.scale.y = 1.2;
  balloon.position.y = 1.5;
  group.add(balloon);

  // Cestino
  const basket = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 0.2, 0.3),
    new THREE.MeshStandardMaterial({ color: 0x884422 })
  );
  basket.position.y = 0.2;
  group.add(basket);

  // Cavi (4 cilindri)
  const cableMaterial = new THREE.MeshStandardMaterial({ color: 0x222222 });
  const cables = [
    [-0.15, 0.4, -0.15],
    [ 0.15, 0.4, -0.15],
    [-0.15, 0.4,  0.15],
    [ 0.15, 0.4,  0.15]
  ];

  for (const [x, y, z] of cables) {
    const cable = new THREE.Mesh(
      new THREE.CylinderGeometry(0.01, 0.01, 1, 8),
      cableMaterial
    );
    cable.position.set(x, y + 0.5, z);
    cable.rotation.z = (x < 0) ? Math.PI / 10 : -Math.PI / 10;
    group.add(cable);
  }

  return group;
}
