<div class="min-w-0 flex-1 space-x-4 pt-1.5">
    <div class="grid grid-cols-1 md:flex">
        <div class="flex flex-col flex-1">
            <slot></slot>
        </div>
        <div class="text-sm font-medium text-gray-500 w-2/3">
            <slot name="descriptions"></slot>
        </div>
    </div>
</div>