<script lang="ts">
	import type { IResume } from "$lib/content";
	import ResumeV3 from "./ResumeV3/ResumeV3.svelte";

	const { resume }: {resume: IResume} = $props();
</script>
<ResumeV3 resume={resume}></ResumeV3>