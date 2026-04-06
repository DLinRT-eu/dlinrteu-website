-- Fix 1: Restrict reviewer assignment history to own assignments only
DROP POLICY IF EXISTS "Reviewers can view own assignment history" ON public.assignment_history;

CREATE POLICY "Reviewers can view own assignment history" ON public.assignment_history
  FOR SELECT
  TO authenticated
  USING (
    assigned_to = auth.uid()
    OR previous_assignee = auth.uid()
  );

-- Fix 2: mfa_activity_log is written by edge functions using service_role client (bypasses RLS).
-- No INSERT policy needed for authenticated users. This is by design.
-- Adding a comment to document this decision.
COMMENT ON TABLE public.mfa_activity_log IS 'MFA activity is logged exclusively via edge functions using service_role client, which bypasses RLS. No INSERT policy for authenticated users is intentional.';