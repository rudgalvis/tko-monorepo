#!/bin/bash

docker compose -f ./.docker/docker-compose.yml up -d --build --force-recreate

cd ./packages/automatic-discount-cache

chmod +x ./deploy.sh
./deploy.sh