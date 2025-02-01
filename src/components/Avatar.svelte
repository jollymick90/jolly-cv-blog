<script lang="ts">
	import clsx from 'clsx';
	import avatar from '$lib/img/avatar.jpg';
	export let large = false;
	export let className: string = '';
</script>

<a href="/" aria-label="Home" {...$$restProps} class={clsx('pointer-events-auto', className)}>
	<img
		src={avatar}
		alt="Michele"
		sizes={large ? '4rem' : '2.25rem'}
		class="rounded-full bg-zinc-100 object-cover dark:bg-zinc-800 {large ? 'h-16 w-16' : 'h-9 w-9'}"
	/>
</a>
