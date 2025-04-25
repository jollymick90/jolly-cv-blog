<script module lang="ts">
	export type ThemeAvailable = 'dark' | 'light' | 'system';
</script>

<script lang="ts">
	import { langStore } from '$lib/i18n/lang.store';
	import type { LangAvailable } from '$lib/types';

	let showPopover = $state(false);
	let currentLang = $derived($langStore);

	function changeLang(newLang: LangAvailable) {
		if (newLang === currentLang) {
			showPopover = false;
			return;
		}
		const path = window.location.pathname;
		const newPath = path.replace(currentLang, newLang);
		window.location.href = newPath;
	}
</script>

<div class="mx-3 my-1">
	<!-- svelte-ignore a11y_label_has_associated_control -->
	<label id="listbox-label" class="sr-only">Change published status</label>
	<div class="relative">
		<button
			type="button"
			onclick={() => {
				showPopover = !showPopover;
			}}
			class="group rounded-full bg-white/90 px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-sm transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
			aria-haspopup="listbox"
			aria-expanded="true"
			aria-labelledby="listbox-label"
		>
			<span class="sr-only">Change published status</span>
			<div class="inline-flex items-center rounded-l-md bg-zinc-600 text-white">
				{#if currentLang === 'it'}
					<span class="fi fi-it"></span>
				{/if}
				{#if currentLang === 'en'}
					<span class="fi fi-gb"></span>
				{/if}
			</div>
		</button>

		<!--
		Select popover, show/hide based on select state.
  
		Entering: ""
		  From: ""
		  To: ""
		Leaving: "transition ease-in duration-100"
		  From: "opacity-100"
		  To: "opacity-0"
	  -->
		<ul
			class="{showPopover ? 'absolute' : 'hidden'} 
	  	right-0 z-10 mt-2 w-72 origin-top-right divide-y divide-gray-200 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
			tabindex="-1"
			role="listbox"
			aria-labelledby="listbox-label"
			aria-activedescendant="listbox-option-0"
		>
			<li
				class="cursor-default select-none p-4 text-sm text-gray-900"
				id="listbox-option-0"
				role="option"
				aria-selected="true"
				onclick={() => changeLang('it')}
				onkeydown={() => changeLang('it')}
			>
				<div class="flex flex-col">
					<div class="flex justify-between">
						<p class="font-normal">
							<span class="fi fi-it"></span>
							<span>Italiano</span>
						</p>
						<!--
				Checkmark, only display for selected option.
  
				Highlighted: "text-white", Not Highlighted: "text-indigo-600"
			  -->

						{#if currentLang === 'it'}
							<span class="text-zinc-600">
								<svg
									class="size-5"
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
									data-slot="icon"
								>
									<path
										fill-rule="evenodd"
										d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
										clip-rule="evenodd"
									/>
								</svg>
							</span>
						{/if}
					</div>
				</div>
			</li>

			<li
				class="cursor-default select-none p-4 text-sm text-gray-900"
				id="listbox-option-1"
				role="option"
				aria-selected="true"
				onclick={() => changeLang('en')}
				onkeydown={() => changeLang('en')}
			>
				<div class="flex flex-col">
					<div class="flex justify-between">
						<p class="font-normal">
							<span class="fi fi-gb"></span>
							<span>English</span>
						</p>
						<!--
				  Checkmark, only display for selected option.
	
				  Highlighted: "text-white", Not Highlighted: "text-indigo-600"
				-->
						{#if currentLang === 'en'}
							<span class="text-zinc-600">
								<svg
									class="size-5"
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
									data-slot="icon"
								>
									<path
										fill-rule="evenodd"
										d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
										clip-rule="evenodd"
									/>
								</svg>
							</span>
						{/if}
					</div>
				</div>
			</li>
		</ul>
	</div>
</div>
