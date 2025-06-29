<script lang="ts">
	import type { Snippet } from 'svelte';

	const {
		color = 'text-teal-500',
		href,
		children
	}: {
		color?: string;
		href: string;
		children: Snippet;
	} = $props();
</script>

<div class="{color}">
	<a {href} class="relative z-10 mt-4 flex items-center text-sm font-medium">
		{@render children()}
		<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="ml-1 h-4 w-4 stroke-current">
			<path
				d="M6.75 5.75 9.25 8l-2.5 2.25"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	</a>
</div>
