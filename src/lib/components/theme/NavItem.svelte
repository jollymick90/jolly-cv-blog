<script lang="ts">
	//let isActive = usePathname() === href
	import type { Snippet } from 'svelte';
	interface Props {
		children: Snippet;
	}
	const { children, href }: { href: string} & Props = $props();
	    
	let isActive = false;
</script>

<li>
	<a
		{href}
		class="relative block px-3 py-2 transition {isActive
			? 'text-teal-500 dark:text-teal-400'
			: 'hover:text-teal-500 dark:hover:text-teal-400'}"
	>
		
		{@render children()}
        {#if isActive }
            <span class="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-teal-500/0 via-teal-500/40 to-teal-500/0 dark:from-teal-400/0 dark:via-teal-400/40 dark:to-teal-400/0"></span>
        {/if}
	</a>
</li>
