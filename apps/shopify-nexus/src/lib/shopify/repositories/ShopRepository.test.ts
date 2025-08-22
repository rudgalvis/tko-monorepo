import { ShopRepository } from '$lib/shopify/repositories/ShopRepository'
import { test } from 'vitest'

test('test', async () => {
	const shopRepository = new ShopRepository()

	const r = await shopRepository.getShop()

	console.log(r)
})
