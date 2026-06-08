
CREATE TABLE public.admin_email_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  subject TEXT NOT NULL,
  body_markdown TEXT NOT NULL,
  created_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.admin_email_templates TO authenticated;
GRANT ALL ON public.admin_email_templates TO service_role;

ALTER TABLE public.admin_email_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view email templates"
  ON public.admin_email_templates FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert email templates"
  ON public.admin_email_templates FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update email templates"
  ON public.admin_email_templates FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete email templates"
  ON public.admin_email_templates FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_admin_email_templates_updated_at
  BEFORE UPDATE ON public.admin_email_templates
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.admin_bulk_email_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sent_by UUID,
  subject TEXT NOT NULL,
  body_markdown TEXT NOT NULL,
  recipient_count INTEGER NOT NULL DEFAULT 0,
  success_count INTEGER NOT NULL DEFAULT 0,
  failure_count INTEGER NOT NULL DEFAULT 0,
  recipients JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.admin_bulk_email_log TO authenticated;
GRANT ALL ON public.admin_bulk_email_log TO service_role;

ALTER TABLE public.admin_bulk_email_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view bulk email logs"
  ON public.admin_bulk_email_log FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

INSERT INTO public.admin_email_templates (name, subject, body_markdown) VALUES
  (
    'Certification reminder',
    'Action requested: certify {{company_name}} on DLinRT.eu',
    'Dear {{first_name}},

We kindly invite you, as the representative of **{{company_name}}**, to review your company''s product listings on DLinRT.eu and certify that the information is accurate and up to date.

You can access your company''s catalogue page directly from the button below.

Thank you for helping keep the radiotherapy AI catalogue trustworthy.

— The DLinRT.eu Team'
  ),
  (
    'Quarterly update',
    'DLinRT.eu quarterly update for {{company_name}}',
    'Hi {{first_name}},

A short update from the DLinRT.eu team regarding the listings for **{{company_name}}**.

- Please review the current product entries
- Let us know about new releases, regulatory clearances or deprecated products
- Reach out if anything needs correcting

The button below opens your company''s catalogue overview.

Thanks,
DLinRT.eu'
  );
