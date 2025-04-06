<script lang="ts">
	import clsx from 'clsx';	
	export let className: string = '';
</script>

<div class={clsx('sm:px-8', className)} {...$$restProps}>
	<div class="mx-auto w-full max-w-7xl lg:px-8">
		<div class={clsx('relative px-2 sm:px-8 lg:px-12')}>
			<div class="mx-auto md:max-w-3xl lg:max-w-5xl">
				<slot />
			</div>
		</div>
	</div>
</div>
