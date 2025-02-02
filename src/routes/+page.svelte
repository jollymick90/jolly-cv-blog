<script lang="ts">
	import Container from '../components/Container.svelte';

	export let data;
	let config = data.config;
</script>

<svelte:head>
	<title>{config?.title ?? 'Landing Page'}</title>
</svelte:head>

<Container className="mt-9">
	<div class="max-w-2xl">
		<h1 class="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
			{config?.heading}
		</h1>
		<p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">
			{config?.description}
		</p>
		<div class="mt-6 flex gap-6">
			<a 
				href="#"
				class="group -m-1 p-1"
				>
				

			</a>
			

		</div>
	</div>
</Container>
