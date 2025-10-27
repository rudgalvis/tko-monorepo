import type { RequestHandler } from './$types'
import { PricingCacheService } from '$lib/cache/pricing'

const pricingCacheService = new PricingCacheService()

export const GET: RequestHandler = async () => {
    const result = await pricingCacheService.startCaching()
    
    if (!result.success) {
        return new Response(result.message, { status: 400 })
    }

    return new Response(result.message)
}
