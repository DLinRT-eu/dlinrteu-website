-- Bind role/membership check functions to the caller unless caller is admin or service role
CREATE OR REPLACE FUNCTION public._may_inspect_user(_target uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public' AS $$
  SELECT auth.role() = 'service_role'
      OR session_user IN ('postgres','supabase_admin')
      OR _target = auth.uid()
      OR EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin');
$$;
REVOKE EXECUTE ON FUNCTION public._may_inspect_user(uuid) FROM PUBLIC, anon;

CREATE OR REPLACE FUNCTION public.can_view_security_data(user_id_param uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public' AS $$
  SELECT public._may_inspect_user(user_id_param) AND EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = user_id_param AND role = 'admin'::app_role);
$$;

CREATE OR REPLACE FUNCTION public.can_manage_reviews(user_id_param uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public' AS $$
  SELECT public._may_inspect_user(user_id_param) AND EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = user_id_param
      AND role IN ('admin'::app_role, 'reviewer'::app_role));
$$;

CREATE OR REPLACE FUNCTION public.can_access_company(_user_id uuid, _company_id text)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public' AS $$
  SELECT public._may_inspect_user(_user_id) AND (
    EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role IN ('admin','reviewer'))
    OR EXISTS (SELECT 1 FROM public.company_representatives
      WHERE user_id = _user_id AND company_id = _company_id AND verified = true));
$$;

CREATE OR REPLACE FUNCTION public.can_represent_company(p_user_id uuid, p_company_id text)
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
BEGIN
  IF NOT public._may_inspect_user(p_user_id) THEN RETURN FALSE; END IF;
  IF has_role(p_user_id, 'admin'::app_role) THEN RETURN TRUE; END IF;
  IF NOT has_role(p_user_id, 'company'::app_role) THEN RETURN FALSE; END IF;
  RETURN EXISTS (SELECT 1 FROM company_representatives
    WHERE user_id = p_user_id AND company_id = p_company_id AND verified = true);
END; $$;

CREATE OR REPLACE FUNCTION public.can_user_adopt_product(p_user_id uuid)
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
BEGIN
  IF NOT public._may_inspect_user(p_user_id) THEN RETURN FALSE; END IF;
  RETURN NOT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = p_user_id AND role = 'company');
END; $$;

CREATE OR REPLACE FUNCTION public.can_assign_company_role(p_user_id uuid)
RETURNS TABLE(can_assign boolean, reason text) LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
BEGIN
  IF NOT public._may_inspect_user(p_user_id) THEN
    RETURN QUERY SELECT FALSE, 'Not authorized'::TEXT; RETURN;
  END IF;
  IF EXISTS (SELECT 1 FROM public.user_products WHERE user_id = p_user_id) THEN
    RETURN QUERY SELECT FALSE, 'User has product adoptions'::TEXT; RETURN;
  END IF;
  IF EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = p_user_id AND role = 'admin') THEN
    RETURN QUERY SELECT FALSE, 'User has Admin role'::TEXT; RETURN;
  END IF;
  RETURN QUERY SELECT TRUE, 'OK'::TEXT;
END; $$;

CREATE OR REPLACE FUNCTION public.get_all_user_roles(_user_id uuid)
RETURNS app_role[] LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public' AS $$
  SELECT COALESCE(ARRAY_AGG(role ORDER BY CASE role WHEN 'admin' THEN 1 WHEN 'reviewer' THEN 2 WHEN 'company' THEN 3 END), ARRAY[]::app_role[])
  FROM public.user_roles
  WHERE user_id = _user_id AND public._may_inspect_user(_user_id);
$$;

-- Notifications may only be created by triggers/server code
REVOKE EXECUTE ON FUNCTION public.create_notification(uuid,text,text,text,text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.create_notification(uuid,text,text,text,text) TO service_role;

-- Assignment history visible only to current reviewers/admins
DROP POLICY IF EXISTS "Reviewers can view own assignment history" ON public.assignment_history;
CREATE POLICY "Reviewers can view own assignment history" ON public.assignment_history
  FOR SELECT TO authenticated
  USING ((assigned_to = auth.uid() OR previous_assignee = auth.uid())
    AND (public.has_role(auth.uid(), 'reviewer'::app_role) OR public.has_role(auth.uid(), 'admin'::app_role)));