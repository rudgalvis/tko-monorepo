# Build stage
FROM node:23-alpine AS builder

# Add only the necessary build dependencies
RUN apk add --no-cache bash

WORKDIR /app

# Copy package files first to leverage Docker cache
COPY package*.json ./
# Remove --only=production flag to install all dependencies including dev dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:23-alpine

LABEL Developers="Rokas Rudgalvis"

WORKDIR /app

# Create a non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy only the necessary files from builder
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json .

# Create logs directory with proper permissions
RUN mkdir -p /app/logs && chown -R appuser:appgroup /app/logs

# Create cache directory with proper permissions
RUN mkdir -p /app/.cache && chown -R appuser:appgroup /app/.cache

# Set ownership to non-root user
RUN chown -R appuser:appgroup /app

USER appuser

CMD ["node", "build/index.js"]

