<script lang="ts">
	import { Card, CardTitle } from '$lib/components/theme/card';
	import type { EventFormat } from '$lib/content/content';
	import { langStore } from '$lib/i18n/lang.store';

	const lang = $derived($langStore);
	const { event }: { event: EventFormat } = $props();
	
</script>

<article class="md:grid md:grid-cols-4 md:items-baseline">
	<Card className="md:col-span-3">
		<CardTitle href="/{lang}/speaker/{event.slug}">
			{event.metadata.title}
		</CardTitle>
	</Card>
</article>
