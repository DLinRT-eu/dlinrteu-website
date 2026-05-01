
-- Revoke SELECT (and other table privileges) from anon on all public tables.
-- RLS already denies anonymous access to all of these tables; this additionally
-- hides them from the GraphQL schema introspection for anonymous callers.
DO $$
DECLARE
  r record;
BEGIN
  FOR r IN
    SELECT tablename FROM pg_tables WHERE schemaname = 'public'
  LOOP
    EXECUTE format('REVOKE SELECT, INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER ON public.%I FROM anon', r.tablename);
  END LOOP;
END $$;

-- Revoke SELECT from authenticated on tables that are only accessed
-- server-side via edge functions using the service role. These should not
-- appear in the GraphQL schema for signed-in users.
REVOKE SELECT, INSERT, UPDATE, DELETE ON public.newsletter_subscribers FROM authenticated;
REVOKE SELECT, INSERT, UPDATE, DELETE ON public.contact_submissions FROM authenticated;
REVOKE SELECT, INSERT, UPDATE, DELETE ON public.profile_document_access_log FROM authenticated;
REVOKE SELECT, INSERT, UPDATE, DELETE ON public.admin_audit_log FROM authenticated;

-- Ensure future tables created in public do not auto-grant to anon.
ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE SELECT, INSERT, UPDATE, DELETE ON TABLES FROM anon;
