<script lang="ts">
	import type { Snippet } from "svelte";

	
	const { href, className, children }: {
		href: string | null,
		className?: string,
		children: Snippet
	} = $props();
	  
</script>

<h2 class="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
	{#if href !== null}
		<div class="{className} absolute z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:rounded-2xl dark:bg-zinc-800/50"></div>
		<a {href}>
			<span class="{className} absolute z-20 sm:rounded-2xl"></span>
			<span class="relative z-10">
				{@render children()}
			</span>
		</a>
	{:else}
		<span class="{className} absolute z-20 sm:rounded-2xl"></span>
		<span class="relative z-10">
			{@render children()}
		</span>
	{/if}
</h2>
