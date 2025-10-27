import type { RequestHandler } from './$types'
import { json } from '@sveltejs/kit'
import { FileStorageService } from '$lib/services/FileStorageService'
import { StorefrontApi } from 'storefront-api'


export const GET: RequestHandler = async () => {
    const storageKey = 'available-variant-ids'
    const storage = new FileStorageService(storageKey, 1000 * 60 * 60 * 24)

    // Serve cached
    const cached = storage.get<string[]>(storageKey)

    if(cached) {
        return json(cached)
    }

    // Serve fresh
    const storefrontApi = new StorefrontApi()
    const variantIds = await storefrontApi.getAllAvailableVariantIds(100)

    storage.set(storageKey, variantIds)

    return json(variantIds)
}
