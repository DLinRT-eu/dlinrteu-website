-- Ensure required extensions
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Remove any prior version of this job before re-scheduling
DO $$
BEGIN
  PERFORM cron.unschedule('send-role-request-digest-daily')
  WHERE EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'send-role-request-digest-daily');
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

SELECT cron.schedule(
  'send-role-request-digest-daily',
  '0 8 * * *',
  $cron$
    SELECT net.http_post(
      url := 'https://msyfxyxzjyowwasgturs.supabase.co/functions/v1/send-role-request-digest',
      headers := '{"Content-Type":"application/json","Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zeWZ4eXh6anlvd3dhc2d0dXJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgxOTgxNzgsImV4cCI6MjA2Mzc3NDE3OH0.3a-Q2TUNuB0vbWUoC0Q_Tg_HUAWZ1nH4UhSs95uz1o8"}'::jsonb,
      body := '{"triggered_by":"cron"}'::jsonb
    ) AS request_id;
  $cron$
);