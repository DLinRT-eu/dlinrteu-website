-- Create table for reminder settings
CREATE TABLE IF NOT EXISTS public.reminder_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key TEXT NOT NULL UNIQUE,
  setting_value JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.reminder_settings ENABLE ROW LEVEL SECURITY;

-- Only admins can read/write reminder settings
CREATE POLICY "Admins can read reminder settings"
  ON public.reminder_settings
  FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can update reminder settings"
  ON public.reminder_settings
  FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can insert reminder settings"
  ON public.reminder_settings
  FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

-- Insert default settings
INSERT INTO public.reminder_settings (setting_key, setting_value)
VALUES (
  'deadline_reminders',
  '{"enabled": true, "threshold_days": 3, "min_interval_hours": 24}'::jsonb
) ON CONFLICT (setting_key) DO NOTHING;

-- Create updated function that accepts threshold parameter
CREATE OR REPLACE FUNCTION public.get_reviews_needing_reminders(
  p_threshold_days INTEGER DEFAULT 3,
  p_min_interval_hours INTEGER DEFAULT 24
)
RETURNS TABLE (
  review_id UUID,
  product_id TEXT,
  reviewer_id UUID,
  reviewer_email TEXT,
  reviewer_first_name TEXT,
  reviewer_last_name TEXT,
  deadline DATE,
  status TEXT,
  days_until_deadline INTEGER,
  round_name TEXT,
  last_reminder_sent_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    pr.id AS review_id,
    pr.product_id,
    pr.assigned_to AS reviewer_id,
    p.email AS reviewer_email,
    p.first_name AS reviewer_first_name,
    p.last_name AS reviewer_last_name,
    pr.deadline,
    pr.status,
    (pr.deadline - CURRENT_DATE)::INTEGER AS days_until_deadline,
    rr.name AS round_name,
    pr.last_reminder_sent_at
  FROM product_reviews pr
  JOIN profiles p ON pr.assigned_to = p.id
  LEFT JOIN review_rounds rr ON pr.review_round_id = rr.id
  WHERE 
    pr.status IN ('pending', 'in_progress')
    AND pr.deadline IS NOT NULL
    AND pr.assigned_to IS NOT NULL
    -- Reviews due within threshold days or overdue
    AND (pr.deadline - CURRENT_DATE) <= p_threshold_days
    -- Haven't sent a reminder in the interval
    AND (
      pr.last_reminder_sent_at IS NULL 
      OR pr.last_reminder_sent_at < NOW() - (p_min_interval_hours || ' hours')::INTERVAL
    )
  ORDER BY pr.deadline ASC;
END;
$$;

-- Function to get reminder settings (for edge function use)
CREATE OR REPLACE FUNCTION public.get_reminder_settings()
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  settings JSONB;
BEGIN
  SELECT setting_value INTO settings
  FROM reminder_settings
  WHERE setting_key = 'deadline_reminders';
  
  -- Return defaults if not found
  IF settings IS NULL THEN
    settings := '{"enabled": true, "threshold_days": 3, "min_interval_hours": 24}'::jsonb;
  END IF;
  
  RETURN settings;
END;
$$;

-- Function to update reminder settings (admin only)
CREATE OR REPLACE FUNCTION public.update_reminder_settings(
  p_enabled BOOLEAN DEFAULT NULL,
  p_threshold_days INTEGER DEFAULT NULL,
  p_min_interval_hours INTEGER DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_settings JSONB;
  new_settings JSONB;
BEGIN
  -- Check admin permission
  IF NOT public.has_role(auth.uid(), 'admin'::public.app_role) THEN
    RAISE EXCEPTION 'Permission denied: admin role required';
  END IF;

  -- Get current settings
  SELECT setting_value INTO current_settings
  FROM reminder_settings
  WHERE setting_key = 'deadline_reminders';

  IF current_settings IS NULL THEN
    current_settings := '{"enabled": true, "threshold_days": 3, "min_interval_hours": 24}'::jsonb;
  END IF;

  -- Build new settings
  new_settings := current_settings;
  
  IF p_enabled IS NOT NULL THEN
    new_settings := jsonb_set(new_settings, '{enabled}', to_jsonb(p_enabled));
  END IF;
  
  IF p_threshold_days IS NOT NULL THEN
    new_settings := jsonb_set(new_settings, '{threshold_days}', to_jsonb(p_threshold_days));
  END IF;
  
  IF p_min_interval_hours IS NOT NULL THEN
    new_settings := jsonb_set(new_settings, '{min_interval_hours}', to_jsonb(p_min_interval_hours));
  END IF;

  -- Upsert settings
  INSERT INTO reminder_settings (setting_key, setting_value, updated_at, updated_by)
  VALUES ('deadline_reminders', new_settings, NOW(), auth.uid())
  ON CONFLICT (setting_key) DO UPDATE
  SET setting_value = EXCLUDED.setting_value,
      updated_at = NOW(),
      updated_by = auth.uid();

  RETURN new_settings;
END;
$$;