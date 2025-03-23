import { writable } from 'svelte/store';

const initialValue = false;
export const isExpand = writable<boolean>(initialValue);
