<script lang="ts">
	export let decorate: boolean = false;
	export let className: string = '';
</script>

<time
	class="{className} relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500
  {decorate && 'pl-3.5'}"
>
	{#if decorate}
		<span class="absolute inset-y-0 left-0 flex items-center" aria-hidden="true">
			<span class="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"></span>
		</span>
	{/if}
	<span></span>
	<slot></slot>
</time>
