import type { Market } from './types';

/**
 * Configuration for available markets
 * Markets are processed in the order they appear in this array
 */
export const MARKETS: Market[] = [
	{ id: 'US', name: 'United States' },
	{ id: 'CA', name: 'Canada' },
	{ id: 'UK', name: 'United Kingdom' },
	{ id: 'LT', name: 'Lithuania' },
	{ id: 'AU', name: 'Australia' },

	// Additional Shopify markets (commented out)
	// European Markets
	// { id: 'EU', name: 'European Union' },
	// { id: 'DE', name: 'Germany' },
	// { id: 'FR', name: 'France' },
	// { id: 'ES', name: 'Spain' },
	// { id: 'IT', name: 'Italy' },
	// { id: 'NL', name: 'Netherlands' },
	// { id: 'BE', name: 'Belgium' },
	// { id: 'AT', name: 'Austria' },
	// { id: 'SE', name: 'Sweden' },
	// { id: 'DK', name: 'Denmark' },
	// { id: 'NO', name: 'Norway' },
	// { id: 'FI', name: 'Finland' },
	// { id: 'PL', name: 'Poland' },
	// { id: 'IE', name: 'Ireland' },
	// { id: 'PT', name: 'Portugal' },
	// { id: 'GR', name: 'Greece' },
	// { id: 'CZ', name: 'Czech Republic' },
	// { id: 'RO', name: 'Romania' },
	// { id: 'HU', name: 'Hungary' },
	// { id: 'BG', name: 'Bulgaria' },
	// { id: 'HR', name: 'Croatia' },
	// { id: 'SK', name: 'Slovakia' },
	// { id: 'SI', name: 'Slovenia' },

	// Asia-Pacific Markets
	// { id: 'JP', name: 'Japan' },
	// { id: 'SG', name: 'Singapore' },
	// { id: 'NZ', name: 'New Zealand' },
	// { id: 'HK', name: 'Hong Kong' },
	// { id: 'KR', name: 'South Korea' },
	// { id: 'TW', name: 'Taiwan' },
	// { id: 'TH', name: 'Thailand' },
	// { id: 'MY', name: 'Malaysia' },
	// { id: 'PH', name: 'Philippines' },
	// { id: 'ID', name: 'Indonesia' },
	// { id: 'VN', name: 'Vietnam' },
	// { id: 'IN', name: 'India' },

	// Americas Markets
	// { id: 'MX', name: 'Mexico' },
	// { id: 'BR', name: 'Brazil' },
	// { id: 'AR', name: 'Argentina' },
	// { id: 'CL', name: 'Chile' },
	// { id: 'CO', name: 'Colombia' },
	// { id: 'PE', name: 'Peru' },

	// Middle East & Africa Markets
	// { id: 'AE', name: 'United Arab Emirates' },
	// { id: 'SA', name: 'Saudi Arabia' },
	// { id: 'IL', name: 'Israel' },
	// { id: 'ZA', name: 'South Africa' },

	// Other Markets
	// { id: 'CH', name: 'Switzerland' },
	// { id: 'IS', name: 'Iceland' },
	// { id: 'RU', name: 'Russia' },
	// { id: 'TR', name: 'Turkey' }
];

/**
 * Get all configured markets
 * Returns markets in the order they should be processed
 */
export function getAvailableMarkets(): Market[] {
	return MARKETS;
}

