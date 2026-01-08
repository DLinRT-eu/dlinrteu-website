-- Add explicit denial policies for anonymous users to prevent data leakage

-- 1. profiles - Add explicit anon denial
CREATE POLICY "Deny anonymous access to profiles" ON public.profiles
  AS RESTRICTIVE
  FOR ALL
  TO anon
  USING (false)
  WITH CHECK (false);

-- 2. user_registration_notifications - Add explicit anon denial
CREATE POLICY "Deny anonymous access to user_registration_notifications" 
  ON public.user_registration_notifications
  AS RESTRICTIVE
  FOR ALL
  TO anon
  USING (false)
  WITH CHECK (false);

-- 3. mfa_backup_codes - Add explicit anon denial
CREATE POLICY "Deny anonymous access to mfa_backup_codes" ON public.mfa_backup_codes
  AS RESTRICTIVE
  FOR ALL
  TO anon
  USING (false)
  WITH CHECK (false);

-- Fix mfa_backup_codes policies that incorrectly target 'public' role instead of 'authenticated'
DROP POLICY IF EXISTS "Admins can delete any backup codes" ON public.mfa_backup_codes;
CREATE POLICY "Admins can delete any backup codes" ON public.mfa_backup_codes
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid() 
      AND user_roles.role = 'admin'::app_role
    )
  );

DROP POLICY IF EXISTS "Users can delete own backup codes" ON public.mfa_backup_codes;
CREATE POLICY "Users can delete own backup codes" ON public.mfa_backup_codes
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);