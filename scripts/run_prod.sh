#!/bin/bash
set -e

echo "프로덕션 서버를 시작합니다..."

docker compose -f ./docker/docker-compose.prod.yml down --remove-orphans 2>/dev/null || true
docker compose -f ./docker/docker-compose.prod.yml build
docker compose -f ./docker/docker-compose.prod.yml up -d

echo "프로덕션 서버가 http://localhost:80 에서 실행 중입니다."
