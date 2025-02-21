<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/template/Header.svelte';
	let { children } = $props();
</script>

<div class="flex w-full">
	<div class="fixed inset-0 flex justify-center sm:px-8">
        <div class="flex w-full max-w-7xl lg:px-8">
          <div class="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" >
		  </div>
        </div>
      </div>
	  <div class="relative flex w-full flex-col">
	<Header></Header>
	<main class="flex-auto">
		{@render children()}
	</main>
</div>
</div>
