<script lang="ts">
	import { Icon, Briefcase } from 'svelte-hero-icons';

	const eventTypes = {
		work: {
			bgColorClass: 'bg-blue-400'
		}
	};
	const timeline = [
		{
			id: 1,
			type: eventTypes.work,
			content: 'Viasat - Greenext',
			target: 'Front End Developer',
			dateEnd: 'current',
			dateEndTime: null,
			dateStart: 'Sep 21',
			dateStartTime: '2021-09-01'
		},
		{
			id: 2,
			type: eventTypes.work,
			content: 'Red-V - Ennova Researh',
			target: 'Backend Frontend Mobile',
			dateStart: 'Sep 15',
			dateStartTime: '2015-09-15',
			dateEnd: 'Sep 21',
			dateEndTime: '2021-09-01'
		},
		{
			id: 3,
			type: eventTypes.work,
			content: "IN's mercato",
			target: 'Work & study',
			dateStart: 'Sep 12',
			dateStartTime: '2012-10-1',
			dateEnd: 'Dec 14',
			dateEndTime: '2014-12-01'
		}
	];
</script>

<div class="bg-white px-4 py-2 sm:rounded-lg sm:px-1">
	<h2 id="timeline-title" class="mx-1 my-1 text-lg font-medium text-gray-900">
		Esperienze Lavorative
	</h2>
	<div class="mt-3 flow-root">
		{#each timeline as item, itemIdx}
			<div>
				<div class="relative pb-2">
					{#if itemIdx !== timeline.length - 1}
						<span class="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"
						></span>
					{/if}

					<div class="relative flex space-x-3">
						<div>
							<span
								class="{item.type.bgColorClass}
                                flex h-8 w-8 items-center justify-center rounded-full ring-8 ring-white"
							>
								<Icon class="h-5 w-5 text-white" aria-hidden="true" src={Briefcase} />
							</span>
						</div>
						<div class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
							<div>
								<div class="text-sm text-gray-500">
									<span>{item.content}{' '}</span>
									<span class="font-medium text-gray-900">
										{item.target}
									</span>
								</div>
							</div>
							<div class="whitespace-nowrap text-right text-sm text-gray-500">
								<time dateTime={item.dateStart}>{item.dateStart}</time>-
								{#if item.dateEndTime}
									<time dateTime={item.dateEndTime}>{item.dateEnd}</time>
                                    {/if}
								{#if item.dateEndTime === null}
									{item.dateEnd}
								{/if}
							</div>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
