<script>

	import Avatar from "./Avatar.svelte";

</script>
<!-- HEADER / NAVBAR -->
 <style>
	.head-component {
		height: var(--header-height);
		margin-bottom: var(--header-mb);
	}
 </style>
<header class="pointer-events-none relative z-50 flex flex-none flex-col head-component"

  >
  <div class="relative flex gap-4">
	<div class="flex flex-1">
		<Avatar></Avatar>
	</div>
  </div>
	<nav class="container mx-auto flex items-center justify-between px-4 py-6">
		<div class="gradient-text text-xl font-bold">MS</div>
		<div>
			<ul class="flex items-center space-x-6 text-sm">
				<li><a href="/" class="hover:underline">Home</a></li>
				<li><a href="/content" class="hover:underline">Eventi</a></li>
				<li><a href="/blog" class="hover:underline">Blog</a></li>
				<li><a href="/resume" class="hover:underline">Resume</a></li>
			</ul>
		</div>
	</nav>
</header>
