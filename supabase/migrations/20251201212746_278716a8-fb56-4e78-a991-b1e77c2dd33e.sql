-- Update certify_product function to accept and store content_hash parameter

CREATE OR REPLACE FUNCTION public.certify_product(
  p_product_id TEXT,
  p_company_id TEXT,
  p_notes TEXT DEFAULT NULL,
  p_product_last_revised TIMESTAMP WITH TIME ZONE DEFAULT NULL,
  p_content_hash TEXT DEFAULT NULL
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Verify user has company role or admin role
  IF NOT has_role(auth.uid(), 'company'::app_role) AND NOT has_role(auth.uid(), 'admin'::app_role) THEN
    RETURN json_build_object('success', false, 'error', 'Company or admin role required');
  END IF;
  
  -- SECURITY: Verify user can represent this company (unless admin)
  IF NOT has_role(auth.uid(), 'admin'::app_role) AND NOT can_represent_company(auth.uid(), p_company_id) THEN
    RETURN json_build_object('success', false, 'error', 'You are not authorized to certify products for this company');
  END IF;
  
  -- Insert or update verification record
  INSERT INTO company_product_verifications (
    product_id,
    company_id,
    verified_by,
    verified_at,
    verification_notes,
    product_last_revised,
    content_hash
  ) VALUES (
    p_product_id,
    p_company_id,
    auth.uid(),
    NOW(),
    p_notes,
    p_product_last_revised,
    p_content_hash
  )
  ON CONFLICT (product_id, company_id)
  DO UPDATE SET
    verified_by = auth.uid(),
    verified_at = NOW(),
    verification_notes = p_notes,
    product_last_revised = p_product_last_revised,
    content_hash = p_content_hash,
    updated_at = NOW();
  
  RETURN json_build_object('success', true, 'message', 'Product certified successfully');
END;
$$;