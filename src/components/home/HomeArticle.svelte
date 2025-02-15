<script lang="ts">
	import type { ArticleFormat } from "../../content/content";
	import Card from "../core/card/Card.svelte";
	import CardEyebrow from "../core/card/CardEyebrow.svelte";
	import CardTitle from "../core/card/CardTitle.svelte";

    export let article: ArticleFormat;
</script>

<Card>
    <CardTitle href="{`/blog/${article.slug}`}">
        {article.metadata.title}
    </CardTitle>
    <CardEyebrow>
        {article.metadata.description}
    </CardEyebrow>
    {JSON.stringify(article.metadata)}
    {JSON.stringify(article.slug)}
</Card>