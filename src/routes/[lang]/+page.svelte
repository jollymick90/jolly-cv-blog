<script lang="ts">
	import { t } from '$lib/i18n';
	import Terminal from '$lib/components/Terminal.svelte';
</script>

<svelte:head>
	<title>{$t('home.title')}</title>
</svelte:head>

<main class="pt-12 pb-20 px-4 md:px-12 lg:px-24 max-w-8xl mx-auto">
	<!-- Hero Section with Terminal -->
	<section class="mb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
		<div>
			<div class="inline-block px-2 py-1 mb-6 bg-surface-container-high border-l-2 border-tertiary">
				<span class="text-[10px] font-label font-bold tracking-[0.2em] text-tertiary uppercase">ARCHITECT_LOG_01</span>
			</div>
			
			<h2 class="font-headline text-5xl md:text-7xl font-extrabold tracking-tight text-primary leading-none mb-8">
				Engineering Solutions<br/><span class="text-surface-bright">at Scale.</span>
			</h2>
			
			<p class="text-secondary leading-relaxed text-lg max-w-lg mb-8 font-body">
				Michele Scarpa. Senior Software Engineer con 10 anni di esperienza, specializzato in sistemi GIS enterprise e soluzioni AI agentiche.
			</p>
			
			<div class="flex flex-col gap-2 p-4 bg-surface-container-low border border-outline-variant/15 w-full max-w-lg">
				<div class="flex justify-between items-center text-xs font-label tracking-widest opacity-50">
					<span>UPTIME</span>
					<span>3650_DAYS+</span>
				</div>
				<div class="h-1 w-full bg-surface-container-highest">
					<div class="h-full bg-tertiary w-full"></div>
				</div>
				<div class="flex justify-between items-center text-[10px] font-label text-tertiary">
					<span>SENIOR_LEVEL</span>
					<span>SYSTEM_STABLE</span>
				</div>
			</div>
		</div>

		<!-- Terminal Container -->
		<div class="h-[400px] lg:h-[450px]">
			<Terminal />
		</div>
	</section>

	<!-- Esperienza Recente (Timeline) -->
	<section class="mb-24">
		<div class="flex items-center gap-4 mb-12">
			<h3 class="font-headline text-xl font-bold tracking-widest text-primary uppercase">Esperienza Recente</h3>
			<div class="h-px grow bg-outline-variant/20"></div>
		</div>
		
		<div class="space-y-4">
			<!-- Startup 2026 -->
			<div class="block p-6 bg-surface-container-low hover:bg-surface-container group transition-all border-l-4 border-transparent hover:border-tertiary">
				<div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
					<div>
						<div class="flex items-center gap-3 mb-1">
							<span class="text-xl font-bold text-on-surface group-hover:text-tertiary transition-colors font-headline">Startup Engineer (2026)</span>
							<span class="text-[9px] font-label px-2 py-0.5 bg-tertiary text-on-tertiary font-bold tracking-widest uppercase">Current</span>
						</div>
						<p class="text-sm text-secondary/80 mt-2 max-w-3xl leading-relaxed">
							Sviluppo di infrastrutture cloud su AWS tramite codice Terraform. Esecuzione di performance testing avanzato col framework k6. 
							Pieno coinvolgimento nell'integrazione di chatbot vocali basati sulle API di OpenAI per migliorare l'esperienza e i processi B2C.
						</p>
					</div>
				</div>
			</div>
			
			<!-- Dog Diet Calculator -->
			<div class="block p-6 bg-surface-container-low hover:bg-surface-container group transition-all border-l-4 border-transparent hover:border-tertiary">
				<div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
					<div>
						<div class="flex items-center gap-3 mb-1">
							<span class="text-xl font-bold text-on-surface group-hover:text-tertiary transition-colors font-headline">Dog Diet Calculator</span>
							<span class="text-[9px] font-label px-2 py-0.5 border border-tertiary text-tertiary font-bold tracking-widest uppercase">AI AUTOMATION</span>
						</div>
						<p class="text-sm text-secondary/80 mt-2 max-w-3xl leading-relaxed">
							Applicazione sviluppata interamente in ottica "agentic", sfruttando attivamente Claude Code per autogenerare ed eseguire la logica di calcolo complessa delle diete nutrizionali ad uso veterinario.
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Projects Grid -->
	<section class="mb-24">
		<div class="flex items-center gap-4 mb-12">
			<h3 class="font-headline text-xl font-bold tracking-widest text-primary uppercase">Griglia Progetti</h3>
			<div class="h-px grow bg-outline-variant/20"></div>
		</div>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			<a class="block p-6 bg-surface-container-low hover:bg-surface-container group transition-all border-l-4 border-transparent hover:border-tertiary" href="#">
				<div class="flex flex-col justify-between h-full gap-4">
					<div>
						<div class="flex items-center gap-3 mb-2">
							<span class="text-lg font-bold text-on-surface group-hover:text-tertiary transition-colors font-headline">VeneziaSpatial_v4.0</span>
							<span class="text-[9px] font-label px-2 py-0.5 bg-tertiary text-on-tertiary font-bold tracking-tighter">LIVE</span>
						</div>
						<p class="text-xs text-secondary/60">Enterprise real estate GIS platform managing 10k+ spatial nodes with real-time sync.</p>
					</div>
				</div>
			</a>
			<a class="block p-6 bg-surface-container-low hover:bg-surface-container group transition-all border-l-4 border-transparent hover:border-tertiary" href="#">
				<div class="flex flex-col justify-between h-full gap-4">
					<div>
						<div class="flex items-center gap-3 mb-2">
							<span class="text-lg font-bold text-on-surface group-hover:text-tertiary transition-colors font-headline">Core_Engine_Rust</span>
							<span class="text-[9px] font-label px-2 py-0.5 border border-outline-variant text-outline-variant font-bold tracking-tighter">PRIVATE REPO</span>
						</div>
						<p class="text-xs text-secondary/60">High-performance data transformation engine for legacy-to-modern database migrations.</p>
					</div>
				</div>
			</a>
			<a class="block p-6 bg-surface-container-low hover:bg-surface-container group transition-all border-l-4 border-transparent hover:border-tertiary" href="#">
				<div class="flex flex-col justify-between h-full gap-4">
					<div>
						<div class="flex items-center gap-3 mb-2">
							<span class="text-lg font-bold text-on-surface group-hover:text-tertiary transition-colors font-headline">BacaroOS_Platform</span>
							<span class="text-[9px] font-label px-2 py-0.5 border border-tertiary text-tertiary font-bold tracking-tighter">V1.2.0</span>
						</div>
						<p class="text-xs text-secondary/60">Community management infrastructure built for speed and distributed collaboration.</p>
					</div>
				</div>
			</a>
			<a class="block p-6 bg-surface-container-low hover:bg-surface-container group transition-all border-l-4 border-transparent hover:border-tertiary" href="#">
				<div class="flex flex-col justify-between h-full gap-4">
					<div>
						<div class="flex items-center gap-3 mb-2">
							<span class="text-lg font-bold text-on-surface group-hover:text-tertiary transition-colors font-headline">AI_Proxy_Gateway</span>
							<span class="text-[9px] font-label px-2 py-0.5 bg-surface-container-highest text-secondary font-bold tracking-tighter">BETA</span>
						</div>
						<p class="text-xs text-secondary/60">Token-throttled API gateway for managing multiple LLM provider costs and fallbacks.</p>
					</div>
				</div>
			</a>
		</div>
	</section>

	<!-- Skills Grid (Solid Foundation vs Modern Stack) -->
	<section class="mb-24">
		<div class="flex items-center gap-4 mb-12">
			<h3 class="font-headline text-xl font-bold tracking-widest text-primary uppercase">Skills Matrix</h3>
			<div class="h-px grow bg-outline-variant/20"></div>
		</div>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-1">
			<!-- Solid Foundation -->
			<div class="p-8 bg-surface-container hover:bg-surface-container-high transition-colors group">
				<span class="material-symbols-outlined text-tertiary mb-6 block text-4xl" data-icon="explore">explore</span>
				<h4 class="text-lg font-bold text-on-surface mb-3 font-headline">Solid Foundation</h4>
				<p class="text-sm text-secondary/80 mb-6 font-body">Basi solide e architetture scalabili per contesti enterprise.</p>
				<ul class="space-y-2 text-[11px] font-label tracking-wider text-on-surface-variant font-bold">
					<li class="flex items-center gap-2"><span class="w-1.5 h-1.5 bg-tertiary"></span> JAVA / SPRING</li>
					<li class="flex items-center gap-2"><span class="w-1.5 h-1.5 bg-tertiary"></span> ANGULAR / REACT</li>
					<li class="flex items-center gap-2"><span class="w-1.5 h-1.5 bg-tertiary"></span> ENTERPRISE GIS (POSTGIS)</li>
				</ul>
			</div>
			
			<!-- Modern Stack -->
			<div class="p-8 bg-surface-container-low hover:bg-surface-container-high transition-colors group">
				<span class="material-symbols-outlined text-tertiary mb-6 block text-4xl" data-icon="smart_toy">smart_toy</span>
				<h4 class="text-lg font-bold text-on-surface mb-3 font-headline">Modern Stack & AI</h4>
				<p class="text-sm text-secondary/80 mb-6 font-body">Le tecnologie cutting-edge per rapid prototyping e automazione spinta.</p>
				<ul class="space-y-2 text-[11px] font-label tracking-wider text-on-surface-variant font-bold">
					<li class="flex items-center gap-2"><span class="w-1.5 h-1.5 bg-tertiary"></span> SVELTEKIT / TAILWIND CSS</li>
					<li class="flex items-center gap-2"><span class="w-1.5 h-1.5 bg-tertiary"></span> AI AUTOMATION</li>
					<li class="flex items-center gap-2"><span class="w-1.5 h-1.5 bg-tertiary"></span> CLAUDE CODE & CURSOR</li>
				</ul>
			</div>
		</div>
	</section>

	<!-- Community & Talks -->
	<section class="mb-24 relative">
		<div class="flex items-center gap-4 mb-12">
			<h3 class="font-headline text-xl font-bold tracking-widest text-primary uppercase">Community Builders</h3>
			<div class="h-px grow bg-outline-variant/20"></div>
		</div>
		
		<div class="space-y-1">
			<div class="grid grid-cols-1 md:grid-cols-[140px_1fr] group">
				<div class="text-[10px] font-label py-6 opacity-40 group-hover:opacity-100 transition-opacity uppercase tracking-widest font-bold">Founder</div>
				<div class="py-6 px-0 md:px-8 bg-surface-container-low border-l-2 border-transparent group-hover:border-tertiary group-hover:bg-surface-container transition-all">
					<h4 class="font-bold text-tertiary mb-1 font-headline">Co-founder, BacaroTech</h4>
					<p class="text-sm text-secondary font-body">Promozione attiva e co-fondazione di BacaroTech, collettivo dedicato ad accelerare lo sviluppo tech in laguna e aggregare l'esperienza di molteplici professionisti del settore.</p>
				</div>
			</div>
			
			<div class="grid grid-cols-1 md:grid-cols-[140px_1fr] group">
				<div class="text-[10px] font-label py-6 opacity-40 group-hover:opacity-100 transition-opacity uppercase tracking-widest font-bold">DevRel</div>
				<div class="py-6 px-0 md:px-8 bg-surface-container-low border-l-2 border-transparent group-hover:border-tertiary group-hover:bg-surface-container transition-all">
					<h4 class="font-bold text-on-surface mb-1 font-headline">DevRel & GDG Speaker</h4>
					<p class="text-sm text-secondary font-body">Speaker abituale presso Google Developer Groups, dove condivido pratiche su SvelteKit, ottimizzazioni agentiche e metodologie Frontend avanzate.</p>
				</div>
			</div>
		</div>
	</section>
</main>
