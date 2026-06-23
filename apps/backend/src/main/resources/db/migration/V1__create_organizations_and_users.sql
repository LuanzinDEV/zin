create table organizations (
  id uuid primary key,
  name varchar(160) not null,
  slug varchar(120) not null,
  status varchar(32) not null,
  created_at timestamp(6) with time zone not null,
  updated_at timestamp(6) with time zone not null,
  version bigint not null,
  constraint uk_organizations_slug unique (slug),
  constraint ck_organizations_status check (status in ('ACTIVE', 'SUSPENDED', 'ARCHIVED'))
);

comment on table organizations is 'Tenant boundary for all business records.';

create table users (
  id uuid primary key,
  name varchar(160) not null,
  email varchar(254) not null,
  avatar_url varchar(512),
  status varchar(32) not null,
  created_at timestamp(6) with time zone not null,
  updated_at timestamp(6) with time zone not null,
  version bigint not null,
  constraint uk_users_email unique (email),
  constraint ck_users_status check (status in ('ACTIVE', 'INVITED', 'DISABLED'))
);

create table organization_members (
  id uuid primary key,
  organization_id uuid not null references organizations(id),
  user_id uuid not null references users(id),
  role varchar(32) not null,
  joined_at timestamp(6) with time zone not null,
  created_at timestamp(6) with time zone not null,
  updated_at timestamp(6) with time zone not null,
  version bigint not null,
  constraint uk_organization_members_org_user unique (organization_id, user_id),
  constraint ck_organization_members_role check (role in ('OWNER', 'ADMIN', 'MEMBER', 'VIEWER'))
);

create index ix_organization_members_organization on organization_members(organization_id);
create index ix_organization_members_user on organization_members(user_id);

