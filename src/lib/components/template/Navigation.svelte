<script lang="ts" module>
	export type NavigationProps = {
		type: NavigationType;
		lang: LangAvailable;
	};
</script>

<script lang="ts">
	import type { ItemList } from '$lib/components/types/template';	
	import type { LangAvailable, NavigationType } from '$lib/types';
	import { t } from '$lib/i18n';

	import MobileNavigation from '$lib/components/template/MobileNavigation.svelte';
	import DesktopNavigation from '$lib/components/template/DesktopNavigation.svelte';

	const { type = 'mobile', lang = 'en' }: NavigationProps = $props();

	const itemsList: ItemList[] = [
		{
			title: $t('home.navhome'),
			description: 'Get a bit panoramic of me',
			href: `/${lang}/`
		},
		{
			title:  $t('home.navproject'),
			description: "Your customers' data will be safe and secure",
			href: `/${lang}/project`
		},

		{
			title: $t('home.navcv'),
			description: "Your customers' data will be safe and secure",
			href: `/${lang}/cv`
		},
		{
			title: $t('home.navspeaker'),
			description: 'Speak directly to your customers',
			href: `/${lang}/speaker`,
			disable: true
		},
		{
			title: $t('home.navblog'),
			description: "Your customers' data will be safe and secure",
			href: `/${lang}/blog`
		},

	];

</script>

<nav>
	{#if type == 'desktop'}
		<DesktopNavigation items={itemsList}></DesktopNavigation>
	{:else}
		<MobileNavigation items={itemsList}></MobileNavigation>
	{/if}
</nav>
