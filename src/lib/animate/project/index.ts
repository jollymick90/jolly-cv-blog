import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createBalloon } from './balloon';

export function create3DProject(container: any) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        80,
        container.clientWidth / container.clientHeight,
        0.1,
        100
    );

    camera.position.set(3.6, 0.8, -2);
    camera.lookAt(0, 0, 0);


    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

//     const controls = new OrbitControls(camera, renderer.domElement);
//     controls.enableDamping = true;
//     controls.dampingFactor = 0.05;
//     controls.enablePan = false;
//     controls.minDistance = 3;
//     controls.maxDistance = 6;
//     controls.target.set(0, 1, 0); // punto che la camera guarda
//     controls.update();
// controls.addEventListener('change', () => {
//   console.log('Camera position:', camera.position.toArray());
//   console.log('Camera target:', controls.target.toArray());
// });
    // Lights
    const ambientLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(5, 10, 7.5);
    scene.add(dirLight);

    const balloon = createBalloon(0xfff533);
    balloon.position.set(2, 0, -1); // posizione laterale, visibile dalla camera
    scene.add(balloon);

    const balloonStartY = balloon.position.y;
    
    // Animate
    function animate() {
        requestAnimationFrame(animate);
        const time = Date.now() * 0.001; // secondi
        balloon.position.y = balloonStartY + Math.sin(time) * 0.8;
        // controls.update();
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}