<script lang="ts">
	import Reveal from 'reveal.js';
	import Markdown from 'reveal.js/plugin/markdown/markdown';
	import Highlight from 'reveal.js/plugin/highlight/highlight';
	import Notes from 'reveal.js/plugin/notes/notes';
	import { onMount } from 'svelte';

	import 'reveal.js/dist/reveal.css';
	import 'reveal.js/dist/theme/black.css';
	import 'reveal.js/plugin/highlight/monokai.css';
	import Esperienze from './Settori.svelte';
	import AmbientiTecnologici from './AmbientiTecnologici.svelte';
	import CosaCerco from './CosaCerco.svelte';
	import CosaSoDiAwms from './CosaSoDiAWMS.svelte';
	import ChiSono from './ChiSono.svelte';

	onMount(() => {
		const deck = new Reveal({
			autoAnimateEasing: 'ease-out',
			autoAnimateDuration: 1,
			autoAnimateUnmatched: false,
			hash: true,
			controls: true,
			progress: true
		});
		deck.initialize({
			plugins: [Markdown, Highlight, Notes]
		});
	});
</script>

<div class="reveal">
	<div class="slides">
		<ChiSono></ChiSono>
		<Esperienze></Esperienze>
		<AmbientiTecnologici></AmbientiTecnologici>
		<CosaCerco></CosaCerco>
		<CosaSoDiAwms></CosaSoDiAwms>
		<section data-background-color="lightblue">			
			<p>Michele</p>
		</section>
	</div>
</div>
