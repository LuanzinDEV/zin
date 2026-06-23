COMPOSE ?= docker compose
ENV_FILE ?= .env

.PHONY: up down logs build test backend-shell web-shell migrate clean config env

$(ENV_FILE):
	cp .env.example $(ENV_FILE)
	@echo "Created $(ENV_FILE). Review database and port values before running the stack."

env: $(ENV_FILE)

up: $(ENV_FILE)
	$(COMPOSE) up -d --build

down:
	$(COMPOSE) down

logs:
	$(COMPOSE) logs -f

build: $(ENV_FILE)
	$(COMPOSE) build

test: $(ENV_FILE)
	$(COMPOSE) run --rm backend ./mvnw test
	$(COMPOSE) run --rm web sh -lc "npm install && npm run lint && npm run build"

backend-shell: $(ENV_FILE)
	$(COMPOSE) run --rm backend bash

web-shell: $(ENV_FILE)
	$(COMPOSE) run --rm web sh

migrate: $(ENV_FILE)
	$(COMPOSE) run --rm backend ./mvnw -Dspring-boot.run.profiles=dev spring-boot:run

clean:
	$(COMPOSE) down -v --remove-orphans

config: $(ENV_FILE)
	$(COMPOSE) config
