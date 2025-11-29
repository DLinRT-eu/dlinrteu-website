-- Fix create_company_revision to add proper authorization check
CREATE OR REPLACE FUNCTION public.create_company_revision(
  p_product_id text, 
  p_company_id text, 
  p_changes_summary text, 
  p_revision_date date DEFAULT CURRENT_DATE
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Verify user has company role
  IF NOT has_role(auth.uid(), 'company'::app_role) THEN
    RETURN jsonb_build_object('success', false, 'error', 'Company role required');
  END IF;
  
  -- SECURITY FIX: Verify user can represent this company
  IF NOT can_represent_company(auth.uid(), p_company_id) THEN
    RETURN jsonb_build_object('success', false, 'error', 'You are not authorized to submit revisions for this company');
  END IF;
  
  -- Insert revision
  INSERT INTO company_revisions (
    product_id, 
    company_id, 
    revised_by, 
    revision_date, 
    changes_summary, 
    verification_status
  ) VALUES (
    p_product_id, 
    p_company_id, 
    auth.uid(), 
    p_revision_date,
    p_changes_summary, 
    'pending'
  );
  
  RETURN jsonb_build_object('success', true, 'message', 'Revision submitted successfully');
END;
$$;