<script lang="ts">
  import { page } from '$app/state';

  let { data } = $props();
  const log = $derived(data.log);
  const lang = $derived(page.params.lang ?? 'en');

  let filter = $state<'ALL' | 'ARTICLE' | 'EVENT'>('ALL');

  const filtered = $derived(
    filter === 'ALL' ? log : log.filter((item: any) => item.type === filter)
  );

  function formatYear(dateStr: string): string {
    try {
      return new Date(dateStr).getFullYear().toString();
    } catch {
      return '—';
    }
  }
</script>

<svelte:head>
  <title>COMMUNITY — Log</title>
</svelte:head>

<div class="px-4 md:px-12 lg:px-24 max-w-7xl mx-auto py-12">
  <div class="mb-12">
    <div class="inline-block px-2 py-1 mb-4 bg-surface-container-high border-l-2 border-tertiary">
      <span class="text-[10px] font-label font-bold tracking-[0.2em] text-tertiary uppercase">COMMUNITY_LOG</span>
    </div>
    <h2 class="font-headline text-4xl font-extrabold tracking-tighter text-primary mb-6">Community</h2>

    <!-- Filter -->
    <div class="flex gap-2">
      {#each (['ALL', 'ARTICLE', 'EVENT'] as const) as f (f)}
        <button
          onclick={() => (filter = f)}
          class="text-[10px] font-label px-3 py-1.5 tracking-widest font-bold transition-colors
            {filter === f ? 'bg-tertiary text-on-tertiary' : 'bg-surface-container text-secondary hover:bg-surface-container-high'}"
        >
          {f}
        </button>
      {/each}
    </div>
  </div>

  <div class="space-y-1">
    {#each filtered as item (item.slug)}
      {@const routeBase = item.type === 'ARTICLE' ? 'blog' : 'event'}
      <a
        href="/{lang}/{routeBase}/{item.slug}"
        class="grid grid-cols-1 md:grid-cols-[120px_1fr] group no-underline"
      >
        <div class="text-[10px] font-label py-6 opacity-40 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
          {item.metadata?.date ? formatYear(item.metadata.date) : '—'}
        </div>
        <div class="py-6 px-0 md:px-8 bg-surface-container-low border-l-2 border-transparent group-hover:border-tertiary group-hover:bg-surface-container transition-all">
          <div class="flex items-center gap-2 mb-1">
            <h4 class="font-bold text-on-surface group-hover:text-tertiary transition-colors font-headline">
              {item.metadata?.title ?? item.slug}
            </h4>
            <span class="text-[9px] font-label px-2 py-0.5 bg-surface-container-highest text-secondary font-bold tracking-widest">{item.type}</span>
          </div>
          {#if item.metadata?.description}
            <p class="text-sm text-secondary">{item.metadata.description}</p>
          {/if}
        </div>
      </a>
    {/each}

    {#if filtered.length === 0}
      <div class="py-12 text-center text-secondary text-sm font-label tracking-widest">NO_ENTRIES_FOUND</div>
    {/if}
  </div>
</div>
