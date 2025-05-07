import { defineConfig, loadEnv } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { sveltePreprocess } from 'svelte-preprocess';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { viteSingleFile } from 'vite-plugin-singlefile';
//@ts-expect-error ...
import tailwindcss from '@tailwindcss/vite';
//@ts-expect-error ...
import path from 'path';

// Custom plugin to provide virtual $env/static/public module
function envPublicPlugin(publicEnv) {
	const virtualModuleId = '$env/static/public';
	const resolvedVirtualModuleId = '\0' + virtualModuleId;

	return {
		name: 'vite-plugin-env-public',
		resolveId(id) {
			if (id === virtualModuleId) {
				return resolvedVirtualModuleId;
			}
		},
		load(id) {
			if (id === resolvedVirtualModuleId) {
				// Generate exports for all PUBLIC_ variables
				return Object.entries(publicEnv)
					.map(([key, value]) => `export const ${key} = ${JSON.stringify(value)};`)
					.join('\n');
			}
		}
	};
}

export default defineConfig(({ mode }) => {
	// Load env file based on `mode`
	const env = loadEnv(mode, process.cwd(), '');

	// Filter out PUBLIC_ prefixed env variables
	const publicEnv = Object.entries(env).reduce((acc, [key, val]) => {
		if (key.startsWith('PUBLIC_')) {
			acc[key] = val;
		}
		return acc;
	}, {});
	return {
		plugins: [
			envPublicPlugin(publicEnv),
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
	};
});
