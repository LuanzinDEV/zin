create table workflows (
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
  constraint uk_workflows_org_slug unique (organization_id, slug),
  constraint ck_workflows_status check (status in ('DRAFT', 'ACTIVE', 'PAUSED', 'ARCHIVED'))
);

create index ix_workflows_organization on workflows(organization_id);

create table workflow_versions (
  id uuid primary key,
  workflow_id uuid not null references workflows(id),
  version_number integer not null,
  definition jsonb not null default '{}'::jsonb,
  status varchar(32) not null,
  created_by_user_id uuid references users(id),
  published_at timestamp(6) with time zone,
  created_at timestamp(6) with time zone not null,
  updated_at timestamp(6) with time zone not null,
  version bigint not null,
  constraint uk_workflow_versions_workflow_number unique (workflow_id, version_number),
  constraint ck_workflow_versions_status check (status in ('DRAFT', 'PUBLISHED', 'ARCHIVED'))
);

create index ix_workflow_versions_workflow on workflow_versions(workflow_id);

alter table workflows
  add constraint fk_workflows_current_version
  foreign key (current_version_id) references workflow_versions(id);

create table webhook_endpoints (
  id uuid primary key,
  organization_id uuid not null references organizations(id),
  workflow_id uuid not null references workflows(id),
  name varchar(160) not null,
  slug varchar(120) not null,
  secret_hash varchar(255) not null,
  status varchar(32) not null,
  created_by_user_id uuid references users(id),
  created_at timestamp(6) with time zone not null,
  updated_at timestamp(6) with time zone not null,
  version bigint not null,
  constraint uk_webhook_endpoints_org_slug unique (organization_id, slug),
  constraint ck_webhook_endpoints_status check (status in ('ACTIVE', 'DISABLED', 'ARCHIVED'))
);

create index ix_webhook_endpoints_organization on webhook_endpoints(organization_id);
create index ix_webhook_endpoints_workflow on webhook_endpoints(workflow_id);

