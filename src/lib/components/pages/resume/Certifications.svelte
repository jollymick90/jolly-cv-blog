<script lang="ts">
	import { Icon, Flag } from 'svelte-hero-icons';
	import type { Certification, CertificationUI } from '$lib/content/resume';
	import { eventTypes } from '$lib/content';

	export let certifications: Certification[];

	const timeline: CertificationUI[] = certifications.map((certItem) => {
		return {
			...certItem,
			className: eventTypes[certItem.type]
		};
	});
</script>

<div class="px-4 py-2 sm:rounded-lg sm:px-1">
	<h2 id="timeline-title" class="mx-1 my-1 text-lg font-medium text-gray-900 dark:text-zinc-50">Certificazioni</h2>
	<div class="mt-3 flow-root">
		{#each timeline as item, itemIdx}
			<div>
				<div class="relative pb-2">
					{#if itemIdx !== timeline.length - 1}
						<span
							class="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-zinc-50"
							aria-hidden="true"
						></span>
					{/if}

					<div class="relative flex space-x-3">
						<div>
							<span
								class="{item.className}
                                flex h-8 w-8 items-center justify-center rounded-full ring-8 ring-white"
							>
								<Icon class="h-5 w-5 text-white" aria-hidden="true" src={Flag} />
							</span>
						</div>
						<div class="flex min-w-0 flex-1 flex-col justify-between space-x-4 pt-1.5">
							<div class="text-sm text-gray-500 dark:text-zinc-50">
								<span>{item.content}</span>
							</div>
							<div class="whitespace-nowrap text-sm text-gray-500 dark:text-zinc-50">
								<span>{item.date}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
