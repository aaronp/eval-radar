.PHONY: build preview
NAME=kindservices/eval-radar
TAG=${NAME}:0.0.1
LATEST=${NAME}:latest

run:
	npm i --legacy-peer-deps && npm run dev
build:	
	npm run build
preview: build
	npm run preview
docker:
	docker build . -t ${TAG} -t ${LATEST} 
push:
	docker buildx create --use && docker buildx build --platform linux/amd64,linux/arm64 -t ${TAG} -t ${LATEST} --push .