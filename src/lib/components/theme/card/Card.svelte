<script lang="ts">
	import type { Snippet } from "svelte";

	
	const { className, children }: { 
		className?: string,
		children: Snippet
		 } = $props();
</script>

<div class="{className} group relative flex flex-col items-start">	
	{@render children()}
</div>
