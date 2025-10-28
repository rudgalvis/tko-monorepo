import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const SESSION_COOKIE_NAME = 'price-cache-session';

export const POST: RequestHandler = async ({ cookies }) => {
	// Clear the session cookie
	cookies.delete(SESSION_COOKIE_NAME, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: process.env.NODE_ENV === 'production'
	});
	
	throw redirect(303, '/login');
};

