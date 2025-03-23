import { derived, writable } from 'svelte/store';
import type { TailwindBreakpoints } from '$lib/types';

export const currentBreakpoint = writable<TailwindBreakpoints>('lg');
export const isMobile = derived(currentBreakpoint, ($currentBreakpoint) => {
    return $currentBreakpoint === 'xs' || $currentBreakpoint === 'sm'
})