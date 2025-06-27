<script lang="ts">
	import type { Snippet } from 'svelte';

	const {
		href,
		hoverHighlight,
		children
	}: {
		href: string | null;
		hoverHighlight?: boolean;
		children: Snippet;
	} = $props();
</script>

{#snippet hiperLink()}
	{#if hoverHighlight}
		<div
			class="absolute -inset-x-2 -inset-y-3 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl"
		></div>
	{/if}

	<a {href}>
		{#if hoverHighlight}
			<span class="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl"></span>
		{/if}
		<span class="relative z-10">
			{@render children()}
		</span>
	</a>
{/snippet}
{#snippet simpleTitle()}
	{#if hoverHighlight}
		<span class="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl"></span>
	{/if}
	<span class="relative z-10">
		{@render children()}
	</span>
{/snippet}

<h2 class="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
	{#if href !== null}
		{@render hiperLink()}
	{:else}
		{@render simpleTitle()}
	{/if}
</h2>
