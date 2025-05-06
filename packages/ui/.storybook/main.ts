import type { StorybookConfig } from '@storybook/sveltekit';

const config: StorybookConfig = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|ts|svelte)'],
	addons: [
		{
			name: '@storybook/addon-svelte-csf',
			options: {
				legacyTemplate: true, // Enables the legacy template syntax
			},
		},
		'@storybook/addon-essentials',
		'@chromatic-com/storybook',
		'@storybook/addon-interactions'
	],
	framework: {
		name: '@storybook/sveltekit',
		options: {}
	}
};
export default config;
