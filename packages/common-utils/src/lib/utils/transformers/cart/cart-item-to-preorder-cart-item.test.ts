import { cartItemToPreorderCartItem } from '$lib/utils/transformers/cart/cart-item-to-preorder-cart-item.js';
import { test } from 'vitest';

const mockItemWithPartialPaymentSellingPlan = {
	id: 54488371429724,
	quantity: 1,
	variant_id: 54488371429724,
	key: '54488371429724:47da860eabad075a1e8e4920493f2b1b',
	title: 'test test - Silver Grey / S',
	price: 15000,
	original_price: 15000,
	discounted_price: 12750,
	line_price: 12750,
	original_line_price: 15000,
	total_discount: 2250,
	discounts: [
		{
			amount: 2250,
			title: 'Test market discount'
		}
	],
	sku: '',
	grams: 0,
	vendor: 'The Knotty Ones',
	taxable: true,
	product_id: 7485371416819,
	product_has_only_default_variant: false,
	gift_card: false,
	final_price: 12750,
	final_line_price: 12750,
	url: '/products/test-test?variant=54488371429724',
	featured_image: {
		aspect_ratio: 0.8,
		alt: 'test test',
		height: 1000,
		url: '//www.theknottyones.com/cdn/shop/products/test-test-591867.jpg?v=1746666198',
		width: 800
	},
	image: '//www.theknottyones.com/cdn/shop/products/test-test-591867.jpg?v=1746666198',
	handle: 'test-test',
	requires_shipping: true,
	product_type: '',
	product_title: 'test test',
	product_description: 'Description.',
	variant_title: 'Silver Grey / S',
	variant_options: ['Silver Grey', 'S'],
	options_with_values: [
		{
			name: 'Color',
			value: 'Silver Grey'
		},
		{
			name: 'Size',
			value: 'S'
		}
	],
	line_level_discount_allocations: [
		{
			amount: 2250,
			discount_application: {
				type: '',
				key: '9806135c-141c-46b6-8143-cce7ca77a813',
				title: 'Test market discount',
				description: null,
				value: '15.0',
				created_at: '2025-07-10T10:21:11.132Z',
				value_type: 'percentage',
				allocation_method: 'across',
				target_selection: 'entitled',
				target_type: 'line_item',
				total_allocated_amount: 4500
			}
		}
	],
	line_level_total_discount: 2250,
	selling_plan_allocation: {
		price_adjustments: [],
		price: 15000,
		compare_at_price: null,
		per_delivery_price: 15000,
		selling_plan: {
			id: 691847168348,
			name: 'Partial Payment',
			description:
				'You will be charged the remaining balance when the product is released on {{ released }}',
			options: [
				{
					name: 'Payment option',
					position: 1,
					value: 'Partial Payment'
				}
			],
			recurring_deliveries: false,
			price_adjustments: []
		},
		checkout_charge_amount: 1500,
		remaining_balance_charge_amount: 13500
	},
	properties: {
		_is_preorder: 'Pre-order item',
		_preorder_locale: 'en'
	}
};
const mockCartItemNoPreorderNoSellingPlan = {
	id: 54926550499676,
	quantity: 1,
	variant_id: 54926550499676,
	key: '54926550499676:2c04b4db0bb6a612a2b1d7ba330a52b5',
	title: 'Tom: Taupe Cotton Cardigan - Taupe / M',
	price: 39700,
	original_price: 39700,
	discounted_price: 20644,
	line_price: 20644,
	original_line_price: 39700,
	total_discount: 19056,
	discounts: [
		{
			amount: 19056,
			title: 'tomsweater'
		}
	],
	sku: 'H-TMCR-TP-M',
	grams: 0,
	vendor: 'The Knotty Ones',
	taxable: true,
	product_id: 15097088737628,
	product_has_only_default_variant: false,
	gift_card: false,
	final_price: 20644,
	final_line_price: 20644,
	url: '/products/tom-taupe-cotton-cardigan?variant=54926550499676',
	featured_image: {
		aspect_ratio: 0.8,
		alt: 'Tom: Taupe Cardigan & Hot Pants Set',
		height: 1000,
		url: '//www.theknottyones.com/cdn/shop/files/tom-taupe-cardigan-hot-pants-set-2141215.jpg?v=1752062573',
		width: 800
	},
	image:
		'//www.theknottyones.com/cdn/shop/files/tom-taupe-cardigan-hot-pants-set-2141215.jpg?v=1752062573',
	handle: 'tom-taupe-cotton-cardigan',
	requires_shipping: true,
	product_type: 'Cotton Cardigan',
	product_title: 'Tom: Taupe Cotton Cardigan',
	product_description:
		'We created this design in our mid-twenties, dreaming of rooftop chats at 2am under the stars. We named it "Tom" after a guy we used to watch the stars with, and over half a decade later, this timeless cotton cardigan still feels perfect. \nThis summer only, we’re bringing Tom back in a limited-edition drop in a fresh, seasonless neutral that plays nice with your whole wardrobe. Made to order by our skilled knitters. Don’t miss your chance to own a piece of our history and get it for our best price.',
	variant_title: 'Taupe / M',
	variant_options: ['Taupe', 'M'],
	options_with_values: [
		{
			name: 'Color',
			value: 'Taupe'
		},
		{
			name: 'Size',
			value: 'M'
		}
	],
	line_level_discount_allocations: [
		{
			amount: 19056,
			discount_application: {
				type: '',
				key: 'e3157b84-f05f-4356-b367-e44237e61865',
				title: 'tomsweater',
				description: null,
				value: '48.0',
				created_at: '2025-07-10T10:21:11.132Z',
				value_type: 'percentage',
				allocation_method: 'across',
				target_selection: 'entitled',
				target_type: 'line_item',
				total_allocated_amount: 19056
			}
		}
	],
	line_level_total_discount: 19056,
	properties: {}
};
const mockCartItemPreOrderFullPaymentSellingPlan = {
	id: 54488371429724,
	quantity: 1,
	variant_id: 54488371429724,
	key: '54488371429724:8d9eaee8e68ec45e113a0dbfe6bc2165',
	title: 'test test - Silver Grey / S',
	price: 15000,
	original_price: 15000,
	discounted_price: 12750,
	line_price: 12750,
	original_line_price: 15000,
	total_discount: 2250,
	discounts: [
		{
			amount: 2250,
			title: 'Test market discount'
		}
	],
	sku: '',
	grams: 0,
	vendor: 'The Knotty Ones',
	taxable: true,
	product_id: 7485371416819,
	product_has_only_default_variant: false,
	gift_card: false,
	final_price: 12750,
	final_line_price: 12750,
	url: '/products/test-test?variant=54488371429724',
	featured_image: {
		aspect_ratio: 0.8,
		alt: 'test test',
		height: 1000,
		url: '//www.theknottyones.com/cdn/shop/products/test-test-591867.jpg?v=1746666198',
		width: 800
	},
	image: '//www.theknottyones.com/cdn/shop/products/test-test-591867.jpg?v=1746666198',
	handle: 'test-test',
	requires_shipping: true,
	product_type: '',
	product_title: 'test test',
	product_description: 'Description.',
	variant_title: 'Silver Grey / S',
	variant_options: ['Silver Grey', 'S'],
	options_with_values: [
		{
			name: 'Color',
			value: 'Silver Grey'
		},
		{
			name: 'Size',
			value: 'S'
		}
	],
	line_level_discount_allocations: [
		{
			amount: 2250,
			discount_application: {
				type: '',
				key: '9806135c-141c-46b6-8143-cce7ca77a813',
				title: 'Test market discount',
				description: null,
				value: '15.0',
				created_at: '2025-07-10T10:21:11.132Z',
				value_type: 'percentage',
				allocation_method: 'across',
				target_selection: 'entitled',
				target_type: 'line_item',
				total_allocated_amount: 4500
			}
		}
	],
	line_level_total_discount: 2250,
	selling_plan_allocation: {
		price_adjustments: [],
		price: 15000,
		compare_at_price: null,
		per_delivery_price: 15000,
		selling_plan: {
			id: 691989872988,
			name: 'Full Payment',
			description: null,
			options: [
				{
					name: 'Payment option',
					position: 1,
					value: 'Full Payment'
				}
			],
			recurring_deliveries: false,
			price_adjustments: []
		},
		checkout_charge_amount: 15000,
		remaining_balance_charge_amount: 0
	},
	properties: {
		_is_preorder: 'Pre-order item',
		_preorder_locale: 'en'
	}
};
const mockCartItemAfterCartUpdate = {
	id: 54488371429724,
	quantity: 1,
	variant_id: 54488371429724,
	key: '54488371429724:47da860eabad075a1e8e4920493f2b1b',
	title: 'test test - Silver Grey / S',
	product_title: 'test test',
	variant_title: 'Silver Grey / S',
	price: 15000,
	original_price: 15000,
	discounted_price: 12750,
	line_price: 12750,
	original_line_price: 15000,
	presentment_price: 150,
	total_discount: 2250,
	discounts: [
		{
			amount: 2250,
			title: 'Test market discount'
		}
	],
	sku: '',
	grams: 0,
	vendor: 'The Knotty Ones',
	taxable: true,
	product_id: 7485371416819,
	product_has_only_default_variant: false,
	gift_card: false,
	final_price: 12750,
	final_line_price: 12750,
	url: '/products/test-test?selling_plan=691847168348&variant=54488371429724',
	featured_image: {
		alt: 'test test',
		aspect_ratio: 0.8,
		height: 1000,
		url: 'https://cdn.shopify.com/s/files/1/1243/8188/products/test-test-591867.jpg?v=1746666198',
		width: 800
	},
	image: 'https://cdn.shopify.com/s/files/1/1243/8188/products/test-test-591867.jpg?v=1746666198',
	handle: 'test-test',
	requires_shipping: true,
	product_type: '',
	untranslated_product_title: 'test test',
	product_description: 'Description.',
	untranslated_variant_title: 'Silver Grey / S',
	variant_options: ['Silver Grey', 'S'],
	options_with_values: [
		{
			name: 'Color',
			value: 'Silver Grey'
		},
		{
			name: 'Size',
			value: 'S'
		}
	],
	line_level_discount_allocations: [
		{
			amount: 2250,
			discount_application: {
				allocation_method: 'across',
				created_at: '2025-07-10T13:15:44.333Z',
				description: null,
				key: 'c0842d6e-9d87-4072-87ea-3c0f42b3a665',
				target_selection: 'entitled',
				target_type: 'line_item',
				title: 'Test market discount',
				total_allocated_amount: 2250,
				type: 'automatic',
				value: '15.0',
				value_type: 'percentage'
			}
		}
	],
	line_level_total_discount: 2250,
	selling_plan_allocation: {
		price_adjustments: [],
		price: 15000,
		compare_at_price: null,
		per_delivery_price: 15000,
		selling_plan: {
			id: 691847168348,
			name: 'Partial Payment',
			description:
				'You will be charged the remaining balance when the product is released on {{ released }}',
			options: [
				{
					name: 'Payment option',
					position: 1,
					value: 'Partial Payment'
				}
			],
			recurring_deliveries: false,
			price_adjustments: [],
			checkout_charge: {
				value_type: 'percentage',
				value: 10
			}
		}
	},
	properties: {
		_is_preorder: 'Pre-order item',
		_preorder_locale: 'en'
	}
};
const mockCartItemWithMultipleItemsOfTheSame= {
	"id": 54488371429724,
	"quantity": 2,
	"variant_id": 54488371429724,
	"key": "54488371429724:bcb6eca7647a629c5c89abe37193cafa",
	"title": "test test - Silver Grey / S",
	"product_title": "test test",
	"variant_title": "Silver Grey / S",
	"price": 15000,
	"original_price": 15000,
	"discounted_price": 12750,
	"line_price": 25500,
	"original_line_price": 30000,
	"presentment_price": 150,
	"total_discount": 4500,
	"discounts": [
		{
			"amount": 4500,
			"title": "Test market discount"
		}
	],
	"sku": "",
	"grams": 0,
	"vendor": "The Knotty Ones",
	"taxable": true,
	"product_id": 7485371416819,
	"product_has_only_default_variant": false,
	"gift_card": false,
	"final_price": 12750,
	"final_line_price": 25500,
	"url": "/products/test-test?selling_plan=691847168348&variant=54488371429724",
	"featured_image": {
		"alt": "test test",
		"aspect_ratio": 0.8,
		"height": 1000,
		"url": "https://cdn.shopify.com/s/files/1/1243/8188/products/test-test-591867.jpg?v=1746666198",
		"width": 800
	},
	"image": "https://cdn.shopify.com/s/files/1/1243/8188/products/test-test-591867.jpg?v=1746666198",
	"handle": "test-test",
	"requires_shipping": true,
	"product_type": "",
	"untranslated_product_title": "test test",
	"product_description": "Description.",
	"untranslated_variant_title": "Silver Grey / S",
	"variant_options": [
		"Silver Grey",
		"S"
	],
	"options_with_values": [
		{
			"name": "Color",
			"value": "Silver Grey"
		},
		{
			"name": "Size",
			"value": "S"
		}
	],
	"line_level_discount_allocations": [
		{
			"amount": 4500,
			"discount_application": {
				"allocation_method": "across",
				"created_at": "2025-07-10T13:23:47.084Z",
				"description": null,
				"key": "87734e5c-78bb-4858-a4bd-6a1ae97db39f",
				"target_selection": "entitled",
				"target_type": "line_item",
				"title": "Test market discount",
				"total_allocated_amount": 4500,
				"type": "automatic",
				"value": "15.0",
				"value_type": "percentage"
			}
		}
	],
	"line_level_total_discount": 4500,
	"selling_plan_allocation": {
		"price_adjustments": [],
		"price": 15000,
		"compare_at_price": null,
		"per_delivery_price": 15000,
		"selling_plan": {
			"id": 691847168348,
			"name": "Partial Payment",
			"description": "You will be charged the remaining balance when the product is released on {{ released }}",
			"options": [
				{
					"name": "Payment option",
					"position": 1,
					"value": "Partial Payment"
				}
			],
			"recurring_deliveries": false,
			"price_adjustments": [],
			"checkout_charge": {
				"value_type": "percentage",
				"value": 10
			}
		}
	},
	"properties": {
		"_is_preorder": "Pre-order item",
		"_preorder_locale": "en"
	}
}

test('test', () => {
	const partial = cartItemToPreorderCartItem(mockItemWithPartialPaymentSellingPlan);
	const standard = cartItemToPreorderCartItem(mockCartItemNoPreorderNoSellingPlan);
	const full = cartItemToPreorderCartItem(mockCartItemPreOrderFullPaymentSellingPlan);
	const updateCart = cartItemToPreorderCartItem(mockCartItemAfterCartUpdate);
	const multipleOfTheSame = cartItemToPreorderCartItem(mockCartItemWithMultipleItemsOfTheSame);

	console.log(multipleOfTheSame, mockCartItemWithMultipleItemsOfTheSame);
//	console.log({ partial, standard, full });
});
