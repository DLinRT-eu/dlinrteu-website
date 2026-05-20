CREATE OR REPLACE FUNCTION public.update_round_deadline_admin(
  p_round_id uuid,
  p_deadline date,
  p_propagate boolean DEFAULT true
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_updated_assignments integer := 0;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin'::app_role) THEN
    RETURN jsonb_build_object('success', false, 'error', 'Admin role required');
  END IF;

  UPDATE public.review_rounds
  SET default_deadline = p_deadline,
      updated_at = now()
  WHERE id = p_round_id;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'Round not found');
  END IF;

  IF p_propagate THEN
    WITH upd AS (
      UPDATE public.product_reviews
      SET deadline = p_deadline,
          updated_at = now()
      WHERE review_round_id = p_round_id
      RETURNING 1
    )
    SELECT count(*) INTO v_updated_assignments FROM upd;
  END IF;

  RETURN jsonb_build_object(
    'success', true,
    'updated_assignments', v_updated_assignments
  );
END;
$$;