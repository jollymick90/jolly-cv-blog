<script lang="ts">
	import clsx from 'clsx';

	// In questo componente potresti voler passare eventuali proprietà extra (ad es. class) a ContainerOuter
	export let classNameInner: string = '';
	export let classNameOuter: string = '';
</script>

<div class={clsx('sm:px-8', classNameOuter)} {...$$restProps}>
	<div class="mx-auto w-full max-w-7xl lg:px-8">
		<div class={clsx('relative px-4 sm:px-8 lg:px-12', classNameInner)}>
			<div class="mx-auto max-w-2xl lg:max-w-5xl">
				<slot />
			</div>
		</div>
	</div>
</div>
