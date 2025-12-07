-- Step 1: Clean up existing duplicates (keep the oldest review per product+round)
DELETE FROM product_reviews
WHERE id IN (
  SELECT id FROM (
    SELECT id,
           ROW_NUMBER() OVER (
             PARTITION BY product_id, review_round_id 
             ORDER BY created_at ASC
           ) as rn
    FROM product_reviews
    WHERE review_round_id IS NOT NULL
  ) ranked
  WHERE rn > 1
);

-- Step 2: Add unique constraint to prevent future duplicates
ALTER TABLE product_reviews
ADD CONSTRAINT unique_product_per_round 
UNIQUE (product_id, review_round_id);

-- Step 3: Update the start_review_round_atomic function to handle duplicates gracefully
CREATE OR REPLACE FUNCTION public.start_review_round_atomic(p_round_id uuid, p_assignments jsonb)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_assignment JSONB;
  v_success_count INT := 0;
  v_skipped_count INT := 0;
  v_failed_count INT := 0;
  v_errors JSONB := '[]'::JSONB;
BEGIN
  -- Verify admin role
  IF NOT public.is_admin_secure() THEN
    RAISE EXCEPTION 'Access denied: admin role required';
  END IF;
  
  -- Insert assignments atomically
  FOR v_assignment IN SELECT * FROM jsonb_array_elements(p_assignments)
  LOOP
    BEGIN
      -- Check if assignment already exists
      IF EXISTS (
        SELECT 1 FROM public.product_reviews 
        WHERE product_id = (v_assignment->>'product_id')::TEXT 
          AND review_round_id = p_round_id
      ) THEN
        v_skipped_count := v_skipped_count + 1;
        CONTINUE;
      END IF;
      
      INSERT INTO public.product_reviews (
        product_id,
        review_round_id,
        assigned_to,
        status,
        priority,
        deadline
      ) VALUES (
        (v_assignment->>'product_id')::TEXT,
        p_round_id,
        (v_assignment->>'assigned_to')::UUID,
        'pending',
        COALESCE((v_assignment->>'priority')::TEXT, 'medium'),
        COALESCE((v_assignment->>'deadline')::DATE, CURRENT_DATE + INTERVAL '14 days')
      );
      
      -- Log to assignment history
      BEGIN
        INSERT INTO public.assignment_history (
          review_round_id,
          product_id,
          assigned_to,
          change_type,
          changed_by,
          reason
        ) VALUES (
          p_round_id,
          (v_assignment->>'product_id')::TEXT,
          (v_assignment->>'assigned_to')::UUID,
          'initial',
          auth.uid(),
          'Review round assignment'
        );
      EXCEPTION WHEN undefined_table THEN
        NULL;
      END;
      
      v_success_count := v_success_count + 1;
      
    EXCEPTION 
      WHEN unique_violation THEN
        -- Handle race condition where duplicate was inserted between check and insert
        v_skipped_count := v_skipped_count + 1;
      WHEN OTHERS THEN
        v_failed_count := v_failed_count + 1;
        v_errors := v_errors || jsonb_build_object(
          'product_id', v_assignment->>'product_id',
          'error', SQLERRM
        );
    END;
  END LOOP;
  
  -- Update round totals
  UPDATE public.review_rounds
  SET total_assignments = (
        SELECT COUNT(*) FROM public.product_reviews 
        WHERE review_round_id = p_round_id
      ),
      status = 'active',
      updated_at = NOW()
  WHERE id = p_round_id;
  
  RETURN jsonb_build_object(
    'success', TRUE,
    'assigned_count', v_success_count,
    'skipped_count', v_skipped_count,
    'failed_count', v_failed_count,
    'errors', v_errors
  );
END;
$function$;