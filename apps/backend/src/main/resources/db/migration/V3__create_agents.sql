create table agents (
  id uuid primary key,
  organization_id uuid not null references organizations(id),
  name varchar(160) not null,
  slug varchar(120) not null,
  description text,
  status varchar(32) not null,
  created_by_user_id uuid references users(id),
  current_version_id uuid,
  created_at timestamp(6) with time zone not null,
  updated_at timestamp(6) with time zone not null,
  version bigint not null,
  constraint uk_agents_org_slug unique (organization_id, slug),
  constraint ck_agents_status check (status in ('DRAFT', 'ACTIVE', 'PAUSED', 'ARCHIVED'))
);

create index ix_agents_organization on agents(organization_id);

create table agent_versions (
  id uuid primary key,
  agent_id uuid not null references agents(id),
  version_number integer not null,
  system_prompt text not null,
  model_provider varchar(32) not null,
  model_name varchar(120) not null,
  temperature double precision not null,
  max_tokens integer,
  memory_strategy varchar(32) not null,
  status varchar(32) not null,
  created_by_user_id uuid references users(id),
  published_at timestamp(6) with time zone,
  created_at timestamp(6) with time zone not null,
  updated_at timestamp(6) with time zone not null,
  version bigint not null,
  constraint uk_agent_versions_agent_number unique (agent_id, version_number),
  constraint ck_agent_versions_provider check (model_provider in ('OPENAI', 'ANTHROPIC', 'GOOGLE', 'LOCAL', 'OTHER')),
  constraint ck_agent_versions_memory check (memory_strategy in ('NONE', 'SUMMARY', 'RETRIEVAL')),
  constraint ck_agent_versions_status check (status in ('DRAFT', 'PUBLISHED', 'ARCHIVED')),
  constraint ck_agent_versions_temperature check (temperature >= 0 and temperature <= 2)
);

create index ix_agent_versions_agent on agent_versions(agent_id);

alter table agents
  add constraint fk_agents_current_version
  foreign key (current_version_id) references agent_versions(id);

create table tools (
  id uuid primary key,
  organization_id uuid not null references organizations(id),
  name varchar(160) not null,
  slug varchar(120) not null,
  description text,
  type varchar(32) not null,
  risk_level varchar(32) not null,
  configuration jsonb not null default '{}'::jsonb,
  status varchar(32) not null,
  created_at timestamp(6) with time zone not null,
  updated_at timestamp(6) with time zone not null,
  version bigint not null,
  constraint uk_tools_org_slug unique (organization_id, slug),
  constraint ck_tools_type check (type in ('HTTP', 'WEBHOOK', 'DATABASE', 'SCRIPT', 'INTERNAL')),
  constraint ck_tools_risk check (risk_level in ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')),
  constraint ck_tools_status check (status in ('ACTIVE', 'DISABLED', 'ARCHIVED'))
);

create index ix_tools_organization on tools(organization_id);

create table agent_tools (
  agent_version_id uuid not null references agent_versions(id) on delete cascade,
  tool_id uuid not null references tools(id),
  requires_approval boolean not null,
  settings jsonb not null default '{}'::jsonb,
  primary key (agent_version_id, tool_id)
);

create index ix_agent_tools_tool on agent_tools(tool_id);

