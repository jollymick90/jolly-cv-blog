<script lang="ts">
import type {
    ArticleFormat
} from "$lib/content/content";
import {
    Card,
    CardTitle,
    CardEyebrow,
    CardDescription,
    CardCta
} from "$lib/components/theme/card";

export let article: ArticleFormat;
</script>

<article class="md:grid md:grid-cols-4 md:items-baseline">
    <Card className="md:col-span-3">
        <CardTitle href="{`/blog/${article.slug}`}">
            {article.metadata.title}
        </CardTitle>
        <CardEyebrow
            className="md:hidden"
            decorate>
            {article.metadata.date}
        </CardEyebrow>
        <CardDescription>
            {article.metadata.description}
        </CardDescription>
        <CardCta>Leggi l'articolo</CardCta>
    </Card>
    <CardEyebrow
        className="mt-1 hidden md:block"
        >
        {article.metadata.date}
    </CardEyebrow>
</article>
