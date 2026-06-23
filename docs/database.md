# Banco de dados

O schema usa UUID gerado pela aplicacao, `timestamp with time zone` em UTC, `numeric(19,2)` para dinheiro e `jsonb` para configuracoes, definicoes e payloads.

```mermaid
erDiagram
  ORGANIZATIONS ||--o{ ORGANIZATION_MEMBERS : has
  USERS ||--o{ ORGANIZATION_MEMBERS : joins
  ORGANIZATIONS ||--o{ COMPANIES : owns
  ORGANIZATIONS ||--o{ CONTACTS : owns
  COMPANIES ||--o{ CONTACTS : has
  PIPELINES ||--o{ PIPELINE_STAGES : has
  PIPELINES ||--o{ DEALS : contains
  PIPELINE_STAGES ||--o{ DEALS : classifies
  ORGANIZATIONS ||--o{ AGENTS : owns
  AGENTS ||--o{ AGENT_VERSIONS : versions
  AGENT_VERSIONS ||--o{ AGENT_TOOLS : uses
  TOOLS ||--o{ AGENT_TOOLS : attached
  ORGANIZATIONS ||--o{ WORKFLOWS : owns
  WORKFLOWS ||--o{ WORKFLOW_VERSIONS : versions
  WORKFLOW_VERSIONS ||--o{ EXECUTIONS : runs
  AGENT_VERSIONS ||--o{ EXECUTIONS : runs
  EXECUTIONS ||--o{ EXECUTION_STEPS : contains
  ORGANIZATIONS ||--o{ AUDIT_EVENTS : records
```

## Tabelas

Migrations:

- `V1__create_organizations_and_users.sql`
- `V2__create_crm.sql`
- `V3__create_agents.sql`
- `V4__create_workflows.sql`
- `V5__create_executions.sql`
- `V6__create_audit_events.sql`

## Multitenancy

Registros de negocio possuem `organization_id`. Ainda nao ha filtro automatico de tenant; a modelagem prepara o isolamento para as proximas camadas.

## Indices

As migrations criam indices para organizacao, usuario responsavel, status, pipeline, etapa, entidades de execucao, trace id e auditoria. Slugs relevantes possuem unique por organizacao.

## Auditoria

Entidades principais herdam `created_at`, `updated_at` e `version`. Execucoes e eventos de auditoria sao registros append-oriented com `created_at`.

## Migrations

Flyway e a fonte de verdade. `spring.jpa.hibernate.ddl-auto=validate` impede criacao ou atualizacao automatica do schema em runtime.

