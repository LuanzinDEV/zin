# ZIN

ZIN e a base inicial de uma plataforma B2B de CRM programavel, agentes de IA, workflows, webhooks, scripts e integracoes. Esta entrega cria a fundacao executavel do monorepo, sem APIs REST de negocio, autenticacao real ou motor de agentes/workflows.

## Screenshot

Area reservada para screenshot do frontend em `http://localhost:5173`.

## Stack

- Backend: Java 21, Spring Boot 4.1.0, Spring Data JPA, Hibernate, Flyway, PostgreSQL Driver, Bean Validation, Actuator, JUnit.
- Frontend: React, TypeScript, Vite, Tailwind CSS, Radix UI, Lucide Icons, React Router, TanStack Query, Zustand, React Hook Form, Zod, Motion.
- Infra: Docker, Docker Compose, PostgreSQL externo ao Compose.

## Pre-requisitos

Instale apenas Docker com Docker Compose e PostgreSQL rodando no host. Java, Maven, Node, npm, pnpm, Vite e Flyway CLI nao sao exigidos no computador.

## Banco local

Crie usuario e banco no PostgreSQL do host:

```sql
create user zin with password 'zin_dev_password';
create database zin owner zin;
grant all privileges on database zin to zin;
```

Nao use autenticacao `trust`, senha vazia, nem exponha o PostgreSQL publicamente. Prefira escutar em `localhost` e liberar apenas o acesso necessario do container ao host.

## Configuracao

```bash
cp .env.example .env
```

Variaveis padrao:

```env
POSTGRES_HOST=host.docker.internal
POSTGRES_PORT=55432
POSTGRES_DB=zin
POSTGRES_USER=zin
POSTGRES_PASSWORD=zin_dev_password
WEB_PORT=5174
VITE_API_BASE_URL=http://localhost:8080
VITE_GOOGLE_CLIENT_ID=
```

No Linux, o Compose ja adiciona `host.docker.internal:host-gateway` ao backend. Se a conexao falhar, confirme `listen_addresses`, regras em `pg_hba.conf`, firewall local e se o banco aceita senha para o usuario `zin`.

## Execucao

```bash
docker compose up --build
```

URLs:

- Frontend: `http://localhost:5174`
- Backend Actuator: `http://localhost:8080/actuator/health`

## Autenticacao

A tela `/login` oferece login tradicional, registro e login com Google. O login tradicional persiste a sessao no navegador para o ambiente local mockado.

Para habilitar Google/Gmail, crie um OAuth Client ID no Google Cloud e configure:

```env
VITE_GOOGLE_CLIENT_ID=seu-client-id.apps.googleusercontent.com
```

Inclua a origem local usada pelo frontend, por exemplo `http://localhost:5174`, nas origens JavaScript autorizadas do client Google.

## Comandos

```bash
make up
make down
make logs
make build
make test
make backend-shell
make web-shell
make migrate
make clean
make config
```

Todos chamam Docker Compose.

## Testes e validacoes

```bash
docker compose config
docker compose run --rm web sh -lc "npm install && npm run lint && npm run build"
docker compose run --rm backend ./mvnw test
```

As migrations rodam automaticamente na subida do backend. O Hibernate usa `ddl-auto=validate`, entao o schema criado pelo Flyway precisa ser consistente com as entidades.

## Estrutura

```text
apps/backend   Backend Spring Boot modular
apps/web       Frontend React com mocks
assets/brand   Logo oficial quando disponivel
docs           Arquitetura, banco, design system e desenvolvimento
scripts        Utilitarios de ambiente
```

## Escopo atual

Inclui Docker, frontend mockado navegavel, autenticacao local no frontend, entidades JPA, migrations Flyway, health check e documentacao. Nao inclui controllers de negocio, services de negocio, autenticacao backend real, autorizacao, execucao real de agentes, filas ou integracoes externas.

## Futuro

Proximas etapas naturais: API REST/GraphQL, autenticacao, isolamento de tenant em runtime, engine de workflow, webhooks assinados, filas, observabilidade e conectores externos.

## Logo

A logo oficial foi preservada sem redesenho em `assets/brand/zin-logo-horizontal.png` e publicada tambem em `apps/web/public/brand/zin-logo-horizontal.png`.
