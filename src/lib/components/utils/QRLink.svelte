<script lang="ts">
    import { qr } from '@svelte-put/qr/svg';
    const { qrUrlLink } = $props();
</script>

<div class="w-full p-10 flex justify-center align-middle bg-white">
<svg
  use:qr={{
    data: qrUrlLink,
    // logo: 'https://svelte-put.vnphanquang.com/images/svelte-put-logo.svg',
    shape: 'circle',
  }}
/>
</div>