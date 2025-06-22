<script lang="ts" module>
	export type NavigationProps = {
		type: NavigationType;
		lang: LangAvailable;
	};
</script>

<script lang="ts">
	import type { ItemList } from '$lib/components/types/template';	
	import type { LangAvailable, NavigationType } from '$lib/types';

	import MobileNavigation from '$lib/components/template/MobileNavigation.svelte';
	import DesktopNavigation from '$lib/components/template/DesktopNavigation.svelte';

	const { type = 'mobile', lang = 'en' }: NavigationProps = $props();

	const itemsList: ItemList[] = [
		{
			title: 'Home',
			description: 'Get a bit panoramic of me',
			href: `/${lang}/`
		},
		{
			title: 'Eventi',
			description: 'Speak directly to your customers',
			href: `/${lang}/content`,
			disable: true
		},
		{
			title: 'Blog',
			description: "Your customers' data will be safe and secure",
			href: `/${lang}/blog`
		},
		{
			title: 'Project',
			description: "Your customers' data will be safe and secure",
			href: `/${lang}/project`
		},
		{
			title: 'CV',
			description: "Your customers' data will be safe and secure",
			href: `/${lang}/cv`
		}
	];

</script>

<nav>
	{#if type == 'desktop'}
		<DesktopNavigation items={itemsList}></DesktopNavigation>
	{:else}
		<MobileNavigation items={itemsList}></MobileNavigation>
	{/if}
</nav>
