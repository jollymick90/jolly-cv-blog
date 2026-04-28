import { writable } from 'svelte/store';

// When `true`, the global shell (AppHeader + BottomNav + AppFooter) is hidden
// so a fullscreen experience (e.g. the hand-runner game) can take over the
// viewport. Pages MUST reset this to `false` on unmount to avoid leaking the
// immersive state to subsequent routes.
export const immersive = writable(false);
