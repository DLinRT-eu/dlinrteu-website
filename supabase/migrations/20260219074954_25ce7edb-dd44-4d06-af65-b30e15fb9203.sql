
CREATE TABLE public.certification_reminder_logs (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sent_at       timestamptz NOT NULL DEFAULT now(),
  sent_by       uuid NOT NULL,
  subject       text NOT NULL,
  message_body  text NOT NULL,
  recipients    jsonb NOT NULL DEFAULT '[]'::jsonb,
  emails_sent   int NOT NULL DEFAULT 0,
  emails_failed int NOT NULL DEFAULT 0,
  companies     text[] NOT NULL DEFAULT '{}'
);

ALTER TABLE public.certification_reminder_logs ENABLE ROW LEVEL SECURITY;

-- Admins can read logs
CREATE POLICY "Admins can read certification_reminder_logs"
  ON public.certification_reminder_logs
  FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Service role (edge function) can insert logs
CREATE POLICY "Service role can insert certification_reminder_logs"
  ON public.certification_reminder_logs
  FOR INSERT
  WITH CHECK (true);

-- No UPDATE or DELETE policies
