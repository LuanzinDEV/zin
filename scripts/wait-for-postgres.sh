#!/usr/bin/env bash
set -euo pipefail

HOST="${POSTGRES_HOST:-host.docker.internal}"
PORT="${POSTGRES_PORT:-5432}"
TIMEOUT_SECONDS="${POSTGRES_WAIT_TIMEOUT:-45}"

echo "Waiting for PostgreSQL at ${HOST}:${PORT}..."
deadline=$((SECONDS + TIMEOUT_SECONDS))

while (( SECONDS < deadline )); do
  if timeout 2 bash -c "</dev/tcp/${HOST}/${PORT}" 2>/dev/null; then
    echo "PostgreSQL port is reachable."
    exit 0
  fi
  sleep 1
done

echo "PostgreSQL is not reachable at ${HOST}:${PORT} after ${TIMEOUT_SECONDS}s." >&2
exit 1

