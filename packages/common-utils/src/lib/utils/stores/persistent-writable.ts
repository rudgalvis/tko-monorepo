import { isBrowser } from "$lib/utils/environments/is-browser.js";
import { writable } from "svelte/store";

export const persistentWritable = <T>(key: string, initialValue: T) => {
    // Get stored value if in browser, otherwise use initial value
    const storedValue = isBrowser ? localStorage.getItem(key) : null;
    const store = writable<T>(storedValue ? JSON.parse(storedValue) : initialValue);

    // If in browser, subscribe to changes and update localStorage
    if (isBrowser) {
        store.subscribe((value) => {
            localStorage.setItem(key, JSON.stringify(value));
        });
    }

    return store;
};