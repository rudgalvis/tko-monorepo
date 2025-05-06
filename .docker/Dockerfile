# Base build stage with common dependencies
FROM node:23-slim AS base-builder

# Install build dependencies and pnpm
RUN apt-get update && \
 apt-get install -y --no-install-recommends \
 git \
 curl \
 ca-certificates \
 && rm -rf /var/lib/apt/lists/*

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy root level package files
COPY pnpm-*.yaml ./
COPY package.json ./

# Component-lib builder
FROM base-builder AS ui-builder

# Copy ui package.json
COPY packages/ui/package.json ./packages/ui/package.json

# Install dependencies
RUN pnpm install --frozen-lockfile --filter ui...

# Copy ui source files
COPY packages/ui ./packages/ui

# Build ui
RUN pnpm --filter ui package

# TKOXRR builder
FROM base-builder AS shopify-nexus-builder

# Copy ui build output first since it's a dependency
COPY --from=ui-builder /app/packages/ui ./packages/ui

# Copy shopify-nexus package.json
COPY packages/shopify-nexus/package.json ./packages/shopify-nexus/package.json

# Install dependencies including the local ui
RUN pnpm install --frozen-lockfile --filter shopify-nexus...

# Copy shopify-nexus source files
COPY packages/shopify-nexus ./packages/shopify-nexus

# Build shopify-nexus
RUN pnpm --filter shopify-nexus build

# Production stage
FROM node:23-slim

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Create a non-root user
RUN groupadd -r appgroup && useradd -r -g appgroup appuser

# Copy necessary files from builder
COPY --from=shopify-nexus-builder /app/package.json ./
COPY --from=shopify-nexus-builder /app/pnpm-*.yaml ./

# Copy only production dependencies
RUN pnpm install --prod --frozen-lockfile

# Copy built packages
COPY --from=ui-builder /app/packages/ui/dist ./packages/ui/dist
COPY --from=shopify-nexus-builder /app/packages/shopify-nexus/build ./packages/shopify-nexus

# Set ownership to non-root user
RUN chown -R appuser:appgroup /app

USER appuser

# Start the shopify-nexus application
CMD ["pnpm", "--filter", "shopify-nexus", "start"]