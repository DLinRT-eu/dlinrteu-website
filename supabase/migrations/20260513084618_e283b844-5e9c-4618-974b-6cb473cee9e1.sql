
-- Ensure explicit Data API grants for all public tables, matching existing RLS policies.
-- This is required because Supabase will enforce explicit grants for the Data API after Oct 30.
-- RLS continues to enforce row-level access; these grants only enable PostgREST to evaluate the policies.

-- === Tables accessed by authenticated users via supabase-js ===

-- Review workflow tables
GRANT SELECT, INSERT, UPDATE, DELETE ON public.review_checklist_items TO authenticated;
GRANT SELECT, INSERT ON public.review_comments TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.review_rounds TO authenticated;
GRANT SELECT ON public.review_round_stats TO authenticated;
GRANT UPDATE, DELETE ON public.assignment_history TO authenticated;
GRANT SELECT ON public.github_file_checks TO authenticated;

-- Profile/document tables
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profile_documents TO authenticated;
GRANT SELECT ON public.profile_document_access_log TO authenticated;

-- Admin / config tables
GRANT SELECT ON public.product_feedback TO authenticated;
GRANT SELECT ON public.reminder_settings TO authenticated;
GRANT SELECT ON public.certification_reminder_logs TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.reviewer_invitations TO authenticated;
GRANT SELECT ON public.role_change_log TO authenticated;
GRANT SELECT ON public.admin_audit_log TO authenticated;
GRANT SELECT ON public.mfa_activity_log TO authenticated;

-- MFA tables (users manage their own)
GRANT SELECT, INSERT, UPDATE, DELETE ON public.mfa_backup_codes TO authenticated;

-- === Public-read tables (anon access) for changelog ===
GRANT SELECT ON public.changelog_entries TO anon;
GRANT SELECT ON public.changelog_links TO anon;
GRANT SELECT ON public.company_product_verifications TO anon;

-- === Future-proof: ensure default privileges grant Data API access to new tables ===
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO authenticated;

ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT ALL ON TABLES TO service_role;
