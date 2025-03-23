<script lang="ts">
    import { onMount } from 'svelte';
    import { currentBreakpoint } from '$lib/stores/breakpoint';
      
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
  
      updateBreakpoint();
      // Aggiunge il listener per l'evento resize
      window.addEventListener('resize', updateBreakpoint);
  
      return () => {
        window.removeEventListener('resize', updateBreakpoint);
      };
    });
  </script>
  
  <!-- <div>
    <p class="text-white">Il breakpoint corrente è: {$currentBreakpoint}</p>
  </div>
   -->