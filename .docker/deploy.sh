#!/bin/bash

# Exit on any error
set -e

# Run docker compose
docker compose -f ./.docker/docker-compose.yml up -d --build --force-recreate

# Capture the exit code
exit_code=$?

# Exit with the same code
exit $exit_code
