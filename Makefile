.PHONY: help install dev build prod stop logs clean

help:
	@echo "[사용 가능한 명령어]"
	@echo "  make install    - 의존성 설치 (pnpm)"
	@echo "  make dev        - 개발 서버 실행 (Docker, port 5173)"
	@echo "  make build      - 프로덕션 Docker 이미지 빌드"
	@echo "  make prod       - 프로덕션 서버 실행 (Docker, port 4173)"
	@echo "  make stop       - 모든 컨테이너 중지"
	@echo "  make logs       - 컨테이너 로그 확인"
	@echo "  make clean      - 사용하지 않는 도커 자원 정리"

install:
	pnpm install

dev:
	./scripts/run_dev.sh

build:
	docker compose -f ./docker/docker-compose.prod.yml build

prod:
	./scripts/run_prod.sh

stop:
	docker compose -f ./docker/docker-compose.dev.yml down --remove-orphans 2>/dev/null || true
	docker compose -f ./docker/docker-compose.prod.yml down --remove-orphans 2>/dev/null || true

logs:
	docker compose -f ./docker/docker-compose.prod.yml logs -f

clean:
	docker system prune -f
