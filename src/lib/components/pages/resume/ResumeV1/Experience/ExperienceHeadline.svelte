<script module lang="ts">
	export const isExpandItem = writable<boolean>(false);

</script>
<script lang="ts">
	import ButtonExpand from '$lib/components/template/ButtonExpand.svelte';
	import type { ExperiencesEventUI } from '$lib/content';
	import { writable } from 'svelte/store';
	import { isExpand } from './experience.store';
	const { item }: { item: ExperiencesEventUI } = $props();

</script>

<div class="overflow-hidden rounded-lg border-2 border-zinc-200 shadow">
	<div class="px-2 py-3 sm:p-3">
		<div class="flex flex-col md:flex-row justify-between gap-1 md:gap-2">
			<div class="text-md text-gray-500 dark:text-zinc-200">
				<span>{item.companyName}</span>
			</div>
			<span class="text-md font-bold text-gray-900 dark:text-zinc-200">
				{item.role}
			</span>
			<div class="whitespace-nowrap text-sm text-gray-500 dark:text-zinc-200">
				<time dateTime={item.dateStart}>{item.dateStart}</time>
				-
				{#if item.dateEndTime}
					<time dateTime={item.dateEndTime}>{item.dateEnd}</time>
				{/if}
				{#if item.dateEndTime === null}
					{item.dateEnd}
				{/if}
			</div>
			<ButtonExpand
			initialValue={false}
	onChange={(value: boolean) => {
		console.log("value", value)
		isExpandItem.set(value)
	}}
></ButtonExpand>
		</div>
	</div>
</div>
