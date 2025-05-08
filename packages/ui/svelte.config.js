import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { sass } from "svelte-preprocess";
import { fileURLToPath } from 'url';
import path from 'path';

const filePath = path.dirname(fileURLToPath(import.meta.url));
const sassPath = path.resolve(filePath, 'src/lib/styles');

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [
		vitePreprocess(),
		sass({
			includePaths: [sassPath],
			// prependData: `@use 'src/lib/styles/global.scss' as *;`
		})
	],

	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter(),
		alias: {
			$styles:  'src/lib/styles'
		},
		env: {
			dir: '../..'
		}
	},

	compilerOptions: {
		customElement: true
	}
};

export default config;
