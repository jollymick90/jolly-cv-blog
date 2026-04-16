<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    type?: 'note' | 'tip' | 'warn';
    children: Snippet;
  }

  let { type = 'note', children }: Props = $props();

  const config = {
    note: { border: 'border-tertiary', label: 'text-tertiary', text: 'NOTE' },
    tip:  { border: 'border-secondary', label: 'text-secondary', text: 'TIP' },
    warn: { border: 'border-error',     label: 'text-error',     text: 'WARN' },
  } as const;

  const c = $derived(config[type]);
</script>

<div class="my-6 bg-surface-container-low border-l-4 {c.border} px-4 py-3">
  <div class="text-[8px] font-label tracking-[0.2em] font-bold {c.label} mb-2">{c.text}</div>
  <div class="text-sm text-on-surface leading-relaxed">
    {@render children()}
  </div>
</div>
