<script lang="ts">
	import { t, locale } from '$lib/i18n';

	type Experiment = {
		slug: string;
		titleKey: string;
		descKey: string;
		accent: string;
	};

	const experiments: Experiment[] = [
		{
			slug: 'hand-runner',
			titleKey: 'playground.handRunner.title',
			descKey: 'playground.handRunner.cardDesc',
			accent: 'from-blue-500/20 to-purple-500/20'
		}
	];
</script>

<svelte:head>
	<title>{$t('playground.hub.title')}</title>
</svelte:head>

<section class="min-h-screen px-6 py-16 max-w-6xl mx-auto">
	<h1 class="text-4xl font-headline mb-2">{$t('playground.hub.title')}</h1>
	<p class="text-on-surface/70 mb-10">{$t('playground.hub.intro')}</p>

	<ul class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each experiments as exp (exp.slug)}
			<li>
				<a
					href={`/${$locale}/playground/${exp.slug}`}
					class="block p-6 rounded-2xl border border-white/10
						 bg-gradient-to-br {exp.accent}
						 hover:border-white/30 hover:scale-[1.02]
						 transition-transform"
				>
					<h2 class="text-xl font-headline mb-2">{$t(exp.titleKey)}</h2>
					<p class="text-sm text-on-surface/70">{$t(exp.descKey)}</p>
				</a>
			</li>
		{/each}
	</ul>
</section>