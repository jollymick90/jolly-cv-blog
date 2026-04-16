<script lang="ts">
  interface Props {
    url: string;
  }

  let { url }: Props = $props();

  function getEmbedUrl(raw: string): string | null {
    // YouTube: watch?v=ID, youtu.be/ID, or /embed/ID
    const yt = raw.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/
    );
    if (yt) return `https://www.youtube.com/embed/${yt[1]}`;

    // Vimeo: vimeo.com/ID or player.vimeo.com/video/ID
    const vm = raw.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (vm) return `https://player.vimeo.com/video/${vm[1]}`;

    return null;
  }

  const embedUrl = $derived(getEmbedUrl(url));
</script>

{#if embedUrl}
  <div class="my-8 aspect-video border border-outline-variant/15 overflow-hidden">
    <iframe
      src={embedUrl}
      class="w-full h-full"
      loading="lazy"
      allowfullscreen
      title="Embedded video"
    ></iframe>
  </div>
{:else}
  <div class="my-8 border-l-4 border-error bg-surface-container-low px-4 py-3 text-sm font-label text-error">
    INVALID_VIDEO_URL: {url}
  </div>
{/if}
