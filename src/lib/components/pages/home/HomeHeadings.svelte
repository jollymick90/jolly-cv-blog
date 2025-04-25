<script lang="ts">
	import { t } from '$lib/i18n';

	import {
		BlueskyIcon,
		GitHubIcon,
		InstagramIcon,
		LinkedInIcon,
		XIcon
	} from '$lib/components/icons';
	import SocialLink from '$lib/components/theme/SocialLink.svelte';
	import type { SocialInfo } from '$lib/content';

	let { socialListInput }: { socialListInput: SocialInfo[] } = $props();

	let socialList = socialListInput.map((socialItem) => {
		const socialItemUi = {
			...socialItem,
			icon: mapIcon(socialItem)
		};
		return socialItemUi;
	});
	function mapIcon(socialItem: SocialInfo) {
		switch (socialItem.icon) {
			case 'BlueskyIcon':
				return BlueskyIcon;
			case 'LinkedInIcon':
				return LinkedInIcon;

			case 'GitHubIcon':
				return GitHubIcon;

			case 'InstagramIcon':
				return InstagramIcon;

			case 'XIcon':
				return XIcon;
			default:
				break;
		}
	}
</script>

<div class="max-w-2xl">
	<h1 class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
		{$t('home.heading')}
		{$t('home.title')}
	</h1>
	<p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">
		{$t('home.description')}
	</p>
	<div class="mt-6 flex gap-6">
		{#each socialList as socialItem}
			<SocialLink 
			 icon={socialItem.icon}
			 href={socialItem.href}
			 ariaLabel={socialItem.ariaLabel}
			></SocialLink>
		{/each}
	</div>
</div>
