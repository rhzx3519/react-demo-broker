#!/bin/sh

repository=rhzx3519/react-demo-broker
isdocker=$1

if [ $isdocker ]; then
  npm run build:docker
else
  npm run build
fi

docker build -t ${repository}:latest .