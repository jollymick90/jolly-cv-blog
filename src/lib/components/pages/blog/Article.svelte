<script lang="ts">
	import type { ArticleFormat } from '$lib/content/content';
	import {
		Card,
		CardTitle,
		CardEyebrow,
		CardDescription,
		CardCta
	} from '$lib/components/theme/card';
	import { langStore } from '$lib/i18n/lang.store';
	import { t } from '$lib/i18n';
	const lang = $derived($langStore);

	const { article }: { article: ArticleFormat } = $props();
</script>

<article class="md:grid md:grid-cols-4 md:items-baseline">
	<Card className="md:col-span-3">
		<CardTitle className="-inset-x-4 -inset-y-6 sm:-inset-x-6" href="/{lang}/blog/{article.slug}">
			{article.metadata.title}
		</CardTitle>
		<CardEyebrow className="md:hidden" decorate>
			{article.metadata.date}
		</CardEyebrow>
		<CardDescription>
			{article.metadata.description}
		</CardDescription>
		<CardCta>
			{$t('home.readarticle')}
		</CardCta>
	</Card>
	<CardEyebrow className="mt-1 hidden md:block">
		{article.metadata.date}
	</CardEyebrow>
</article>
