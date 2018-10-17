start:
	npx concurrently --raw "make watch" "open index.html"

watch:
	npx webpack --watch

build:
	NODE_ENV=production npx webpack

install:
	git submodule update --recursive --remote --init
	npm install
