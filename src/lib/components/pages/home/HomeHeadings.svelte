<script lang="ts">
import {
    BlueskyIcon,
    GitHubIcon,
    InstagramIcon,
    LinkedInIcon,
    XIcon
} from '$lib/components/icons';
import SocialLink from '$lib/components/theme/SocialLink.svelte';

export let data;
let config = data.config;
// TODO export data and make function to match social with icons
let socialList = [{
        icon: LinkedInIcon,
        href: 'https://www.linkedin.com/in/michele-scarpa-90-arco/',
        ariaLabel: 'Follow on LinkedIn'
    },
    {
        icon: GitHubIcon,
        href: 'https://github.com/jollymick90',
        ariaLabel: 'Follow on Github'
    },
    {
        icon: InstagramIcon,
        href: 'https://www.instagram.com/michele.scarpetta/',
        ariaLabel: 'Follow on Instagram'
    },
    {
        icon: BlueskyIcon,
        href: 'https://x.com/mscarpa90',
        ariaLabel: 'Follow on X'
    },
    {
        icon: XIcon,
        href: 'https://x.com/mscarpa90',
        ariaLabel: 'Follow on X'
    }
];
</script>

<div class="max-w-2xl">
    <h1 class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
        {config?.heading}
    </h1>
    <p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">
        {config?.description}
    </p>
    <div class="mt-6 flex gap-6">
        {#each socialList as socialItem}
        <SocialLink icon={socialItem.icon} href={socialItem.href} ariaLabel={socialItem.ariaLabel}
            ></SocialLink>
        {/each}
    </div>
</div>
