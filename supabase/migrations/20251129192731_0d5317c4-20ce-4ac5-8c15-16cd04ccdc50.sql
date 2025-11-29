-- Update can_represent_company to allow admins to certify ANY company
CREATE OR REPLACE FUNCTION public.can_represent_company(
  p_user_id uuid,
  p_company_id text
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- ADMINS CAN CERTIFY ANY COMPANY without being a representative
  IF has_role(p_user_id, 'admin'::app_role) THEN
    RETURN TRUE;
  END IF;
  
  -- Regular users must have company role
  IF NOT has_role(p_user_id, 'company'::app_role) THEN
    RETURN FALSE;
  END IF;
  
  -- And be a verified representative of this specific company
  RETURN EXISTS (
    SELECT 1 FROM company_representatives
    WHERE user_id = p_user_id
      AND company_id = p_company_id
      AND verified = true
  );
END;
$$;

-- Update maximum representatives limit from 3 to 5
CREATE OR REPLACE FUNCTION public.check_company_rep_limit()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  active_count integer;
BEGIN
  IF NEW.verified = true THEN
    SELECT COUNT(*) INTO active_count
    FROM company_representatives
    WHERE company_id = NEW.company_id
      AND verified = true
      AND id != COALESCE(NEW.id, '00000000-0000-0000-0000-000000000000'::uuid);
    
    IF active_count >= 5 THEN
      RAISE EXCEPTION 'Company already has maximum of 5 verified representatives';
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$;

COMMENT ON FUNCTION public.can_represent_company IS 'Checks if user can certify products for a company. Admins can certify any company, company reps must be verified for specific company.';
COMMENT ON FUNCTION public.check_company_rep_limit IS 'Enforces maximum of 5 verified representatives per company';