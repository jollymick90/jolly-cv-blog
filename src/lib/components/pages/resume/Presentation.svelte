<script lang="ts">
	import type { PresentationResume } from "$lib/content/resume";

    export let presentation: PresentationResume;
</script>

<p class="font-medium text-gray-500 text-center pb-1 mb-1">
    {presentation}
</p>