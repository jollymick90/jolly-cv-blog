<script lang="ts">
	import { t } from '$lib/i18n';
	import { langStore } from '$lib/i18n/lang.store';
	import type { ArticleFormat } from '$lib/content/content';
	import {
		Card,
		CardCta,
		CardDescription,
		CardEyebrow,
		CardTitle
	} from '$lib/components/theme/card';
	const lang = $derived($langStore);

	const { article }: { article: ArticleFormat } = $props();
</script>

<Card>
	<CardTitle 
		hoverHighlight={true}
		href="/{lang}/blog/{article.slug}">
		{article.metadata.title}
	</CardTitle>
	<CardEyebrow decorate>
		{article.metadata.date}
	</CardEyebrow>
	<CardDescription>
		{article.metadata.description}
	</CardDescription>
	<CardCta>{$t('home.readarticle')}</CardCta>
</Card>
