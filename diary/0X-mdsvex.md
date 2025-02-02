
```
npm install @sveltejs/adapter-auto @sveltejs/kit mdsvex svelte-preprocess
```


```svelte

<h2>{post.metadata.title}</h2>
		<p>{post.metadata.date}</p>
		<!-- post.component è il contenuto markdown -->
		<svelte:component this={post.component} />
```
