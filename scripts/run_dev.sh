#!/bin/bash
set -e

echo "개발 서버를 시작합니다..."

docker compose -f ./docker/docker-compose.dev.yml down --remove-orphans 2>/dev/null || true
docker compose -f ./docker/docker-compose.dev.yml up --build -d

echo "개발 서버가 http://localhost:5173 에서 실행 중입니다."
