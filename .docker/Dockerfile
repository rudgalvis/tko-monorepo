# Build stage
FROM node:23-slim AS builder

# Install build dependencies and pnpm
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    git \
    curl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Install pnpm
RUN corepack enable && corepack prepare pnpm@10.10.0 --activate

WORKDIR /app

# Copy only the necessary files for dependency installation
COPY pnpm-*.yaml ./
COPY package.json ./
COPY packages/common-utils/package.json ./packages/common-utils/package.json
COPY apps/shopify-nexus/package.json ./apps/shopify-nexus/package.json
COPY packages/storefront-api/package.json ./packages/storefront-api/package.json
COPY packages/ui/package.json ./packages/ui/package.json

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Explicitly run pnpm install again after copying all files to fix: 1. `Cannot find module '/app/packages/ui/node_modules/@sveltejs/kit/svelte-kit.js'`
RUN pnpm install --frozen-lockfile

# Build the application
RUN pnpm build

# Production stage
FROM node:23-slim

# Install pnpm
RUN corepack enable && corepack prepare pnpm@10.10.0 --activate

WORKDIR /app

# Create a non-root user
RUN groupadd -r appgroup && useradd -r -g appgroup appuser

# Copy necessary files from builder with ownership set during copy
# This eliminates the need for the slow recursive chown
COPY --from=builder --chown=appuser:appgroup /app/package.json ./
COPY --from=builder --chown=appuser:appgroup /app/pnpm-*.yaml ./

# Copy node_modules and packages with correct ownership
COPY --from=builder --chown=appuser:appgroup /app/node_modules ./node_modules
COPY --from=builder --chown=appuser:appgroup /app/packages ./packages

USER appuser

# Assuming your main application is in one of the packages
# Adjust the command according to your entry point
CMD ["pnpm", "start"]