<script lang="ts">
	const { className, children } = $props();
</script>

<div class='sm:px-8 {className ?? ''}' >
	<div class="mx-auto w-full max-w-7xl lg:px-8">
		<div class='relative px-2 sm:px-8 lg:px-12'>
			<div class="mx-auto md:max-w-3xl lg:max-w-5xl">
				{@render children()}
			</div>
		</div>
	</div>
</div>
