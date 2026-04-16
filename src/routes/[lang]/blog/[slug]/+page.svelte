<script lang="ts">
  import ArticleLayout from '$lib/components/blog/ArticleLayout.svelte';

  let { data } = $props();
  const Content = $derived(data.content);
</script>

<ArticleLayout
  metadata={data.metadata}
  readingTime={data.readingTime}
  lang={data.lang}
  prev={data.prev}
  next={data.next}
>
  <Content />
</ArticleLayout>
