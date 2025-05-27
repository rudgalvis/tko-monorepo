import { corsHandle } from '$lib/hooks/cors'
import { sequence } from '@sveltejs/kit/hooks'

// Combine all handles in sequence
export const handle = sequence(
	corsHandle // CORS handling first
)
