<script lang="ts">
	import { Card, CardTitle } from '$lib/components/theme/card';
	import type { ProjectFormat } from '$lib/content/content';
	import { langStore } from '$lib/i18n/lang.store';

	const lang = $derived($langStore);
	const { project }: { project: ProjectFormat } = $props();
</script>

<article class="md:grid md:grid-cols-4 md:items-baseline">
	<Card className="md:col-span-3">
		<CardTitle href="/{lang}/project/{project.slug}">
			{project.metadata.title}
		</CardTitle>
	</Card>
</article>
