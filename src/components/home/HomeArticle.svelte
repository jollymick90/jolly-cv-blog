<script lang="ts">
	import type { ArticleFormat } from "../../content/content";
	import Card from "../core/card/Card.svelte";
	import CardCta from "../core/card/CardCta.svelte";
	import CardDescription from "../core/card/CardDescription.svelte";
	import CardEyebrow from "../core/card/CardEyebrow.svelte";
	import CardTitle from "../core/card/CardTitle.svelte";

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