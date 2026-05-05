-- Allow public catalogue to read minimal verification info (product + date only).
-- Sensitive columns (verified_by, content_hash, notes, ...) remain not granted.
GRANT SELECT (product_id, verified_at) ON public.company_product_verifications TO anon, authenticated;