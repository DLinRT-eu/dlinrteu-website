-- Add content_hash column to company_product_verifications
-- This hash is calculated from all product fields EXCEPT lastRevised and temporal fields
-- Allows certifications to remain valid when only lastRevised is updated by reviewers

ALTER TABLE public.company_product_verifications 
ADD COLUMN IF NOT EXISTS content_hash TEXT;

-- Add comment explaining the purpose
COMMENT ON COLUMN public.company_product_verifications.content_hash IS 
'Hash of product content excluding lastRevised, lastUpdated, companyRevisionDate. Used to determine if certification remains valid after content changes.';

-- Create index for faster hash lookups
CREATE INDEX IF NOT EXISTS idx_company_product_verifications_content_hash 
ON public.company_product_verifications(content_hash);