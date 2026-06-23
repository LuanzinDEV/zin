create table companies (
  id uuid primary key,
  organization_id uuid not null references organizations(id),
  name varchar(180) not null,
  legal_name varchar(220),
  document varchar(64),
  website varchar(255),
  industry varchar(120),
  company_size varchar(64),
  owner_user_id uuid references users(id),
  status varchar(32) not null,
  created_at timestamp(6) with time zone not null,
  updated_at timestamp(6) with time zone not null,
  version bigint not null,
  constraint ck_companies_status check (status in ('ACTIVE', 'INACTIVE', 'CUSTOMER', 'PROSPECT'))
);

create index ix_companies_organization on companies(organization_id);
create index ix_companies_owner on companies(owner_user_id);
create index ix_companies_status on companies(status);

create table contacts (
  id uuid primary key,
  organization_id uuid not null references organizations(id),
  company_id uuid references companies(id),
  first_name varchar(120) not null,
  last_name varchar(120) not null,
  email varchar(254),
  phone varchar(64),
  job_title varchar(140),
  source varchar(80),
  status varchar(32) not null,
  owner_user_id uuid references users(id),
  created_at timestamp(6) with time zone not null,
  updated_at timestamp(6) with time zone not null,
  version bigint not null,
  constraint ck_contacts_status check (status in ('ACTIVE', 'INACTIVE', 'LEAD', 'CUSTOMER'))
);

create index ix_contacts_organization on contacts(organization_id);
create index ix_contacts_company on contacts(company_id);
create index ix_contacts_email on contacts(email);
create index ix_contacts_owner on contacts(owner_user_id);
create index ix_contacts_status on contacts(status);

create table pipelines (
  id uuid primary key,
  organization_id uuid not null references organizations(id),
  name varchar(160) not null,
  description text,
  is_default boolean not null,
  status varchar(32) not null,
  created_at timestamp(6) with time zone not null,
  updated_at timestamp(6) with time zone not null,
  version bigint not null,
  constraint ck_pipelines_status check (status in ('ACTIVE', 'ARCHIVED'))
);

create index ix_pipelines_organization on pipelines(organization_id);

create table pipeline_stages (
  id uuid primary key,
  pipeline_id uuid not null references pipelines(id),
  name varchar(120) not null,
  position integer not null,
  color varchar(32),
  probability integer not null,
  created_at timestamp(6) with time zone not null,
  updated_at timestamp(6) with time zone not null,
  version bigint not null,
  constraint uk_pipeline_stages_pipeline_position unique (pipeline_id, position),
  constraint ck_pipeline_stages_probability check (probability between 0 and 100)
);

create index ix_pipeline_stages_pipeline on pipeline_stages(pipeline_id);

create table deals (
  id uuid primary key,
  organization_id uuid not null references organizations(id),
  company_id uuid references companies(id),
  contact_id uuid references contacts(id),
  pipeline_id uuid not null references pipelines(id),
  stage_id uuid not null references pipeline_stages(id),
  owner_user_id uuid references users(id),
  title varchar(180) not null,
  description text,
  amount numeric(19,2),
  currency varchar(3) not null,
  status varchar(32) not null,
  priority varchar(32) not null,
  expected_close_date date,
  closed_at timestamp(6) with time zone,
  created_at timestamp(6) with time zone not null,
  updated_at timestamp(6) with time zone not null,
  version bigint not null,
  constraint ck_deals_status check (status in ('OPEN', 'WON', 'LOST', 'ARCHIVED')),
  constraint ck_deals_priority check (priority in ('LOW', 'MEDIUM', 'HIGH', 'URGENT'))
);

create index ix_deals_organization on deals(organization_id);
create index ix_deals_pipeline on deals(pipeline_id);
create index ix_deals_stage on deals(stage_id);
create index ix_deals_owner on deals(owner_user_id);
create index ix_deals_status on deals(status);

create table activities (
  id uuid primary key,
  organization_id uuid not null references organizations(id),
  contact_id uuid references contacts(id),
  company_id uuid references companies(id),
  deal_id uuid references deals(id),
  created_by_user_id uuid references users(id),
  type varchar(32) not null,
  title varchar(180) not null,
  description text,
  due_at timestamp(6) with time zone,
  completed_at timestamp(6) with time zone,
  created_at timestamp(6) with time zone not null,
  updated_at timestamp(6) with time zone not null,
  version bigint not null,
  constraint ck_activities_type check (type in ('NOTE', 'CALL', 'EMAIL', 'MEETING', 'TASK'))
);

create index ix_activities_organization on activities(organization_id);
create index ix_activities_contact on activities(contact_id);
create index ix_activities_company on activities(company_id);
create index ix_activities_deal on activities(deal_id);

create table tasks (
  id uuid primary key,
  organization_id uuid not null references organizations(id),
  assigned_to_user_id uuid references users(id),
  created_by_user_id uuid references users(id),
  contact_id uuid references contacts(id),
  deal_id uuid references deals(id),
  title varchar(180) not null,
  description text,
  status varchar(32) not null,
  priority varchar(32) not null,
  due_at timestamp(6) with time zone,
  completed_at timestamp(6) with time zone,
  created_at timestamp(6) with time zone not null,
  updated_at timestamp(6) with time zone not null,
  version bigint not null,
  constraint ck_tasks_status check (status in ('OPEN', 'IN_PROGRESS', 'DONE', 'CANCELED')),
  constraint ck_tasks_priority check (priority in ('LOW', 'MEDIUM', 'HIGH', 'URGENT'))
);

create index ix_tasks_organization on tasks(organization_id);
create index ix_tasks_assigned_to on tasks(assigned_to_user_id);
create index ix_tasks_created_by on tasks(created_by_user_id);
create index ix_tasks_contact on tasks(contact_id);
create index ix_tasks_deal on tasks(deal_id);
create index ix_tasks_status on tasks(status);

