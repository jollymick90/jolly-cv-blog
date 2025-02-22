<script lang="ts">
import type {
    SkillItemUI,
    SkillItem
} from '$lib/content/resume';
import {
    getColor
} from '$lib/utils/skills.utils';

export let listSkills: SkillItem[];

const skills: SkillItemUI[] = listSkills.map((item) => {
    return {
        ...item,
        color: getColor(item)
    };
});
</script>

<div class="w-full">
    <h4>Abilità tecniche</h4>
    <div class="grid w-full grid-cols-6 gap-2">
        {#each skills as skill}
        <div class="m-1 flex w-full flex-col">
            <span class="truncate text-ellipsis text-sm">{skill.name}</span>
            <div class="h-1 w-full bg-gray-200">
                <div class="{skill.color} h-1" style="width: {skill.level}%"></div>
            </div>
        </div>
        {/each}
    </div>

    <div class="flex h-full">
        <div class="flex w-full flex-col justify-end">
            <span class="truncate text-ellipsis text-sm">Conoscenza teorica</span>
            <span class="truncate text-ellipsis text-sm">
                Poche esperienze professionali
            </span>
            <span class="truncate text-ellipsis text-sm">
                Task semplici
            </span>
            <span class="truncate text-ellipsis text-sm">
                Comprensione codice
            </span>
   

            <div class="flex h-1 w-full bg-gray-200">
                <div class="h-1 bg-red-500" style="width: 100%"></div>
            </div>
        </div>
        <div class="flex w-full flex-col">
            <span class="truncate text-ellipsis text-sm">Task standard</span>
            <span class="truncate text-ellipsis text-sm">
                Funzionalità principali
            </span>
            <span class="truncate text-ellipsis text-sm">
                Adattamento ai progetti
            </span>
            <span class="truncate text-ellipsis text-sm">
                Autonomo per progetti reali
            </span>
			<span class="truncate text-ellipsis text-sm">
                Progettazione e sviluppo standard
            </span>
            <div class="flex h-1 w-full bg-gray-200">
                <div class="h-1 bg-yellow-500" style="width: 100%"></div>
            </div>
        </div>
        <div class="flex w-full flex-col">
            <span class="truncate text-ellipsis text-sm">
                Autonomo in progetti complessi
            </span>
            <span class="truncate text-ellipsis text-sm">Esperienza pratica consolidata</span>
            <span class="truncate text-ellipsis text-sm">
                Ottimizzazione e risolvere problemi avanzati
            </span>
            <span class="truncate text-ellipsis text-sm">
                Progettazione e sviluppo avanzata
            </span>
            <span class="truncate text-ellipsis text-sm">
                Best practices e Condivisione
            </span>

            <div class="flex h-1 w-full bg-gray-200">
                <div class="h-1 bg-green-500" style="width: 100%"></div>
            </div>
        </div>
    </div>

</div>
