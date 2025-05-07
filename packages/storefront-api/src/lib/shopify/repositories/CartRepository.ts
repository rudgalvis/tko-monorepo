import {
    addLineItemsMutation,
    type AddLineItemsMutationResponse
} from "$lib/shopify/mutations/AddLineItemsMutation.js";
import { createCartMutation } from "$lib/shopify/mutations/CreateCartMutation.js";
import { createCartWithBuyerIdentityMutation } from "$lib/shopify/mutations/CreateCartWithBuyerIdentityMutation.js";
import { BaseRepository } from "$lib/shopify/repositories/BaseRepository.js";
import type { Cart, CartLineAddInput } from "$lib/shopify/storefront-api.types.js";

export class CartRepository extends BaseRepository{
    async createCart(): Promise<Cart> {
        const { data, errors } = await this.client.request(createCartMutation);

        if (errors) {
            console.error(errors);
            throw new Error('Failed to create cart');
        }

        if (data?.cartCreate?.userErrors?.length > 0) {
            throw new Error(data.cartCreate.userErrors[0].message);
        }

        return data?.cartCreate?.cart;
    }

    async createCartWithBuyerIdentity(countryCode: string): Promise<Cart> {
        const { data, errors } = await this.client.request(createCartWithBuyerIdentityMutation, {
            variables: {
                buyerIdentity: {
                    countryCode: countryCode
                }
            }
        });

        if (errors) {
            console.error(errors);
            throw new Error('Failed to create cart');
        }

        if (data?.cartCreate?.userErrors?.length > 0) {
            throw new Error(data.cartCreate.userErrors[0].message);
        }

        return data?.cartCreate?.cart;
    }

    async addLineItems(cartId: string, lines: CartLineAddInput[]) {
        if (!cartId) throw new Error('cartId is required');
        if (!lines || !lines.length) throw new Error('lines are required');

        const { data, errors } = await this.client.request<AddLineItemsMutationResponse>(
            addLineItemsMutation,
            {
                variables: {
                    cartId,
                    lines: lines.map((line) => ({
                        merchandiseId: line.variantGid,
                        quantity: line.quantity
                    }))
                }
            }
        );

        if (errors) {
            console.error(errors);
            console.error(errors.graphQLErrors);
            throw new Error('Error adding line items to cart');
        }

        if (data?.cartLinesAdd?.userErrors?.length) {
            throw new Error(data.cartLinesAdd.userErrors[0].message);
        }

        return data?.cartLinesAdd?.cart;
    }
}