import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	css: {
		preprocessorOptions: {
			scss: {
				api: 'modern-compiler' // or "modern",
			}
		}
	},
	resolve: {
		alias: {
			'@': path.resolve('src') // Styles in src/styles will be accessible as '@/styles/whatever.scss'
		}
	}
});
