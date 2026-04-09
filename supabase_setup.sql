-- Carruseles StartLab — tabla de persistencia
-- Proyecto: startlab-cliper (zxfambyveewqcrxcrcbf)
-- URL: https://zxfambyveewqcrxcrcbf.supabase.co
-- YA EJECUTADO via CLI el 2026-04-09. Este archivo es referencia.

create table if not exists carruseles_adaptados (
  id            uuid              default gen_random_uuid() primary key,
  url           text,
  owner_username text,
  caption       text,
  keyword       text,
  hook_adaptado text,
  slides        jsonb,
  notion_url    text,
  created_at    timestamptz       default now()
);

-- Índices útiles
create index if not exists idx_carruseles_owner on carruseles_adaptados (owner_username);
create index if not exists idx_carruseles_created on carruseles_adaptados (created_at desc);

-- RLS desactivado (proyecto interno, sin auth de usuarios externos)
alter table carruseles_adaptados disable row level security;
