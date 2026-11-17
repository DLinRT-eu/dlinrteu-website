CREATE OR REPLACE FUNCTION public._caller_may_inspect(_target uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT _target = auth.uid()
      OR coalesce(auth.role(), '') = 'service_role'
      OR EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
$$;
REVOKE ALL ON FUNCTION public._caller_may_inspect(uuid) FROM PUBLIC, anon;

CREATE OR REPLACE FUNCTION public.get_highest_role(_user_id uuid)
RETURNS app_role LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT role FROM public.user_roles
  WHERE user_id = _user_id AND public._caller_may_inspect(_user_id)
  ORDER BY CASE role WHEN 'admin' THEN 1 WHEN 'reviewer' THEN 2 WHEN 'company' THEN 3 END
  LIMIT 1
$$;

CREATE OR REPLACE FUNCTION public.get_user_role_secure(user_id_param uuid)
RETURNS app_role LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT role FROM public.user_roles
  WHERE user_id = user_id_param AND public._caller_may_inspect(user_id_param)
  ORDER BY CASE WHEN role='admin' THEN 1 WHEN role='reviewer' THEN 2 WHEN role='company' THEN 3 ELSE 4 END
  LIMIT 1;
$$;

CREATE OR REPLACE FUNCTION public.has_any_role(user_id_param uuid, roles_param app_role[])
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT public._caller_may_inspect(user_id_param) AND EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = user_id_param AND role = ANY(roles_param));
$$;

CREATE OR REPLACE FUNCTION public.get_analytics_daily(start_date date DEFAULT NULL, end_date date DEFAULT NULL)
RETURNS TABLE(id uuid, date date, unique_visitors integer, total_visits integer, created_at timestamptz, updated_at timestamptz)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT (public.has_role(auth.uid(), 'admin') OR coalesce(auth.role(),'') = 'service_role') THEN
    RAISE EXCEPTION 'Access denied' USING ERRCODE = '42501';
  END IF;
  RETURN QUERY
  SELECT ad.id, ad.date, ad.unique_visitors, ad.total_visits, ad.created_at, ad.updated_at
  FROM public.analytics_daily ad
  WHERE (start_date IS NULL OR ad.date >= start_date) AND (end_date IS NULL OR ad.date <= end_date)
  ORDER BY ad.date DESC;
END; $$;

CREATE OR REPLACE FUNCTION public.get_analytics_page_visits(start_date date DEFAULT NULL, end_date date DEFAULT NULL)
RETURNS TABLE(id uuid, date date, path text, title text, visit_count integer, total_duration integer, created_at timestamptz, updated_at timestamptz)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT (public.has_role(auth.uid(), 'admin') OR coalesce(auth.role(),'') = 'service_role') THEN
    RAISE EXCEPTION 'Access denied' USING ERRCODE = '42501';
  END IF;
  RETURN QUERY
  SELECT apv.id, apv.date, apv.path, apv.title, apv.visit_count, apv.total_duration, apv.created_at, apv.updated_at
  FROM public.analytics_page_visits apv
  WHERE (start_date IS NULL OR apv.date >= start_date) AND (end_date IS NULL OR apv.date <= end_date)
  ORDER BY apv.date DESC, apv.path;
END; $$;

CREATE OR REPLACE FUNCTION public.get_reminder_settings()
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE settings jsonb;
BEGIN
  IF NOT (public.has_role(auth.uid(), 'admin') OR coalesce(auth.role(),'') = 'service_role') THEN
    RAISE EXCEPTION 'Access denied' USING ERRCODE = '42501';
  END IF;
  SELECT setting_value INTO settings FROM public.reminder_settings WHERE setting_key = 'deadline_reminders';
  IF settings IS NULL THEN
    settings := '{"enabled": true, "threshold_days": 3, "min_interval_hours": 24}'::jsonb;
  END IF;
  RETURN settings;
END; $$;

CREATE OR REPLACE FUNCTION public.get_users_with_roles()
RETURNS TABLE(user_id uuid, email text, first_name text, last_name text, institution text, created_at timestamptz, roles text[])
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT (public.has_role(auth.uid(), 'admin') OR coalesce(auth.role(),'') = 'service_role') THEN
    RAISE EXCEPTION 'Access denied' USING ERRCODE = '42501';
  END IF;
  RETURN QUERY
  SELECT p.id, p.email, p.first_name, p.last_name, p.institution, p.created_at, ARRAY_AGG(ur.role::text)
  FROM public.profiles p LEFT JOIN public.user_roles ur ON ur.user_id = p.id
  GROUP BY p.id, p.email, p.first_name, p.last_name, p.institution, p.created_at
  ORDER BY p.created_at DESC;
END; $$;

REVOKE EXECUTE ON FUNCTION public.get_users_with_roles(), public.get_reminder_settings(),
  public.get_analytics_daily(date,date), public.get_analytics_page_visits(date,date) FROM anon, PUBLIC;