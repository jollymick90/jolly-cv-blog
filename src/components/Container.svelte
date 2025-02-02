<script lang="ts">
	import clsx from 'clsx';

	// In questo componente potresti voler passare eventuali proprietà extra (ad es. class) a ContainerOuter
	
	export let className: string = '';
	// const {} = $props();
	//console.log("$$restProps", $$restProps)
	// class='sm:px-8 {classNameOuter} {$$restProps.class}' {...$$restProps}
	// class={`${$props.class || ''} someClass`} 
</script>

<div class={clsx('sm:px-8', className)} {...$$restProps}>
	<div class="mx-auto w-full max-w-7xl lg:px-8">
		<div class={clsx('relative px-4 sm:px-8 lg:px-12')}>
			<div class="mx-auto max-w-2xl lg:max-w-5xl">
				<slot />
			</div>
		</div>
	</div>
</div>
