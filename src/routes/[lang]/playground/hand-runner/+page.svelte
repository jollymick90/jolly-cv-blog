<script lang="ts">
	import { onMount } from 'svelte';
	import { t } from '$lib/i18n';
	import { createHandRunner, type HandRunnerHandle } from '$lib/playground/hand-runner/dogut';

	let sceneContainer = $state<HTMLDivElement | null>(null);
	let videoElement = $state<HTMLVideoElement | null>(null);
	let started = $state(false);
	let starting = $state(false);
	let errorKey = $state<string | null>(null);
	let score = $state(0);
	let speed = $state(5);

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
			}
		});
		try {
			await handle.start();
			started = true;
		} catch (e) {
			const isPermission = (e as DOMException)?.name === 'NotAllowedError';
			errorKey = isPermission
				? 'playground.handRunner.errorCamera'
				: 'playground.handRunner.errorGeneric';
			handle.dispose();
			handle = null;
		} finally {
			starting = false;
		}
	}
</script>

<svelte:head>
	<title>{$t('playground.handRunner.title')}</title>
</svelte:head>

<div class="relative h-screen w-full overflow-hidden bg-black">
	<div bind:this={sceneContainer} class="absolute inset-0"></div>

	<video
		bind:this={videoElement}
		class="absolute top-4 right-4 w-48 aspect-video rounded-lg border border-white/20 shadow-lg z-10 {started
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
			<div>{$t('playground.handRunner.speed')}: {speed}</div>
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
