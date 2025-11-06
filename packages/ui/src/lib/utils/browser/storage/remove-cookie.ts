import { isBrowser } from "../is-browser.js";
import { frontendLogger } from "../../loggers/frontend-logger.js";

export const removeCookie = (name: string) => {
    if (!name.trim() || !isBrowser()) {
        return;
    }

    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';

    frontendLogger.debug('Removed cookie:', name);
};

