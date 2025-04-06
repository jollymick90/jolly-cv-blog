<script lang="ts">
	import type { PresentationResume } from '$lib/content/resume';

	const {presentation}: {presentation: PresentationResume} = $props();
</script>

<div class="bg-verdigris-900 dark:bg-verdigris-100 overflow-hidden border-2 border-teal-300 rounded-lg shadow">
	<div class="px-2 py-3 sm:p-3">
		<p class="mb-1 pb-1 text-center font-medium text-gray-500 dark:text-zinc-100">
			{presentation}
		</p>
	</div>
</div>
