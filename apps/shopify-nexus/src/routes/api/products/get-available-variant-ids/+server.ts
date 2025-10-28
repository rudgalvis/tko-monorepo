import type { RequestHandler } from './$types'
import { json } from '@sveltejs/kit'
import { FlatCache } from 'flat-cache'
import { StorefrontApi } from 'storefront-api'

const cache = new FlatCache({ttl: 3600 * 1000})



export const GET: RequestHandler = async () => {
    console.log('getting var ids')

    cache.load()
    const storageKey = 'available-variant-ids'

    // Serve cached
    const cached = cache.get<string[]>(storageKey)

    if(cached) {
        return json(cached)
    }

    // Serve fresh
    const storefrontApi = new StorefrontApi()
    const variantIds = await storefrontApi.getAllAvailableVariantIds(100)

    cache.set(storageKey, variantIds)
    cache.save()

    return json(variantIds)
}
