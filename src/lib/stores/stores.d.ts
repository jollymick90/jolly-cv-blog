import type { TailwindBreakpoints } from "$lib/types";

export type RootStore = {
    breakpoint: TailwindBreakpoints;
    isMobile: boolean;
}