create table audit_events (
  id uuid primary key,
  organization_id uuid not null references organizations(id),
  user_id uuid references users(id),
  event_type varchar(120) not null,
  entity_type varchar(120) not null,
  entity_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  ip_address varchar(64),
  user_agent varchar(512),
  created_at timestamp(6) with time zone not null
);

comment on table audit_events is 'Append-only audit records for important platform events.';

create index ix_audit_events_organization on audit_events(organization_id);
create index ix_audit_events_user on audit_events(user_id);
create index ix_audit_events_entity on audit_events(entity_type, entity_id);
create index ix_audit_events_created_at on audit_events(created_at);

