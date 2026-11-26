DROP FUNCTION IF EXISTS public.certify_product(text, text, text);
DROP FUNCTION IF EXISTS public.certify_product(text, text, text, timestamptz);

CREATE OR REPLACE FUNCTION public.certify_product(p_product_id text, p_company_id text, p_notes text DEFAULT NULL::text, p_product_last_revised timestamp with time zone DEFAULT NULL::timestamp with time zone, p_content_hash text DEFAULT NULL::text)
 RETURNS json
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid uuid := auth.uid();
  v_is_admin boolean;
BEGIN
  IF v_uid IS NULL THEN
    RETURN json_build_object('success', false, 'error', 'Not authenticated');
  END IF;

  v_is_admin := has_role(v_uid, 'admin'::app_role);

  IF NOT v_is_admin THEN
    IF NOT has_role(v_uid, 'company'::app_role) THEN
      RETURN json_build_object('success', false, 'error', 'Not authorized');
    END IF;
    -- Only reps whose representation an admin has verified may certify.
    IF NOT EXISTS (
      SELECT 1 FROM company_representatives
      WHERE user_id = v_uid AND company_id = p_company_id AND verified = true
    ) THEN
      RETURN json_build_object('success', false, 'error', 'Not authorized');
    END IF;
  END IF;

  -- The product must belong to that company.
  IF NOT EXISTS (
    SELECT 1 FROM company_product_ownership
    WHERE company_id = p_company_id AND product_id = p_product_id
  ) THEN
    RETURN json_build_object('success', false, 'error', 'Not authorized');
  END IF;

  IF p_notes IS NOT NULL AND length(p_notes) > 2000 THEN
    RETURN json_build_object('success', false, 'error', 'Notes too long');
  END IF;
  IF p_content_hash IS NOT NULL AND p_content_hash !~ '^[A-Za-z0-9:_-]{1,128}$' THEN
    RETURN json_build_object('success', false, 'error', 'Invalid content hash');
  END IF;

  INSERT INTO company_product_verifications (
    product_id, company_id, verified_by, verified_at, verification_notes, product_last_revised, content_hash
  ) VALUES (
    p_product_id, p_company_id, v_uid, NOW(), p_notes, LEAST(COALESCE(p_product_last_revised, NOW()), NOW()), p_content_hash
  )
  ON CONFLICT (product_id, company_id)
  DO UPDATE SET
    verified_by = v_uid,
    verified_at = NOW(),
    verification_notes = EXCLUDED.verification_notes,
    product_last_revised = EXCLUDED.product_last_revised,
    content_hash = EXCLUDED.content_hash,
    updated_at = NOW();

  RETURN json_build_object('success', true, 'message', 'Product certified successfully');
END;
$function$;

REVOKE ALL ON FUNCTION public.certify_product(text, text, text, timestamptz, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.certify_product(text, text, text, timestamptz, text) TO authenticated;