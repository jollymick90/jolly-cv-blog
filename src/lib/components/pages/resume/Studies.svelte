<script lang="ts">
	import { Icon, AcademicCap } from 'svelte-hero-icons';

	const eventTypes = {
		study: { bgColorClass: 'bg-red-400' }
	};
	const timeline = [
		{
			id: 1,
			type: eventTypes.study,
			content: 'Università studi Padova',
			target: "Triennale Ingegneria Dell'informazione",
			date: '2015'
		},
		{
			id: 2,
			type: eventTypes.study,
			content: 'ITIS C.Zuccante',
			target: 'Perito Tecnico Elettronico e telecomunicazioni',
			date: '2009'
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
								<Icon class="h-5 w-5 text-white" src={AcademicCap} aria-hidden="true" />
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
								<span>{item.date}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
