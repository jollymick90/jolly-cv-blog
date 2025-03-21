<div class="flex min-w-0 flex-1 flex-col gap-2 ">

    <slot></slot>

	<div class="flex flex-col sm:grid sm:grid-cols-2 gap-2">
		<slot name="skills"></slot>
		<slot name="descriptions"></slot>
	</div>
</div>
