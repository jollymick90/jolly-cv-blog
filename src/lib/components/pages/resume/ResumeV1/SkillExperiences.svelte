<script lang="ts">
	const { experiencesList }: { experiencesList: string[] | undefined } = $props();
</script>

<div class="overflow-hidden rounded-lg bg-cv-200 shadow">
	<div class="px-2 py-3 sm:p-3">
		{#if experiencesList}
			{#each experiencesList as experiences}
				<div class="w-full">
					<span class="mt-1 font-normal text-zinc-800">{experiences}</span>
				</div>
			{/each}
		{/if}
	</div>
</div>
