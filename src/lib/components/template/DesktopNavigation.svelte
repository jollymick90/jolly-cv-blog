<script lang="ts">
	import type { ItemList } from '$lib/components/types/template';
	import NavItem from '$lib/components/core/NavItem.svelte';

	export let items: ItemList[] = [];
	const itemsList = items.filter((item) => !item.disable);
</script>

<ul
	class="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10"
>
	{#each itemsList as item}
		<NavItem href={item.href}>{item.title}</NavItem>
	{/each}
</ul>
