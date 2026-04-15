<script lang="ts">
  import { page } from '$app/state';
  import MaterialIcon from '$lib/components/shell/MaterialIcon.svelte';
  import type { ProfileProject, ProjectStatus } from '$lib/content/profile.d.ts';

  let { data }: { data: { projects: ProfileProject[] } } = $props();
  const { projects } = data;
  const lang = $derived(page.params.lang ?? 'en');

  function badgeClass(status: ProjectStatus): string {
    switch (status) {
      case 'LIVE': return 'bg-tertiary text-on-tertiary';
      case 'BETA': return 'bg-surface-container-highest text-secondary';
      case 'PRIVATE': return 'border border-outline-variant text-outline-variant';
      case 'ARCHIVE': return 'border border-outline-variant/50 text-outline-variant/50';
    }
  }

  function badgeIcon(status: ProjectStatus): string {
    switch (status) {
      case 'LIVE': return 'arrow_forward';
      case 'BETA': return 'bolt';
      case 'PRIVATE': return 'lock';
      case 'ARCHIVE': return 'history';
    }
  }
</script>

<svelte:head>
  <title>DEPLOYS — Projects</title>
</svelte:head>

<div class="px-4 md:px-12 lg:px-24 max-w-7xl mx-auto py-12">
  <div class="flex items-center justify-between mb-12">
    <div>
      <div class="inline-block px-2 py-1 mb-4 bg-surface-container-high border-l-2 border-tertiary">
        <span class="text-[10px] font-label font-bold tracking-[0.2em] text-tertiary uppercase">DEPLOY_LOG</span>
      </div>
      <h2 class="font-headline text-4xl font-extrabold tracking-tighter text-primary">Works</h2>
    </div>
    <span class="text-[10px] font-label text-tertiary tracking-[0.2em]">{String(projects.length).padStart(2, '0')}_ACTIVE_NODES</span>
  </div>

  <div class="space-y-4">
    {#each projects as project (project.id)}
      <a
        href="/{lang}/project/{project.slug}"
        class="block p-6 bg-surface-container-low hover:bg-surface-container group transition-all border-l-4 border-transparent hover:border-tertiary"
      >
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-3 mb-1">
              <span class="text-lg font-bold text-on-surface group-hover:text-tertiary transition-colors">{project.title}</span>
              <span class="text-[9px] font-label px-2 py-0.5 font-bold tracking-tighter {badgeClass(project.status)}">{project.status}</span>
            </div>
            <p class="text-xs text-secondary/60 mb-2">{project.description}</p>
            <div class="flex gap-2 flex-wrap">
              {#each project.tags as tag (tag)}
                <span class="text-[9px] font-label px-2 py-0.5 bg-surface-container text-on-surface-variant tracking-widest">{tag}</span>
              {/each}
            </div>
          </div>
          <MaterialIcon name={badgeIcon(project.status)} class="text-outline-variant group-hover:text-tertiary transition-colors shrink-0" />
        </div>
      </a>
    {/each}
  </div>
</div>
