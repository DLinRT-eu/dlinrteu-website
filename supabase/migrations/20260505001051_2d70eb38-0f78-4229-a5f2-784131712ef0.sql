DROP FUNCTION IF EXISTS public.get_my_reviews_secure();

CREATE OR REPLACE FUNCTION public.get_my_reviews_secure()
 RETURNS TABLE(
   id uuid,
   product_id text,
   review_round_id uuid,
   round_name text,
   status text,
   priority text,
   deadline date,
   assigned_at timestamp with time zone,
   started_at timestamp with time zone,
   completed_at timestamp with time zone,
   notes text
 )
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_user_id UUID;
BEGIN
  v_user_id := auth.uid();

  IF NOT EXISTS(SELECT 1 FROM user_roles WHERE user_id = v_user_id AND role = 'reviewer')
     AND NOT EXISTS(SELECT 1 FROM user_roles WHERE user_id = v_user_id AND role = 'admin') THEN
    RAISE EXCEPTION 'Access denied: reviewer role required';
  END IF;

  RETURN QUERY
  SELECT
    pr.id,
    pr.product_id,
    pr.review_round_id,
    rr.name as round_name,
    pr.status,
    pr.priority,
    pr.deadline,
    pr.created_at as assigned_at,
    pr.started_at,
    pr.completed_at,
    pr.notes
  FROM public.product_reviews pr
  LEFT JOIN public.review_rounds rr ON rr.id = pr.review_round_id
  WHERE pr.assigned_to = v_user_id
  ORDER BY
    CASE WHEN pr.deadline IS NULL THEN 1 ELSE 0 END,
    pr.deadline ASC,
    pr.created_at DESC;
END;
$function$;