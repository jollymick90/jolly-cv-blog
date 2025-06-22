<script lang="ts">
	import image1 from '$lib/img/photos/image-6.jpg';
	import image2 from '$lib/img/photos/image-7.jpg';
	import image3 from '$lib/img/photos/image-8.jpg';
	import image4 from '$lib/img/photos/image-9.jpg';
	import image5 from '$lib/img/photos/image-10.webp';
	import image6 from '$lib/img/photos/image-11.jpg';
	import image7 from '$lib/img/photos/image-12.jpg';
	const imgList = [
		{
			src: image1,
			css: 'rotate-2'
		},
		{
			src: image4,
			css: 'rotate-2'
		},		
		{
			src: image2,
			css: '-rotate-2'
		},
		{
			src: image6,
			css: 'rotate-2'
		},
		{
			src: image7,
			css: '-rotate-2'
		},
		{
			src: image5,
			css: '-rotate-2'
		},
		{
			src: image3,
			css: 'rotate-2'
		},
	];
</script>

<div class="mt-16 sm:mt-20">
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
