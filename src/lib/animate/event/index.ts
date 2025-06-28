import * as THREE from 'three';
import { createOmino } from './omino';
import { createAudiance } from './audience';
import { createStage } from './stage';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export function create3DEvent(container: any) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        50,
        container.clientWidth / container.clientHeight,
        0.1,
        100
    );
    //camera.position.set(0, 1.5, 3);
    camera.position.set(-1, 4.5, 5); // spostata a sinistra e in alto
    // camera.position.set(0, 0, 1); // spostata a sinistra e in alto
    camera.lookAt(0, 1, 0); // guarda il centro del palco


    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false;
    controls.minDistance = 3;
    controls.maxDistance = 6;
    controls.target.set(0, 1, 0); // punto che la camera guarda
    controls.update();
    // Lights
    const ambientLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(5, 10, 7.5);
    scene.add(dirLight);

    // Add omino
    const speaker = createOmino(0xff5533);
    speaker.position.set(0, 0.1, -0.6); // un po' avanti sul palco
    scene.add(speaker);
    // scene.add(omino);


    createAudiance(scene, speaker)

    createStage(scene, speaker);

    // Animate
    function animate() {
        requestAnimationFrame(animate);
        speaker.rotation.y += 0.01;
        //  omino.rotation.y += 0.01;
        controls.update(); // <-- aggiungi questa linea
        renderer.render(scene, camera);
    }
    animate();

    // Resize
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}