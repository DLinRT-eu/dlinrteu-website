-- Fix database grants for company management tables
-- Grant permissions to authenticated role for company_representatives
GRANT SELECT, INSERT, UPDATE, DELETE ON public.company_representatives TO authenticated;

-- Grant permissions for company_revisions
GRANT SELECT, INSERT, UPDATE, DELETE ON public.company_revisions TO authenticated;

-- Grant permissions for product_reviews
GRANT SELECT, INSERT, UPDATE, DELETE ON public.product_reviews TO authenticated;

-- Grant permissions for role_requests
GRANT SELECT, INSERT, UPDATE, DELETE ON public.role_requests TO authenticated;

-- Ensure RLS is enabled on all tables (should already be, but verify)
ALTER TABLE public.company_representatives ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_revisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.role_requests ENABLE ROW LEVEL SECURITY;

-- Clean up remaining test entry for m.maspero@umcutrecht.nl
DELETE FROM public.company_representatives 
WHERE user_id = '2d319366-8b97-4a2d-a515-bee4494fcabc' 
  AND company_name = 'Philips'
  AND verified = false;