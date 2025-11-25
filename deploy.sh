REPOSITORY=/home/ubuntu/app
cd $REPOSITORY

APP_NAME=clueFront
BUILD_DIR=$REPOSITORY/dist

# 기존 PM2 프로세스 종료
echo "> Stopping PM2 process..."
pm2 stop paletto-frontend 2>/dev/null || true
pm2 delete paletto-frontend 2>/dev/null || true

# 또는 serve로 실행 중인 프로세스 종료
CURRENT_PID=$(pgrep -f "serve -s $BUILD_DIR")

if [ -z $CURRENT_PID ]
then
  echo "> 현재 구동중인 프론트엔드가 없습니다."
else
  echo "> kill -15 $CURRENT_PID"
  sudo kill -15 $CURRENT_PID
  sleep 5
fi

echo "> 프론트엔드 실행"

# 방법 1: serve 직접 실행 (기존 방식)
# nohup serve -s $BUILD_DIR -l 3000 > /dev/null 2>&1 &

# 방법 2: PM2 사용 (권장)
cd $REPOSITORY
pm2 start ecosystem.config.js
pm2 save
