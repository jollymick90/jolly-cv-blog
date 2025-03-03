<script lang="ts">
	import type { IResume } from "$lib/content";
	import ResumeV1 from "./ResumeV1/ResumeV1.svelte";
	import ResumeV2 from "./ResumeV2/ResumeV2.svelte";
	export let resume: IResume;
</script>
<ResumeV1 resume={resume}></ResumeV1>