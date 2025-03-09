<script lang="ts">
	import image1 from '$lib/img/photos/image-1.jpg';
	import image2 from '$lib/img/photos/image-2.jpg';
	import image3 from '$lib/img/photos/image-3.jpg';
	import image4 from '$lib/img/photos/image-4.jpg';
	import image5 from '$lib/img/photos/image-5.jpg';
	const imgList = [
		{
			src: image1,
			css: 'rotate-2'
		},
		{
			src: image2,
			css: '-rotate-2'
		},
		{
			src: image3,
			css: 'rotate-2'
		},
		{
			src: image4,
			css: 'rotate-2'
		},
		{
			src: image5,
			css: '-rotate-2'
		}
	];
</script>

<div class="mt-16 sm:mt-20 hidden">
	<div class="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
		{#each imgList as imgItem}
			<div
				class="relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl {imgItem.css}"
			>
				<img
					src={imgItem.src}
					alt=""
					sizes="(min-width: 640px) 18rem, 11rem"
					class="absolute inset-0 h-full w-full object-cover"
				/>
			</div>
		{/each}
	</div>
</div>
