CREATE OR REPLACE FUNCTION public.get_my_company_revisions()
 RETURNS TABLE(id uuid, product_id text, company_id text, revision_date date, changes_summary text, verification_status text, created_at timestamp with time zone, field_updates jsonb, submission_type text, reviewer_feedback text, priority text, verified_at timestamp with time zone)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  _is_admin boolean := has_role(auth.uid(), 'admin'::app_role);
BEGIN
  IF NOT _is_admin AND NOT has_role(auth.uid(), 'company'::app_role) THEN
    RAISE EXCEPTION 'Access denied: company or admin role required';
  END IF;

  RETURN QUERY
  SELECT cr.id, cr.product_id, cr.company_id, cr.revision_date, cr.changes_summary, cr.verification_status,
         cr.created_at, cr.field_updates, cr.submission_type, cr.reviewer_feedback, cr.priority, cr.verified_at
  FROM company_revisions cr
  WHERE _is_admin
     OR (cr.revised_by = auth.uid()
         AND EXISTS (
           SELECT 1 FROM company_representatives rep
           WHERE rep.user_id = auth.uid()
             AND rep.verified = true
             AND rep.company_id = cr.company_id
         ))
  ORDER BY cr.created_at DESC;
END;
$function$;
REVOKE EXECUTE ON FUNCTION public.get_my_company_revisions() FROM anon, public;
GRANT EXECUTE ON FUNCTION public.get_my_company_revisions() TO authenticated;