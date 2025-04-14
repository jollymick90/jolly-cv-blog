// export const prerender = false;
export const prerender = true;

export async function load({ params }) {
  
  const { slug } = params;

  try {
    const post = await import(`../../../../content/blog/${slug}.md`);

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
