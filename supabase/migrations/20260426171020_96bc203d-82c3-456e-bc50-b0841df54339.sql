-- Harden quick_assign_products RPCs with array size and element length guards.

-- Overload 1: (text[], uuid, date)
CREATE OR REPLACE FUNCTION public.quick_assign_products(
  p_product_ids text[],
  p_reviewer_id uuid,
  p_deadline date DEFAULT NULL::date
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_round_id uuid;
  v_round_number integer;
  v_product_id text;
  v_assigned_count integer := 0;
  v_count integer;
BEGIN
  IF NOT has_role(auth.uid(), 'admin'::app_role) THEN
    RAISE EXCEPTION 'Only admins can quick assign products';
  END IF;

  IF p_reviewer_id IS NULL THEN
    RAISE EXCEPTION 'Reviewer ID is required';
  END IF;

  -- Validate array bounds
  v_count := COALESCE(array_length(p_product_ids, 1), 0);
  IF v_count = 0 THEN
    RAISE EXCEPTION 'At least one product ID is required';
  END IF;
  IF v_count > 500 THEN
    RAISE EXCEPTION 'Cannot assign more than 500 products in a single quick assign (got %)', v_count;
  END IF;

  -- Validate each product id length & non-empty
  FOREACH v_product_id IN ARRAY p_product_ids LOOP
    IF v_product_id IS NULL OR length(trim(v_product_id)) = 0 THEN
      RAISE EXCEPTION 'Product IDs cannot be null or empty';
    END IF;
    IF length(v_product_id) > 200 THEN
      RAISE EXCEPTION 'Product ID exceeds maximum length of 200 characters';
    END IF;
  END LOOP;

  -- Validate deadline is not in the past
  IF p_deadline IS NOT NULL AND p_deadline < CURRENT_DATE THEN
    RAISE EXCEPTION 'Deadline cannot be in the past';
  END IF;

  SELECT COALESCE(MAX(round_number), 0) + 1 INTO v_round_number FROM review_rounds;

  INSERT INTO review_rounds (
    name, round_number, description, status, start_date, end_date,
    default_deadline, created_by, total_products
  ) VALUES (
    'Quick Assignment ' || to_char(now(), 'YYYY-MM-DD HH24:MI'),
    v_round_number,
    'Quick assignment created by admin',
    'active',
    CURRENT_DATE,
    CURRENT_DATE + INTERVAL '30 days',
    COALESCE(p_deadline, CURRENT_DATE + INTERVAL '14 days'),
    auth.uid(),
    v_count
  )
  RETURNING id INTO v_round_id;

  FOREACH v_product_id IN ARRAY p_product_ids LOOP
    INSERT INTO product_reviews (
      product_id, review_round_id, assigned_to, deadline, status, priority
    ) VALUES (
      v_product_id, v_round_id, p_reviewer_id,
      COALESCE(p_deadline, CURRENT_DATE + INTERVAL '14 days'),
      'pending', 'medium'
    )
    ON CONFLICT DO NOTHING;

    INSERT INTO assignment_history (
      review_round_id, product_id, assigned_to, change_type, changed_by, reason
    ) VALUES (
      v_round_id, v_product_id, p_reviewer_id, 'initial', auth.uid(),
      'Quick assignment by admin'
    );

    v_assigned_count := v_assigned_count + 1;
  END LOOP;

  UPDATE review_rounds SET total_assignments = v_assigned_count WHERE id = v_round_id;

  INSERT INTO notifications (user_id, title, message, type, link)
  VALUES (
    p_reviewer_id,
    'New Product Reviews Assigned',
    format('You have been assigned %s product(s) to review', v_assigned_count),
    'info',
    '/admin/review-rounds'
  );

  RETURN jsonb_build_object(
    'success', true,
    'round_id', v_round_id,
    'assigned_count', v_assigned_count
  );
END;
$function$;

-- Overload 2: (uuid, uuid[], text[])
CREATE OR REPLACE FUNCTION public.quick_assign_products(
  p_round_id uuid,
  p_reviewer_ids uuid[],
  p_product_ids text[]
)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_count INTEGER := 0;
  v_reviewer_id UUID;
  v_product_id TEXT;
  v_index INTEGER := 1;
  v_reviewers_count integer;
  v_products_count integer;
BEGIN
  IF NOT public.is_admin_secure() THEN
    RAISE EXCEPTION 'Only admins can assign reviews';
  END IF;

  IF p_round_id IS NULL THEN
    RAISE EXCEPTION 'Round ID is required';
  END IF;

  v_reviewers_count := COALESCE(array_length(p_reviewer_ids, 1), 0);
  v_products_count := COALESCE(array_length(p_product_ids, 1), 0);

  IF v_reviewers_count = 0 THEN
    RAISE EXCEPTION 'At least one reviewer is required';
  END IF;
  IF v_reviewers_count > 100 THEN
    RAISE EXCEPTION 'Cannot assign with more than 100 reviewers at once';
  END IF;

  IF v_products_count = 0 THEN
    RAISE EXCEPTION 'At least one product ID is required';
  END IF;
  IF v_products_count > 500 THEN
    RAISE EXCEPTION 'Cannot assign more than 500 products in a single call';
  END IF;

  -- Reject null reviewer ids
  IF EXISTS (SELECT 1 FROM unnest(p_reviewer_ids) r WHERE r IS NULL) THEN
    RAISE EXCEPTION 'Reviewer IDs cannot contain null values';
  END IF;

  FOREACH v_product_id IN ARRAY p_product_ids LOOP
    IF v_product_id IS NULL OR length(trim(v_product_id)) = 0 THEN
      RAISE EXCEPTION 'Product IDs cannot be null or empty';
    END IF;
    IF length(v_product_id) > 200 THEN
      RAISE EXCEPTION 'Product ID exceeds maximum length of 200 characters';
    END IF;

    v_reviewer_id := p_reviewer_ids[((v_index - 1) % v_reviewers_count) + 1];

    INSERT INTO public.product_reviews (
      product_id, review_round_id, assigned_to, status
    ) VALUES (
      v_product_id, p_round_id, v_reviewer_id, 'pending'
    )
    ON CONFLICT (product_id, review_round_id, assigned_to) DO NOTHING;

    v_count := v_count + 1;
    v_index := v_index + 1;
  END LOOP;

  RETURN v_count;
END;
$function$;