<script lang="ts">
    import { Icon, Envelope, Phone } from "svelte-hero-icons";
</script>
<div class="text-center flex flex-row gap-1 justify-center mt-4 text-lg text-gray-500 leading-8">

    <div
        class="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
    >
        
        <Icon class="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" 
        src="{Envelope}" />
        <span>scarpa.michele.90@gmail.com</span>
    </div>
    <div
        class="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
    >
        
        <Icon class="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" 
        src="{Phone}" />
        <span>+393483482541</span>
    </div>

</div>