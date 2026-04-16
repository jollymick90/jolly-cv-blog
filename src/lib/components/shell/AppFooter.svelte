<script lang="ts">
  import type { LangAvailable } from '$lib/types';
  const { lang }: { lang: LangAvailable } = $props();
</script>

<footer class="relative w-full py-12 bg-surface-container-low flex flex-col items-center gap-4 px-8 pb-24 md:pb-12 text-center border-t border-outline-variant/15">
  <div class="text-tertiary font-mono text-xs mb-4 tracking-widest">SYSTEM_STATUS: ONLINE</div>

  <div class="flex flex-wrap justify-center gap-6 mb-8">
    <a
      href="https://github.com/jollymick90"
      target="_blank"
      rel="noopener noreferrer"
      class="text-secondary font-label text-[10px] tracking-widest hover:text-on-surface transition-colors uppercase"
    >GITHUB</a>
    <a
      href="https://linkedin.com/in/michelescarpa90"
      target="_blank"
      rel="noopener noreferrer"
      class="text-secondary font-label text-[10px] tracking-widest hover:text-on-surface transition-colors uppercase"
    >LINKEDIN</a>
    <a
      href="/{lang}/print"
      class="text-secondary font-label text-[10px] tracking-widest hover:text-on-surface transition-colors uppercase"
    >DOWNLOAD_CV</a>
  </div>

  <p class="text-primary font-label text-[10px] tracking-widest opacity-50">
    © {new Date().getFullYear()} Michele Scarpa
  </p>
</footer>
