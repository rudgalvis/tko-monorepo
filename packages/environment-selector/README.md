# Environment Selector

A streamlined development utility for managing environment configurations in your monorepo.

## Overview

This tool automatically copies the appropriate environment variables file to the root directory of your monorepo, simplifying local development workflow and environment switching.

## Usage

Run the interactive selector:

```bash
npm run dev
```

You'll be prompted to choose an environment:

```
? Which environment would you like to set up? (Use arrow keys)
> development
production
staging
```

## How It Works
When you select an environment (e.g., `development`), the tool will:
- Take the corresponding file on root (two directories up) (`.env.development`)
- Copy it to the root directory as `.env`
- Your monorepo will now use the selected environment's configuration

## Environments
- **development**: Local development configuration
- **production**: Live/production settings
- **staging**: Testing environment settings

## Monorepo Integration

This package works within your monorepo structure by copying environment files to the root directory. For proper integration, each package should be configured to look for environment variables two directories up:

### SvelteKit Projects

In `svelte.config.js`, add:

js kit: { env: { dir: '../..' } }

### Vite Projects

In `vite.config.ts` or `vite.config.js`, add:

js export default defineConfig({ envDir: '../..', // other configuration... })

This ensures all packages in the monorepo access the same environment variables from the root directory.