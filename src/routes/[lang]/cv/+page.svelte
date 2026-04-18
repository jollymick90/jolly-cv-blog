<script lang="ts">
  import { ArrowLeft, Terminal } from 'lucide-svelte';
  import type { Profile } from '$lib/content/profile.d.ts';
  import { page } from '$app/stores';

  let { data }: { data: { profile: Profile } } = $props();
  const profile = $derived(data.profile);
  const lang = $derived($page.params.lang ?? 'en');
</script>

<svelte:head>
  <title>BIO — {profile.name}</title>
</svelte:head>

<div class="px-4 md:px-12 lg:px-24 max-w-7xl mx-auto py-12">

  <!-- Back to home -->
  <div class="mb-8">
    <a href="/{lang}" class="inline-flex items-center gap-2 text-[10px] font-label font-bold tracking-[0.2em] text-secondary uppercase hover:text-primary transition-colors">
      <ArrowLeft size={14} aria-hidden="true" />
      HOME
    </a>
  </div>

  <!-- Header -->
  <div class="mb-16">
    <div class="inline-block px-2 py-1 mb-4 bg-surface-container-high border-l-2 border-tertiary">
      <span class="text-[10px] font-label font-bold tracking-[0.2em] text-tertiary uppercase">BIO_LOG</span>
    </div>
    <h2 class="font-headline text-4xl font-extrabold tracking-tighter text-primary mb-3">{profile.name}</h2>
    <p class="text-secondary text-lg max-w-2xl leading-relaxed">{profile.bio}</p>
    <div class="mt-4 flex gap-4 text-[10px] font-label tracking-widest">
      <a href="mailto:{profile.contact.email}" class="text-tertiary hover:underline">{profile.contact.email}</a>
      <span class="text-outline">·</span>
      <span class="text-secondary">{profile.contact.city}</span>
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
    <!-- Left: Experiences -->
    <div>
      <div class="flex items-center gap-4 mb-8">
        <h3 class="font-headline text-sm font-bold tracking-[0.2em] text-primary uppercase">Experience</h3>
        <div class="h-px grow bg-outline-variant/20"></div>
      </div>
      <div class="space-y-1">
        {#each profile.experiences as exp (exp.id)}
          <div class="grid grid-cols-1 md:grid-cols-[120px_1fr] group">
            <div class="text-[10px] font-label py-6 opacity-40 group-hover:opacity-100 transition-opacity uppercase tracking-widest">{exp.period}</div>
            <div class="py-6 px-0 md:px-8 bg-surface-container-low border-l-2 border-transparent group-hover:border-tertiary group-hover:bg-surface-container transition-all">
              <div class="flex items-center gap-2 mb-1">
                <h4 class="font-bold text-on-surface font-headline">{exp.company}</h4>
                <span class="text-[9px] font-label px-2 py-0.5 bg-surface-container-highest text-secondary font-bold tracking-widest">{exp.label}</span>
              </div>
              <p class="text-sm text-secondary leading-relaxed">{exp.description}</p>
            </div>
          </div>
        {/each}
      </div>
    </div>

    <!-- Right: Stack + Certifications -->
    <div class="space-y-8">
      <!-- Stack -->
      <div class="p-6 bg-surface-container-lowest border border-outline-variant/10">
        <div class="flex items-center gap-2 mb-4">
          <Terminal size={20} class="text-tertiary" aria-hidden="true" />
          <h3 class="font-headline text-xs font-bold tracking-[0.3em] text-primary uppercase">Stack</h3>
        </div>
        <div class="flex flex-wrap gap-2">
          {#each profile.stack as tech (tech)}
            <span class="text-[10px] font-label px-2 py-1 bg-surface-container text-secondary tracking-widest border border-outline-variant/20">{tech}</span>
          {/each}
        </div>
      </div>

      <!-- Certifications -->
      <div>
        <div class="flex items-center gap-4 mb-6">
          <h3 class="font-headline text-xs font-bold tracking-[0.2em] text-primary uppercase">Certifications</h3>
          <div class="h-px grow bg-outline-variant/20"></div>
        </div>
        <div class="space-y-3">
          {#each profile.certifications as cert (cert.id)}
            <div class="p-4 bg-surface-container-low border-l-2 border-tertiary/30 hover:border-tertiary transition-colors">
              <p class="text-sm font-bold text-on-surface">{cert.content}</p>
              <p class="text-[10px] font-label text-tertiary mt-1 tracking-widest">{cert.date}</p>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>
