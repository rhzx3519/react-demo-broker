SHELL=/bin/bash

.PHONY: build

docker=
arch=
build:
	sh build.sh $(docker) $(arch)

push:
	docker push rhzx3519/react-demo-broker