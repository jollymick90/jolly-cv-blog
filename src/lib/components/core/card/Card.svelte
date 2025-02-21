<script lang="ts">
	export let className: string = '';
</script>

<div class="{className} group relative flex flex-col items-start">
	<slot></slot>
</div>
