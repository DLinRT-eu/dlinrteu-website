
-- Fix: Remove admin access from mfa_backup_codes SELECT policy
-- Admins should not be able to view other users' backup code hashes

DROP POLICY IF EXISTS "Users can view own backup codes" ON public.mfa_backup_codes;

CREATE POLICY "Users can view own backup codes"
ON public.mfa_backup_codes
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);
