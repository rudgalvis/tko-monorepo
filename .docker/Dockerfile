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
FROM base-builder AS component-lib-builder

# Copy component-lib package.json
COPY packages/component-lib/package.json ./packages/component-lib/package.json

# Install dependencies
RUN pnpm install --frozen-lockfile --filter component-lib...

# Copy component-lib source files
COPY packages/component-lib ./packages/component-lib

# Build component-lib
RUN pnpm --filter component-lib package

# TKOXRR builder
FROM base-builder AS tkoxrr-builder

# Copy component-lib build output first since it's a dependency
COPY --from=component-lib-builder /app/packages/component-lib ./packages/component-lib

# Copy tkoxrr package.json
COPY packages/tkoxrr/package.json ./packages/tkoxrr/package.json

# Install dependencies including the local component-lib
RUN pnpm install --frozen-lockfile --filter tkoxrr...

# Copy tkoxrr source files
COPY packages/tkoxrr ./packages/tkoxrr

# Build tkoxrr
RUN pnpm --filter tkoxrr build

# Production stage
FROM node:23-slim

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Create a non-root user
RUN groupadd -r appgroup && useradd -r -g appgroup appuser

# Copy necessary files from builder
COPY --from=tkoxrr-builder /app/package.json ./
COPY --from=tkoxrr-builder /app/pnpm-*.yaml ./

# Copy only production dependencies
RUN pnpm install --prod --frozen-lockfile

# Copy built packages
COPY --from=component-lib-builder /app/packages/component-lib/dist ./packages/component-lib/dist
COPY --from=tkoxrr-builder /app/packages/tkoxrr/build ./packages/tkoxrr

# Set ownership to non-root user
RUN chown -R appuser:appgroup /app

USER appuser

# Start the tkoxrr application
CMD ["pnpm", "--filter", "tkoxrr", "start"]