-- Fix RLS policies that have overly permissive WITH CHECK (true) conditions
-- These policies should only allow service_role, not authenticated/public users

-- 1. Fix admin_audit_log - only admins should be able to insert audit logs
DROP POLICY IF EXISTS "Service role can insert audit logs" ON public.admin_audit_log;
CREATE POLICY "Service role can insert audit logs" ON public.admin_audit_log
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- 2. Fix consent_audit_log - only authenticated users for their own records
DROP POLICY IF EXISTS "Service role can insert consent logs" ON public.consent_audit_log;
CREATE POLICY "Service role can insert consent logs" ON public.consent_audit_log
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Users can insert own consent logs" ON public.consent_audit_log
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- 3. Fix notifications - only service_role should insert
DROP POLICY IF EXISTS "Service role can insert notifications" ON public.notifications;
CREATE POLICY "Service role can insert notifications" ON public.notifications
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- 4. Fix profile_document_access_log - only service_role should insert
DROP POLICY IF EXISTS "Service role can insert access logs" ON public.profile_document_access_log;
CREATE POLICY "Service role can insert access logs" ON public.profile_document_access_log
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- 5. Fix role_change_log - only service_role or admins should insert
DROP POLICY IF EXISTS "Service role insert role changes" ON public.role_change_log;
CREATE POLICY "Service role insert role changes" ON public.role_change_log
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- 6. Fix security_events - restrict authenticated user inserts
DROP POLICY IF EXISTS "Authenticated users can insert security events" ON public.security_events;
CREATE POLICY "Service role can insert security events" ON public.security_events
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Allow authenticated users to insert security events but with proper validation
-- (events are logged client-side for security monitoring)
CREATE POLICY "Authenticated users can log security events" ON public.security_events
  FOR INSERT
  TO authenticated
  WITH CHECK (
    -- Only allow specific event types that are expected from client-side
    event_type IN (
      'login_attempt',
      'login_success', 
      'login_failure',
      'logout',
      'password_change',
      'mfa_enabled',
      'mfa_disabled',
      'session_expired',
      'suspicious_activity',
      'rate_limit_exceeded',
      'bot_detected',
      'unusual_activity'
    )
  );