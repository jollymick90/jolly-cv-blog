<script lang="ts">
	import type { IResume } from "$lib/content";
	import ResumePrintable from "./ResumePrintable.svelte";
	import ResumeV3 from "./ResumeV3/ResumeV3.svelte";

	const { resume, printable, full = false }: {
		resume: IResume,
		printable?: boolean,
		full?: boolean
		} = $props();
</script>
{#if printable && !full}
	<ResumePrintable {resume}></ResumePrintable>

	{:else if printable && full}
	<ResumeV3 {resume}></ResumeV3>
	{:else}
	<ResumeV3 {resume}></ResumeV3>
{/if}
