<script lang="ts">
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { icon: IconComponent, class: className = '', size = 20 } = $props<{
    icon: any;
    class?: string;
    size?: number;
  }>();
</script>

<svelte:component this={IconComponent} {size} class={className} aria-hidden="true" />
