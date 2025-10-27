import { FlatCache } from 'flat-cache'
import type { RequestHandler } from './$types'
import { json } from '@sveltejs/kit'
import { StorefrontApi } from 'storefront-api'

export const GET: RequestHandler = async () => {
    const KEY = 'availableVariantIds'
    const cache = new FlatCache({ttl: 24 * 60 * 60 * 1000})
    cache.load()

    const cached = cache.getKey(KEY)

    if(cached) return json({meta: {cached: true}, data: cached})

    // Fetch
    const storefrontApi = new StorefrontApi()

    const variantIds = await storefrontApi.getAllAvailableVariantIds(100)

    cache.setKey(KEY, variantIds)
    cache.save(true)

    return json({ meta: {cached: false}, data: variantIds })
}
