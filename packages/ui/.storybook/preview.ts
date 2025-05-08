import type { Preview } from '@storybook/svelte';
import { marketCurrency } from '../src/lib/store/currency';

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i
			}
		}
	}
};

export default preview;
