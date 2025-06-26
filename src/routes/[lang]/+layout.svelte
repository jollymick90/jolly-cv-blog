<script lang="ts">
	import Header from '$lib/components/template/Header.svelte';

	let { children, data } = $props();
	const { isFullScreen } = data;
</script>

{#if isFullScreen}
	{@render children()}
{:else}
	<div class="flex w-full pb-10 mb-10">
		<div class="fixed inset-0 flex justify-center sm:px-8">
			<div class="flex w-full max-w-7xl lg:px-8">
				<div
					class="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20"
				></div>
			</div>
		</div>
		<div class="relative flex w-full flex-col">
			<Header lang={data.lang}></Header>

			<main class="flex-auto px-2">
				{@render children()}
			</main>
		</div>
	</div>
{/if}
