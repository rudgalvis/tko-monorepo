console.log("B2B hooks")
window.bssB2BHooks = window.bssB2BHooks || {
    actions: {},
    filters: {},
};

window.BSS_B2B = window.BSS_B2B || {};

window.BSS_B2B.addAction = (tag, callback) => {
    window.bssB2BHooks.actions[tag] = callback;
}
window.BSS_B2B.addFilter = (tag,  value) => {
    window.bssB2BHooks.filters[tag] = value;
}

