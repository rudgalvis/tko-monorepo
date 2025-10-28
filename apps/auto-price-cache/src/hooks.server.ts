import { type Handle, redirect, type Cookies } from '@sveltejs/kit';
import { DASHBOARD_PASSWORD } from '$env/static/private';

const SECRET_PASSWORD = DASHBOARD_PASSWORD;
const SESSION_COOKIE_NAME = 'price-cache-session';

// Bearer token for API authentication
const API_BEARER_TOKEN = DASHBOARD_PASSWORD;

// Simple session validation
function isAuthenticated(cookies: Cookies): boolean {
	const session = cookies.get(SESSION_COOKIE_NAME);
	return session === SECRET_PASSWORD;
}

// Check bearer token authentication
function isBearerTokenValid(authHeader: string | null): boolean {
	if (!authHeader) return false;
	
	// Extract token from "Bearer <token>" format, handling any whitespace
	const match = authHeader.match(/^Bearer\s+(.+)$/i);
	if (!match) return false;
	
	const token = match[1].trim();
	
	return token === API_BEARER_TOKEN;
}

// Public routes that don't require authentication
const publicRoutes = ['/login'];

// API routes that accept bearer token authentication
const apiRoutes = ['/api/'];

export const handle: Handle = async ({ event, resolve }) => {
	const { url, cookies, request } = event;
	
	// Check if this is an API route
	const isApiRoute = apiRoutes.some(route => url.pathname.startsWith(route));
	
	// For API routes, check bearer token first
	if (isApiRoute) {
		const authHeader = request.headers.get('Authorization');
		if (isBearerTokenValid(authHeader)) {
			event.locals.authenticated = true;
			return resolve(event);
		} else {
			// For API routes, return 401 if Bearer token is invalid
			return new Response('Unauthorized', { status: 401 });
		}
	}
	
	// Check if user is authenticated via cookie
	const authenticated = isAuthenticated(cookies);
	
	// Store auth state in locals for use in pages
	event.locals.authenticated = authenticated;
	
	// Allow public routes
	if (publicRoutes.some(route => url.pathname === route)) {
		return resolve(event);
	}
	
	// Redirect to login if not authenticated
	if (!authenticated) {
		throw redirect(303, '/login');
	}
	
	return resolve(event);
};

