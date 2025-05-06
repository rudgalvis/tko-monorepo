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
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy only the necessary files for dependency installation
COPY pnpm-*.yaml ./
COPY package.json ./
COPY packages/shopify-nexus/package.json ./packages/shopify-nexus/package.json
COPY packages/ui/package.json ./packages/ui/package.json

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the application
RUN pnpm build

# Production stage
FROM node:23-slim

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Create a non-root user
RUN groupadd -r appgroup && useradd -r -g appgroup appuser

# Copy necessary files from builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-*.yaml ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages ./packages


# Set ownership to non-root user
RUN chown -R appuser:appgroup /app

USER appuser

# Assuming your main application is in one of the packages
# Adjust the command according to your entry point
CMD ["pnpm", "start"]