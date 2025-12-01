# Cloudflare Geolocation Worker

A Cloudflare Worker that provides IP-based geolocation detection using Cloudflare's edge network.

## 🌍 Live Endpoint

```
https://geo-location.rokas-239.workers.dev
```

## 📊 Response Format

```json
{
  "country": "LT",
  "countryName": "Lithuania",
  "city": "Vilnius",
  "region": "Vilnius",
  "regionCode": "VL",
  "timezone": "Europe/Vilnius",
  "latitude": "54.68916",
  "longitude": "25.2798",
  "postalCode": "01001",
  "continent": "EU",
  "asn": 1257,
  "colo": "RIX"
}
```

## 🚀 Usage

### From JavaScript/TypeScript

```typescript
async function getUserLocation() {
  const response = await fetch('https://geo-location.rokas-239.workers.dev');
  const data = await response.json();
  return data;
}

// Use it
const location = await getUserLocation();
console.log(`User is in ${location.city}, ${location.country}`);
```

### From Your Backend (SvelteKit)

```typescript
// In any +server.ts or +page.server.ts
export const load = async () => {
  const response = await fetch('https://geo-location.rokas-239.workers.dev');
  const geoData = await response.json();
  
  return {
    userLocation: geoData
  };
};
```

### From cURL

```bash
curl https://geo-location.rokas-239.workers.dev
```

## 📦 Available Scripts

```bash
# Deploy to Cloudflare
pnpm deploy

# Run locally for development
pnpm dev

# View real-time logs
pnpm tail
```

## 🔧 Configuration

### Change CORS Policy

Edit `src/index.ts` and modify the `corsHeaders`:

```typescript
const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://yourdomain.com', // Your domain
  // ...
};
```

### Add Environment Variables

1. Add to `wrangler.toml`:
```toml
[vars]
API_KEY = "your-value"
```

2. Or use secrets:
```bash
wrangler secret put API_KEY
```

## 📊 Limits

- **Free Tier**: 100,000 requests/day
- **Paid Tier**: $5/month for 10 million requests/month

## 🔐 Security Notes

- Currently allows requests from any origin (`*`)
- For production, restrict CORS to your specific domains
- No authentication required (public endpoint)
- Consider adding rate limiting for production use

## 📝 Data Source

All geolocation data comes from Cloudflare's edge network:
- Data is collected at the edge (instant, no external API calls)
- IP-based detection (not GPS)
- City-level accuracy (not street-level)
- No cookies or tracking required

## 🛠️ Development

```bash
# Make changes to src/index.ts
# Then deploy
pnpm deploy

# View logs
pnpm tail
```

## 📚 Integration Examples

See the documentation in `/docs` for integration examples with:
- Shopify themes
- SvelteKit backends
- REST APIs
- GraphQL APIs



