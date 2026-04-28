<script lang="ts">
	import { onMount } from 'svelte';
	import { t } from '$lib/i18n';
	import {
		createHandRunner,
		type HandRunnerHandle,
		type HandRunnerMode
	} from '$lib/playground/hand-runner/dogut';
	import { immersive } from '$lib/stores/immersive.store';

	let sceneContainer = $state<HTMLDivElement | null>(null);
	let videoElement = $state<HTMLVideoElement | null>(null);
	let started = $state(false);
	let starting = $state(false);
	let errorKey = $state<string | null>(null);
	let score = $state(0);
	let speed = $state(5);
	let handTrackingAvailable = $state(false);
	let mode = $state<HandRunnerMode>('manual');

	let handle: HandRunnerHandle | null = null;

	onMount(() => {
		function onKey(e: KeyboardEvent) {
			if (!handle) return;
			switch (e.code) {
				case 'ArrowLeft':
					e.preventDefault();
					handle.clickLeft();
					break;
				case 'ArrowRight':
					e.preventDefault();
					handle.clickRight();
					break;
				case 'ArrowUp':
					e.preventDefault();
					handle.clickUp();
					break;
				case 'ArrowDown':
					e.preventDefault();
					handle.clickDown();
					break;
			}
		}
		window.addEventListener('keydown', onKey);
		return () => {
			window.removeEventListener('keydown', onKey);
			handle?.dispose();
			handle = null;
			immersive.set(false);
		};
	});

	async function handleStart() {
		if (started || starting) return;
		if (!sceneContainer || !videoElement) return;
		starting = true;
		errorKey = null;
		handle = createHandRunner({
			sceneContainer,
			videoElement,
			onUpdate: ({ score: s, speed: sp }) => {
				score = s;
				speed = sp;
			},
			onTrackingChange: (available) => {
				handTrackingAvailable = available;
				mode = available ? 'hand' : 'manual';
			}
		});
		try {
			await handle.start();
			started = true;
			immersive.set(true);
		} catch (e) {
			console.error('Error starting Hand Runner:', e);
			const isPermission = e instanceof DOMException && e.name === 'NotAllowedError';
			errorKey = isPermission
				? 'playground.handRunner.errorCamera'
				: 'playground.handRunner.errorGeneric';
			handle.dispose();
			handle = null;
		} finally {
			starting = false;
		}
	}

	function toggleMode() {
		if (!handle || !handTrackingAvailable) return;
		const next: HandRunnerMode = mode === 'hand' ? 'manual' : 'hand';
		handle.setMode(next);
		mode = next;
	}
</script>

<svelte:head>
	<title>{$t('playground.handRunner.title')}</title>
</svelte:head>

<div class="relative h-screen w-full overflow-hidden bg-black">
	<div bind:this={sceneContainer} class="absolute inset-0" aria-hidden="true"></div>

	<video
		bind:this={videoElement}
		class="absolute top-4 right-4 w-48 aspect-video rounded-lg border border-white/20 shadow-lg z-10 {started &&
		mode === 'hand'
			? ''
			: 'hidden'}"
		playsinline
		muted
	></video>

	{#if started}
		<div
			class="absolute top-4 left-4 z-10 px-3 py-2 rounded-lg bg-black/50 backdrop-blur-sm
             text-white font-mono text-sm space-y-1 border border-white/10"
		>
			<div>{$t('playground.handRunner.score')}: {score}</div>
			<div class="flex items-center gap-2">
				<span>{$t('playground.handRunner.speed')}: {speed}</span>
				<button
					type="button"
					aria-label="Decrease speed"
					onclick={() => handle?.decrementSpeed()}
					class="w-6 h-6 rounded bg-white/10 hover:bg-white/20 active:bg-white/30 border border-white/20 flex items-center justify-center text-sm leading-none touch-manipulation"
				>
					−
				</button>
				<button
					type="button"
					aria-label="Increase speed"
					onclick={() => handle?.incrementSpeed()}
					class="w-6 h-6 rounded bg-white/10 hover:bg-white/20 active:bg-white/30 border border-white/20 flex items-center justify-center text-sm leading-none touch-manipulation"
				>
					+
				</button>
			</div>
			{#if handTrackingAvailable}
				<button
					type="button"
					onclick={toggleMode}
					aria-pressed={mode === 'hand'}
					class="mt-1 w-full px-2 py-1 rounded bg-white/10 hover:bg-white/20 active:bg-white/30
                 border border-white/20 text-xs flex items-center justify-center gap-1
                 touch-manipulation"
				>
					<span aria-hidden="true">{mode === 'hand' ? '✋' : '⌨'}</span>
					<span>{mode === 'hand' ? 'Hand' : 'Manual'}</span>
				</button>
			{/if}
			<div class="text-xs text-white/70 max-w-[12rem] leading-snug pt-1">
				{$t('playground.handRunner.objective')}
			</div>
			<button
				type="button"
				onclick={() => handle?.restart()}
				class="mt-1 w-full px-2 py-1 rounded bg-white/10 hover:bg-white/20 active:bg-white/30
                 border border-white/20 text-xs flex items-center justify-center gap-1
                 touch-manipulation"
			>
				<span aria-hidden="true">↻</span>
				<span>{$t('playground.handRunner.restart')}</span>
			</button>
		</div>

		<button
			type="button"
			onclick={() => immersive.update((v) => !v)}
			aria-label={$immersive ? 'Show navigation' : 'Hide navigation'}
			aria-pressed={!$immersive}
			class="absolute right-4 top-1/2 -translate-y-1/2 z-[60] w-11 h-11 rounded-full
             bg-black/60 backdrop-blur-sm border border-white/20 text-white text-lg
             flex items-center justify-center active:bg-white/20 touch-manipulation"
		>
			{$immersive ? '☰' : '✕'}
		</button>

		<div class="md:hidden absolute bottom-24 left-1/2 -translate-x-1/2 z-10 select-none">
			<div class="grid grid-cols-3 gap-2 w-48">
				<div></div>
				<button
					type="button"
					aria-label="Up"
					class="aspect-square rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-2xl flex items-center justify-center active:bg-white/30 touch-manipulation"
					onpointerdown={(e) => {
						e.preventDefault();
						handle?.clickUp();
					}}
				>
					↑
				</button>
				<div></div>
				<button
					type="button"
					aria-label="Left"
					class="aspect-square rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-2xl flex items-center justify-center active:bg-white/30 touch-manipulation"
					onpointerdown={(e) => {
						e.preventDefault();
						handle?.clickLeft();
					}}
				>
					←
				</button>
				<div></div>
				<button
					type="button"
					aria-label="Right"
					class="aspect-square rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-2xl flex items-center justify-center active:bg-white/30 touch-manipulation"
					onpointerdown={(e) => {
						e.preventDefault();
						handle?.clickRight();
					}}
				>
					→
				</button>
				<div></div>
				<button
					type="button"
					aria-label="Down"
					class="aspect-square rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-2xl flex items-center justify-center active:bg-white/30 touch-manipulation"
					onpointerdown={(e) => {
						e.preventDefault();
						handle?.clickDown();
					}}
				>
					↓
				</button>
				<div></div>
			</div>
		</div>
	{/if}

	{#if !started}
		<div
			class="absolute inset-0 z-20 flex items-center justify-center
             bg-black/60 backdrop-blur-sm px-4"
		>
			<div
				class="max-w-md w-full bg-surface-container/90 text-on-surface
               p-6 rounded-2xl border border-white/20 shadow-2xl space-y-4"
			>
				<h1 class="text-2xl font-headline">
					{$t('playground.handRunner.title')}
				</h1>
				<p class="text-sm opacity-80">
					{$t('playground.handRunner.intro')}
				</p>
				<div class="space-y-1">
					<h2 class="text-sm font-semibold">
						{$t('playground.handRunner.controlsHeading')}
					</h2>
					<ul class="text-xs opacity-70 space-y-0.5 list-disc list-inside">
						<li>{$t('playground.handRunner.controlHand')}</li>
						<li>{$t('playground.handRunner.controlArrows')}</li>
						<li>{$t('playground.handRunner.controlS')}</li>
						<li>{$t('playground.handRunner.controlAD')}</li>
						<li>{$t('playground.handRunner.controlR')}</li>
					</ul>
				</div>
				<button
					onclick={handleStart}
					disabled={starting}
					class="w-full px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500
                 disabled:opacity-60 disabled:cursor-not-allowed
                 text-white font-medium transition"
				>
					{starting ? $t('playground.handRunner.loading') : $t('playground.handRunner.start')}
				</button>
				{#if errorKey}
					<p class="text-sm text-red-400">{$t(errorKey)}</p>
				{/if}
			</div>
		</div>
	{/if}
</div>
