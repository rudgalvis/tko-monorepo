// rollup.config.js
import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/lib/index.ts',
	output: {
		file: 'public/bundle.js',
		format: 'iife',
		name: 'app'
	},
	plugins: [
		svelte({
			extensions: ['.svelte'],
			include: 'src/components/**/*.svelte',
			preprocess: {
				style: ({ content }) => {
					return transformStyles(content);
				}
			},
			emitCss: false,
			onwarn: (warning, handler) => {
				if (warning.code === 'a11y-distracting-elements') return;
				handler(warning);
			},
			compilerOptions: {
				generate: 'ssr',
				hydratable: true,
				customElement: false
			}
		}),
		resolve({
			browser: true,
			exportConditions: ['svelte'],
			extensions: ['.js', '.ts', '.svelte']
		}),
		commonjs(),
		typescript({
			sourceMap: !production,
			inlineSources: !production
		})
	]
};
