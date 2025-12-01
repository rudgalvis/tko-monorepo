import type { Handle } from '@sveltejs/kit';

// Whitelist of allowed origins
const ALLOWED_ORIGINS = [
	'http://127.0.0.1:9292',
	'http://localhost:6006',
	'http://localhost:3000',
	'http://localhost:5173',
	'https://www.theknottyones.com',
];

// You can also use environment variables
const getWhitelist = (): string[] => {
	const envOrigins = process.env.CORS_WHITELIST?.split(',') || [];
	return [...ALLOWED_ORIGINS, ...envOrigins];
};

export const corsHandle: Handle = async ({ event, resolve }) => {
	const whitelist = getWhitelist();
	const origin = event.request.headers.get('origin');

	// Check if the request is for an API route
	if (event.url.pathname.startsWith('/api')) {
		const isAllowedOrigin = origin && whitelist.includes(origin);

		// Handle preflight requests
		if (event.request.method === 'OPTIONS') {
			return new Response(null, {
				status: 200,
				headers: {
					'Access-Control-Allow-Origin': isAllowedOrigin ? origin : '',
					'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
					'Access-Control-Allow-Headers': '*',
					'Access-Control-Allow-Credentials': 'true',
					'Vary': 'Origin'
				}
			});
		}
	}

	const response = await resolve(event);

	// Add CORS headers to API responses
	if (event.url.pathname.startsWith('/api') && origin) {
		const isAllowedOrigin = whitelist.includes(origin);

		if (isAllowedOrigin) {
			response.headers.set('Access-Control-Allow-Origin', origin);
			response.headers.set('Access-Control-Allow-Credentials', 'true');
		}
		response.headers.set('Vary', 'Origin');
	}

	return response;
};