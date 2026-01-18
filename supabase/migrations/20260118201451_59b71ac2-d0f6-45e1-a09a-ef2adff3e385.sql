-- Fix user_product_experiences view by recreating with security_invoker=on
-- This ensures the view respects RLS policies of underlying tables

DROP VIEW IF EXISTS public.user_product_experiences;

CREATE VIEW public.user_product_experiences
  WITH (security_invoker=on)
AS
SELECT 
  up.id,
  up.product_id,
  up.company_id,
  up.adoption_date,
  up.institution,
  up.department,
  up.relationship_status,
  up.relationship_status_other,
  up.experience_notes,
  up.use_case,
  up.contact_preference,
  up.user_id,
  p.first_name,
  p.last_name,
  p.email,
  p.linkedin_url,
  p.specialization
FROM public.user_products up
JOIN public.profiles p ON up.user_id = p.id
WHERE up.willing_to_share_experience = true
  AND up.contact_preference != 'no_contact';

-- Grant access to the view for authenticated users only
REVOKE ALL ON public.user_product_experiences FROM anon;
REVOKE ALL ON public.user_product_experiences FROM public;
GRANT SELECT ON public.user_product_experiences TO authenticated;

COMMENT ON VIEW public.user_product_experiences IS 'Security-invoked view for shared product experiences. Only shows users who opted to share their experience.';