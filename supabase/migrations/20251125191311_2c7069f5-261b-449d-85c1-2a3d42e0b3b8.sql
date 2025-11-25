-- Fix remaining SECURITY DEFINER functions missing SET search_path
-- This prevents SQL injection via search_path manipulation
-- Addresses: Function Search Path Mutable warning

-- Fix can_assign_company_role function
CREATE OR REPLACE FUNCTION public.can_assign_company_role(p_user_id uuid)
RETURNS TABLE(can_assign boolean, reason text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  has_products BOOLEAN;
  has_admin_role BOOLEAN;
BEGIN
  -- Check for products (still a conflict of interest)
  SELECT EXISTS (
    SELECT 1 FROM public.user_products
    WHERE user_id = p_user_id
    LIMIT 1
  ) INTO has_products;
  
  IF has_products THEN
    RETURN QUERY SELECT FALSE, 'User has product adoptions'::TEXT;
    RETURN;
  END IF;
  
  -- Check for admin role (new incompatibility)
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = p_user_id
    AND role = 'admin'
  ) INTO has_admin_role;
  
  IF has_admin_role THEN
    RETURN QUERY SELECT FALSE, 'User has Admin role'::TEXT;
    RETURN;
  END IF;
  
  -- Reviewer role is now OK with company role
  RETURN QUERY SELECT TRUE, 'OK'::TEXT;
END;
$$;

-- Fix check_role_compatibility function  
CREATE OR REPLACE FUNCTION public.check_role_compatibility()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  -- Block company role if user is admin
  IF NEW.role = 'company' AND EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = NEW.user_id
    AND role = 'admin'
  ) THEN
    RAISE EXCEPTION 'Company Representative role is incompatible with Admin role';
  END IF;
  
  -- Block admin role if user is company representative
  IF NEW.role = 'admin' AND EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = NEW.user_id
    AND role = 'company'
  ) THEN
    RAISE EXCEPTION 'Admin role is incompatible with Company Representative role';
  END IF;
  
  -- Allow company + reviewer combination (no check needed)
  
  RETURN NEW;
END;
$$;