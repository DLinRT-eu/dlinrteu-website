-- Create SECURITY DEFINER RPC to get all reviewers with expertise and workload
-- This bypasses RLS policies that prevent admins from seeing other users' roles

CREATE OR REPLACE FUNCTION public.get_reviewers_with_expertise_admin()
RETURNS TABLE(
  user_id UUID,
  email TEXT,
  first_name TEXT,
  last_name TEXT,
  expertise JSONB,
  current_workload BIGINT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Check admin role directly
  IF NOT EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'::app_role
  ) THEN
    RAISE EXCEPTION 'Access denied: admin role required';
  END IF;

  -- Return all reviewers with their expertise and current workload
  RETURN QUERY
  SELECT 
    p.id as user_id,
    p.email,
    p.first_name,
    p.last_name,
    COALESCE(
      (SELECT jsonb_agg(jsonb_build_object(
        'id', re.id,
        'user_id', re.user_id,
        'preference_type', re.preference_type,
        'category', re.category,
        'product_id', re.product_id,
        'company_id', re.company_id,
        'priority', re.priority,
        'notes', re.notes,
        'created_at', re.created_at,
        'updated_at', re.updated_at
      ))
       FROM public.reviewer_expertise re 
       WHERE re.user_id = p.id), 
      '[]'::jsonb
    ) as expertise,
    (SELECT COUNT(*) 
     FROM public.product_reviews pr 
     WHERE pr.assigned_to = p.id 
     AND pr.status IN ('pending', 'in_progress')
    ) as current_workload
  FROM public.profiles p
  INNER JOIN public.user_roles ur ON ur.user_id = p.id
  WHERE ur.role = 'reviewer'::app_role
  ORDER BY p.last_name, p.first_name;
END;
$$;

COMMENT ON FUNCTION public.get_reviewers_with_expertise_admin() IS 'Admin-only function to get all reviewers with their expertise and workload, bypassing RLS';