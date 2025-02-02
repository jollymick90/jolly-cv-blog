<script lang="ts">
	import NavItem from './core/NavItem.svelte';
	import MobileNavigation from './MobileNavigation.svelte';

	export let type: 'mobile' | 'desktop' = 'mobile';
	let isOpen = false;
  
  function toggleMenu() {
    isOpen = !isOpen;
  }
</script>

<nav>
	{#if type == 'desktop'}
		<ul
			class="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10"
		>
			<NavItem href="/">Home</NavItem>
			<NavItem href="/content">Eventi</NavItem>
			<NavItem href="/blog">Blog</NavItem>
			<NavItem href="/resume">Resume</NavItem>
		</ul>
	{:else}
		<MobileNavigation></MobileNavigation>
		<button
			type="button"
			class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
			aria-controls="mobile-menu"
			aria-expanded="false"
			on:click
		>
			<span class="absolute -inset-0.5"></span>
			<span class="sr-only">Open main menu</span>
			<!--
              Icon when menu is closed.
  
              Menu open: "hidden", Menu closed: "block"
            -->
			<svg
				class="block size-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				aria-hidden="true"
				data-slot="icon"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
				/>
			</svg>
			<!--
              Icon when menu is open.
  
              Menu open: "block", Menu closed: "hidden"
            -->
			<svg
				class="hidden size-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				aria-hidden="true"
				data-slot="icon"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
			</svg>
		</button>
		
	{/if}

	
</nav>
