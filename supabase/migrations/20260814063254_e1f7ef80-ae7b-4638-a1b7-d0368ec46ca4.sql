DO $migration$
DECLARE
  expiry_job_id bigint;
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_extension
    WHERE extname = 'pg_cron'
  ) THEN
    SELECT jobid
    INTO expiry_job_id
    FROM cron.job
    WHERE jobname = 'expire-old-invitations-daily'
    LIMIT 1;

    IF expiry_job_id IS NOT NULL THEN
      PERFORM cron.unschedule(expiry_job_id);
    END IF;
  END IF;
END
$migration$;