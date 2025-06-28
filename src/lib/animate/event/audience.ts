import { createOmino } from "./omino";
const audienceColors = [0xaaaaff, 0xaaffaa, 0xffaaaa, 0xffffaa, 0xaaffff];
const audienceColorsSecondLine = [ 0xaaffaa,  0xaaaaff,0xffffaa, 0xffaaaa,0xaaffff];

export function createAudiance(scene: any, omino: any,) {
    for (let i = 0; i < 5; i++) {
        const angle = (i - 2) * 0.4; // distribuzione angolare
        const x = Math.sin(angle) * 1.2;
        const z = Math.cos(angle) * 1.2 + 0.8;

        const pubblico = createOmino(audienceColors[i]);
        pubblico.position.set(x, 0, z);
        pubblico.lookAt(omino.position); // guarda verso lo speaker
        scene.add(pubblico);
    }

    for (let i = 0; i < 5; i++) {
        const angle = (i - 2) * 0.4; // distribuzione angolare
        const x = Math.sin(angle) * 2;
        const z = Math.cos(angle) * 2 + 0.4;

        const pubblico = createOmino(audienceColorsSecondLine[i]);
        pubblico.position.set(x, 0, z);
        pubblico.lookAt(omino.position); // guarda verso lo speaker
        scene.add(pubblico);
    }
}