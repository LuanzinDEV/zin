create table executions (
  id uuid primary key,
  organization_id uuid not null references organizations(id),
  workflow_version_id uuid references workflow_versions(id),
  agent_version_id uuid references agent_versions(id),
  trigger_type varchar(32) not null,
  status varchar(32) not null,
  input jsonb,
  output jsonb,
  error_message text,
  trace_id varchar(120),
  started_at timestamp(6) with time zone,
  finished_at timestamp(6) with time zone,
  created_at timestamp(6) with time zone not null,
  constraint ck_executions_trigger check (trigger_type in ('MANUAL', 'WEBHOOK', 'SCHEDULE', 'AGENT', 'WORKFLOW')),
  constraint ck_executions_status check (status in ('QUEUED', 'RUNNING', 'SUCCEEDED', 'FAILED', 'CANCELED')),
  constraint ck_executions_actor check (workflow_version_id is not null or agent_version_id is not null)
);

create index ix_executions_organization on executions(organization_id);
create index ix_executions_workflow_version on executions(workflow_version_id);
create index ix_executions_agent_version on executions(agent_version_id);
create index ix_executions_status on executions(status);
create index ix_executions_trace_id on executions(trace_id);

create table execution_steps (
  id uuid primary key,
  execution_id uuid not null references executions(id) on delete cascade,
  node_key varchar(120) not null,
  node_type varchar(80) not null,
  status varchar(32) not null,
  attempt integer not null,
  input jsonb,
  output jsonb,
  error_message text,
  started_at timestamp(6) with time zone,
  finished_at timestamp(6) with time zone,
  created_at timestamp(6) with time zone not null,
  constraint ck_execution_steps_status check (status in ('PENDING', 'RUNNING', 'SUCCEEDED', 'FAILED', 'SKIPPED')),
  constraint ck_execution_steps_attempt check (attempt >= 0)
);

create index ix_execution_steps_execution on execution_steps(execution_id);
create index ix_execution_steps_status on execution_steps(status);

