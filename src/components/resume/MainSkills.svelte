<script lang="ts">
	import type { MainSkills } from "$lib/content/resume";

    export let mainSkillList: MainSkills[] = [];

</script>

<div class="w-full mt-8 text-xl text-gray-500 leading-8">
    <div class="flex flex-row flex-wrap gap-2 justify-center">
        {#each mainSkillList as skill}
            <span class="inline-flex">
                {skill.name}
            </span>
        {/each}
    </div>

</div>