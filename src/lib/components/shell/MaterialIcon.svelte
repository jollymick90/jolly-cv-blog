<script lang="ts">
  const { name, class: className = '' }: { name: string; class?: string } = $props();
</script>

<span class="material-symbols-outlined {className}" aria-hidden="true">{name}</span>
