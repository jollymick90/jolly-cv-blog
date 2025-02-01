<script lang="ts">
	import clsx from 'clsx';
	// Prop per eventuali classi aggiuntive.
	export let className: string = '';
	// $$restProps conterrà tutte le altre proprietà passate al componente.
</script>

<div
	{...$$restProps}
	class={clsx(
		className,
		'h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10'
	)}
>
	<slot></slot>
</div>
