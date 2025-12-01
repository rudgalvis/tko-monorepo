/**
 * Geolocation data structure matching Cloudflare Worker's GeoData interface
 */
export interface GeoData {
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

