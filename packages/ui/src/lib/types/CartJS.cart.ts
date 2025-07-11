export interface CartJSCart {
	note: string
	attributes: Attributes
	original_total_price: number
	total_price: number
	total_discount: number
	total_weight: number
	item_count: number
	requires_shipping: boolean
	currency: string
	items_subtotal_price: number
	cart_level_discount_applications: any[]
	checkout_charge_amount: number
	items: Item[]
	token: string
	discount_codes: any[]
	items_added: any[]
	items_removed: ItemsRemoved[]
}

export interface Attributes {}

export interface Item {
	id: number
	quantity: number
	variant_id: number
	key: string
	title: string
	price: number
	original_price: number
	presentment_price: number
	discounted_price: number
	line_price: number
	original_line_price: number
	total_discount: number
	discounts: Discount[]
	sku: string
	grams: number
	vendor: string
	taxable: boolean
	product_id: number
	product_has_only_default_variant: boolean
	gift_card: boolean
	final_price: number
	final_line_price: number
	url: string
	featured_image: FeaturedImage
	image: string
	handle: string
	requires_shipping: boolean
	product_type: string
	product_title: string
	product_description: string
	variant_title: string
	variant_options: string[]
	options_with_values: OptionsWithValue[]
	line_level_discount_allocations: LineLevelDiscountAllocation[]
	line_level_total_discount: number
	has_components: boolean
	properties: Properties
	selling_plan_allocation?: SellingPlanAllocation
}

export interface Discount {
	amount: number
	title: string
}

export interface FeaturedImage {
	aspect_ratio: number
	alt: string
	height: number
	url: string
	width: number
}

export interface OptionsWithValue {
	name: string
	value: string
}

export interface LineLevelDiscountAllocation {
	amount: number
	discount_application: DiscountApplication
}

export interface DiscountApplication {
	type: string
	key: string
	title: string
	description: any
	value: string
	created_at: string
	value_type: string
	allocation_method: string
	target_selection: string
	target_type: string
	total_allocated_amount: number
}

export interface Properties {
	_is_preorder?: string
	_preorder_locale?: string
}

export interface SellingPlanAllocation {
	price_adjustments: any[]
	price: number
	compare_at_price: any
	per_delivery_price: number
	selling_plan: SellingPlan
}

export interface SellingPlan {
	id: number
	name: string
	description: string
	options: Option[]
	recurring_deliveries: boolean
	fixed_selling_plan: boolean
	price_adjustments: any[]
}

export interface Option {
	name: string
	position: number
	value: string
}

export interface ItemsRemoved {
	product_id: number
	variant_id: number
	id: string
	image: string
	price: string
	presentment_price: number
	quantity: number
	title: string
	product_title: string
	variant_title: string
	vendor: string
	product_type: string
	sku: string
	url: string
	untranslated_product_title: string
	untranslated_variant_title: string
	view_key: string
}
