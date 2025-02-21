<script context="module" lang="ts">
	const variantStyles = {
		primary:
			'bg-zinc-800 font-semibold text-zinc-100 hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700 dark:active:text-zinc-100/70',
		secondary:
			'bg-zinc-50 font-medium text-zinc-900 hover:bg-zinc-100 active:bg-zinc-100 active:text-zinc-900/60 dark:bg-zinc-800/50 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:active:bg-zinc-800/50 dark:active:text-zinc-50/70'
	};

</script>

<script lang="ts">
	export let variant: keyof typeof variantStyles = 'primary';
	export let href: undefined | string = undefined;
	export let className: string = "";
	let _className = `inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none 
    ${variantStyles[variant]}`;
	const classProps = `${className} ${_className}`;
</script>

{#if typeof href === 'undefined'}
	<button class={classProps} {...$$props} aria-label="click">
		<slot></slot>
	</button>
{:else}
	<a class={classProps} {href} aria-label="click">
		<slot></slot>
	</a>
{/if}
