-- Fix: asegurar que RLS está desactivado y los grants correctos en las tablas renombradas
ALTER TABLE app_config_carruseles DISABLE ROW LEVEL SECURITY;
ALTER TABLE carruseles_startlab DISABLE ROW LEVEL SECURITY;

-- Grants explícitos para el rol anon (por si acaso)
GRANT ALL ON app_config_carruseles TO anon;
GRANT ALL ON carruseles_startlab TO anon;
