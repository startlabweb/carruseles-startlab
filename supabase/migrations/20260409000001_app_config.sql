create table if not exists app_config (
  id text primary key,
  value text not null,
  updated_at timestamptz default now()
);
alter table app_config disable row level security;
