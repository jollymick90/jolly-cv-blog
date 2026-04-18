<script lang="ts">
  import type { Component } from 'svelte';

  const { icon: IconComponent, class: className = '', size = 20 } = $props<{
    icon: Component;
    class?: string;
    size?: number;
  }>();
</script>

<svelte:component this={IconComponent} {size} class={className} aria-hidden="true" />
