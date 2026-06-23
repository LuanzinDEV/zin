# Desenvolvimento

## Fluxo local

```bash
cp .env.example .env
docker compose up --build
```

Frontend: `http://localhost:5174`. Backend: `http://localhost:8080/actuator/health`.

## Frontend

```bash
docker compose run --rm web sh -lc "npm install && npm run lint && npm run build"
```

Mocks ficam em `apps/web/src/mocks`. Tipos ficam em `apps/web/src/types`.

## Backend

```bash
docker compose run --rm backend ./mvnw test
```

O backend usa Flyway antes da inicializacao completa e Hibernate `validate`.

## Nova migration

Crie um arquivo sequencial em `apps/backend/src/main/resources/db/migration`, por exemplo:

```text
V7__add_example_table.sql
```

Nao edite migrations ja aplicadas em ambientes compartilhados.

## Troubleshooting

- `Connection refused`: confirme se PostgreSQL esta rodando no host e se `POSTGRES_HOST` e `POSTGRES_PORT` estao corretos.
- `password authentication failed`: revise usuario, senha e `pg_hba.conf`; nao use `trust`.
- `no pg_hba.conf entry`: permita conexao local do gateway Docker de forma restrita.
- `Hibernate validate failed`: compare entidade JPA e migration Flyway.
- `host.docker.internal` no Linux: o Compose ja define `extra_hosts: host.docker.internal:host-gateway`.

