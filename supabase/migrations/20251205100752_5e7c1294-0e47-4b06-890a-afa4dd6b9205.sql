-- Fix verify_user_registration to NOT auto-grant reviewer role
-- Users should request roles during signup, and admins grant them separately
CREATE OR REPLACE FUNCTION public.verify_user_registration(p_user_id uuid, p_verified boolean DEFAULT true)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
DECLARE
  v_admin_id UUID := auth.uid();
  v_user_email TEXT;
BEGIN
  IF NOT public.is_admin_secure() THEN
    RAISE EXCEPTION 'Only admins can verify user registrations';
  END IF;

  SELECT email INTO v_user_email
  FROM public.profiles
  WHERE id = p_user_id;

  UPDATE public.user_registration_notifications
  SET verified = p_verified,
      verified_at = NOW(),
      verified_by = v_admin_id,
      notification_status = CASE
        WHEN p_verified THEN 'approved'
        ELSE 'rejected'
      END
  WHERE user_id = p_user_id;

  UPDATE public.profiles
  SET approval_status = CASE
        WHEN p_verified THEN 'approved'
        ELSE 'rejected'
      END,
      approved_by = v_admin_id,
      approved_at = NOW()
  WHERE id = p_user_id;

  -- REMOVED: Auto-grant reviewer role
  -- Roles should be granted based on user requests via role_requests table
  -- Admin will approve role requests separately

  PERFORM public.log_admin_action(
    'verify_user_registration',
    p_user_id,
    v_user_email,
    jsonb_build_object('verified', p_verified)
  );

  RETURN TRUE;
END;
$function$;

-- Update handle_new_user to create role_requests based on signup metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
DECLARE
  v_is_institutional BOOLEAN;
  v_role_name TEXT;
  v_requested_roles JSONB;
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
  )
  ON CONFLICT (id) DO NOTHING;
  
  -- Check if institutional email
  SELECT public.is_institutional_email(NEW.email) INTO v_is_institutional;
  
  -- Create registration notification
  INSERT INTO public.user_registration_notifications (
    user_id,
    email,
    notification_status
  ) VALUES (
    NEW.id,
    NEW.email,
    CASE 
      WHEN v_is_institutional THEN 'pending'
      ELSE 'blocked'
    END
  )
  ON CONFLICT (user_id) DO NOTHING;
  
  -- Create role requests based on requested_roles from signup metadata
  v_requested_roles := NEW.raw_user_meta_data->'requested_roles';
  
  IF v_requested_roles IS NOT NULL AND jsonb_array_length(v_requested_roles) > 0 THEN
    FOR v_role_name IN SELECT jsonb_array_elements_text(v_requested_roles)
    LOOP
      -- Only create role requests for valid roles (reviewer, company)
      IF v_role_name IN ('reviewer', 'company') THEN
        INSERT INTO public.role_requests (
          user_id,
          requested_role,
          justification,
          status
        ) VALUES (
          NEW.id,
          v_role_name::public.app_role,
          'Requested during account registration',
          'pending'
        )
        ON CONFLICT DO NOTHING;
      END IF;
    END LOOP;
  END IF;
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log error but don't fail auth
    RAISE WARNING 'Error in handle_new_user for %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$function$;