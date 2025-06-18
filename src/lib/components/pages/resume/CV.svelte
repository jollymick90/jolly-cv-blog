<script lang="ts">
	import type { IResume } from "$lib/content";
	import ResumeV3 from "./ResumeV3/ResumeV3.svelte";
	export let resume: IResume;
</script>
<ResumeV3 resume={resume}></ResumeV3>