<script lang="ts">
	import type { IResume } from "$lib/content";
	import ResumePrintable from "./ResumePrintable.svelte";
	import ResumeV3 from "./ResumeV3/ResumeV3.svelte";

	const { resume, printable }: {
		resume: IResume,
		printable: boolean
		} = $props();
</script>
{#if printable}
	<ResumePrintable {resume}></ResumePrintable>
	{:else}
	<ResumeV3 {resume}></ResumeV3>
{/if}
