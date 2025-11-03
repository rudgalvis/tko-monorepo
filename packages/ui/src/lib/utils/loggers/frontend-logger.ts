export const frontendLogger = {
    debug: (...args: unknown[]) => {
        console.log('[UI]', ...args);
    }, 
    warn: (...args: unknown[]) => {
        console.warn('[UI]', ...args);
    }
}
