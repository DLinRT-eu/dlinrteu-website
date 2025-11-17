-- Fix SECURITY DEFINER functions missing SET search_path
-- This prevents SQL injection via search_path manipulation
-- See: https://supabase.com/docs/guides/database/database-linter?lint=0011_function_search_path_mutable

-- ============================================================================
-- DROP EXISTING FUNCTIONS WITH INCOMPATIBLE SIGNATURES
-- ============================================================================

-- Drop all functions that we're going to recreate to avoid signature conflicts
-- Use CASCADE for trigger functions to drop dependent triggers automatically
DROP FUNCTION IF EXISTS public.get_analytics_daily(date, date) CASCADE;
DROP FUNCTION IF EXISTS public.get_analytics_page_visits(date, date) CASCADE;
DROP FUNCTION IF EXISTS public.initialize_super_admins() CASCADE;
DROP FUNCTION IF EXISTS public.create_notification(uuid, text, text, text, text) CASCADE;
DROP FUNCTION IF EXISTS public.notify_role_approval() CASCADE;
DROP FUNCTION IF EXISTS public.notify_review_assignment() CASCADE;
DROP FUNCTION IF EXISTS public.notify_revision_status() CASCADE;
DROP FUNCTION IF EXISTS public.update_review_activity() CASCADE;
DROP FUNCTION IF EXISTS public.is_admin() CASCADE;
DROP FUNCTION IF EXISTS public.has_any_role(uuid, app_role[]) CASCADE;
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
DROP FUNCTION IF EXISTS public.update_updated_at_column() CASCADE;
DROP FUNCTION IF EXISTS public.get_users_with_roles() CASCADE;
DROP FUNCTION IF EXISTS public.get_users_with_roles_admin_only() CASCADE;
DROP FUNCTION IF EXISTS public.verify_user_registration(uuid, boolean) CASCADE;
DROP FUNCTION IF EXISTS public.log_admin_action(text, uuid, jsonb) CASCADE;
DROP FUNCTION IF EXISTS public.update_reviewer_expertise_updated_at() CASCADE;
DROP FUNCTION IF EXISTS public.expire_old_invitations() CASCADE;
DROP FUNCTION IF EXISTS public.update_review_round_stats() CASCADE;
DROP FUNCTION IF EXISTS public.get_audit_logs_admin() CASCADE;
DROP FUNCTION IF EXISTS public.admin_health_check() CASCADE;
DROP FUNCTION IF EXISTS public.get_pending_role_requests_admin() CASCADE;
DROP FUNCTION IF EXISTS public.get_security_events_admin(int) CASCADE;
DROP FUNCTION IF EXISTS public.get_registration_notifications_admin() CASCADE;
DROP FUNCTION IF EXISTS public.get_review_rounds_admin() CASCADE;
DROP FUNCTION IF EXISTS public.get_reviewers_with_workload_admin() CASCADE;
DROP FUNCTION IF EXISTS public.auto_grant_dlinrt_reviewer_role() CASCADE;
DROP FUNCTION IF EXISTS public.trigger_auto_grant_dlinrt_reviewer() CASCADE;
DROP FUNCTION IF EXISTS public.quick_assign_products(uuid, uuid[], text[]) CASCADE;
DROP FUNCTION IF EXISTS public.get_product_reviews_admin_secure() CASCADE;
DROP FUNCTION IF EXISTS public.delete_product_review_admin(uuid) CASCADE;
DROP FUNCTION IF EXISTS public.debug_reviewer_access(uuid) CASCADE;
DROP FUNCTION IF EXISTS public.get_my_reviews_secure() CASCADE;
DROP FUNCTION IF EXISTS public.start_review_round_atomic(uuid, uuid[], text[]) CASCADE;

DROP FUNCTION IF EXISTS public.hash_ip(text) CASCADE;
DROP FUNCTION IF EXISTS public.cleanup_old_security_events() CASCADE;
DROP FUNCTION IF EXISTS public.cleanup_old_contact_submissions() CASCADE;

-- ============================================================================
-- ANALYTICS FUNCTIONS
-- ============================================================================

CREATE OR REPLACE FUNCTION public.get_analytics_daily(start_date date DEFAULT NULL, end_date date DEFAULT NULL)
RETURNS TABLE(
  id uuid,
  date date,
  unique_visitors integer,
  total_visits integer,
  created_at timestamptz,
  updated_at timestamptz
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT ad.id, ad.date, ad.unique_visitors, ad.total_visits, ad.created_at, ad.updated_at
  FROM public.analytics_daily ad
  WHERE (start_date IS NULL OR ad.date >= start_date)
    AND (end_date IS NULL OR ad.date <= end_date)
  ORDER BY ad.date DESC;
END;
$$;

CREATE OR REPLACE FUNCTION public.get_analytics_page_visits(start_date date DEFAULT NULL, end_date date DEFAULT NULL)
RETURNS TABLE(
  id uuid,
  date date,
  path text,
  title text,
  visit_count integer,
  total_duration integer,
  created_at timestamptz,
  updated_at timestamptz
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT apv.id, apv.date, apv.path, apv.title, apv.visit_count, apv.total_duration, apv.created_at, apv.updated_at
  FROM public.analytics_page_visits apv
  WHERE (start_date IS NULL OR apv.date >= start_date)
    AND (end_date IS NULL OR apv.date <= end_date)
  ORDER BY apv.date DESC, apv.path;
END;
$$;

-- ============================================================================
-- USER ROLE FUNCTIONS (2025-10-22)
-- ============================================================================

CREATE OR REPLACE FUNCTION public.initialize_super_admins()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Grant admin role to specific emails
  INSERT INTO public.user_roles (user_id, role, granted_by)
  SELECT 
    p.id,
    'admin'::app_role,
    p.id -- self-granted during initialization
  FROM public.profiles p
  WHERE p.email IN (
    'francisco.bergueiro@dlinrt.eu',
    'admin@dlinrt.eu'
  )
  AND NOT EXISTS (
    SELECT 1 FROM public.user_roles ur
    WHERE ur.user_id = p.id AND ur.role = 'admin'
  );
END;
$$;

-- ============================================================================
-- NOTIFICATION FUNCTIONS
-- ============================================================================

CREATE OR REPLACE FUNCTION public.create_notification(
  p_user_id UUID,
  p_title TEXT,
  p_message TEXT,
  p_type TEXT DEFAULT 'info',
  p_link TEXT DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_notification_id UUID;
BEGIN
  INSERT INTO public.notifications (user_id, title, message, type, link)
  VALUES (p_user_id, p_title, p_message, p_type, p_link)
  RETURNING id INTO v_notification_id;
  
  RETURN v_notification_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.notify_role_approval()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF (NEW.status = 'approved' AND OLD.status != 'approved') THEN
    PERFORM public.create_notification(
      NEW.user_id,
      'Role Request Approved',
      'Your request for ' || NEW.requested_role || ' role has been approved.',
      'success',
      '/profile'
    );
  ELSIF (NEW.status = 'rejected' AND OLD.status != 'rejected') THEN
    PERFORM public.create_notification(
      NEW.user_id,
      'Role Request Rejected',
      'Your request for ' || NEW.requested_role || ' role has been rejected.' || 
      CASE WHEN NEW.review_notes IS NOT NULL THEN ' Reason: ' || NEW.review_notes ELSE '' END,
      'warning',
      '/profile'
    );
  END IF;
  
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.notify_review_assignment()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_product_name TEXT;
BEGIN
  IF (TG_OP = 'INSERT') THEN
    SELECT name INTO v_product_name FROM public.products WHERE id = NEW.product_id;
    
    PERFORM public.create_notification(
      NEW.assigned_to,
      'New Review Assignment',
      'You have been assigned to review: ' || COALESCE(v_product_name, 'Unknown Product'),
      'info',
      '/review/' || NEW.id
    );
  END IF;
  
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.notify_revision_status()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_product_name TEXT;
  v_message TEXT;
BEGIN
  IF (NEW.status != OLD.status AND NEW.status IN ('approved', 'needs_revision')) THEN
    SELECT name INTO v_product_name FROM public.products WHERE id = NEW.product_id;
    
    IF NEW.status = 'approved' THEN
      v_message := 'Your review for ' || COALESCE(v_product_name, 'a product') || ' has been approved.';
    ELSE
      v_message := 'Your review for ' || COALESCE(v_product_name, 'a product') || ' needs revision.';
    END IF;
    
    PERFORM public.create_notification(
      NEW.assigned_to,
      'Review Status Update',
      v_message,
      CASE WHEN NEW.status = 'approved' THEN 'success' ELSE 'warning' END,
      '/review/' || NEW.id
    );
  END IF;
  
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_review_activity()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Update last_review_activity when review status changes
  IF (TG_OP = 'INSERT' OR (TG_OP = 'UPDATE' AND NEW.status != OLD.status)) THEN
    UPDATE public.profiles
    SET last_review_activity = NOW()
    WHERE id = NEW.assigned_to;
  END IF;
  
  RETURN NEW;
END;
$$;

-- ============================================================================
-- USER MANAGEMENT FUNCTIONS
-- ============================================================================

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  )
$$;

CREATE OR REPLACE FUNCTION public.has_any_role(
  user_id_param UUID,
  roles_param app_role[]
)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = user_id_param 
    AND role = ANY(roles_param)
  );
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_is_institutional BOOLEAN;
BEGIN
  -- Create profile
  INSERT INTO public.profiles (
    id,
    email,
    first_name,
    last_name,
    institution,
    created_at,
    updated_at
  ) VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'institution', ''),
    NOW(),
    NOW()
  );
  
  -- Check if institutional email
  SELECT public.is_institutional_email(NEW.email) INTO v_is_institutional;
  
  -- Create registration notification
  INSERT INTO public.user_registration_notifications (
    user_id,
    email,
    first_name,
    last_name,
    institution,
    is_institutional_email,
    notification_status
  ) VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'institution', ''),
    v_is_institutional,
    'pending'
  );
  
  RETURN NEW;
END;
$$;

-- ============================================================================
-- UTILITY TRIGGER FUNCTION
-- ============================================================================

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- ============================================================================
-- ADMIN VIEW FUNCTIONS
-- ============================================================================

CREATE OR REPLACE FUNCTION public.get_users_with_roles()
RETURNS TABLE(
  user_id UUID,
  email TEXT,
  first_name TEXT,
  last_name TEXT,
  institution TEXT,
  created_at TIMESTAMPTZ,
  roles TEXT[]
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id as user_id,
    p.email,
    p.first_name,
    p.last_name,
    p.institution,
    p.created_at,
    ARRAY_AGG(ur.role::TEXT) as roles
  FROM public.profiles p
  LEFT JOIN public.user_roles ur ON ur.user_id = p.id
  GROUP BY p.id, p.email, p.first_name, p.last_name, p.institution, p.created_at
  ORDER BY p.created_at DESC;
END;
$$;

CREATE OR REPLACE FUNCTION public.get_users_with_roles_admin_only()
RETURNS TABLE(
  user_id UUID,
  email TEXT,
  first_name TEXT,
  last_name TEXT,
  institution TEXT,
  created_at TIMESTAMPTZ,
  roles TEXT[]
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Check if user is admin
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Access denied: admin role required';
  END IF;
  
  RETURN QUERY
  SELECT * FROM public.get_users_with_roles();
END;
$$;

-- ============================================================================
-- VERIFICATION FUNCTIONS
-- ============================================================================

CREATE OR REPLACE FUNCTION public.verify_user_registration(
  p_user_id UUID,
  p_verified BOOLEAN DEFAULT TRUE
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Only admins can verify user registrations';
  END IF;
  
  UPDATE public.user_registration_notifications
  SET verified = p_verified,
      verified_at = NOW(),
      verified_by = auth.uid()
  WHERE user_id = p_user_id;
  
  RETURN TRUE;
END;
$$;

-- ============================================================================
-- AUDIT & LOGGING FUNCTIONS
-- ============================================================================

CREATE OR REPLACE FUNCTION public.log_admin_action(
  p_action_type TEXT,
  p_target_user_id UUID,
  p_details JSONB DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_log_id UUID;
BEGIN
  INSERT INTO public.admin_audit_log (
    admin_user_id,
    action_type,
    target_user_id,
    details,
    created_at
  ) VALUES (
    auth.uid(),
    p_action_type,
    p_target_user_id,
    p_details,
    NOW()
  )
  RETURNING id INTO v_log_id;
  
  RETURN v_log_id;
END;
$$;

-- ============================================================================
-- REVIEWER FUNCTIONS
-- ============================================================================

CREATE OR REPLACE FUNCTION public.update_reviewer_expertise_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.expire_old_invitations()
RETURNS void
LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $$
BEGIN
  UPDATE public.reviewer_invitations
  SET status = 'expired'
  WHERE status = 'pending'
  AND expires_at < NOW();
END;
$$;

CREATE OR REPLACE FUNCTION public.update_review_round_stats()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_round_id UUID;
  v_total INTEGER;
  v_completed INTEGER;
  v_in_progress INTEGER;
  v_not_started INTEGER;
BEGIN
  IF TG_OP = 'DELETE' THEN
    v_round_id := OLD.review_round_id;
  ELSE
    v_round_id := NEW.review_round_id;
  END IF;
  
  SELECT 
    COUNT(*),
    COUNT(*) FILTER (WHERE status = 'completed'),
    COUNT(*) FILTER (WHERE status = 'in_progress'),
    COUNT(*) FILTER (WHERE status = 'pending')
  INTO v_total, v_completed, v_in_progress, v_not_started
  FROM public.product_reviews
  WHERE review_round_id = v_round_id;
  
  UPDATE public.review_rounds
  SET 
    total_products = v_total,
    completed_reviews = v_completed,
    in_progress_reviews = v_in_progress,
    pending_reviews = v_not_started,
    updated_at = NOW()
  WHERE id = v_round_id;
  
  RETURN NULL;
END;
$$;

-- ============================================================================
-- ADMIN SECURITY FUNCTIONS
-- ============================================================================

CREATE OR REPLACE FUNCTION public.get_audit_logs_admin()
RETURNS TABLE(
  id UUID,
  admin_user_id UUID,
  admin_email TEXT,
  action_type TEXT,
  target_user_id UUID,
  target_email TEXT,
  details JSONB,
  created_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.is_admin_secure() THEN
    RAISE EXCEPTION 'Access denied: admin role required';
  END IF;
  
  RETURN QUERY
  SELECT 
    aal.id,
    aal.admin_user_id,
    ap.email as admin_email,
    aal.action_type,
    aal.target_user_id,
    tp.email as target_email,
    aal.details,
    aal.created_at
  FROM public.admin_audit_log aal
  LEFT JOIN public.profiles ap ON ap.id = aal.admin_user_id
  LEFT JOIN public.profiles tp ON tp.id = aal.target_user_id
  ORDER BY aal.created_at DESC;
END;
$$;

CREATE OR REPLACE FUNCTION public.admin_health_check()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result jsonb;
  user_id_val uuid;
BEGIN
  user_id_val := auth.uid();
  
  SELECT jsonb_build_object(
    'auth_uid', user_id_val,
    'has_admin_role', public.is_admin_secure(),
    'can_manage_reviews', public.can_manage_reviews(user_id_val),
    'can_view_security', public.can_view_security_data(user_id_val),
    'user_roles', (
      SELECT jsonb_agg(role)
      FROM user_roles
      WHERE user_id = user_id_val
    ),
    'timestamp', now()
  ) INTO result;
  
  RETURN result;
END;
$$;

-- ============================================================================
-- ADMIN DATA ACCESS FUNCTIONS
-- ============================================================================

CREATE OR REPLACE FUNCTION public.get_pending_role_requests_admin()
RETURNS TABLE(
  id UUID,
  user_id UUID,
  email TEXT,
  first_name TEXT,
  last_name TEXT,
  requested_role app_role,
  justification TEXT,
  status TEXT,
  created_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.is_admin_secure() THEN
    RAISE EXCEPTION 'Access denied: admin role required';
  END IF;
  
  RETURN QUERY
  SELECT 
    rr.id,
    rr.user_id,
    p.email,
    p.first_name,
    p.last_name,
    rr.requested_role,
    rr.justification,
    rr.status,
    rr.created_at
  FROM public.role_requests rr
  JOIN public.profiles p ON p.id = rr.user_id
  WHERE rr.status = 'pending'
  ORDER BY rr.created_at ASC;
END;
$$;

CREATE OR REPLACE FUNCTION public.get_security_events_admin(last_n_days int DEFAULT 30)
RETURNS TABLE(
  id UUID,
  event_type TEXT,
  severity TEXT,
  user_id UUID,
  email TEXT,
  details JSONB,
  created_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.is_admin_secure() THEN
    RAISE EXCEPTION 'Access denied: admin role required';
  END IF;
  
  RETURN QUERY
  SELECT 
    se.id,
    se.event_type,
    se.severity,
    se.user_id,
    p.email,
    se.details,
    se.created_at
  FROM public.security_events se
  LEFT JOIN public.profiles p ON p.id = se.user_id
  WHERE se.created_at > NOW() - INTERVAL '1 day' * last_n_days
  ORDER BY se.created_at DESC;
END;
$$;

CREATE OR REPLACE FUNCTION public.get_registration_notifications_admin()
RETURNS TABLE(
  user_id UUID,
  email TEXT,
  first_name TEXT,
  last_name TEXT,
  institution TEXT,
  is_institutional_email BOOLEAN,
  notification_status TEXT,
  verified BOOLEAN,
  created_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.is_admin_secure() THEN
    RAISE EXCEPTION 'Access denied: admin role required';
  END IF;
  
  RETURN QUERY
  SELECT 
    urn.user_id,
    urn.email,
    urn.first_name,
    urn.last_name,
    urn.institution,
    urn.is_institutional_email,
    urn.notification_status,
    urn.verified,
    urn.created_at
  FROM public.user_registration_notifications urn
  ORDER BY urn.created_at DESC;
END;
$$;

CREATE OR REPLACE FUNCTION public.get_review_rounds_admin()
RETURNS TABLE(
  id UUID,
  name TEXT,
  description TEXT,
  status TEXT,
  start_date DATE,
  end_date DATE,
  total_products INTEGER,
  completed_reviews INTEGER,
  created_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.is_admin_secure() THEN
    RAISE EXCEPTION 'Access denied: admin role required';
  END IF;
  
  RETURN QUERY
  SELECT 
    rr.id,
    rr.name,
    rr.description,
    rr.status,
    rr.start_date,
    rr.end_date,
    rr.total_products,
    rr.completed_reviews,
    rr.created_at
  FROM public.review_rounds rr
  ORDER BY rr.created_at DESC;
END;
$$;

CREATE OR REPLACE FUNCTION public.get_reviewers_with_workload_admin()
RETURNS TABLE(
  reviewer_id UUID,
  email TEXT,
  first_name TEXT,
  last_name TEXT,
  total_assigned INTEGER,
  completed INTEGER,
  in_progress INTEGER,
  pending INTEGER
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.is_admin_secure() THEN
    RAISE EXCEPTION 'Access denied: admin role required';
  END IF;
  
  RETURN QUERY
  SELECT 
    p.id as reviewer_id,
    p.email,
    p.first_name,
    p.last_name,
    COUNT(pr.id)::INTEGER as total_assigned,
    COUNT(pr.id) FILTER (WHERE pr.status = 'completed')::INTEGER as completed,
    COUNT(pr.id) FILTER (WHERE pr.status = 'in_progress')::INTEGER as in_progress,
    COUNT(pr.id) FILTER (WHERE pr.status = 'pending')::INTEGER as pending
  FROM public.profiles p
  JOIN public.user_roles ur ON ur.user_id = p.id
  LEFT JOIN public.product_reviews pr ON pr.assigned_to = p.id
  WHERE ur.role = 'reviewer'
  GROUP BY p.id, p.email, p.first_name, p.last_name
  ORDER BY total_assigned DESC;
END;
$$;

-- ============================================================================
-- REVIEWER AUTO-GRANT FUNCTIONS
-- ============================================================================

CREATE OR REPLACE FUNCTION public.auto_grant_dlinrt_reviewer_role()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_email TEXT;
BEGIN
  SELECT email INTO user_email
  FROM public.profiles
  WHERE id = NEW.user_id;
  
  IF user_email LIKE '%@dlinrt.eu' THEN
    INSERT INTO public.user_roles (user_id, role, granted_by)
    VALUES (NEW.user_id, 'reviewer'::app_role, NEW.user_id)
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.trigger_auto_grant_dlinrt_reviewer()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.email LIKE '%@dlinrt.eu' THEN
    INSERT INTO public.user_roles (user_id, role, granted_by)
    VALUES (NEW.id, 'reviewer'::app_role, NEW.id)
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  
  RETURN NEW;
END;
$$;

-- ============================================================================
-- REVIEW ASSIGNMENT FUNCTIONS
-- ============================================================================

CREATE OR REPLACE FUNCTION public.quick_assign_products(
  p_round_id UUID,
  p_reviewer_ids UUID[],
  p_product_ids TEXT[]
)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_count INTEGER := 0;
  v_reviewer_id UUID;
  v_product_id TEXT;
  v_index INTEGER := 1;
BEGIN
  IF NOT public.is_admin_secure() THEN
    RAISE EXCEPTION 'Only admins can assign reviews';
  END IF;
  
  FOREACH v_product_id IN ARRAY p_product_ids
  LOOP
    v_reviewer_id := p_reviewer_ids[((v_index - 1) % array_length(p_reviewer_ids, 1)) + 1];
    
    INSERT INTO public.product_reviews (
      product_id,
      review_round_id,
      assigned_to,
      status
    ) VALUES (
      v_product_id,
      p_round_id,
      v_reviewer_id,
      'pending'
    )
    ON CONFLICT (product_id, review_round_id, assigned_to) DO NOTHING;
    
    v_count := v_count + 1;
    v_index := v_index + 1;
  END LOOP;
  
  RETURN v_count;
END;
$$;

CREATE OR REPLACE FUNCTION public.get_product_reviews_admin_secure()
RETURNS TABLE(
  id UUID,
  product_id TEXT,
  product_name TEXT,
  assigned_to UUID,
  reviewer_email TEXT,
  status TEXT,
  created_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.is_admin_secure() THEN
    RAISE EXCEPTION 'Access denied: admin role required';
  END IF;
  
  RETURN QUERY
  SELECT 
    pr.id,
    pr.product_id,
    prod.name as product_name,
    pr.assigned_to,
    p.email as reviewer_email,
    pr.status,
    pr.created_at
  FROM public.product_reviews pr
  LEFT JOIN public.products prod ON prod.id = pr.product_id
  LEFT JOIN public.profiles p ON p.id = pr.assigned_to
  ORDER BY pr.created_at DESC;
END;
$$;

CREATE OR REPLACE FUNCTION public.delete_product_review_admin(review_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.is_admin_secure() THEN
    RAISE EXCEPTION 'Only admins can delete reviews';
  END IF;
  
  DELETE FROM public.product_reviews
  WHERE id = review_id;
  
  RETURN TRUE;
END;
$$;

-- ============================================================================
-- REVIEWER ACCESS FUNCTIONS
-- ============================================================================

CREATE OR REPLACE FUNCTION public.debug_reviewer_access(reviewer_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result jsonb;
BEGIN
  SELECT jsonb_build_object(
    'has_reviewer_role', EXISTS(
      SELECT 1 FROM user_roles WHERE user_id = reviewer_id AND role = 'reviewer'
    ),
    'assigned_reviews', (
      SELECT COUNT(*) FROM product_reviews WHERE assigned_to = reviewer_id
    ),
    'review_details', (
      SELECT jsonb_agg(jsonb_build_object('id', id, 'status', status, 'product_id', product_id))
      FROM product_reviews WHERE assigned_to = reviewer_id
    )
  ) INTO result;
  
  RETURN result;
END;
$$;

CREATE OR REPLACE FUNCTION public.get_my_reviews_secure()
RETURNS TABLE(
  id UUID,
  product_id TEXT,
  product_name TEXT,
  review_round_id UUID,
  round_name TEXT,
  status TEXT,
  assigned_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id UUID;
BEGIN
  v_user_id := auth.uid();
  
  IF NOT EXISTS(SELECT 1 FROM user_roles WHERE user_id = v_user_id AND role = 'reviewer') THEN
    RAISE EXCEPTION 'Access denied: reviewer role required';
  END IF;
  
  RETURN QUERY
  SELECT 
    pr.id,
    pr.product_id,
    p.name as product_name,
    pr.review_round_id,
    rr.name as round_name,
    pr.status,
    pr.created_at as assigned_at,
    pr.completed_at
  FROM public.product_reviews pr
  LEFT JOIN public.products p ON p.id = pr.product_id
  LEFT JOIN public.review_rounds rr ON rr.id = pr.review_round_id
  WHERE pr.assigned_to = v_user_id
  ORDER BY pr.created_at DESC;
END;
$$;

CREATE OR REPLACE FUNCTION public.start_review_round_atomic(
  p_round_id UUID,
  p_reviewer_ids UUID[],
  p_product_ids TEXT[]
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_assignments_created INTEGER := 0;
  v_result JSONB;
BEGIN
  IF NOT public.is_admin_secure() THEN
    RAISE EXCEPTION 'Only admins can start review rounds';
  END IF;
  
  UPDATE public.review_rounds
  SET status = 'active',
      start_date = CURRENT_DATE
  WHERE id = p_round_id;
  
  v_assignments_created := public.quick_assign_products(
    p_round_id,
    p_reviewer_ids,
    p_product_ids
  );
  
  v_result := jsonb_build_object(
    'round_id', p_round_id,
    'assignments_created', v_assignments_created,
    'status', 'active'
  );
  
  RETURN v_result;
END;
$$;

-- ============================================================================
-- UTILITY FUNCTIONS
-- ============================================================================

CREATE OR REPLACE FUNCTION public.hash_ip(ip_address TEXT)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  hashed TEXT;
BEGIN
  SELECT encode(digest(ip_address || current_setting('app.ip_salt', true), 'sha256'), 'hex') INTO hashed;
  RETURN hashed;
END;
$$;

CREATE OR REPLACE FUNCTION public.cleanup_old_security_events()
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  WITH deleted AS (
    DELETE FROM public.security_events
    WHERE created_at < NOW() - INTERVAL '90 days'
    RETURNING *
  )
  SELECT COUNT(*) INTO deleted_count FROM deleted;
  
  RETURN deleted_count;
END;
$$;

CREATE OR REPLACE FUNCTION public.cleanup_old_contact_submissions()
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  WITH deleted AS (
    DELETE FROM public.contact_submissions
    WHERE created_at < NOW() - INTERVAL '90 days'
    RETURNING *
  )
  SELECT COUNT(*) INTO deleted_count FROM deleted;
  
  RETURN deleted_count;
END;
$$;

-- ============================================================================
-- GRANT PERMISSIONS
-- ============================================================================

GRANT EXECUTE ON FUNCTION public.get_analytics_daily TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_analytics_page_visits TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_any_role TO authenticated;
