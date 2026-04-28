
-- Revoke anon SELECT on tables that should not be discoverable in the GraphQL schema
-- pre-login. RLS already blocks data access; this also removes them from the anon
-- GraphQL schema introspection. Public-by-design tables (changelog_*) keep their
-- existing grants so the anonymous public site can still read them.

DO $$
DECLARE
  t text;
  public_tables text[] := ARRAY['changelog_entries','changelog_links'];
BEGIN
  FOR t IN
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_type = 'BASE TABLE'
      AND NOT (table_name = ANY(public_tables))
  LOOP
    EXECUTE format('REVOKE SELECT ON public.%I FROM anon', t);
  END LOOP;
END$$;

-- Also revoke authenticated SELECT discovery on tables intended only for admins/service
-- (analytics_*, admin_audit_log, certification_reminder_logs, reminder_settings,
-- security_events, user_registration_notifications, role_change_log).
-- RLS already blocks reads for non-admins; this hides the tables from authenticated
-- GraphQL schema introspection.
REVOKE SELECT ON
  public.admin_audit_log,
  public.analytics_daily,
  public.analytics_page_visits,
  public.analytics_visitors,
  public.certification_reminder_logs,
  public.reminder_settings,
  public.security_events,
  public.user_registration_notifications,
  public.role_change_log
FROM authenticated;
