export const prerender = false;

export async function load({ params }) {
  console.log("Load slug blog")
  const { slug } = params;

  try {
    const post = await import(`../../../content/blog/${slug}.md`);

    return {
      metadata: post.metadata,
      content: post.default
    };
  } catch (e) {
    console.error(e);
    return {
      status: 404,
      error: new Error('Post non trovato')
    };
  }
}
