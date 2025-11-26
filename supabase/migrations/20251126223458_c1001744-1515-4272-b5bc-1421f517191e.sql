-- =====================================================
-- Fix Review Rounds RLS Issues
-- Create comprehensive SECURITY DEFINER RPC functions
-- =====================================================

-- First, clean up orphaned data
DELETE FROM public.assignment_history 
WHERE review_round_id NOT IN (SELECT id FROM public.review_rounds);

DELETE FROM public.product_reviews 
WHERE review_round_id NOT IN (SELECT id FROM public.review_rounds);

DELETE FROM public.review_round_stats 
WHERE round_id NOT IN (SELECT id FROM public.review_rounds);

-- =====================================================
-- Create Review Round Admin RPC
-- =====================================================
CREATE OR REPLACE FUNCTION public.create_review_round_admin(
  p_name TEXT,
  p_round_number INTEGER,
  p_description TEXT DEFAULT NULL,
  p_start_date DATE DEFAULT CURRENT_DATE,
  p_default_deadline DATE DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_caller_uid UUID;
  v_new_round_id UUID;
BEGIN
  v_caller_uid := auth.uid();
  
  IF v_caller_uid IS NULL THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Not authenticated'
    );
  END IF;
  
  -- Check admin role directly
  IF NOT EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = v_caller_uid AND role = 'admin'::app_role
  ) THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Access denied - admin role required'
    );
  END IF;
  
  -- Create the review round
  INSERT INTO public.review_rounds (
    name,
    round_number,
    description,
    status,
    start_date,
    default_deadline,
    created_by
  ) VALUES (
    p_name,
    p_round_number,
    p_description,
    'draft',
    p_start_date,
    COALESCE(p_default_deadline, p_start_date + INTERVAL '14 days'),
    v_caller_uid
  )
  RETURNING id INTO v_new_round_id;
  
  -- Create initial stats entry
  INSERT INTO public.review_round_stats (round_id)
  VALUES (v_new_round_id);
  
  RETURN jsonb_build_object(
    'success', true,
    'message', 'Review round created successfully',
    'round_id', v_new_round_id
  );
  
EXCEPTION
  WHEN OTHERS THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', SQLERRM
    );
END;
$$;

-- =====================================================
-- Update existing get_review_rounds_admin to be more robust
-- =====================================================
CREATE OR REPLACE FUNCTION public.get_review_rounds_admin()
RETURNS TABLE(
  id UUID,
  name TEXT,
  round_number INTEGER,
  description TEXT,
  status TEXT,
  start_date DATE,
  end_date DATE,
  default_deadline DATE,
  total_products INTEGER,
  total_assignments INTEGER,
  created_at TIMESTAMPTZ,
  created_by UUID,
  updated_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_caller_uid UUID;
BEGIN
  v_caller_uid := auth.uid();
  
  -- Check admin role directly
  IF NOT EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = v_caller_uid AND role = 'admin'::app_role
  ) THEN
    RAISE EXCEPTION 'Access denied: admin role required';
  END IF;
  
  RETURN QUERY
  SELECT 
    rr.id,
    rr.name,
    rr.round_number,
    rr.description,
    rr.status,
    rr.start_date,
    rr.end_date,
    rr.default_deadline,
    rr.total_products,
    rr.total_assignments,
    rr.created_at,
    rr.created_by,
    rr.updated_at
  FROM public.review_rounds rr
  ORDER BY rr.created_at DESC;
END;
$$;

-- =====================================================
-- Create Update Review Round Admin RPC
-- =====================================================
CREATE OR REPLACE FUNCTION public.update_review_round_admin(
  p_round_id UUID,
  p_name TEXT DEFAULT NULL,
  p_description TEXT DEFAULT NULL,
  p_start_date DATE DEFAULT NULL,
  p_end_date DATE DEFAULT NULL,
  p_default_deadline DATE DEFAULT NULL,
  p_status TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_caller_uid UUID;
BEGIN
  v_caller_uid := auth.uid();
  
  IF v_caller_uid IS NULL THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Not authenticated'
    );
  END IF;
  
  -- Check admin role directly
  IF NOT EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = v_caller_uid AND role = 'admin'::app_role
  ) THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Access denied - admin role required'
    );
  END IF;
  
  -- Verify round exists
  IF NOT EXISTS (SELECT 1 FROM public.review_rounds WHERE id = p_round_id) THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Review round not found'
    );
  END IF;
  
  -- Update the review round
  UPDATE public.review_rounds
  SET 
    name = COALESCE(p_name, name),
    description = COALESCE(p_description, description),
    start_date = COALESCE(p_start_date, start_date),
    end_date = COALESCE(p_end_date, end_date),
    default_deadline = COALESCE(p_default_deadline, default_deadline),
    status = COALESCE(p_status, status),
    updated_at = NOW()
  WHERE id = p_round_id;
  
  RETURN jsonb_build_object(
    'success', true,
    'message', 'Review round updated successfully',
    'round_id', p_round_id
  );
  
EXCEPTION
  WHEN OTHERS THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', SQLERRM
    );
END;
$$;

-- =====================================================
-- Update existing delete function to be more robust
-- =====================================================
CREATE OR REPLACE FUNCTION public.delete_review_round_admin(round_id_param UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_caller_uid UUID;
BEGIN
  v_caller_uid := auth.uid();
  
  IF v_caller_uid IS NULL THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Not authenticated'
    );
  END IF;
  
  -- Check admin role directly
  IF NOT EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = v_caller_uid AND role = 'admin'::app_role
  ) THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Access denied - admin role required'
    );
  END IF;
  
  -- Verify round exists
  IF NOT EXISTS (SELECT 1 FROM public.review_rounds WHERE id = round_id_param) THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Review round not found'
    );
  END IF;
  
  -- Delete in order to avoid FK constraint issues
  DELETE FROM public.review_round_stats WHERE round_id = round_id_param;
  DELETE FROM public.assignment_history WHERE review_round_id = round_id_param;
  DELETE FROM public.review_checklist_items WHERE review_id IN (
    SELECT id FROM public.product_reviews WHERE review_round_id = round_id_param
  );
  DELETE FROM public.review_comments WHERE review_id IN (
    SELECT id FROM public.product_reviews WHERE review_round_id = round_id_param
  );
  DELETE FROM public.github_file_checks WHERE review_id IN (
    SELECT id FROM public.product_reviews WHERE review_round_id = round_id_param
  );
  DELETE FROM public.product_reviews WHERE review_round_id = round_id_param;
  DELETE FROM public.review_rounds WHERE id = round_id_param;
  
  RETURN jsonb_build_object(
    'success', true,
    'message', 'Review round deleted successfully'
  );
  
EXCEPTION
  WHEN OTHERS THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', SQLERRM
    );
END;
$$;

-- =====================================================
-- Get Reviewer Statistics Admin RPC
-- =====================================================
CREATE OR REPLACE FUNCTION public.get_reviewer_stats_admin()
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_caller_uid UUID;
  v_total_reviewers INTEGER;
  v_with_expertise INTEGER;
  v_result JSONB;
BEGIN
  v_caller_uid := auth.uid();
  
  -- Check admin role directly
  IF NOT EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = v_caller_uid AND role = 'admin'::app_role
  ) THEN
    RAISE EXCEPTION 'Access denied: admin role required';
  END IF;
  
  -- Count total reviewers
  SELECT COUNT(DISTINCT user_id) INTO v_total_reviewers
  FROM public.user_roles
  WHERE role = 'reviewer';
  
  -- Count reviewers with expertise
  SELECT COUNT(DISTINCT user_id) INTO v_with_expertise
  FROM public.reviewer_expertise;
  
  v_result := jsonb_build_object(
    'total_reviewers', v_total_reviewers,
    'with_expertise', v_with_expertise,
    'without_expertise', v_total_reviewers - v_with_expertise
  );
  
  RETURN v_result;
END;
$$;