#!/bin/bash

# Exit on any error
set -e

export BUILDKIT_PROGRESS=plain

docker compose -f ./.docker/docker-compose.yml up -d --build --force-recreate --remove-orphans

# Capture the exit code
exit_code=$?

# Exit with the same code
exit $exit_code
