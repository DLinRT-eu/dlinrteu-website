CREATE OR REPLACE FUNCTION public.count_potential_newsletter_recoveries()
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_active int;
  v_unsubscribed int;
  v_profiles_with_processing_consent int;
  v_profiles_consent_not_subscribed int;
  v_other_emails_no_marketing_consent int;
BEGIN
  -- Admin-only
  IF NOT public.has_role(auth.uid(), 'admin'::app_role) THEN
    RAISE EXCEPTION 'forbidden';
  END IF;

  SELECT count(*) FILTER (WHERE unsubscribed_at IS NULL),
         count(*) FILTER (WHERE unsubscribed_at IS NOT NULL)
    INTO v_active, v_unsubscribed
  FROM public.newsletter_subscribers;

  SELECT count(*) INTO v_profiles_with_processing_consent
  FROM public.profiles
  WHERE data_processing_consent_given = true
    AND data_processing_consent_withdrawn = false;

  SELECT count(*) INTO v_profiles_consent_not_subscribed
  FROM public.profiles p
  WHERE p.data_processing_consent_given = true
    AND p.data_processing_consent_withdrawn = false
    AND NOT EXISTS (
      SELECT 1 FROM public.newsletter_subscribers n
      WHERE lower(n.email) = lower(p.email)
    );

  -- Other tables that contain emails but NO marketing consent
  -- (operational / submission emails — cannot be auto-imported under GDPR)
  SELECT
    (SELECT count(DISTINCT lower(email)) FROM public.contact_submissions WHERE email IS NOT NULL) +
    (SELECT count(DISTINCT lower(email)) FROM public.user_product_experiences WHERE email IS NOT NULL) +
    (SELECT count(DISTINCT lower(email)) FROM public.user_registration_notifications WHERE email IS NOT NULL)
  INTO v_other_emails_no_marketing_consent;

  RETURN jsonb_build_object(
    'newsletter_active', v_active,
    'newsletter_unsubscribed', v_unsubscribed,
    'profiles_with_processing_consent', v_profiles_with_processing_consent,
    'profiles_with_processing_consent_not_in_newsletter', v_profiles_consent_not_subscribed,
    'other_tables_emails_without_marketing_consent', v_other_emails_no_marketing_consent,
    'note', 'Counts only. Account/processing consent is NOT marketing consent (GDPR Art. 6(1)(a)). Do not auto-import.'
  );
END;
$$;

REVOKE ALL ON FUNCTION public.count_potential_newsletter_recoveries() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.count_potential_newsletter_recoveries() TO authenticated;