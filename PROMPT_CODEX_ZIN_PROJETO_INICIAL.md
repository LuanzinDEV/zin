# Prompt para o Codex — Projeto inicial da plataforma ZIN

## Papel

Atue como um engenheiro de software sênior responsável por **criar de verdade o projeto inicial da plataforma ZIN**, gerando os arquivos, configurações, código, documentação e infraestrutura necessários.

Não entregue apenas uma explicação ou pseudocódigo. Crie uma base executável, organizada e pronta para evolução.

---

## 1. Contexto do produto

O **ZIN** será uma plataforma B2B de CRM programável, agentes de inteligência artificial, automações, workflows, webhooks, scripts e integrações com sistemas externos.

Nesta primeira entrega, o objetivo é construir:

1. A fundação do monorepo.
2. A infraestrutura Docker de desenvolvimento.
3. Um frontend moderno, responsivo e com identidade visual própria.
4. Um backend Java com Spring Boot.
5. As migrations Flyway e os models/entities iniciais do domínio.
6. A documentação necessária para que o projeto seja executado sem Java, Maven, Node.js, npm ou pnpm instalados na máquina.

Nesta etapa, **não implemente regras de negócio, controllers REST, autenticação real ou execução de agentes**.

---

## 2. Restrições obrigatórias

### Ambiente local

O desenvolvedor deverá precisar instalar apenas:

- Docker com Docker Compose;
- PostgreSQL executando fora do Docker.

Não exigir no computador:

- Java;
- Maven;
- Gradle;
- Node.js;
- npm;
- pnpm;
- Vite;
- Spring CLI;
- Flyway CLI.

Todos os comandos de frontend e backend devem ser executados dentro de containers.

### PostgreSQL externo

O PostgreSQL **não deve ser criado no Docker Compose**.

O backend deverá se conectar ao PostgreSQL instalado na máquina host por variáveis de ambiente.

Configuração padrão:

```env
POSTGRES_HOST=host.docker.internal
POSTGRES_PORT=5432
POSTGRES_DB=zin
POSTGRES_USER=zin
POSTGRES_PASSWORD=zin_dev_password
```

No Linux, adicione ao serviço do backend:

```yaml
extra_hosts:
  - "host.docker.internal:host-gateway"
```

A documentação deve explicar:

1. Como criar o banco e o usuário no PostgreSQL.
2. Como ajustar as variáveis no `.env`.
3. Como permitir acesso do container ao PostgreSQL do host de forma segura.
4. Como diagnosticar falhas de conexão.
5. Que não se deve usar autenticação `trust`, senha vazia ou expor o PostgreSQL publicamente.

---

## 3. Stack obrigatória

### Backend

- Java 21;
- Spring Boot;
- Maven com Maven Wrapper;
- Spring Data JPA;
- Hibernate;
- Flyway;
- PostgreSQL Driver;
- Bean Validation;
- Spring Boot Actuator;
- Jackson;
- Lombok apenas quando reduzir código repetitivo sem esconder regras;
- JUnit;
- arquitetura de monólito modular.

Utilize a versão estável mais recente do Spring Boot compatível com Java 21 no momento da geração.

### Frontend

- React;
- TypeScript;
- Vite;
- Tailwind CSS;
- Radix UI ou componentes equivalentes acessíveis;
- Lucide Icons;
- React Router;
- TanStack Query;
- Zustand apenas para estado global realmente necessário;
- React Hook Form;
- Zod;
- Motion para animações discretas;
- ESLint;
- Prettier.

Utilize versões estáveis e compatíveis entre si.

### Infraestrutura

- Docker;
- Docker Compose;
- Dockerfiles separados para frontend e backend;
- health checks;
- volumes para hot reload;
- cache de dependências dentro de volumes Docker;
- rede Docker própria;
- `.env.example`;
- scripts de inicialização;
- README completo.

---

## 4. Estrutura do repositório

Crie um monorepo semelhante a:

```text
zin/
├── apps/
│   ├── backend/
│   │   ├── src/
│   │   ├── pom.xml
│   │   ├── mvnw
│   │   ├── mvnw.cmd
│   │   └── Dockerfile
│   └── web/
│       ├── src/
│       ├── public/
│       ├── package.json
│       ├── package-lock.json
│       └── Dockerfile
├── assets/
│   └── brand/
│       └── zin-logo-horizontal.png
├── docs/
│   ├── architecture.md
│   ├── database.md
│   ├── design-system.md
│   └── development.md
├── scripts/
│   ├── wait-for-postgres.sh
│   └── check-environment.sh
├── compose.yaml
├── compose.prod.yaml
├── .env.example
├── .gitignore
├── Makefile
├── README.md
└── LICENSE
```

Caso a imagem da logo esteja anexada ou disponível no diretório atual, copie-a para:

```text
assets/brand/zin-logo-horizontal.png
```

E disponibilize-a também no frontend em:

```text
apps/web/public/brand/zin-logo-horizontal.png
```

Não redesenhe nem modifique a logo. Preserve proporção, nitidez e área de respiro.

Caso a imagem não esteja disponível, crie apenas o diretório, uma referência no README e um placeholder textual temporário. Não invente outra logo.

---

## 5. Identidade visual do ZIN

A logo atual possui:

- símbolo geométrico com a letra `Z`;
- wordmark `ZIN`;
- azul-marinho escuro;
- detalhe laranja;
- fundo claro.

### Paleta principal

Utilize estes tokens como base:

```css
:root {
  --zin-orange-50: #fff4ec;
  --zin-orange-100: #ffe5d3;
  --zin-orange-200: #ffc7a6;
  --zin-orange-300: #ffa176;
  --zin-orange-400: #ff7b3d;
  --zin-orange-500: #fd5512;
  --zin-orange-600: #e7460a;
  --zin-orange-700: #bd3408;
  --zin-orange-800: #962b0d;
  --zin-orange-900: #782710;

  --zin-navy-50: #f3f6fa;
  --zin-navy-100: #e7ecf3;
  --zin-navy-200: #cbd5e1;
  --zin-navy-300: #9aa9bb;
  --zin-navy-400: #66788f;
  --zin-navy-500: #465a73;
  --zin-navy-600: #33465d;
  --zin-navy-700: #24364e;
  --zin-navy-800: #18263a;
  --zin-navy-900: #111c2d;
  --zin-navy-950: #0b1320;
}
```

Cores principais da marca:

```text
Laranja principal: #FD5512
Azul-marinho principal: #18263A
Azul-marinho profundo: #0B1320
Branco: #FFFFFF
```

### Tokens do tema claro

```css
--background: #f7f9fc;
--surface: #ffffff;
--surface-elevated: #ffffff;
--text-primary: #18263a;
--text-secondary: #667085;
--text-muted: #98a2b3;
--border: #e6eaf0;
--border-strong: #cbd5e1;
--primary: #fd5512;
--primary-hover: #e7460a;
--primary-soft: #fff4ec;
--focus-ring: rgba(253, 85, 18, 0.28);
```

### Tokens do tema escuro

```css
--background: #0b1320;
--surface: #111c2d;
--surface-elevated: #18263a;
--text-primary: #f8fafc;
--text-secondary: #cbd5e1;
--text-muted: #98a2b3;
--border: #24364e;
--border-strong: #33465d;
--primary: #ff6a24;
--primary-hover: #ff7b3d;
--primary-soft: rgba(253, 85, 18, 0.14);
--focus-ring: rgba(255, 106, 36, 0.34);
```

### Cores semânticas

```text
Success: #22C55E
Warning: #F59E0B
Danger: #EF4444
Info: #3B82F6
```

### Tipografia

Use fontes instaladas pelo projeto, sem depender de CDN:

- títulos e destaques: `Space Grotesk`;
- interface e textos: `Manrope`;
- código e identificadores: `JetBrains Mono`.

Utilize pacotes locais como `@fontsource`.

---

## 6. Direção visual do frontend

A interface deve ter aparência de um SaaS moderno, profissional e agradável.

### Características visuais

- design limpo e geométrico;
- laranja usado como destaque, não como fundo dominante em todas as telas;
- azul-marinho como base institucional;
- cantos arredondados entre `12px` e `18px`;
- sombras suaves;
- bordas discretas;
- excelente espaçamento;
- hierarquia visual clara;
- microinterações rápidas;
- transições discretas;
- suporte completo a light mode e dark mode;
- preferência de tema persistida no navegador;
- respeito a `prefers-reduced-motion`;
- componentes acessíveis;
- foco visível;
- bom contraste;
- estados de hover, focus, disabled, loading, empty e error.

### Evitar

- excesso de gradientes;
- glassmorphism exagerado;
- sombras pesadas;
- animações lentas;
- grandes blocos totalmente laranja;
- aparência de template administrativo genérico;
- componentes excessivamente compactos;
- fontes futuristas difíceis de ler.

### Sistema de espaçamento

Utilize uma grade baseada em múltiplos de `4px`, com preferência por:

```text
4, 8, 12, 16, 20, 24, 32, 40, 48 e 64px
```

### Componentes fundamentais

Crie componentes reutilizáveis:

- `Button`;
- `IconButton`;
- `Input`;
- `Textarea`;
- `Select`;
- `Checkbox`;
- `Switch`;
- `Badge`;
- `Avatar`;
- `Tooltip`;
- `DropdownMenu`;
- `Dialog`;
- `Drawer`;
- `Tabs`;
- `Card`;
- `DataTable`;
- `EmptyState`;
- `Skeleton`;
- `Toast`;
- `PageHeader`;
- `MetricCard`;
- `ThemeToggle`;
- `CommandPalette`;
- `AppSidebar`.

Documente os tokens e componentes em `docs/design-system.md`.

---

## 7. Frontend inicial

O frontend deve funcionar com dados mockados, pois ainda não haverá endpoints de negócio.

Crie uma navegação principal com:

```text
Dashboard
CRM
  ├── Contatos
  ├── Empresas
  ├── Oportunidades
  └── Pipeline
Agentes
Workflows
Execuções
Integrações
Configurações
```

### Layout

Crie:

- sidebar recolhível;
- header com busca;
- command palette acessível por `Ctrl+K` ou `Cmd+K`;
- seletor de tema;
- menu de perfil;
- breadcrumb;
- área de conteúdo responsiva;
- navegação mobile;
- logo ZIN no topo da sidebar.

### Telas obrigatórias

#### 1. Dashboard

Apresente dados mockados:

- oportunidades abertas;
- valor total do pipeline;
- agentes ativos;
- execuções no dia;
- taxa de sucesso;
- gráfico simples de execuções;
- atividades recentes;
- automações com falha.

#### 2. Pipeline

- Kanban moderno;
- colunas de etapas;
- cards de oportunidades;
- valor;
- empresa;
- responsável;
- prioridade;
- drag and drop apenas visual/local;
- resumo por coluna.

#### 3. Contatos

- tabela;
- busca;
- filtros;
- avatar;
- empresa;
- cargo;
- origem;
- status;
- responsável;
- empty state;
- drawer lateral de detalhes.

#### 4. Agentes

- grid de agentes;
- status;
- modelo configurado;
- número de ferramentas;
- custo mockado;
- última execução;
- botão de criação apenas visual;
- tela de detalhes com abas: visão geral, prompt, ferramentas, versões e execuções.

#### 5. Workflows

- listagem;
- status;
- versão;
- gatilho;
- quantidade de nós;
- última execução;
- uma tela demonstrativa de builder com alguns nós estáticos ou mockados.

Não implemente ainda um motor real nem persistência de workflows.

#### 6. Execuções

- tabela de execuções;
- status;
- duração;
- origem;
- agente ou workflow;
- custo;
- drawer com timeline dos steps.

#### 7. Configurações

- perfil;
- organização;
- aparência;
- preferências;
- integrações apenas como cards demonstrativos.

### Mock de dados

Coloque os mocks em uma camada separada:

```text
apps/web/src/mocks/
```

Não misture dados mockados diretamente dentro das páginas.

Crie tipos TypeScript representando as entidades principais.

---

## 8. Backend inicial

O backend deverá ser um monólito modular.

Pacote raiz sugerido:

```text
com.zin.platform
```

Organização:

```text
com.zin.platform
├── shared
├── identity
├── organization
├── crm
├── agent
├── workflow
├── execution
└── audit
```

Dentro de cada módulo:

```text
module/
├── domain/
│   ├── model/
│   └── enums/
├── infrastructure/
│   └── persistence/
└── package-info.java
```

Nesta entrega, gere somente:

- entidades JPA;
- enums;
- value objects simples quando forem úteis;
- classe base de auditoria;
- configuração JPA;
- configuração Flyway;
- migrations;
- indexes;
- constraints;
- testes básicos de mapeamento ou inicialização;
- Actuator para health check.

### Não gerar agora

- controllers;
- APIs REST de negócio;
- services;
- use cases;
- commands;
- handlers;
- autenticação;
- autorização;
- JWT;
- integrações com IA;
- filas;
- Redis;
- RabbitMQ;
- execução de workflows;
- upload de arquivos;
- billing.

---

## 9. Convenções dos models

### Identificadores

- Use `UUID`.
- Gere UUIDs na aplicação.
- Não dependa da extensão `pgcrypto`.
- Utilize o tipo `uuid` do PostgreSQL.

### Auditoria

Crie uma classe base, por exemplo:

```java
@MappedSuperclass
public abstract class AuditableEntity {
    @Id
    @Column(nullable = false, updatable = false)
    private UUID id;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    @Version
    private long version;
}
```

Ajuste a implementação para funcionar corretamente com callbacks JPA.

### Multitenancy inicial

Entidades de negócio devem possuir relação obrigatória com `Organization`.

Não implemente filtro automático de tenant nesta entrega, mas modele o banco para isso.

### Enums

Persista enums como texto com `EnumType.STRING`.

Utilize constraints `CHECK` no PostgreSQL para valores importantes quando isso não duplicar complexidade de forma desnecessária.

### JSON

Use `jsonb` para configurações, definições de workflow, inputs, outputs e metadados.

Mapeie com suporte apropriado do Hibernate atual, evitando converters manuais frágeis.

### Dinheiro

Use:

```text
numeric(19,2)
```

E `BigDecimal` no Java.

### Datas

- `Instant` para timestamps;
- `LocalDate` para datas sem horário;
- UTC no backend e banco.

### Exclusão

Não implemente soft delete genérico nesta etapa.

Prefira campos de status claros.

---

## 10. Models e tabelas obrigatórios

### Organização e identidade

#### `organizations`

Campos mínimos:

- `id`;
- `name`;
- `slug`;
- `status`;
- `created_at`;
- `updated_at`;
- `version`.

#### `users`

- `id`;
- `name`;
- `email`;
- `avatar_url`;
- `status`;
- `created_at`;
- `updated_at`;
- `version`.

#### `organization_members`

- `id`;
- `organization_id`;
- `user_id`;
- `role`;
- `joined_at`;
- `created_at`;
- `updated_at`;
- `version`.

Regras:

- unique entre organização e usuário;
- index por organização;
- index por usuário.

### CRM

#### `companies`

- `id`;
- `organization_id`;
- `name`;
- `legal_name`;
- `document`;
- `website`;
- `industry`;
- `company_size`;
- `owner_user_id`;
- `status`;
- auditoria.

#### `contacts`

- `id`;
- `organization_id`;
- `company_id`;
- `first_name`;
- `last_name`;
- `email`;
- `phone`;
- `job_title`;
- `source`;
- `status`;
- `owner_user_id`;
- auditoria.

Crie index para:

- organização;
- empresa;
- e-mail;
- responsável;
- status.

#### `pipelines`

- `id`;
- `organization_id`;
- `name`;
- `description`;
- `is_default`;
- `status`;
- auditoria.

#### `pipeline_stages`

- `id`;
- `pipeline_id`;
- `name`;
- `position`;
- `color`;
- `probability`;
- auditoria.

Regras:

- posição única dentro do pipeline;
- probabilidade entre 0 e 100.

#### `deals`

- `id`;
- `organization_id`;
- `company_id`;
- `contact_id`;
- `pipeline_id`;
- `stage_id`;
- `owner_user_id`;
- `title`;
- `description`;
- `amount`;
- `currency`;
- `status`;
- `priority`;
- `expected_close_date`;
- `closed_at`;
- auditoria.

Crie indexes para organização, pipeline, etapa, responsável e status.

#### `activities`

- `id`;
- `organization_id`;
- `contact_id`;
- `company_id`;
- `deal_id`;
- `created_by_user_id`;
- `type`;
- `title`;
- `description`;
- `due_at`;
- `completed_at`;
- auditoria.

#### `tasks`

- `id`;
- `organization_id`;
- `assigned_to_user_id`;
- `created_by_user_id`;
- `contact_id`;
- `deal_id`;
- `title`;
- `description`;
- `status`;
- `priority`;
- `due_at`;
- `completed_at`;
- auditoria.

### Agentes

#### `agents`

- `id`;
- `organization_id`;
- `name`;
- `slug`;
- `description`;
- `status`;
- `created_by_user_id`;
- `current_version_id`, inicialmente anulável;
- auditoria.

Unique:

- organização + slug.

#### `agent_versions`

- `id`;
- `agent_id`;
- `version_number`;
- `system_prompt`;
- `model_provider`;
- `model_name`;
- `temperature`;
- `max_tokens`;
- `memory_strategy`;
- `status`;
- `created_by_user_id`;
- `published_at`;
- auditoria.

Unique:

- agente + versão.

#### `tools`

- `id`;
- `organization_id`;
- `name`;
- `slug`;
- `description`;
- `type`;
- `risk_level`;
- `configuration`;
- `status`;
- auditoria.

#### `agent_tools`

- `agent_version_id`;
- `tool_id`;
- `requires_approval`;
- `settings`.

Utilize chave composta ou entidade associativa explícita, escolhendo a opção mais clara.

### Workflows

#### `workflows`

- `id`;
- `organization_id`;
- `name`;
- `slug`;
- `description`;
- `status`;
- `created_by_user_id`;
- `current_version_id`, inicialmente anulável;
- auditoria.

#### `workflow_versions`

- `id`;
- `workflow_id`;
- `version_number`;
- `definition`;
- `status`;
- `created_by_user_id`;
- `published_at`;
- auditoria.

#### `webhook_endpoints`

- `id`;
- `organization_id`;
- `workflow_id`;
- `name`;
- `slug`;
- `secret_hash`;
- `status`;
- `created_by_user_id`;
- auditoria.

Nunca armazene segredo puro.

### Execuções

#### `executions`

- `id`;
- `organization_id`;
- `workflow_version_id`;
- `agent_version_id`;
- `trigger_type`;
- `status`;
- `input`;
- `output`;
- `error_message`;
- `trace_id`;
- `started_at`;
- `finished_at`;
- `created_at`.

#### `execution_steps`

- `id`;
- `execution_id`;
- `node_key`;
- `node_type`;
- `status`;
- `attempt`;
- `input`;
- `output`;
- `error_message`;
- `started_at`;
- `finished_at`;
- `created_at`.

### Auditoria

#### `audit_events`

- `id`;
- `organization_id`;
- `user_id`;
- `event_type`;
- `entity_type`;
- `entity_id`;
- `metadata`;
- `ip_address`;
- `user_agent`;
- `created_at`.

---

## 11. Migrations Flyway

Não utilize `spring.jpa.hibernate.ddl-auto=create` ou `update`.

Configure:

```properties
spring.jpa.hibernate.ddl-auto=validate
spring.flyway.enabled=true
```

Organize as migrations:

```text
V1__create_organizations_and_users.sql
V2__create_crm.sql
V3__create_agents.sql
V4__create_workflows.sql
V5__create_executions.sql
V6__create_audit_events.sql
```

As migrations devem conter:

- tabelas;
- chaves primárias;
- foreign keys;
- unique constraints;
- check constraints;
- indexes;
- tipos corretos;
- comentários úteis, sem excesso;
- ordem válida de criação.

Garanta que o relacionamento circular de `current_version_id` seja criado com `ALTER TABLE` após a criação das tabelas de versões.

Não crie dados fictícios em migrations de produção.

Caso deseje mocks de desenvolvimento, coloque em arquivo separado e opt-in.

---

## 12. Docker

### `compose.yaml`

Crie os serviços:

#### `backend`

- build a partir de `apps/backend`;
- Java 21;
- hot reload quando razoável;
- porta `8080`;
- health check no Actuator;
- carregamento do `.env`;
- volume do código;
- volume para cache do Maven;
- `extra_hosts` para Linux;
- conexão com PostgreSQL externo.

#### `web`

- build a partir de `apps/web`;
- porta `5174`;
- hot reload;
- volume do código;
- volume separado para `node_modules`;
- variável para URL futura do backend;
- health check HTTP.

Não crie serviço PostgreSQL.

### Produção

Crie `compose.prod.yaml` com:

- build otimizado;
- frontend compilado e servido de forma adequada;
- backend empacotado em JAR;
- usuários não-root nos containers;
- health checks;
- sem volumes de código;
- sem ferramentas de desenvolvimento.

### Comandos

O projeto deve funcionar com:

```bash
cp .env.example .env
docker compose up --build
```

Outros comandos podem ser expostos pelo `Makefile`:

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
```

Os comandos do Makefile devem chamar Docker Compose e não depender de Java ou Node no host.

---

## 13. Configuração do backend

Crie profiles:

```text
application.yml
application-dev.yml
application-prod.yml
```

Use variáveis de ambiente.

A URL JDBC deverá ser montada a partir das variáveis ou configurada diretamente, por exemplo:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}
    username: ${POSTGRES_USER}
    password: ${POSTGRES_PASSWORD}
```

Configurações:

- timezone UTC;
- logs legíveis em desenvolvimento;
- logs mais estruturados em produção;
- actuator health e info;
- graceful shutdown;
- validação de schema pelo Hibernate;
- Flyway antes da inicialização completa;
- erro claro quando banco estiver indisponível.

Não imprimir senhas nos logs.

---

## 14. Qualidade

### Backend

- código formatado;
- nomes claros em inglês;
- entidades sem lógica excessiva;
- relacionamentos JPA bem definidos;
- evitar `EAGER` por padrão;
- evitar `@Data` indiscriminadamente em entidades;
- evitar recursão em `toString`, `equals` e serialização;
- documentar decisões importantes;
- testes que verifiquem pelo menos inicialização e consistência dos mappings.

### Frontend

- TypeScript strict;
- sem `any` desnecessário;
- componentes pequenos e reutilizáveis;
- páginas separadas dos mocks;
- sem warnings no console;
- sem erros de lint;
- responsivo;
- acessível;
- estados de carregamento e vazio.

### Git

Crie um `.gitignore` adequado para:

- Java;
- Maven;
- Node;
- Vite;
- IDEs;
- sistema operacional;
- `.env`;
- builds;
- logs.

---

## 15. Documentação obrigatória

### `README.md`

Inclua:

1. Visão geral do ZIN.
2. Screenshot ou área reservada para screenshot.
3. Stack.
4. Pré-requisitos: apenas Docker e PostgreSQL.
5. Como criar banco e usuário.
6. Como configurar `.env`.
7. Como iniciar.
8. URLs locais.
9. Comandos disponíveis.
10. Como executar testes.
11. Como validar migrations.
12. Como resolver conexão do container com PostgreSQL do host.
13. Estrutura do projeto.
14. Escopo atual.
15. Funcionalidades futuras.
16. Aviso de que o projeto ainda não possui APIs de negócio.

### `docs/architecture.md`

Explique:

- monólito modular;
- frontend separado;
- PostgreSQL externo;
- módulos do backend;
- direção futura para agentes, filas, webhooks e Edge Runner;
- por que não utilizar microsserviços agora.

Inclua um diagrama Mermaid.

### `docs/database.md`

Documente:

- tabelas;
- principais relacionamentos;
- índices;
- multitenancy por organização;
- uso de UUID;
- auditoria;
- estratégia de migrations.

Inclua um diagrama ER em Mermaid.

### `docs/design-system.md`

Documente:

- logo;
- paleta;
- light mode;
- dark mode;
- tipografia;
- espaçamento;
- border radius;
- sombras;
- componentes;
- acessibilidade.

### `docs/development.md`

Documente:

- fluxo local;
- comandos Docker;
- desenvolvimento frontend;
- desenvolvimento backend;
- criação de nova migration;
- troubleshooting.

---

## 16. Critérios de aceite

Considere a tarefa concluída somente quando:

- [ ] `docker compose config` for válido;
- [ ] não existir container PostgreSQL;
- [ ] frontend e backend forem construídos dentro do Docker;
- [ ] o frontend abrir em `http://localhost:5174`;
- [ ] o backend abrir em `http://localhost:8080`;
- [ ] o Actuator responder;
- [ ] o backend se conectar ao PostgreSQL externo;
- [ ] Flyway executar todas as migrations;
- [ ] Hibernate validar o schema;
- [ ] o frontend possuir light e dark mode;
- [ ] a preferência de tema persistir;
- [ ] a logo ZIN estiver aplicada corretamente;
- [ ] todas as telas mockadas estiverem navegáveis;
- [ ] não houver controllers de negócio;
- [ ] não houver services de negócio;
- [ ] migrations e entities estiverem consistentes;
- [ ] README permitir executar o projeto apenas com Docker e PostgreSQL;
- [ ] lint e build do frontend passarem;
- [ ] build e testes do backend passarem;
- [ ] containers usarem usuários não-root na configuração de produção;
- [ ] nenhum segredo estiver commitado.

---

## 17. Fora do escopo

Não implemente nesta tarefa:

- autenticação real;
- Keycloak;
- JWT;
- endpoints CRUD;
- Redis;
- RabbitMQ;
- Kafka;
- agentes executáveis;
- chamadas a provedores de IA;
- RAG;
- pgvector;
- n8n;
- Edge Runner;
- scripts customizados;
- motor de workflows;
- WebSocket;
- billing;
- envio de e-mail;
- WhatsApp;
- CI/CD completo;
- Kubernetes.

Prepare a arquitetura para evolução, mas não adicione complexidade prematura.

---

## 18. Forma de execução esperada

1. Analise o diretório atual.
2. Preserve arquivos existentes relevantes.
3. Crie toda a estrutura necessária.
4. Implemente os arquivos.
5. Execute builds, lint e testes dentro dos containers.
6. Execute `docker compose config`.
7. Corrija os problemas encontrados.
8. Não deixe arquivos pela metade.
9. Não substitua implementação por comentários `TODO`, exceto itens explicitamente fora do escopo.
10. Ao finalizar, apresente:
   - resumo do que foi criado;
   - estrutura principal;
   - comandos de execução;
   - variáveis necessárias;
   - testes executados;
   - limitações atuais;
   - próximos passos recomendados.

Comece a implementação.
