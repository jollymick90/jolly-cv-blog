<script lang="ts">
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
  
    // Creiamo uno store per salvare il breakpoint corrente
    export const currentBreakpoint = writable('');
  
    // Definiamo i breakpoint in base alla configurazione di Tailwind
    const breakpoints = {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536,
    };
  
    onMount(() => {
      // La funzione updateBreakpoint è definita solo in ambiente browser
      function updateBreakpoint() {
        const width = window.innerWidth;
        if (width >= breakpoints['2xl']) {
          currentBreakpoint.set('2xl');
        } else if (width >= breakpoints.xl) {
          currentBreakpoint.set('xl');
        } else if (width >= breakpoints.lg) {
          currentBreakpoint.set('lg');
        } else if (width >= breakpoints.md) {
          currentBreakpoint.set('md');
        } else if (width >= breakpoints.sm) {
          currentBreakpoint.set('sm');
        } else {
          currentBreakpoint.set('xs');
        }
      }
  
      // Inizializza il breakpoint al montaggio del componente
      updateBreakpoint();
      // Aggiunge il listener per l'evento resize
      window.addEventListener('resize', updateBreakpoint);
  
      // Ritorna una funzione di cleanup che rimuove il listener quando il componente viene distrutto
      return () => {
        window.removeEventListener('resize', updateBreakpoint);
      };
    });
  </script>
  
  <!-- Esempio di utilizzo -->
  <div>
    <p class="text-white">Il breakpoint corrente è: {$currentBreakpoint}</p>
  </div>
  