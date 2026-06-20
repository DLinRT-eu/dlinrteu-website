-- Enable pg_cron and pg_net for scheduled GDPR retention purges
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Remove any prior schedule so this migration is idempotent
DO $$
BEGIN
  PERFORM cron.unschedule('gdpr-retention-purge-nightly');
EXCEPTION WHEN OTHERS THEN
  -- job didn't exist; ignore
  NULL;
END $$;

-- Schedule the retention purge edge function nightly at 03:00 UTC
SELECT cron.schedule(
  'gdpr-retention-purge-nightly',
  '0 3 * * *',
  $$
  SELECT net.http_post(
    url := 'https://msyfxyxzjyowwasgturs.supabase.co/functions/v1/gdpr-retention-purge',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'apikey', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zeWZ4eXh6anlvd3dhc2d0dXJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgxOTgxNzgsImV4cCI6MjA2Mzc3NDE3OH0.3a-Q2TUNuB0vbWUoC0Q_Tg_HUAWZ1nH4UhSs95uz1o8'
    ),
    body := jsonb_build_object('trigger', 'cron', 'at', now())
  );
  $$
);