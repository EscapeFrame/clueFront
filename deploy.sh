REPOSITORY=/home/ubuntu/app
cd $REPOSITORY

APP_NAME=clueFront
BUILD_DIR=$REPOSITORY/build

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
nohup serve -s $BUILD_DIR -l 3000 > /dev/null 2>&1 &
