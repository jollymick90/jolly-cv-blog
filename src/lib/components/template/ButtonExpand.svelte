<script lang="ts">
      export let onChange

    let isExpand = false;
    $: onChange(isExpand)

	function changeStatus(): any {
		isExpand = !isExpand
	}
</script> 
<button 
on:click={() => changeStatus()}	
		class="group rounded-full bg-white/90 px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-sm transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
		>
        {#if isExpand}
		<!-- MoonIcon -->
		<svg
			viewBox="0 0 24 24"
			class="h-6 w-6 fill-zinc-700 stroke-zinc-500 transition dark:block [@media(prefers-color-scheme:dark)]:group-hover:stroke-zinc-400 [@media_not_(prefers-color-scheme:dark)]:fill-teal-400/10 [@media_not_(prefers-color-scheme:dark)]:stroke-teal-500"
		>
			<path
				d="M17.25 16.22a6.937 6.937 0 0 1-9.47-9.47 7.451 7.451 0 1 0 9.47 9.47ZM12.75 7C17 7 17 2.75 17 2.75S17 7 21.25 7C17 7 17 11.25 17 11.25S17 7 12.75 7Z"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			></path>
		</svg>
	{:else}
		<!-- SunIcon -->
		<svg
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="ìh-6 w-6 fill-zinc-100 stroke-zinc-500 transition group-hover:fill-zinc-200 group-hover:stroke-zinc-700 dark:hidden [@media(prefers-color-scheme:dark)]:fill-teal-50 [@media(prefers-color-scheme:dark)]:stroke-teal-500 [@media(prefers-color-scheme:dark)]:group-hover:fill-teal-50 [@media(prefers-color-scheme:dark)]:group-hover:stroke-teal-600"
		>
        <path xmlns="http://www.w3.org/2000/svg" d="M498.837,65.628c-7.957-3.328-17.152-1.472-23.253,4.629L256,289.841L36.416,70.257    c-6.101-6.101-15.275-7.936-23.253-4.629C5.184,68.913,0,76.721,0,85.34v106.667c0,5.675,2.24,11.093,6.251,15.083    l234.667,234.667c4.16,4.16,9.621,6.251,15.083,6.251c5.462,0,10.923-2.091,15.083-6.251L505.751,207.09    c4.011-3.989,6.251-9.408,6.251-15.083V85.34C512,76.721,506.816,68.913,498.837,65.628z">
        </path>
		</svg>
	{/if}
		</button>