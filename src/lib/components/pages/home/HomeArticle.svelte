<script lang="ts">
	import type { ArticleFormat } from "$lib/content/content";
	import { 
        Card, 
        CardCta, 
        CardDescription, 
        CardEyebrow, 
        CardTitle
     } from "$lib/components/theme/card";

    export let article: ArticleFormat;
</script>

<Card>
    <CardTitle href="{`/blog/${article.slug}`}">
        {article.metadata.title}
    </CardTitle>
    <CardEyebrow decorate>
        {article.metadata.date}
    </CardEyebrow>
    <CardDescription>
        {article.metadata.description}
    </CardDescription>
    <CardCta>Leggi l'articolo</CardCta>
</Card>