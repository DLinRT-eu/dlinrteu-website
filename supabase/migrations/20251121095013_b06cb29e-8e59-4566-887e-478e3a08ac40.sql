-- Update role compatibility function to allow company + reviewer roles
-- But block admin + company roles

CREATE OR REPLACE FUNCTION public.check_role_compatibility()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Block: company role when user has admin role
  IF NEW.role = 'company' AND EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = NEW.user_id
    AND role = 'admin'
  ) THEN
    RAISE EXCEPTION 'Company Representative role is incompatible with Admin role (conflict of interest)';
  END IF;
  
  -- Block: admin role when user has company role
  IF NEW.role = 'admin' AND EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = NEW.user_id
    AND role = 'company'
  ) THEN
    RAISE EXCEPTION 'Admin role is incompatible with Company Representative role (conflict of interest)';
  END IF;
  
  -- Note: Removed company+reviewer incompatibility - these roles can now coexist
  
  RETURN NEW;
END;
$$;