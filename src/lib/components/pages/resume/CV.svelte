<script lang="ts">
	import type { IResume } from "$lib/content";
	import ResumePrintable from "./ResumePrintable.svelte";
	import ResumeV3 from "./ResumeV3/ResumeV3.svelte";
	import ResumeV4 from "./ResumeV4/ResumeV4.svelte";
	import ResumeV4Printable from "./ResumeV4/ResumeV4Printable.svelte";

	const { resume, printable, full = false }: {
		resume: IResume,
		printable?: boolean,
		full?: boolean
		} = $props();
</script>
{#if printable && !full}
	<ResumePrintable {resume}></ResumePrintable>

	{:else if printable && full}
	<ResumeV4Printable {resume}></ResumeV4Printable>
	{:else}
	<ResumeV4 {resume}></ResumeV4>
{/if}
