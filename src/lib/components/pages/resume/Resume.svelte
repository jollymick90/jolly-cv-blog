<script lang="ts">
	import type { IResume } from "$lib/content";
	import ResumeV2 from "./ResumeV2/ResumeV2.svelte";
	export let resume: IResume;
</script>
<ResumeV2 resume={resume}></ResumeV2>