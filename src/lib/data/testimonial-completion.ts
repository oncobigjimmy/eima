import { writable } from 'svelte/store';

// Survives gallery/tab navigation in the current page session; a reload resets it.
export const testimonialCompletionShown = writable(false);
