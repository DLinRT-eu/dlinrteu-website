CREATE OR REPLACE FUNCTION public.notify_admin_on_registration()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
BEGIN
  BEGIN
    PERFORM net.http_post(
      url := 'https://msyfxyxzjyowwasgturs.supabase.co/functions/v1/notify-user-registration',
      headers := '{"Content-Type":"application/json","Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zeWZ4eXh6anlvd3dhc2d0dXJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgxOTgxNzgsImV4cCI6MjA2Mzc3NDE3OH0.3a-Q2TUNuB0vbWUoC0Q_Tg_HUAWZ1nH4UhSs95uz1o8"}'::jsonb,
      body := jsonb_build_object(
        'userId', NEW.id,
        'email', NEW.email,
        'firstName', COALESCE(NEW.first_name, ''),
        'lastName', COALESCE(NEW.last_name, ''),
        'createdAt', NEW.created_at
      )
    );
  EXCEPTION WHEN OTHERS THEN
    RAISE WARNING 'notify_admin_on_registration: pg_net call failed for %: %', NEW.id, SQLERRM;
    UPDATE public.user_registration_notifications
       SET failure_reason = left('pg_net error: ' || SQLERRM, 500)
     WHERE user_id = NEW.id;
  END;

  RETURN NEW;
END;
$$;