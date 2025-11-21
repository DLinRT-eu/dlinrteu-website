-- Fix RLS policy circular dependency on user_roles
-- Replace has_role() with is_admin_secure() to avoid RLS recursion

-- Ensure is_admin_secure() function exists (idempotent)
CREATE OR REPLACE FUNCTION public.is_admin_secure()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = auth.uid()
      AND role = 'admin'::app_role
  );
$$;

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION public.is_admin_secure() TO authenticated;
GRANT SELECT ON public.user_roles TO authenticated;

-- Drop existing policies that cause circular dependency
DROP POLICY IF EXISTS "Admins can insert roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can delete roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can update roles" ON public.user_roles;

-- Recreate policies using is_admin_secure() SECURITY DEFINER function
-- This bypasses RLS and prevents circular dependency
CREATE POLICY "Admins can insert roles"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin_secure());

CREATE POLICY "Admins can delete roles"
ON public.user_roles
FOR DELETE
TO authenticated
USING (public.is_admin_secure());

CREATE POLICY "Admins can update roles"
ON public.user_roles
FOR UPDATE
TO authenticated
USING (public.is_admin_secure())
WITH CHECK (public.is_admin_secure());

-- Add helpful comments
COMMENT ON FUNCTION public.is_admin_secure() IS 
  'SECURITY DEFINER function to check admin status without triggering RLS recursion. Used by user_roles policies.';

COMMENT ON POLICY "Admins can insert roles" ON public.user_roles IS 
  'Uses is_admin_secure() SECURITY DEFINER function to avoid RLS circular dependency when checking admin status.';

COMMENT ON POLICY "Admins can delete roles" ON public.user_roles IS 
  'Uses is_admin_secure() SECURITY DEFINER function to avoid RLS circular dependency when checking admin status.';

COMMENT ON POLICY "Admins can update roles" ON public.user_roles IS 
  'Uses is_admin_secure() SECURITY DEFINER function to avoid RLS circular dependency when checking admin status.';
