<script lang="ts" module>
	export type NavigationProps = {
		type: NavigationType;
		lang: LangAvailable;
	};
</script>

<script lang="ts">
	import type { ItemList } from '$lib/components/types/template';
	import MobileNavigation from '$lib/components/template/MobileNavigation.svelte';
	import DesktopNavigation from '$lib/components/template/DesktopNavigation.svelte';
	import type { LangAvailable, NavigationType } from '$lib/types';

	//export let type: 'mobile' | 'desktop' = 'mobile';
	const { type = 'mobile', lang = 'en' }: NavigationProps = $props();

	let itemsList: ItemList[] = [
		{
			title: 'Home',
			description: 'Get a bit panoramic of me',
			icon: 'M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z',
			href: `/${lang}/`
		},
		{
			title: 'Eventi',
			description: 'Speak directly to your customers',
			icon: 'M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59',
			href: `/${lang}/content`,
			disable: true
		},
		{
			title: 'Blog',
			description: "Your customers' data will be safe and secure",
			icon: 'M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a7.464 7.464 0 0 1-1.15 3.993m1.989 3.559A11.209 11.209 0 0 0 8.25 10.5a3.75 3.75 0 1 1 7.5 0c0 .527-.021 1.049-.064 1.565',
			href: `/${lang}/blog`
		},
		{
			title: 'Resume',
			description: "Your customers' data will be safe and secure",
			icon: 'M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a7.464 7.464 0 0 1-1.15 3.993m1.989 3.559A11.209 11.209 0 0 0 8.25 10.5a3.75 3.75 0 1 1 7.5 0c0 .527-.021 1.049-.064 1.565',
			href: `/${lang}/resume`
		}
	];
	let isOpen = false;

	function toggleMenu() {
		isOpen = !isOpen;
	}
</script>

<nav>
	{#if type == 'desktop'}
		<DesktopNavigation items={itemsList}></DesktopNavigation>
	{:else}
		<MobileNavigation items={itemsList}></MobileNavigation>
	{/if}
</nav>
