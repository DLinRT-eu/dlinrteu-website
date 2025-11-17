-- Replace experience_rating with relationship_status field
-- This allows users to specify their relationship with a product instead of rating it

-- Add new relationship_status column
ALTER TABLE public.user_products
ADD COLUMN relationship_status TEXT CHECK (relationship_status IN ('currently_using', 'previously_used', 'evaluating', 'planning_to_adopt', 'owns', 'other'));

-- Add optional text field for "other" relationship
ALTER TABLE public.user_products
ADD COLUMN relationship_status_other TEXT;

-- Migrate existing data: convert ratings to relationship status
-- High ratings (4-5) -> currently_using
-- Medium ratings (3) -> evaluating  
-- Low ratings (1-2) -> previously_used
UPDATE public.user_products
SET relationship_status = CASE
  WHEN experience_rating >= 4 THEN 'currently_using'
  WHEN experience_rating = 3 THEN 'evaluating'
  WHEN experience_rating <= 2 THEN 'previously_used'
  ELSE 'currently_using'
END
WHERE experience_rating IS NOT NULL AND relationship_status IS NULL;

-- Set default for rows without rating
UPDATE public.user_products
SET relationship_status = 'currently_using'
WHERE relationship_status IS NULL;

-- Make relationship_status NOT NULL after migration
ALTER TABLE public.user_products
ALTER COLUMN relationship_status SET NOT NULL;

-- Set default for new rows
ALTER TABLE public.user_products
ALTER COLUMN relationship_status SET DEFAULT 'currently_using';

-- Drop the view first (it depends on experience_rating column)
DROP VIEW IF EXISTS public.user_product_experiences;

-- Now drop the old rating column
ALTER TABLE public.user_products
DROP COLUMN IF EXISTS experience_rating;

-- Recreate the view to use relationship_status instead of experience_rating
CREATE OR REPLACE VIEW public.user_product_experiences AS
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

COMMENT ON COLUMN public.user_products.relationship_status IS 'User''s relationship with the product: currently_using, previously_used, evaluating, planning_to_adopt, owns, other';
COMMENT ON COLUMN public.user_products.relationship_status_other IS 'Free-text description when relationship_status is "other"';
