import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { PricingCacheService } from '$lib/cache/pricing'

const pricingCacheService = new PricingCacheService()

export const GET: RequestHandler = async ({ url }) => {
    const stop = url.searchParams.get('stop') === 'true'

    if (stop) {
        await pricingCacheService.stopCaching()
        return json(pricingCacheService.getCacheMeta())
        return new Response('Caching stopped', { status: 200 })
    }

    const result = await pricingCacheService.getCacheMeta()

    return json(result)
}


// https://factual-joey-sharp.ngrok-free.app/api/products/cache-prices
// https://factual-joey-sharp.ngrok-free.app/api/products/cache-meta
// https://factual-joey-sharp.ngrok-free.app/api/products/cache-meta?stop=true