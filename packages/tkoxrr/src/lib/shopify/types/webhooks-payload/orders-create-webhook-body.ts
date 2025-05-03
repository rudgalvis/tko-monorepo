import { s } from 'vitest/dist/chunks/reporters.d.CfRkRKN2'

export type OrdersCreateWebhookBody = {
	id: number
	admin_graphql_api_id: string
	app_id: number
	browser_ip: string
	buyer_accepts_marketing: boolean
	cancel_reason: null
	cancelled_at: null
	cart_token: null
	checkout_id: number
	checkout_token: string
	client_details: ClientDetails
	closed_at: null
	company: null
	confirmation_number: string
	confirmed: boolean
	contact_email: null
	created_at: Date
	currency: Currency
	current_shipping_price_set: Set
	current_subtotal_price: string
	current_subtotal_price_set: Set
	current_total_additional_fees_set: null
	current_total_discounts: string
	current_total_discounts_set: Set
	current_total_duties_set: null
	current_total_price: string
	current_total_price_set: Set
	current_total_tax: string
	current_total_tax_set: Set
	customer_locale: string
	device_id: null
	discount_codes: any[]
	duties_included: boolean
	email: string
	estimated_taxes: boolean
	financial_status: string
	fulfillment_status: null
	landing_site: null
	landing_site_ref: null
	location_id: number
	merchant_business_entity_id: string
	merchant_of_record_app_id: null
	name: string
	note: null
	note_attributes: any[]
	number: number
	order_number: number
	order_status_url: string
	original_total_additional_fees_set: null
	original_total_duties_set: null
	payment_gateway_names: string[]
	phone: null
	po_number: null
	presentment_currency: Currency
	processed_at: Date
	reference: null
	referring_site: null
	source_identifier: null
	source_name: string
	source_url: null
	subtotal_price: string
	subtotal_price_set: Set
	tags: string
	tax_exempt: boolean
	tax_lines: TaxLine[]
	taxes_included: boolean
	test: boolean
	token: string
	total_cash_rounding_payment_adjustment_set: Set
	total_cash_rounding_refund_adjustment_set: Set
	total_discounts: string
	total_discounts_set: Set
	total_line_items_price: string
	total_line_items_price_set: Set
	total_outstanding: string
	total_price: string
	total_price_set: Set
	total_shipping_price_set: Set
	total_tax: string
	total_tax_set: Set
	total_tip_received: string
	total_weight: number
	updated_at: Date
	user_id: number
	billing_address: null
	customer?: {
		email: string
		first_name: string
	}
	discount_applications: any[]
	fulfillments: any[]
	line_items: LineItem[]
	payment_terms: null
	refunds: any[]
	shipping_address: null
	shipping_lines: any[]
	returns: any[]
}

export type ClientDetails = {
	accept_language: null
	browser_height: null
	browser_ip: string
	browser_width: null
	session_hash: null
	user_agent: string
}

export enum Currency {
	Eur = 'EUR',
}

export type Set = {
	shop_money: Money
	presentment_money: Money
}

export type Money = {
	amount: string
	currency_code: Currency
}

export type LineItem = {
	id: number
	admin_graphql_api_id: string
	attributed_staffs: any[]
	current_quantity: number
	fulfillable_quantity: number
	fulfillment_service: string
	fulfillment_status: null
	gift_card: boolean
	grams: number
	name: string
	price: string
	price_set: Set
	product_exists: boolean
	product_id: number
	properties: any[]
	quantity: number
	requires_shipping: boolean
	sales_line_item_group_id: null
	sku: string
	taxable: boolean
	title: string
	total_discount: string
	total_discount_set: Set
	variant_id: number
	variant_inventory_management: string
	variant_title: string
	vendor: string
	tax_lines: TaxLine[]
	duties: any[]
	discount_allocations: any[]
}

export type TaxLine = {
	channel_liable: boolean
	price: string
	price_set: Set
	rate: number
	title: string
}
