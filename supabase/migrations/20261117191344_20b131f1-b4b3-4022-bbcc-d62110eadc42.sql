CREATE OR REPLACE FUNCTION public.mark_reminder_sent(p_review_ids uuid[])
 RETURNS integer LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $function$
DECLARE updated_count INTEGER;
BEGIN
  IF coalesce(auth.role(),'') <> 'service_role' AND NOT public.has_role(auth.uid(),'admin') THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;
  UPDATE product_reviews SET last_reminder_sent_at = NOW() WHERE id = ANY(p_review_ids);
  GET DIAGNOSTICS updated_count = ROW_COUNT;
  RETURN updated_count;
END;
$function$;

CREATE OR REPLACE FUNCTION public.initialize_super_admins()
 RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $function$
BEGIN
  IF coalesce(auth.role(),'') <> 'service_role' AND NOT public.has_role(auth.uid(),'admin') THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;
  INSERT INTO public.user_roles (user_id, role, granted_by)
  SELECT p.id, 'admin'::app_role, p.id
  FROM public.profiles p
  WHERE p.email IN ('francisco.bergueiro@dlinrt.eu','admin@dlinrt.eu')
  AND NOT EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = p.id AND ur.role = 'admin');
END;
$function$;

CREATE OR REPLACE FUNCTION public.schedule_analytics_cleanup()
 RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path TO ''
AS $function$
BEGIN
  IF coalesce(auth.role(),'') <> 'service_role' AND NOT public.has_role(auth.uid(),'admin') THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;
  PERFORM public.cleanup_old_analytics_data();
END;
$function$;

REVOKE EXECUTE ON FUNCTION public.mark_reminder_sent(uuid[]) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.initialize_super_admins() FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.schedule_analytics_cleanup() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.mark_reminder_sent(uuid[]) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.initialize_super_admins() TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.schedule_analytics_cleanup() TO authenticated, service_role;

INSERT INTO public.company_product_ownership (company_id, product_id) VALUES
  ('canon-medical','canon-piqe-ct'), ('neosoma','neosoma-platform')
ON CONFLICT DO NOTHING;

UPDATE public.product_edit_drafts SET status='applied', reviewed_at=now(),
  review_feedback='Verified and applied 2026-11-17: Marengo case-study link and PDF added; two key features added with press-release attribution; no-new-publication note added; version left blank.'
WHERE product_id='ge-healthcare-irt' AND status='pending_review';

UPDATE public.product_reviews SET status='completed', completed_at=now()
WHERE id='191c4092-bbe9-4b21-a6b8-7be39ea0fd89' AND status <> 'completed';