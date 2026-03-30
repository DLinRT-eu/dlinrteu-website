-- Fix 1: Drop overly broad user_products_select_shared policy
DROP POLICY IF EXISTS "user_products_select_shared" ON public.user_products;

-- Fix 2: Drop and recreate user_products_select_reviewer scoped to assigned products only
DROP POLICY IF EXISTS "user_products_select_reviewer" ON public.user_products;

CREATE POLICY "user_products_select_reviewer" ON public.user_products
FOR SELECT TO authenticated
USING (
  willing_to_share_experience = true
  AND has_role(auth.uid(), 'reviewer'::app_role)
  AND EXISTS (
    SELECT 1 FROM public.product_reviews pr
    WHERE pr.product_id = user_products.product_id
    AND pr.assigned_to = auth.uid()
    AND pr.status NOT IN ('completed', 'rejected')
  )
);

-- Fix 3: Recreate user_product_experiences view with security_invoker = true
-- so it respects the underlying user_products RLS policies
DROP VIEW IF EXISTS public.user_product_experiences;

CREATE VIEW public.user_product_experiences
WITH (security_invoker = true)
AS
SELECT
  up.id,
  up.user_id,
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
  p.first_name,
  p.last_name,
  p.email,
  p.linkedin_url,
  p.specialization
FROM public.user_products up
JOIN public.profiles p ON p.id = up.user_id
WHERE up.willing_to_share_experience = true;