<script lang="ts">
import {
    ChevronDown,
    ChevronUp,
    Icon
} from 'svelte-hero-icons';

let {
    onChange,
    initialValue
}: {
    initialValue: boolean,
    onChange: (value: boolean) => void
} = $props();

let isExpand = $state(initialValue);

function changeStatus(): any {
    isExpand = !isExpand;
    onChange(isExpand);
}
</script>

<div class="flex gap-1">
    <!-- <span class="text-teagreen-100 dark:text-teagreen-900">espandi</span> -->
    <button
        onclick={() => changeStatus()}
        class="w-5 group rounded-full bg-teagreen-100/90 p-1 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-sm transition dark:bg-teagreen-800/90 dark:ring-white/10 dark:hover:ring-white/20"
        >
        {#if !isExpand}
        <Icon class="h-3 w-3 dark:text-zinc-800 text-white" aria-hidden="true" src={ChevronDown} />
        {:else}
        <Icon class="h-3 w-3 dark:text-zinc-800 text-white" aria-hidden="true" src={ChevronUp} />
        {/if}
    </button>
</div>
