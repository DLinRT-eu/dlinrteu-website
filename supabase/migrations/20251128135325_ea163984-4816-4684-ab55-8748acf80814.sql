-- Add product_last_revised column to track product revision date at time of certification
ALTER TABLE company_product_verifications 
ADD COLUMN product_last_revised timestamp with time zone;

-- Update certify_product RPC to accept and store product revision date
CREATE OR REPLACE FUNCTION public.certify_product(
  p_product_id text,
  p_company_id text,
  p_notes text DEFAULT NULL,
  p_product_last_revised timestamp with time zone DEFAULT NULL
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_user_id uuid;
BEGIN
  v_user_id := auth.uid();
  
  IF v_user_id IS NULL THEN
    RETURN json_build_object(
      'success', false,
      'error', 'Not authenticated'
    );
  END IF;
  
  -- Check if user can represent this company
  IF NOT can_represent_company(v_user_id, p_company_id) THEN
    RETURN json_build_object(
      'success', false,
      'error', 'You are not authorized to certify products for this company'
    );
  END IF;
  
  -- Insert or update certification
  INSERT INTO company_product_verifications (
    product_id,
    company_id,
    verified_by,
    verified_at,
    verification_notes,
    product_last_revised
  ) VALUES (
    p_product_id,
    p_company_id,
    v_user_id,
    NOW(),
    p_notes,
    COALESCE(p_product_last_revised, NOW())
  )
  ON CONFLICT (product_id, company_id) 
  DO UPDATE SET
    verified_by = EXCLUDED.verified_by,
    verified_at = EXCLUDED.verified_at,
    verification_notes = EXCLUDED.verification_notes,
    product_last_revised = COALESCE(EXCLUDED.product_last_revised, company_product_verifications.product_last_revised),
    updated_at = NOW();
  
  RETURN json_build_object(
    'success', true,
    'message', 'Product certified successfully'
  );
END;
$function$;