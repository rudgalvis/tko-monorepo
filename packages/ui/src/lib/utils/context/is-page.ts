export enum Page {
    PDP = 'pdp',
}

export const isPage = (page: Page) => {
    switch (page) {
        case Page.PDP:
            return window.location.pathname.includes('/products/');
        default:
            return false;
    }
}