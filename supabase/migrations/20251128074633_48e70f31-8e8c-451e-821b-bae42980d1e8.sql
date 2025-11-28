-- Fix 1: Update get_reviewers_with_expertise_admin to fix ambiguous user_id
CREATE OR REPLACE FUNCTION public.get_reviewers_with_expertise_admin()
RETURNS TABLE(
  user_id uuid,
  email text,
  first_name text,
  last_name text,
  expertise jsonb,
  current_workload bigint
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  -- Check admin role with qualified column reference
  IF NOT EXISTS (
    SELECT 1 FROM public.user_roles ur
    WHERE ur.user_id = auth.uid() AND ur.role = 'admin'::app_role
  ) THEN
    RAISE EXCEPTION 'Access denied: admin role required';
  END IF;

  RETURN QUERY
  SELECT 
    p.id as user_id,
    p.email,
    p.first_name,
    p.last_name,
    COALESCE(
      jsonb_agg(
        jsonb_build_object(
          'preference_type', re.preference_type,
          'category', re.category,
          'product_id', re.product_id,
          'company_id', re.company_id,
          'priority', re.priority
        )
      ) FILTER (WHERE re.id IS NOT NULL),
      '[]'::jsonb
    ) as expertise,
    COUNT(pr.id) FILTER (WHERE pr.status IN ('pending', 'in_progress')) as current_workload
  FROM public.profiles p
  INNER JOIN public.user_roles ur ON ur.user_id = p.id
  LEFT JOIN public.reviewer_expertise re ON re.user_id = p.id
  LEFT JOIN public.product_reviews pr ON pr.assigned_to = p.id
  WHERE ur.role = 'reviewer'
  GROUP BY p.id, p.email, p.first_name, p.last_name
  ORDER BY current_workload ASC, p.first_name, p.last_name;
END;
$function$;

-- Fix 2: Update hash_ip function to include extensions schema in search_path
CREATE OR REPLACE FUNCTION public.hash_ip(ip_address text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $function$
DECLARE
  hashed TEXT;
BEGIN
  SELECT encode(digest(ip_address || current_setting('app.ip_salt', true), 'sha256'), 'hex') INTO hashed;
  RETURN hashed;
END;
$function$;

-- Fix 3: Add INSERT policy for security_events table
CREATE POLICY "Authenticated users can insert security events"
ON public.security_events
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Add comment for documentation
COMMENT ON POLICY "Authenticated users can insert security events" ON public.security_events IS 
'Allows authenticated users to log security events like password changes, login attempts, etc.';