
-- Remove redundant "service role" PERMISSIVE policies that use USING(true) / WITH CHECK(true).
-- The Supabase service role already bypasses RLS entirely, so these policies
-- serve no purpose and trigger the database linter warning.

-- admin_audit_log
DROP POLICY IF EXISTS "Service role can insert audit logs" ON public.admin_audit_log;

-- certification_reminder_logs
DROP POLICY IF EXISTS "Service role can insert certification_reminder_logs" ON public.certification_reminder_logs;

-- consent_audit_log
DROP POLICY IF EXISTS "Service role can insert consent logs" ON public.consent_audit_log;

-- contact_submissions
DROP POLICY IF EXISTS "Service role only access to contact submissions" ON public.contact_submissions;

-- mfa_activity_log
DROP POLICY IF EXISTS "Service role can insert MFA activity" ON public.mfa_activity_log;

-- mfa_backup_codes
DROP POLICY IF EXISTS "Service role can insert backup codes" ON public.mfa_backup_codes;

-- newsletter_subscribers
DROP POLICY IF EXISTS "Service role only access to newsletter subscribers" ON public.newsletter_subscribers;

-- notifications
DROP POLICY IF EXISTS "Service role can insert notifications" ON public.notifications;

-- product_edit_drafts
DROP POLICY IF EXISTS "Service role full access product_edit_drafts" ON public.product_edit_drafts;

-- product_reviews
DROP POLICY IF EXISTS "Service role full access product_reviews" ON public.product_reviews;

-- profile_document_access_log
DROP POLICY IF EXISTS "Service role can insert access logs" ON public.profile_document_access_log;

-- profiles
DROP POLICY IF EXISTS "Service role full access" ON public.profiles;

-- review_round_stats
DROP POLICY IF EXISTS "Service role full access review_round_stats" ON public.review_round_stats;

-- review_rounds
DROP POLICY IF EXISTS "Service role full access review_rounds" ON public.review_rounds;

-- role_change_log
DROP POLICY IF EXISTS "Service role insert role changes" ON public.role_change_log;

-- security_events
DROP POLICY IF EXISTS "Service role can insert security events" ON public.security_events;
DROP POLICY IF EXISTS "Service role full access security_events" ON public.security_events;

-- user_roles
DROP POLICY IF EXISTS "Service role full access" ON public.user_roles;
