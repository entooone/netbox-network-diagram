COMPOSE=${HOME}/bin/docker-compose

.PHONY: sudo
sudo:
	@sudo -v

.PHONY: build
build:
	cd ../../
	sudo $(COMPOSE) build

.PHONY: run
run: sudo build
	cd ../../
	sudo $(COMPOSE) down
	sudo $(COMPOSE) up

.PHONY: up
up: sudo
	cd ../../
	sudo $(COMPOSE) up