<script lang="ts">
	import { ChevronDoubleDown, ChevronDown, ChevronUp, Icon } from 'svelte-hero-icons';

	export let onChange;

	let isExpand = false;
	$: onChange(isExpand);

	function changeStatus(): any {
		isExpand = !isExpand;
	}
</script>

<button
	on:click={() => changeStatus()}
	class="group rounded-full bg-white/90 p-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-sm transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
>
	{#if !isExpand}
		<Icon class="h-2 w-2 text-zinc-800 dark:text-white" aria-hidden="true" src={ChevronDown} />
	{:else}
		<Icon class="h-2 w-2 text-zinc-800 dark:text-white" aria-hidden="true" src={ChevronUp} />
	{/if}
</button>
