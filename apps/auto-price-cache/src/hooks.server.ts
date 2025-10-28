import { type Handle, redirect, type Cookies } from '@sveltejs/kit';
import {DASHBOARD_PASSWORD} from '$env/static/private';

const SECRET_PASSWORD = DASHBOARD_PASSWORD;
const SESSION_COOKIE_NAME = 'price-cache-session';

// Simple session validation
function isAuthenticated(cookies: Cookies): boolean {
	const session = cookies.get(SESSION_COOKIE_NAME);
	return session === SECRET_PASSWORD;
}

// Public routes that don't require authentication
const publicRoutes = ['/login'];

export const handle: Handle = async ({ event, resolve }) => {
	const { url, cookies } = event;
	
	// Check if user is authenticated
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

