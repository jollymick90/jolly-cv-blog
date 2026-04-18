<script lang="ts">
	import p1 from '$lib/img/photos/profilo-1-DSCF2646.webp';
	import p2 from '$lib/img/photos/profilo-2-PXL_20250913_121038754.webp';
	import img1 from '$lib/img/photos/DSCF2644.webp';
	import img2 from '$lib/img/photos/PXL_20251122_124938257.MP.webp';
	import img3 from '$lib/img/photos/PXL_20251025_121100976.MP.webp';
	import img4 from '$lib/img/photos/PXL_20250711_141746786.MP.webp';
	import img5 from '$lib/img/photos/michele-conference-frontend-dilemma-112024.jpg';
	import img6 from '$lib/img/photos/michele-conference-svelte-052025.jpg';
	import img7 from '$lib/img/photos/PXL_20250313_075042896.webp';
	import img8 from '$lib/img/photos/ai-generate-labs.webp';

	const imgList = [
		{ src: p1,   css: 'rotate-2'  },
		{ src: img5, css: '-rotate-2' },
		{ src: p2,   css: 'rotate-1'  },
		{ src: img6, css: '-rotate-1' },
		{ src: img1, css: 'rotate-2'  },
		{ src: img2, css: '-rotate-2' },
		{ src: img3, css: 'rotate-1'  },
		{ src: img4, css: '-rotate-1' },
		{ src: img7, css: 'rotate-2'  },
		{ src: img8, css: '-rotate-2' }
	];
</script>

<div class="mt-16 sm:mt-20 mb-16">
	<div
		class="-my-4 flex gap-5 overflow-x-auto py-4 sm:gap-8 snap-x snap-mandatory scroll-smooth px-4 sm:px-0 scrollbar-none"
		style="scrollbar-width: none; -ms-overflow-style: none;"
	>
		{#each imgList as imgItem}
			<div
				class="relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl snap-center {imgItem.css}"
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
