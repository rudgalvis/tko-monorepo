import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import {DASHBOARD_PASSWORD} from '$env/static/private';

const SECRET_PASSWORD = DASHBOARD_PASSWORD;
const SESSION_COOKIE_NAME = 'price-cache-session';

export const load: PageServerLoad = async ({ locals }) => {
	// If already authenticated, redirect to home
	if (locals.authenticated) {
		throw redirect(303, '/');
	}
	return {};
};

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const password = data.get('password');

		if (!password || typeof password !== 'string') {
			return fail(400, { error: 'Password is required' });
		}

		if (password !== SECRET_PASSWORD) {
			return fail(401, { error: 'Invalid password' });
		}

		// Set session cookie
		cookies.set(SESSION_COOKIE_NAME, SECRET_PASSWORD, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 60 * 24 * 7 // 7 days
		});

		throw redirect(303, '/');
	}
} satisfies Actions;

