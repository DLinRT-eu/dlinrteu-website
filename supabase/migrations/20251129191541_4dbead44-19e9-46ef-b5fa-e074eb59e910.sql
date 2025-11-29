-- Add foreign key constraint from company_representatives to profiles
-- This ensures referential integrity and enables PostgREST joins to work correctly

ALTER TABLE public.company_representatives
ADD CONSTRAINT fk_company_representatives_profiles
FOREIGN KEY (user_id) REFERENCES public.profiles(id)
ON DELETE CASCADE;

-- Add comment for documentation
COMMENT ON CONSTRAINT fk_company_representatives_profiles ON public.company_representatives IS 'Ensures company representatives are linked to valid user profiles';