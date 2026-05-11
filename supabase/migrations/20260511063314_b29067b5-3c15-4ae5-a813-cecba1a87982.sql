
CREATE TABLE public.email_send_log (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  recipient text NOT NULL,
  subject text,
  function_name text,
  resend_id text,
  status text NOT NULL DEFAULT 'sent',
  error text,
  bounce_type text,
  bounce_subtype text,
  raw_event jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_email_send_log_recipient ON public.email_send_log (recipient);
CREATE INDEX idx_email_send_log_status ON public.email_send_log (status);
CREATE INDEX idx_email_send_log_resend_id ON public.email_send_log (resend_id);
CREATE INDEX idx_email_send_log_created_at ON public.email_send_log (created_at DESC);

ALTER TABLE public.email_send_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read email send log"
  ON public.email_send_log
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER trg_email_send_log_updated_at
  BEFORE UPDATE ON public.email_send_log
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
