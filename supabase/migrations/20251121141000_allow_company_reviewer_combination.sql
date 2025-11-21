-- Allow users to have both Company Representative and Reviewer roles
-- But still prevent Company Representative + Admin combination

-- Drop the old trigger that blocked company + reviewer
DROP TRIGGER IF EXISTS trigger_check_role_compatibility ON public.user_roles;

-- Replace with new function that only blocks company + admin
CREATE OR REPLACE FUNCTION public.check_role_compatibility()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
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

-- Recreate trigger with updated logic
CREATE TRIGGER trigger_check_role_compatibility
  BEFORE INSERT ON public.user_roles
  FOR EACH ROW
  EXECUTE FUNCTION public.check_role_compatibility();

-- Update helper function to reflect new rules
CREATE OR REPLACE FUNCTION public.can_assign_company_role(p_user_id UUID)
RETURNS TABLE(can_assign BOOLEAN, reason TEXT)
LANGUAGE plpgsql
SECURITY DEFINER
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

-- Update comments
COMMENT ON FUNCTION public.check_role_compatibility IS 
  'Ensures Company Representative and Admin roles are mutually exclusive. Company + Reviewer is now allowed.';

COMMENT ON FUNCTION public.can_assign_company_role IS 
  'Helper function to check if company role can be assigned. Blocks if user has products or admin role. Reviewer role is now compatible.';
