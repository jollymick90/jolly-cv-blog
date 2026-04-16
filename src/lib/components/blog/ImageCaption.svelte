<script lang="ts">
  interface Props {
    src: string;
    alt?: string;
    caption?: string;
  }

  let { src, alt = '', caption }: Props = $props();
</script>

<figure class="my-8">
  <img {src} {alt} class="w-full object-cover" loading="lazy" />
  {#if caption}
    <figcaption class="mt-3 text-[10px] font-label text-secondary text-center tracking-widest uppercase">
      {caption}
    </figcaption>
  {/if}
</figure>
