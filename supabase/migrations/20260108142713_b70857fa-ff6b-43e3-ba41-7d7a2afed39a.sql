-- Fix all WARN level security issues

-- =============================================
-- 1. ADMIN AUDIT LOG - Add SELECT policy for admins and anon denial
-- =============================================
-- Add restrictive denial for anonymous users
CREATE POLICY "Deny anonymous access to admin_audit_log" ON public.admin_audit_log
  AS RESTRICTIVE
  FOR ALL
  TO anon
  USING (false)
  WITH CHECK (false);

-- Add SELECT policy for admins only
CREATE POLICY "Admins can view audit logs" ON public.admin_audit_log
  FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- =============================================
-- 2. ANALYTICS TABLES - Add explicit anon denial policies
-- =============================================

-- analytics_daily - deny anonymous access
CREATE POLICY "Deny anonymous access to analytics_daily" ON public.analytics_daily
  AS RESTRICTIVE
  FOR ALL
  TO anon
  USING (false)
  WITH CHECK (false);

-- Add admin read access for analytics_daily
CREATE POLICY "Admins can view analytics_daily" ON public.analytics_daily
  FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- analytics_page_visits - deny anonymous access
CREATE POLICY "Deny anonymous access to analytics_page_visits" ON public.analytics_page_visits
  AS RESTRICTIVE
  FOR ALL
  TO anon
  USING (false)
  WITH CHECK (false);

-- Add admin read access for analytics_page_visits
CREATE POLICY "Admins can view analytics_page_visits" ON public.analytics_page_visits
  FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- analytics_visitors - deny anonymous access
CREATE POLICY "Deny anonymous access to analytics_visitors" ON public.analytics_visitors
  AS RESTRICTIVE
  FOR ALL
  TO anon
  USING (false)
  WITH CHECK (false);

-- Add admin read access for analytics_visitors
CREATE POLICY "Admins can view analytics_visitors" ON public.analytics_visitors
  FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- =============================================
-- 3. MFA_ACTIVITY_LOG - Add explicit anon denial
-- =============================================
CREATE POLICY "Deny anonymous access to mfa_activity_log" ON public.mfa_activity_log
  AS RESTRICTIVE
  FOR ALL
  TO anon
  USING (false)
  WITH CHECK (false);

-- =============================================
-- 4. PROFILE_DOCUMENTS - Add explicit anon denial
-- =============================================
CREATE POLICY "Deny anonymous access to profile_documents" ON public.profile_documents
  AS RESTRICTIVE
  FOR ALL
  TO anon
  USING (false)
  WITH CHECK (false);

-- =============================================
-- 5. SECURITY_EVENTS - Add explicit anon denial
-- =============================================
CREATE POLICY "Deny anonymous access to security_events" ON public.security_events
  AS RESTRICTIVE
  FOR ALL
  TO anon
  USING (false)
  WITH CHECK (false);

-- =============================================
-- 6. REVIEWER_INVITATIONS - Add explicit anon denial  
-- =============================================
CREATE POLICY "Deny anonymous access to reviewer_invitations" ON public.reviewer_invitations
  AS RESTRICTIVE
  FOR ALL
  TO anon
  USING (false)
  WITH CHECK (false);

-- =============================================
-- 7. COMPANY_REVISIONS - Add explicit anon denial
-- =============================================
CREATE POLICY "Deny anonymous access to company_revisions" ON public.company_revisions
  AS RESTRICTIVE
  FOR ALL
  TO anon
  USING (false)
  WITH CHECK (false);

-- =============================================
-- 8. Fix policies using 'public' role instead of 'authenticated'
-- =============================================

-- Fix company_revisions policies
DROP POLICY IF EXISTS "Admins and reviewers can update revisions" ON public.company_revisions;
CREATE POLICY "Admins and reviewers can update revisions" ON public.company_revisions
  FOR UPDATE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'reviewer'::app_role));

DROP POLICY IF EXISTS "Company can create revisions" ON public.company_revisions;
CREATE POLICY "Company can create revisions" ON public.company_revisions
  FOR INSERT
  TO authenticated
  WITH CHECK ((revised_by = auth.uid()) AND has_role(auth.uid(), 'company'::app_role));

DROP POLICY IF EXISTS "View company revisions" ON public.company_revisions;
CREATE POLICY "View company revisions" ON public.company_revisions
  FOR SELECT
  TO authenticated
  USING (
    (revised_by = auth.uid()) 
    OR has_role(auth.uid(), 'admin'::app_role) 
    OR (
      has_role(auth.uid(), 'reviewer'::app_role) 
      AND (
        EXISTS (
          SELECT 1 FROM product_reviews pr
          WHERE pr.product_id = company_revisions.product_id 
          AND pr.assigned_to = auth.uid()
        ) 
        OR EXISTS (
          SELECT 1 FROM assignment_history ah
          WHERE ah.product_id = company_revisions.product_id 
          AND (ah.assigned_to = auth.uid() OR ah.previous_assignee = auth.uid())
        )
      )
    )
  );

-- Fix reviewer_invitations policies
DROP POLICY IF EXISTS "Admins can insert invitations" ON public.reviewer_invitations;
CREATE POLICY "Admins can insert invitations" ON public.reviewer_invitations
  FOR INSERT
  TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Admins can update invitations" ON public.reviewer_invitations;
CREATE POLICY "Admins can update invitations" ON public.reviewer_invitations
  FOR UPDATE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Admins can view all invitations" ON public.reviewer_invitations;
CREATE POLICY "Admins can view all invitations" ON public.reviewer_invitations
  FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));