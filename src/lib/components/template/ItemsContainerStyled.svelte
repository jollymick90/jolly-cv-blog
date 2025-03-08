<div class="min-w-0 flex-1 space-x-4 pt-1.5">
    <div class="flex flex-col sm:grid sm:grid-cols-3">
        <div class="px-2 flex flex-col">
            <slot></slot>
            <div class="mt-2">
                <h4>Lesson learn</h4>
                <slot name="skills"></slot>
            </div>
        </div>
        <div class="px-2 col-span-2">
            <slot name="descriptions"></slot>
        </div>
        
    </div>
</div>