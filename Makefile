SHELL=/bin/bash

.PHONY: build
#run:
#    docker run -p 80:80 rhzx3519/react-demo-broker:latest

docker=
build:
	sh build.sh $(docker)

push:
	docker push rhzx3519/react-demo-broker