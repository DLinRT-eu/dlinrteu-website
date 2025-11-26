-- ============================================
-- Phase 1: Fix Review Rounds Access for Reviewers
-- ============================================

CREATE OR REPLACE FUNCTION public.get_active_rounds_for_reviewer()
RETURNS TABLE(
  id UUID,
  name TEXT,
  round_number INTEGER,
  status TEXT,
  default_deadline DATE,
  has_assignments BOOLEAN,
  assignment_count BIGINT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Verify user has reviewer or admin role
  IF NOT has_role(auth.uid(), 'reviewer'::app_role) 
     AND NOT has_role(auth.uid(), 'admin'::app_role) THEN
    RAISE EXCEPTION 'Access denied: reviewer or admin role required';
  END IF;
  
  RETURN QUERY
  SELECT 
    rr.id,
    rr.name,
    rr.round_number,
    rr.status,
    rr.default_deadline,
    EXISTS(
      SELECT 1 FROM product_reviews pr 
      WHERE pr.review_round_id = rr.id AND pr.assigned_to = auth.uid()
    ) as has_assignments,
    (
      SELECT COUNT(*) FROM product_reviews pr 
      WHERE pr.review_round_id = rr.id AND pr.assigned_to = auth.uid()
    ) as assignment_count
  FROM review_rounds rr
  WHERE rr.status = 'active'
  ORDER BY rr.round_number DESC;
END;
$$;

-- ============================================
-- Phase 2: Fix Company Revisions Access
-- ============================================

-- Create company revision
CREATE OR REPLACE FUNCTION public.create_company_revision(
  p_product_id TEXT,
  p_company_id TEXT,
  p_changes_summary TEXT,
  p_revision_date DATE DEFAULT CURRENT_DATE
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Verify user has company role
  IF NOT has_role(auth.uid(), 'company'::app_role) THEN
    RETURN jsonb_build_object('success', false, 'error', 'Company role required');
  END IF;
  
  -- Insert revision
  INSERT INTO company_revisions (
    product_id, company_id, revised_by, revision_date, 
    changes_summary, verification_status
  ) VALUES (
    p_product_id, p_company_id, auth.uid(), p_revision_date,
    p_changes_summary, 'pending'
  );
  
  RETURN jsonb_build_object('success', true, 'message', 'Revision submitted successfully');
END;
$$;

-- Get company revisions for user
CREATE OR REPLACE FUNCTION public.get_my_company_revisions()
RETURNS TABLE(
  id UUID, 
  product_id TEXT, 
  company_id TEXT,
  revision_date DATE, 
  changes_summary TEXT,
  verification_status TEXT, 
  created_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Verify user has company role
  IF NOT has_role(auth.uid(), 'company'::app_role) AND NOT has_role(auth.uid(), 'admin'::app_role) THEN
    RAISE EXCEPTION 'Access denied: company or admin role required';
  END IF;
  
  RETURN QUERY
  SELECT 
    cr.id, 
    cr.product_id, 
    cr.company_id,
    cr.revision_date, 
    cr.changes_summary,
    cr.verification_status, 
    cr.created_at
  FROM company_revisions cr
  WHERE cr.revised_by = auth.uid()
  ORDER BY cr.created_at DESC;
END;
$$;

-- Create company product verification/certification
CREATE OR REPLACE FUNCTION public.certify_product(
  p_product_id TEXT,
  p_company_id TEXT,
  p_notes TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Verify user has company role
  IF NOT has_role(auth.uid(), 'company'::app_role) THEN
    RETURN jsonb_build_object('success', false, 'error', 'Company role required');
  END IF;
  
  -- Check if user can represent this company
  IF NOT can_represent_company(auth.uid(), p_company_id) THEN
    RETURN jsonb_build_object('success', false, 'error', 'Not authorized for this company');
  END IF;
  
  -- Insert or update certification
  INSERT INTO company_product_verifications (
    company_id, product_id, verified_by, verification_notes, verified_at
  ) VALUES (
    p_company_id, p_product_id, auth.uid(), p_notes, NOW()
  )
  ON CONFLICT (company_id, product_id) DO UPDATE SET
    verified_at = NOW(),
    verified_by = auth.uid(),
    verification_notes = COALESCE(p_notes, company_product_verifications.verification_notes);
  
  RETURN jsonb_build_object('success', true, 'message', 'Product certified successfully');
END;
$$;

-- ============================================
-- Phase 3: Fix Role Requests Admin Operations
-- ============================================

-- Approve role request
CREATE OR REPLACE FUNCTION public.approve_role_request(
  p_request_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_request RECORD;
BEGIN
  -- Verify admin role
  IF NOT is_admin_secure() THEN
    RETURN jsonb_build_object('success', false, 'error', 'Admin role required');
  END IF;
  
  -- Get request details
  SELECT * INTO v_request FROM role_requests WHERE id = p_request_id;
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'Request not found');
  END IF;
  
  -- Grant role
  INSERT INTO user_roles (user_id, role, granted_by)
  VALUES (v_request.user_id, v_request.requested_role, auth.uid())
  ON CONFLICT (user_id, role) DO NOTHING;
  
  -- Handle company role
  IF v_request.requested_role = 'company' AND v_request.company_id IS NOT NULL THEN
    INSERT INTO company_representatives (user_id, company_name, company_id, verified, verified_by, verified_at)
    VALUES (v_request.user_id, v_request.company_id, v_request.company_id, true, auth.uid(), NOW())
    ON CONFLICT (user_id, company_name) DO UPDATE SET
      verified = true, verified_by = auth.uid(), verified_at = NOW();
  END IF;
  
  -- Update request status
  UPDATE role_requests 
  SET status = 'approved', reviewed_by = auth.uid(), reviewed_at = NOW()
  WHERE id = p_request_id;
  
  RETURN jsonb_build_object('success', true, 'message', 'Request approved successfully');
END;
$$;

-- Reject role request  
CREATE OR REPLACE FUNCTION public.reject_role_request(
  p_request_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Verify admin role
  IF NOT is_admin_secure() THEN
    RETURN jsonb_build_object('success', false, 'error', 'Admin role required');
  END IF;
  
  -- Update request status
  UPDATE role_requests 
  SET status = 'rejected', reviewed_by = auth.uid(), reviewed_at = NOW()
  WHERE id = p_request_id;
  
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'Request not found');
  END IF;
  
  RETURN jsonb_build_object('success', true, 'message', 'Request rejected successfully');
END;
$$;

-- ============================================
-- Phase 4: Add Missing RLS SELECT Policy
-- ============================================

-- Allow admins to view all roles
CREATE POLICY "Admins can view all roles" ON public.user_roles
FOR SELECT 
TO authenticated
USING (
  is_admin_secure()
);