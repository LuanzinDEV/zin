#!/usr/bin/env bash
set -euo pipefail

command -v docker >/dev/null || { echo "Docker is required."; exit 1; }
docker compose version >/dev/null || { echo "Docker Compose is required."; exit 1; }

if [[ ! -f .env ]]; then
  echo ".env not found. Run: cp .env.example .env"
  exit 1
fi

echo "Docker and Compose are available."
docker compose config >/dev/null
echo "Compose configuration is valid."

