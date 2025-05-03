export interface RecommendationsProductsGETResponse {
	id: number
	title: string
	handle: string
	description: string
	published_at: string
	created_at: string
	vendor: string
	type: string
	tags: string[]
	price: number
	price_min: number
	price_max: number
	available: boolean
	price_varies: boolean
	compare_at_price: number
	compare_at_price_min: number
	compare_at_price_max: number
	compare_at_price_varies: boolean
	variants: Variant[]
	images: string[]
	featured_image: string
	options: string[]
	media: Medum[]
	requires_selling_plan: boolean
	selling_plan_groups: any[]
	content: string
}

export interface Variant {
	id: number
	title: string
	option1: string
	option2: string
	option3: any
	sku: string
	requires_shipping: boolean
	taxable: boolean
	featured_image: any
	available: boolean
	name: string
	public_title: string
	options: string[]
	price: number
	weight: number
	compare_at_price: number
	inventory_quantity: number
	inventory_management: string
	inventory_policy: string
	barcode: string
	requires_selling_plan: boolean
	selling_plan_allocations: any[]
}

export interface Medum {
	alt: any
	id: number
	position: number
	preview_image: PreviewImage
	aspect_ratio: number
	height?: number
	media_type: string
	src?: string
	width?: number
	duration?: number
	sources?: Source[]
}

export interface PreviewImage {
	aspect_ratio: number
	height: number
	width: number
	src: string
}

export interface Source {
	format: string
	height: number
	mime_type: string
	url: string
	width: number
}
