DROP VIEW IF EXISTS public.user_product_experiences;

CREATE VIEW public.user_product_experiences WITH (security_invoker = on) AS
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
  CASE WHEN up.contact_preference = 'email' THEN p.email ELSE NULL END as email,
  CASE WHEN up.contact_preference IN ('linkedin', 'email') THEN p.linkedin_url ELSE NULL END as linkedin_url,
  p.specialization
FROM public.user_products up
JOIN public.profiles p ON up.user_id = p.id
WHERE up.willing_to_share_experience = true
  AND up.contact_preference != 'no_contact';

GRANT SELECT ON public.user_product_experiences TO authenticated;