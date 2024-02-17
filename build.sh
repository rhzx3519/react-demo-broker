#!/bin/sh

repository=rhzx3519/react-demo-broker
isdocker=${1:-true}
arch=${2:-arm64}

if [ $isdocker ]; then
  npm run build:docker
else
  npm run build
fi

docker build --platform=linux/$arch -t ${repository}:latest .