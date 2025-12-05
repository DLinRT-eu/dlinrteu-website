-- Fix Function Search Path Mutable for check_company_rep_limit
CREATE OR REPLACE FUNCTION public.check_company_rep_limit()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
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
$function$;