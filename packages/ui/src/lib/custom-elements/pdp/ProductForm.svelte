<!--<svelte:options customElement={{ tag: 'product-form', shadow: 'none' }} />-->

<!--<script lang="ts">-->
<!--    import { onMount } from 'svelte';-->

<!--    // Type definitions-->
<!--    interface CartNotificationElement extends Element {-->
<!--        setActiveElement?: (element: Element | null) => void;-->
<!--        getSectionsToRender?: () => { id: string }[];-->
<!--        renderContents?: (data: any) => void;-->
<!--    }-->

<!--    interface CartJSWindow extends Window {-->
<!--        CartJS?: {-->
<!--            addItem: (id: string, quantity: number) => void;-->
<!--            updateItem: (index: number, quantity: number) => void;-->
<!--            cart: any;-->
<!--            getCart?: () => void;-->
<!--        };-->
<!--        routes?: {-->
<!--            cart_add_url?: string;-->
<!--        };-->
<!--    }-->

<!--    interface FetchConfig {-->
<!--        method: string;-->
<!--        headers: Record<string, string>;-->
<!--        body?: string;-->
<!--    }-->

<!--    interface FormData {-->
<!--        [key: string]: string | string[];-->
<!--    }-->

<!--    interface CartResponse {-->
<!--        status?: string;-->
<!--        description?: string;-->
<!--        [key: string]: any;-->
<!--    }-->

<!--    // Props-->
<!--    export let cartNotificationSelector: string = 'cart-notification';-->
<!--    export let formSelector: string = 'form';-->
<!--    export let submitButtonSelector: string = '[type="submit"]';-->
<!--    export let loadingSpinnerSelector: string = '.loading-overlay__spinner';-->
<!--    export let errorWrapperSelector: string = '.product-form__error-message-wrapper';-->
<!--    export let errorMessageSelector: string = '.product-form__error-message';-->

<!--    // State-->
<!--    let loading: boolean = false;-->
<!--    let errorMessage: string = '';-->
<!--    let showError: boolean = false;-->

<!--    // Element references-->
<!--    let formElement: HTMLFormElement | null = null;-->
<!--    let submitButton: HTMLButtonElement | null = null;-->
<!--    let loadingSpinner: HTMLElement | null = null;-->
<!--    let errorWrapper: HTMLElement | null = null;-->
<!--    let errorElement: HTMLElement | null = null;-->

<!--    onMount(() => {-->
<!--        // Enable the form ID field if it exists-->
<!--        const idField = formElement?.querySelector<HTMLInputElement>('[name=id]');-->
<!--        if (idField) {-->
<!--            idField.disabled = false;-->
<!--        }-->

<!--        // Get references to DOM elements-->
<!--        submitButton = formElement?.querySelector<HTMLButtonElement>(submitButtonSelector) ?? null;-->
<!--        loadingSpinner = formElement?.querySelector<HTMLElement>(loadingSpinnerSelector) ?? null;-->
<!--        errorWrapper = formElement?.querySelector<HTMLElement>(errorWrapperSelector) ?? null;-->
<!--        errorElement = errorWrapper?.querySelector<HTMLElement>(errorMessageSelector) ?? null;-->
<!--    });-->

<!--    function serializeForm(form: HTMLFormElement): string {-->
<!--        const formData = new FormData(form);-->
<!--        const data: FormData = {};-->

<!--        for (const [key, value] of formData.entries()) {-->
<!--            const stringValue = value.toString();-->
<!--            if (data[key]) {-->
<!--                // Handle multiple values for the same key-->
<!--                if (Array.isArray(data[key])) {-->
<!--                    (data[key] as string[]).push(stringValue);-->
<!--                } else {-->
<!--                    data[key] = [data[key] as string, stringValue];-->
<!--                }-->
<!--            } else {-->
<!--                data[key] = stringValue;-->
<!--            }-->
<!--        }-->

<!--        return JSON.stringify(data);-->
<!--    }-->

<!--    function getCartNotification(): CartNotificationElement | null {-->
<!--        return document.querySelector<CartNotificationElement>(cartNotificationSelector);-->
<!--    }-->

<!--    function getFetchConfig(): FetchConfig {-->
<!--        return {-->
<!--            method: 'POST',-->
<!--            headers: {-->
<!--                'Content-Type': 'application/json',-->
<!--                'Accept': 'application/json'-->
<!--            }-->
<!--        };-->
<!--    }-->

<!--    function handleErrorMessage(message: string = ''): void {-->
<!--        errorMessage = message;-->
<!--        showError = !!message;-->

<!--        if (errorWrapper) {-->
<!--            errorWrapper.toggleAttribute('hidden', !message);-->
<!--        }-->

<!--        if (errorElement && message) {-->
<!--            errorElement.textContent = message;-->
<!--        }-->
<!--    }-->

<!--    function dispatchCartUpdate(data: CartResponse): void {-->
<!--        // Dispatch using the custom element's native event dispatching-->
<!--        if (formElement) {-->
<!--            formElement.dispatchEvent(new CustomEvent('cartUpdate', {-->
<!--                detail: data,-->
<!--                bubbles: true-->
<!--            }));-->
<!--        }-->
<!--    }-->

<!--    async function handleSubmit(event: SubmitEvent): Promise<void> {-->
<!--        event.preventDefault();-->

<!--        if (loading) return;-->

<!--        // Clear previous errors-->
<!--        handleErrorMessage();-->

<!--        // Set active element for cart notification-->
<!--        const cartNotification = getCartNotification();-->
<!--        cartNotification?.setActiveElement?.(document.activeElement);-->

<!--        // Set loading state-->
<!--        loading = true;-->
<!--        submitButton?.setAttribute('aria-disabled', 'true');-->
<!--        submitButton?.classList.add('loading');-->
<!--        loadingSpinner?.classList.remove('hidden');-->

<!--        try {-->
<!--            const config = getFetchConfig();-->
<!--            config.headers['X-Requested-With'] = 'XMLHttpRequest';-->

<!--            const formData = JSON.parse(serializeForm(formElement!));-->
<!--            const sections = cartNotification?.getSectionsToRender?.()?.map(section => section.id) || [];-->

<!--            config.body = JSON.stringify({-->
<!--                ...formData,-->
<!--                sections: sections,-->
<!--                sections_url: window.location.pathname-->
<!--            });-->

<!--            const windowWithRoutes = window as CartJSWindow;-->
<!--            const response = await fetch(-->
<!--                `${windowWithRoutes.routes?.cart_add_url || '/cart/add.js'}`,-->
<!--                config-->
<!--            );-->
<!--            const data: CartResponse = await response.json();-->

<!--            if (data.status) {-->
<!--                handleErrorMessage(data.description || 'An error occurred');-->
<!--                return;-->
<!--            }-->

<!--            // Dispatch cart update event-->
<!--            document.dispatchEvent(new CustomEvent('cart:update'));-->
<!--            dispatchCartUpdate(data);-->

<!--            // Update cart (assuming CartJS is available)-->
<!--            const windowWithCartJS = window as CartJSWindow;-->
<!--            if (windowWithCartJS.CartJS) {-->
<!--                windowWithCartJS.CartJS.getCart?.();-->
<!--            }-->

<!--            // Render cart notification contents-->
<!--            cartNotification?.renderContents?.(data);-->

<!--        } catch (error) {-->
<!--            console.error('Error adding to cart:', error);-->
<!--            handleErrorMessage('An error occurred while adding to cart. Please try again.');-->
<!--        } finally {-->
<!--            // Reset loading state-->
<!--            loading = false;-->
<!--            submitButton?.classList.remove('loading');-->
<!--            submitButton?.removeAttribute('aria-disabled');-->
<!--            loadingSpinner?.classList.add('hidden');-->
<!--        }-->
<!--    }-->

<!--    // Suppress unused export warning for formSelector-->
<!--    // This is kept for external reference-->
<!--    $: void formSelector;-->
<!--</script>-->

<!--<form bind:this={formElement} on:submit={handleSubmit}>-->
<!--    <slot />-->

<!--    {#if showError}-->
<!--        <div class="product-form__error-message-wrapper">-->
<!--            <div class="product-form__error-message">-->
<!--                {errorMessage}-->
<!--            </div>-->
<!--        </div>-->
<!--    {/if}-->
<!--</form>-->

<!--<style>-->
<!--    .product-form__error-message-wrapper {-->
<!--        margin-top: 1rem;-->
<!--    }-->

<!--    .product-form__error-message {-->
<!--        color: #d32f2f;-->
<!--        font-size: 0.875rem;-->
<!--        padding: 0.5rem;-->
<!--        border: 1px solid #d32f2f;-->
<!--        border-radius: 4px;-->
<!--        background-color: #ffebee;-->
<!--    }-->
<!--</style>-->