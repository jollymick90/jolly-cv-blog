<script lang="ts">
	import type { MainSkills } from "$lib/content/resume";

    export let mainSkillList: MainSkills[];

</script>

<div class="w-full text-xl text-gray-500 dark:text-zinc-100 leading-8">
    <div class="flex flex-row flex-wrap gap-2 justify-center">
        {#each mainSkillList as skill}
            <span class="inline-flex">
                {skill.name}
            </span>
        {/each}
    </div>

</div>