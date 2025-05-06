import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { sveltePreprocess } from 'svelte-preprocess';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { viteSingleFile } from 'vite-plugin-singlefile';
//@ts-expect-error ...
import tailwindcss from '@tailwindcss/vite';
//@ts-expect-error ...
import path from 'path';

export default defineConfig({
	plugins: [
		tailwindcss(),
		svelte({
			preprocess: sveltePreprocess({}),
			exclude: ['**/*.component.svelte'], // Convert RegExp to string
			emitCss: true,
			compilerOptions: {
				customElement: true
			}
		}),
		svelte({
			preprocess: sveltePreprocess(),
			include: ['**/*.component.svelte'], // Convert RegExp to string
			compilerOptions: {
				customElement: true
			},
			emitCss: true
		}),
		viteStaticCopy({
			targets: [{ src: 'static/assets/rr*', dest: '../../../shopify-theme/assets' }]
		}),
		viteSingleFile() // Outputs everything to a single file
	],
	resolve: {
		// Make sures $lib imports is working
		alias: {
			$lib: path.resolve(__dirname, 'src/lib')
		}
	},
	css: {
		preprocessorOptions: {
			scss: {
				api: 'modern-compiler' // or "modern"
			}
		}
	},
	build: {
		sourcemap: false,
		target: 'modules',
		outDir: 'static/assets',
		lib: {
			entry: 'src/lib/index.ts',
			name: 'rr-custom',
			fileName: 'rr-custom'
		},
		rollupOptions: {
			output: {
				assetFileNames: (assetInfo) => {
					if (assetInfo.name === 'style.css') return 'rr-custom.css';
					return assetInfo.name;
				}
			}
		}
	}
});
