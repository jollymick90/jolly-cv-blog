<script lang="ts">
  import Reveal from "reveal.js";
  import Markdown from "reveal.js/plugin/markdown/markdown";
  import Highlight from "reveal.js/plugin/highlight/highlight";
  import Notes from "reveal.js/plugin/notes/notes";
  import { onMount } from "svelte";

  import "reveal.js/dist/reveal.css";
  import "reveal.js/dist/theme/black.css";
  import "reveal.js/plugin/highlight/monokai.css";
	import Esperienze from "./Settori.svelte";
	import AmbientiTecnologici from "./AmbientiTecnologici.svelte";
	import CosaCerco from "./CosaCerco.svelte";
	import CosaSoDiAwms from "./CosaSoDiAWMS.svelte";
  

  onMount(() => {
    const deck = new Reveal({
      autoAnimateEasing: "ease-out",
      autoAnimateDuration: 1,
      autoAnimateUnmatched: false,
      hash: true,
      controls: true,
      progress: true,
    });
    deck.initialize({
      plugins: [Markdown, Highlight, Notes],
    });
  });
</script>

<div class="reveal">
	<div class="slides">
		<section data-auto-animate data-background-color="rgb(70 233 255)">
			<h3>Ciao Sono Michele</h3>
		</section>
        <section data-auto-animate data-background-color="rgb(70 233 255)">
			<h3>Ciao Sono Michele</h3>
            <h3>sono un software engineer</h3>
		</section>
        <section data-auto-animate data-background-color="rgb(70 233 255)">
			<h3>Ciao Sono Michele</h3>
            <h3>sono un software engineer</h3>
            <h3>Full-stack developer</h3>
		</section>

        <section data-auto-animate data-background-color="rgb(70 233 255)">
			<h3>... un vero ...</h3>
            <h3 style="margin-top: 100px; color: mediumblue;">Full-stack developer</h3>
		</section>

        <Esperienze></Esperienze>
        <AmbientiTecnologici></AmbientiTecnologici>
        <CosaCerco></CosaCerco>
        <CosaSoDiAwms></CosaSoDiAwms>
	</div>
</div>

