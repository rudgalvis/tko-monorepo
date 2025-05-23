## Important commands

To develop components run storybook `npm run dev`

To build assets for liquid run `npm run build-for-theme`

To build package for usage in other packages run `npm run build`

## Operations

#### Force users to clear the cache
1. To force clear cache for users update `const SWEEP_DATE=YYYY-MM-DD-vX` to 
    something newer than hardcoded at [cache-sweeper.ts](src/lib/utils/browser/cache-sweeper.ts)

2. Build assets for liquid with command `npm run build-for-theme`

3. Push theme to production via [/packages/shopify-theme/package.json](../shopify-theme/package.json)