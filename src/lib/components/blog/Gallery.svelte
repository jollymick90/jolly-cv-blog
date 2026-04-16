<script lang="ts">
  interface GalleryImage {
    src: string;
    alt?: string;
  }

  interface Props {
    images: GalleryImage[];
  }

  let { images }: Props = $props();

  let lightboxIndex = $state<number | null>(null);

  function open(i: number) { lightboxIndex = i; }
  function close() { lightboxIndex = null; }

  function onKeydown(e: KeyboardEvent) {
    if (lightboxIndex === null) return;
    if (e.key === 'Escape') { close(); return; }
    if (e.key === 'ArrowRight') lightboxIndex = (lightboxIndex + 1) % images.length;
    if (e.key === 'ArrowLeft')  lightboxIndex = (lightboxIndex - 1 + images.length) % images.length;
  }
</script>

<svelte:window onkeydown={onKeydown} />

<!-- Grid -->
<div class="my-8 grid grid-cols-2 md:grid-cols-3 gap-1">
  {#each images as image, i (image.src)}
    <button
      class="overflow-hidden aspect-video bg-surface-container-low cursor-zoom-in"
      onclick={() => open(i)}
      aria-label="Open image {i + 1} of {images.length}"
    >
      <img
        src={image.src}
        alt={image.alt ?? ''}
        class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
    </button>
  {/each}
</div>

<!-- Lightbox -->
{#if lightboxIndex !== null}
  {@const current = images[lightboxIndex]}
  <div
    class="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
    role="dialog"
    aria-modal="true"
    aria-label="Image lightbox"
  >
    <!-- Backdrop -->
    <button
      class="absolute inset-0"
      onclick={close}
      aria-label="Close lightbox"
    ></button>

    <!-- Image -->
    <div class="relative z-10 max-w-5xl max-h-[90vh] mx-4 flex flex-col items-center">
      <img
        src={current.src}
        alt={current.alt ?? ''}
        class="max-w-full max-h-[80vh] object-contain"
      />
      {#if current.alt}
        <div class="mt-3 text-[10px] font-label text-secondary tracking-widest uppercase">
          {current.alt}
        </div>
      {/if}
    </div>

    <!-- Close -->
    <button
      class="absolute top-4 right-6 z-10 text-white/60 hover:text-white text-3xl leading-none"
      onclick={close}
      aria-label="Close"
    >✕</button>

    <!-- Prev / Next -->
    {#if images.length > 1}
      <button
        class="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white/60 hover:text-white text-4xl px-2 py-4"
        onclick={(e) => { e.stopPropagation(); lightboxIndex = ((lightboxIndex ?? 0) - 1 + images.length) % images.length; }}
        aria-label="Previous image"
      >‹</button>
      <button
        class="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white/60 hover:text-white text-4xl px-2 py-4"
        onclick={(e) => { e.stopPropagation(); lightboxIndex = ((lightboxIndex ?? 0) + 1) % images.length; }}
        aria-label="Next image"
      >›</button>
    {/if}
  </div>
{/if}
