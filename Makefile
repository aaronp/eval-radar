.PHONY: build preview
run:
	npm i --legacy-peer-deps && npm run dev
build:	
	npm run build
preview: build
	npm run preview
docker:
	docker build . -t kindservices/eval-radar:0.0.1