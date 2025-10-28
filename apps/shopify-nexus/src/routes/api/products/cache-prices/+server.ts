import type { RequestHandler } from './$types'
import { PriceCachingController } from '$lib/modules/price-caching/PriceCachingController'
import { json } from '@sveltejs/kit'

const controller = new PriceCachingController()
await controller.initialize()

export const GET: RequestHandler = async ({url}) => {
    const start = url.searchParams.get('start') === 'true'
    
    if(start) controller.startCaching()

    const status = await controller.getStatus()
    return json(status)
}

