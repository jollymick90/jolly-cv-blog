<script>
    import { onMount, onDestroy } from 'svelte';
    import { writable } from 'svelte/store';
  
    // Store per gestire il tema
    export const theme = writable('system');
  
    onMount(() => {
      let media = window.matchMedia('(prefers-color-scheme: dark)');
  
      function onMediaChange() {
        const systemTheme = media.matches ? 'dark' : 'light';
        theme.update(currentTheme => (currentTheme === systemTheme ? 'system' : currentTheme));
      }
  
      onMediaChange();
      media.addEventListener('change', onMediaChange);
  
      onDestroy(() => {
        media.removeEventListener('change', onMediaChange);
      });
    });
  </script>
  