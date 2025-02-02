<script lang="ts">
export let icon;
export let href;
export let ariaLabel;
</script>

<a
    href={href}
    aria-label={ariaLabel}
    class="group -m-1 p-1"
    target="_blank"
    >
    <svelte:component this={icon} class="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
</a>
