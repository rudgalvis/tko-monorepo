import { describe, it, expect, vi, beforeEach } from 'vitest';
import { 
	getUserCountry, 
	getUserCountryFromRequest, 
	extractClientIP,
	getGeoDataFromRequest 
} from '$lib/modules/geolocating/geolocation';
import type { RequestEvent } from '@sveltejs/kit';

// Mock fetch globally
global.fetch = vi.fn();

describe('Geolocation Module', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe('getUserCountry', () => {
		it('should return country code from Cloudflare Worker', async () => {
			const mockResponse = {
				country: 'LT',
				countryName: 'Lithuania',
				city: 'Vilnius',
			};

			(global.fetch as any).mockResolvedValueOnce({
				ok: true,
				json: async () => mockResponse,
			});

			const result = await getUserCountry();
			expect(result).toBe('LT');
			expect(global.fetch).toHaveBeenCalledWith('https://geo-location.rokas-239.workers.dev');
		});

		it('should return null on fetch error', async () => {
			(global.fetch as any).mockRejectedValueOnce(new Error('Network error'));

			const result = await getUserCountry();
			expect(result).toBeNull();
		});

		it('should return null on non-ok response', async () => {
			(global.fetch as any).mockResolvedValueOnce({
				ok: false,
				status: 500,
			});

			const result = await getUserCountry();
			expect(result).toBeNull();
		});
	});

	describe('extractClientIP', () => {
		it('should extract IP from getClientAddress()', () => {
			const mockEvent = {
				getClientAddress: vi.fn(() => '192.168.1.1'),
				request: new Request('https://example.com'),
			} as unknown as RequestEvent;

			const ip = extractClientIP(mockEvent);
			expect(ip).toBe('192.168.1.1');
		});

		it('should extract IP from CF-Connecting-IP header', () => {
			const headers = new Headers();
			headers.set('CF-Connecting-IP', '203.0.113.1');

			const mockEvent = {
				getClientAddress: vi.fn(() => ''),
				request: new Request('https://example.com', { headers }),
			} as unknown as RequestEvent;

			const ip = extractClientIP(mockEvent);
			expect(ip).toBe('203.0.113.1');
		});

		it('should extract IP from X-Forwarded-For header (first IP)', () => {
			const headers = new Headers();
			headers.set('X-Forwarded-For', '192.168.1.1, 10.0.0.1');

			const mockEvent = {
				getClientAddress: vi.fn(() => ''),
				request: new Request('https://example.com', { headers }),
			} as unknown as RequestEvent;

			const ip = extractClientIP(mockEvent);
			expect(ip).toBe('192.168.1.1');
		});

		it('should extract IP from X-Real-IP header', () => {
			const headers = new Headers();
			headers.set('X-Real-IP', '198.51.100.1');

			const mockEvent = {
				getClientAddress: vi.fn(() => ''),
				request: new Request('https://example.com', { headers }),
			} as unknown as RequestEvent;

			const ip = extractClientIP(mockEvent);
			expect(ip).toBe('198.51.100.1');
		});

		it('should return null when no IP can be extracted', () => {
			const mockEvent = {
				getClientAddress: vi.fn(() => ''),
				request: new Request('https://example.com'),
			} as unknown as RequestEvent;

			const ip = extractClientIP(mockEvent);
			expect(ip).toBeNull();
		});
	});

	describe('getUserCountryFromRequest', () => {
		it('should proxy client IP to Cloudflare Worker', async () => {
			const mockResponse = {
				country: 'US',
				countryName: 'United States',
			};

			const mockEvent = {
				getClientAddress: vi.fn(() => '192.168.1.1'),
				request: new Request('https://example.com'),
			} as unknown as RequestEvent;

			(global.fetch as any).mockResolvedValueOnce({
				ok: true,
				json: async () => mockResponse,
			});

			const result = await getUserCountryFromRequest(mockEvent);
			expect(result).toBe('US');
			expect(global.fetch).toHaveBeenCalledWith(
				expect.stringContaining('https://geo-location.rokas-239.workers.dev?ip=192.168.1.1')
			);
		});

		it('should return null when client IP cannot be extracted', async () => {
			const mockEvent = {
				getClientAddress: vi.fn(() => ''),
				request: new Request('https://example.com'),
			} as unknown as RequestEvent;

			const result = await getUserCountryFromRequest(mockEvent);
			expect(result).toBeNull();
			expect(global.fetch).not.toHaveBeenCalled();
		});

		it('should return null on fetch error', async () => {
			const mockEvent = {
				getClientAddress: vi.fn(() => '192.168.1.1'),
				request: new Request('https://example.com'),
			} as unknown as RequestEvent;

			(global.fetch as any).mockRejectedValueOnce(new Error('Network error'));

			const result = await getUserCountryFromRequest(mockEvent);
			expect(result).toBeNull();
		});
	});

	describe('getGeoDataFromRequest', () => {
		it('should return full geo data object', async () => {
			const mockResponse = {
				country: 'LT',
				countryName: 'Lithuania',
				city: 'Vilnius',
				region: 'Vilnius',
				regionCode: 'VL',
				timezone: 'Europe/Vilnius',
				latitude: '54.68916',
				longitude: '25.2798',
				postalCode: '01001',
				continent: 'EU',
				asn: null,
				colo: null,
			};

			const mockEvent = {
				getClientAddress: vi.fn(() => '192.168.1.1'),
				request: new Request('https://example.com'),
			} as unknown as RequestEvent;

			(global.fetch as any).mockResolvedValueOnce({
				ok: true,
				json: async () => mockResponse,
			});

			const result = await getGeoDataFromRequest(mockEvent);
			expect(result).toEqual(mockResponse);
			expect(global.fetch).toHaveBeenCalledWith(
				expect.stringContaining('https://geo-location.rokas-239.workers.dev?ip=192.168.1.1')
			);
		});
	});
});