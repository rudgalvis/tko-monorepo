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

		// Check if IP parameter is provided (for proxied requests)
		const url = new URL(request.url);
		const providedIP = url.searchParams.get('ip') || request.headers.get('X-Client-IP');

		let geoData: GeoData;

		if (providedIP) {
			// Validate IP format
			if (!isValidIP(providedIP)) {
				return new Response(
					JSON.stringify({
						error: 'Invalid IP address',
						message: 'The provided IP address is not valid'
					}),
					{
						status: 400,
						headers: corsHeaders,
					}
				);
			}

			// Lookup IP using external geolocation API
			try {
				geoData = await getGeoDataFromIP(providedIP);
			} catch (error) {
				return new Response(
					JSON.stringify({
						error: 'Geolocation lookup failed',
						message: 'Failed to retrieve geolocation data for the provided IP'
					}),
					{
						status: 500,
						headers: corsHeaders,
					}
				);
			}
		} else {
			// Extract geolocation data from Cloudflare's request object (direct client request)
			const cf = request.cf;

			// Build response with all available geo data
			geoData = {
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
		}

		// Prevent caching to ensure fresh geolocation data on every request
		// Important: Users may change location (VPN, travel) and need immediate updates
		const headers = {
			...corsHeaders,
			'Cache-Control': 'no-cache, no-store, must-revalidate, private',
			'Pragma': 'no-cache',
			'Expires': '0',
		};

		return new Response(JSON.stringify(geoData, null, 2), {
			status: 200,
			headers,
		});
	},
};

/**
 * Validate IP address format (IPv4 or IPv6)
 */
function isValidIP(ip: string): boolean {
	// IPv4 regex
	const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
	// IPv6 regex (handles compressed, expanded, and mixed formats)
	const ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:)*::([0-9a-fA-F]{1,4}:)*[0-9a-fA-F]{1,4}|::1|::)$/;
	
	if (ipv4Regex.test(ip)) {
		// Validate IPv4 octets are in range
		const parts = ip.split('.');
		return parts.length === 4 && parts.every(part => {
			const num = parseInt(part, 10);
			return !isNaN(num) && num >= 0 && num <= 255;
		});
	}
	
	// Basic IPv6 validation (more lenient for edge cases)
	if (ip.includes(':')) {
		// Check for valid IPv6 format
		const parts = ip.split(':');
		// IPv6 should have at most 8 parts (or fewer with :: compression)
		if (parts.length > 8) return false;
		// Check for valid hex segments
		return parts.every(part => {
			if (part === '') return true; // Allow empty parts for :: compression
			return /^[0-9a-fA-F]{1,4}$/.test(part);
		});
	}
	
	return false;
}

/**
 * Get geolocation data from external API for a given IP address
 * Uses ipapi.co free tier (1000 requests/day)
 */
async function getGeoDataFromIP(ip: string): Promise<GeoData> {
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), 5000);

	try {
		const response = await fetch(`https://ipapi.co/${ip}/json/`, {
			method: 'GET',
			headers: {
				'Accept': 'application/json'
			},
			signal: controller.signal
		});

		clearTimeout(timeout);

		if (!response.ok) {
			throw new Error(`HTTP ${response.status}`);
		}

		const data = await response.json();

		// Handle ipapi.co error responses
		if (data.error) {
			throw new Error(data.reason || 'IP lookup failed');
		}

		// Map ipapi.co response to GeoData format
		return {
			country: data.country_code || null,
			countryName: data.country_name || getCountryName(data.country_code),
			city: data.city || null,
			region: data.region || null,
			regionCode: data.region_code || null,
			timezone: data.timezone || null,
			latitude: data.latitude ? String(data.latitude) : null,
			longitude: data.longitude ? String(data.longitude) : null,
			postalCode: data.postal || null,
			continent: data.continent_code || null,
			asn: data.asn || null,
			colo: null, // Not available from external API
		};
	} catch (error) {
		clearTimeout(timeout);
		throw error;
	}
}

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



