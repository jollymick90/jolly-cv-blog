<script lang="ts">
	export let href: string | null= null;
</script>

<h2 class="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
	{#if href !== null}
		<div class="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl dark:bg-zinc-800/50"></div>
		<a {href}>
			<span class="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl"></span>
			<span class="relative z-10">
				<slot></slot>
			</span>
		</a>
	{:else}
		<span class="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl"></span>
		<span class="relative z-10">
			<slot></slot>
		</span>
	{/if}
</h2>
