<script lang="ts">
	import type { ItemList } from "$lib/components/types/template";
	const { items }: { items: ItemList[] } = $props();

	
	const itemsList = items.filter(item => !item.disable)
	let isOpen = $state(false);

	function toggleMenu() {
		isOpen = !isOpen;
	}

	function onclick(event: any) {		
		isOpen = false;		
	}
	
</script>

<button
	type="button"
	class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400
    hover:bg-gray-700
    hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white dark:bg-zinc-800/90"
	aria-controls="mobile-menu"
	aria-expanded={isOpen}
	onclick={toggleMenu}
>
	<span class="absolute -inset-0.5"></span>
	<span class="sr-only">Open main menu</span>

	{#if isOpen}
		<svg
			class="size-6"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			aria-hidden="true"
			data-slot="icon"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
		</svg>
	{:else}
		<svg
			class="size-6"
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
	{/if}
</button>

<div class="relative">
	{#if isOpen}
		<div class="absolute left-1/2 z-10 mt-5 flex -translate-x-1/2 px-4">
			<div
				class="flex-auto overflow-hidden
                        rounded-3xl
                        bg-white
                        text-sm
                        shadow-lg ring-1 ring-gray-900/5 dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10"
			>
				<div class="p-4">
					{#each itemsList as item}
						<div
							class="group relative flex gap-x-6 rounded-lg p-4
                                hover:bg-gray-50 dark:hover:bg-zinc-600"
						>
							
							<div>
								<a
									onclick={onclick}
									href={item.href}
									class="font-semibold
                                        text-gray-900 dark:text-zinc-200"
								>
									{item.title}
								</a>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	{/if}
</div>
