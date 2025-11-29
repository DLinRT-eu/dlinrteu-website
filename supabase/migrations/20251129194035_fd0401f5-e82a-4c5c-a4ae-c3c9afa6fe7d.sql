-- Delete all existing changelog entries
DELETE FROM changelog_entries;

-- Create monthly cron job to auto-generate and publish changelogs
-- Runs on the 1st of every month at 00:05 UTC
SELECT cron.schedule(
  'monthly-changelog-generation',
  '5 0 1 * *',
  $$
  SELECT net.http_post(
    url := 'https://msyfxyxzjyowwasgturs.supabase.co/functions/v1/auto-generate-monthly-changelog',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zeWZ4eXh6anlvd3dhc2d0dXJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgxOTgxNzgsImV4cCI6MjA2Mzc3NDE3OH0.3a-Q2TUNuB0vbWUoC0Q_Tg_HUAWZ1nH4UhSs95uz1o8"}'::jsonb,
    body := '{}'::jsonb
  ) AS request_id;
  $$
);