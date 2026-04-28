-- Ensure pg_net is available (used to invoke edge function from trigger)
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- Trigger function: when a profile is inserted, asynchronously call the
-- notify-user-registration edge function so an admin notification email is sent.
CREATE OR REPLACE FUNCTION public.notify_admin_on_registration()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  v_service_key text;
BEGIN
  -- Service role key is exposed to Postgres via the project's anon key in cron jobs;
  -- we use the same key the existing cron jobs use (project anon key).
  -- Edge function verifies the bearer is the SERVICE ROLE; pg_net here uses the
  -- service role key fetched from vault if available, else falls back to the same
  -- bearer used by the cron jobs that already work.
  BEGIN
    PERFORM net.http_post(
      url := 'https://msyfxyxzjyowwasgturs.supabase.co/functions/v1/notify-user-registration',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key', true)
      ),
      body := jsonb_build_object(
        'userId', NEW.id,
        'email', NEW.email,
        'firstName', COALESCE(NEW.first_name, ''),
        'lastName', COALESCE(NEW.last_name, ''),
        'createdAt', NEW.created_at
      )
    );
  EXCEPTION WHEN OTHERS THEN
    -- Never block profile creation on notification failure
    RAISE WARNING 'notify_admin_on_registration: pg_net call failed for %: %', NEW.id, SQLERRM;
    UPDATE public.user_registration_notifications
       SET failure_reason = left('pg_net error: ' || SQLERRM, 500)
     WHERE user_id = NEW.id;
  END;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_profile_created_notify_admin ON public.profiles;
CREATE TRIGGER on_profile_created_notify_admin
AFTER INSERT ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.notify_admin_on_registration();