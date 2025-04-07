
<script lang="ts">
	import ButtonExpand from '$lib/components/template/ButtonExpand.svelte';
	import { isMobile } from '$lib/stores/breakpoint';

	const { experiencesList }: { experiencesList: string[] | undefined } = $props();
	
	let isExpand = $state(!$isMobile);
	
</script>



<div class="overflow-hidden rounded-lg bg-cv-200 shadow">
	<div class="px-2 py-3 sm:p-3">
			{#if experiencesList}
				{#each experiencesList as experiences}
					<ul class="w-full">
						<li class="ml-2 mt-1 list-disc font-normal text-zinc-800">{experiences}</li>
					</ul>
				{/each}
			{/if}

	</div>
</div>
