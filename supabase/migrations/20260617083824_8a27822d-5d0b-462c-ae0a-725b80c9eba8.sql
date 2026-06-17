CREATE OR REPLACE FUNCTION public.get_product_edit_drafts_for_reviewer(p_product_id text)
 RETURNS TABLE(id uuid, product_id text, created_by uuid, created_at timestamp with time zone, updated_at timestamp with time zone, changed_fields text[], edit_summary text, status text, reviewed_by uuid, reviewed_at timestamp with time zone, review_feedback text, github_pr_url text, github_synced_at timestamp with time zone, submitter_name text, submitter_email text)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT
    d.id,
    d.product_id,
    d.created_by,
    d.created_at,
    d.updated_at,
    d.changed_fields,
    d.edit_summary,
    d.status,
    d.reviewed_by,
    d.reviewed_at,
    d.review_feedback,
    d.github_pr_url,
    d.github_synced_at,
    COALESCE(NULLIF(TRIM(CONCAT_WS(' ', p.first_name, p.last_name)), ''), p.email, 'Unknown') AS submitter_name,
    p.email AS submitter_email
  FROM public.product_edit_drafts d
  LEFT JOIN public.profiles p ON p.id = d.created_by
  WHERE d.product_id = p_product_id
    AND (
      public.has_role(auth.uid(), 'admin'::app_role)
      OR (
        public.has_role(auth.uid(), 'reviewer'::app_role)
        AND EXISTS (
          SELECT 1 FROM public.product_reviews pr
          WHERE pr.product_id = d.product_id
            AND pr.assigned_to = auth.uid()
        )
      )
    )
  ORDER BY d.updated_at DESC;
$function$;