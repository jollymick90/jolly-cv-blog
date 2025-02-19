<script lang="ts">
	import Avatar from './Avatar.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	import Container from './Container.svelte';
	import Navigation from './Navigation.svelte';
	import ThemeToggle from './ThemeToggle.svelte';

	let isHomePage: boolean;

	let headerRef: HTMLDivElement;
	let avatarRef: HTMLDivElement;

	let isInitial = true;

	$: isHomePage = $page.url.pathname === '/';

	function clamp(number: number, a: number, b: number) {
		let min = Math.min(a, b);
		let max = Math.max(a, b);
		return Math.min(Math.max(number, min), max);
	}

	function setProperty(property: string, value: string) {
		console.log("---setProperty", property, value)
		document.documentElement.style.setProperty(property, value);
	}

	function removeProperty(property: string) {
		document.documentElement.style.removeProperty(property);
	}

	function updateHeaderStyles() {
		//@ts-ignore
		if (!headerRef) return;
		//@ts-ignore
		const downDelay = avatarRef?.offsetTop ?? 0;
		const upDelay = 64;
		const { top, height } = headerRef.getBoundingClientRect();
		const scrollY = clamp(
			window.scrollY,
			 0,
			  document.body.scrollHeight - window.innerHeight);

		if (isInitial) {
			setProperty('--header-position', 'sticky');
		}
		setProperty('--content-offset', `${downDelay}px`);

		if (isInitial || scrollY < downDelay) {
			setProperty('--header-height', `${downDelay + height}px`);
			setProperty('--header-mb', `${-downDelay}px`);
		} else if (top + height < -upDelay) {
			const offset = Math.max(height, scrollY - upDelay);
			setProperty('--header-height', `${offset}px`);
			setProperty('--header-mb', `${height - offset}px`);
		} else if (top === 0) {
			setProperty('--header-height', `${scrollY + height}px`);
			setProperty('--header-mb', `${-scrollY}px`);
		}

		if (top === 0 && scrollY > 0 && scrollY >= downDelay) {
			setProperty('--header-inner-position', 'fixed');
			removeProperty('--header-top');
			removeProperty('--avatar-top');
		} else {
			removeProperty('--header-inner-position');
			setProperty('--header-top', '0px');
			setProperty('--avatar-top', '0px');
		}
	}

	function updateAvatarStyles() {
		//@ts-ignore
		if (!isHomePage && !avatarRef) return;
		//@ts-ignore
		const downDelay = avatarRef?.offsetTop ?? 0;
		const fromScale = 1;
		const toScale = 36 / 64;
		const fromX = 0;
		const toX = 2 / 16;
		const scrollY = downDelay - window.scrollY;

		let scale = (scrollY * (fromScale - toScale)) / downDelay + toScale;
		scale = clamp(scale, fromScale, toScale);

		let x = (scrollY * (fromX - toX)) / downDelay + toX;
		x = clamp(x, fromX, toX);
		
		setProperty('--avatar-image-transform', 
		`translate3d(${x}rem, 0, 0) scale(${scale})`);

		const borderScale = 1 / (toScale / scale);
		const borderX = (-toX + x) * borderScale;
		const borderTransform = `translate3d(${borderX}rem, 0, 0) scale(${borderScale})`;
		setProperty('--avatar-border-transform', borderTransform);
		setProperty('--avatar-border-opacity', scale === toScale ? '1' : '0');
	}

	function updateStyles() {
		updateHeaderStyles();
		updateAvatarStyles();
		isInitial = false;
	}

	onMount(() => {
		updateStyles();
		window.addEventListener('scroll', updateStyles, { passive: true });
		window.addEventListener('resize', updateStyles);
		return () => {
			window.removeEventListener('scroll', updateStyles);
			window.removeEventListener('resize', updateStyles);
		};
	});
</script>

<header
	class="pointer-events-none relative z-50 flex flex-none flex-col"
	style="height: var(--header-height); margin-bottom: var(--header-mb);"
>
	{#if isHomePage}
		
		<div
			bind:this={avatarRef}
			class="order-last mt-[calc(theme(spacing.16)-theme(spacing.3))]"
		></div>
		<Container
			className="top-0 order-last -mb-3 pt-3"
			style="position: var(--header-position);"
		>
			<div
				class="top-[var(--avatar-top,theme(spacing.3))] w-full"
				style="position: var(--header-inner-position);"
			>
				<div class="relative">
					<div
						class="absolute left-0 top-3 origin-left transition-opacity
						h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg
						shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10"
						style="opacity: var(--avatar-border-opacity, 0); transform: var(--avatar-border-transform);"
					></div>
					<Avatar
						large
						className="block h-16 w-16 origin-left"
						styleTransform="transform: var(--avatar-image-transform);"
					></Avatar>
					
				</div>
			</div>
		</Container>
	{/if}
	<div bind:this={headerRef} class="top-0 z-10 h-16 pt-6" style="position: var(--header-position);">
		<Container
			className="sm:px-8 top-[var(--header-top,theme(spacing.6))] w-full"
			style="position: var(--header-inner-position);"
		>
			<div class="relative flex gap-4">
				<div class="flex flex-1">
					{#if !isHomePage}
						<div
						class="h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg
						shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10"
						>
							<Avatar />
						</div>
					{/if}
				</div>
				<div class="white flex flex-1 justify-end md:justify-center">
					<div class="pointer-events-auto md:hidden">
					
						<Navigation type='mobile'/>
						
					</div>
					<div class="pointer-events-auto hidden md:block">
						
						
						<Navigation type='desktop'/>
						
						
					</div>
					<!-- <MobileNavigation class="pointer-events-auto md:hidden" />
			  <DesktopNavigation class="pointer-events-auto hidden md:block" /> -->
				</div>
				<div class="flex justify-end md:flex-1">
					<div class="pointer-events-auto">
						<ThemeToggle />
					</div>
				</div>
			</div>
		</Container>
	</div>
</header>

{#if isHomePage}
	<div class="flex-none" style="height: var(--content-offset);"></div>
{/if}
