-- Add DELETE policies for mfa_backup_codes table

-- Allow users to delete their own backup codes
CREATE POLICY "Users can delete own backup codes" 
ON mfa_backup_codes 
FOR DELETE 
USING (auth.uid() = user_id);

-- Allow admins to delete any backup codes
CREATE POLICY "Admins can delete any backup codes"
ON mfa_backup_codes
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid() AND role = 'admin'::app_role
  )
);