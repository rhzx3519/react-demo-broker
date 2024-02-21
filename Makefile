SHELL=/bin/bash

.PHONY: build

docker=
arch=
build:
	sh build.sh $(docker) $(arch)

push:
	docker push rhzx3519/react-demo-broker

fake:
	npx json-server fakedata/db.json -p 3001