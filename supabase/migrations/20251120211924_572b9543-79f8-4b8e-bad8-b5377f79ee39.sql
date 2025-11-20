-- Fix user_roles RLS policies - Allow admins to manage roles
-- This enables user registration confirmation, role assignment, and review rounds

-- Allow admins to INSERT roles (grant roles to users)
CREATE POLICY "Admins can insert roles"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'::app_role
  )
);

-- Allow admins to DELETE roles (revoke roles from users)
CREATE POLICY "Admins can delete roles"
ON public.user_roles
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'::app_role
  )
);

-- Allow admins to UPDATE roles (for metadata changes)
CREATE POLICY "Admins can update roles"
ON public.user_roles
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'::app_role
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'::app_role
  )
);

-- Add helpful comments
COMMENT ON POLICY "Admins can insert roles" ON public.user_roles IS 
  'Allows admin users to grant roles to other users. Uses subquery to avoid recursive RLS.';

COMMENT ON POLICY "Admins can delete roles" ON public.user_roles IS 
  'Allows admin users to revoke roles from other users.';

COMMENT ON POLICY "Admins can update roles" ON public.user_roles IS 
  'Allows admin users to update role metadata if needed.';