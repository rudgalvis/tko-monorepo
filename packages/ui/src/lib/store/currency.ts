import { writable } from "svelte/store";

export const displayCurrency = writable<string>()
export const marketCurrency = writable<string>()

// TODO: make persistant