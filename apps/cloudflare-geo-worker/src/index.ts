/**
 * Cloudflare Worker for Geolocation Detection
 * Returns user's location based on IP address using Cloudflare's edge network
 * 
 * @author Rokas Rudgalvis
 */

export interface Env {
	// Define environment variables here if needed
	// Example: API_KEY: string;
}

interface GeoData {
	country: string | null;
	countryName: string | null;
	city: string | null;
	region: string | null;
	regionCode: string | null;
	timezone: string | null;
	latitude: string | null;
	longitude: string | null;
	postalCode: string | null;
	continent: string | null;
	asn: number | null;
	colo: string | null;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		// CORS headers - adjust origin for production security
		const corsHeaders = {
			'Access-Control-Allow-Origin': '*', // Change to your domain in production
			'Access-Control-Allow-Methods': 'GET, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type',
			'Content-Type': 'application/json',
		};

		// Handle preflight requests
		if (request.method === 'OPTIONS') {
			return new Response(null, {
				headers: corsHeaders,
				status: 204,
			});
		}

		// Only allow GET requests
		if (request.method !== 'GET') {
			return new Response(
				JSON.stringify({ 
					error: 'Method not allowed',
					message: 'Only GET requests are supported'
				}),
				{
					status: 405,
					headers: corsHeaders,
				}
			);
		}

		// Extract geolocation data from Cloudflare's request object
		const cf = request.cf;

		// Build response with all available geo data
		const geoData: GeoData = {
			country: (cf?.country as string) || null,
			countryName: getCountryName(cf?.country as string),
			city: (cf?.city as string) || null,
			region: (cf?.region as string) || null,
			regionCode: (cf?.regionCode as string) || null,
			timezone: (cf?.timezone as string) || null,
			latitude: (cf?.latitude as string) || null,
			longitude: (cf?.longitude as string) || null,
			postalCode: (cf?.postalCode as string) || null,
			continent: (cf?.continent as string) || null,
			asn: (cf?.asn as number) || null,
			colo: (cf?.colo as string) || null, // Cloudflare datacenter code
		};

		// Add cache header for performance (1 hour cache)
		const headers = {
			...corsHeaders,
			'Cache-Control': 'public, max-age=3600',
		};

		return new Response(JSON.stringify(geoData, null, 2), {
			status: 200,
			headers,
		});
	},
};

/**
 * Helper function to convert country code to full country name
 * Expand this list as needed for your use case
 */
function getCountryName(code?: string): string | null {
	if (!code) return null;

	const countries: Record<string, string> = {
		// Europe
		'AT': 'Austria',
		'BE': 'Belgium',
		'BG': 'Bulgaria',
		'HR': 'Croatia',
		'CY': 'Cyprus',
		'CZ': 'Czech Republic',
		'DK': 'Denmark',
		'EE': 'Estonia',
		'FI': 'Finland',
		'FR': 'France',
		'DE': 'Germany',
		'GR': 'Greece',
		'HU': 'Hungary',
		'IE': 'Ireland',
		'IT': 'Italy',
		'LV': 'Latvia',
		'LT': 'Lithuania',
		'LU': 'Luxembourg',
		'MT': 'Malta',
		'NL': 'Netherlands',
		'PL': 'Poland',
		'PT': 'Portugal',
		'RO': 'Romania',
		'SK': 'Slovakia',
		'SI': 'Slovenia',
		'ES': 'Spain',
		'SE': 'Sweden',
		'GB': 'United Kingdom',
		'CH': 'Switzerland',
		'NO': 'Norway',
		'IS': 'Iceland',

		// North America
		'US': 'United States',
		'CA': 'Canada',
		'MX': 'Mexico',

		// South America
		'AR': 'Argentina',
		'BR': 'Brazil',
		'CL': 'Chile',
		'CO': 'Colombia',
		'PE': 'Peru',
		'VE': 'Venezuela',

		// Asia
		'CN': 'China',
		'JP': 'Japan',
		'KR': 'South Korea',
		'IN': 'India',
		'ID': 'Indonesia',
		'TH': 'Thailand',
		'VN': 'Vietnam',
		'PH': 'Philippines',
		'SG': 'Singapore',
		'MY': 'Malaysia',
		'TW': 'Taiwan',
		'HK': 'Hong Kong',

		// Oceania
		'AU': 'Australia',
		'NZ': 'New Zealand',

		// Middle East
		'AE': 'United Arab Emirates',
		'SA': 'Saudi Arabia',
		'IL': 'Israel',
		'TR': 'Turkey',

		// Africa
		'ZA': 'South Africa',
		'EG': 'Egypt',
		'NG': 'Nigeria',
		'KE': 'Kenya',
	};

	return countries[code] || code;
}



