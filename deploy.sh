#!/bin/bash

REPOSITORY=/home/ubuntu/app
cd $REPOSITORY

APP_NAME=clueFront
BUILD_DIR=$REPOSITORY/dist

echo "> 배포 시작: $APP_NAME"

# PM2 프로세스 정리 (더 이상 사용 안 함)
echo "> Cleaning up old PM2 processes..."
pm2 stop paletto-frontend 2>/dev/null || true
pm2 delete paletto-frontend 2>/dev/null || true

# Nginx가 직접 dist 폴더를 서빙하므로 별도 프로세스 불필요
echo "> Static files ready in: $BUILD_DIR"

# Nginx 재시작
echo "> Restarting Nginx..."
sudo systemctl restart nginx

echo "> Deployment completed!"
echo "> Nginx is serving static files from: $BUILD_DIR"
