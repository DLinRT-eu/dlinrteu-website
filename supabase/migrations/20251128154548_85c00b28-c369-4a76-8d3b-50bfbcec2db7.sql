-- Clean up test company representative entries
-- Delete pending test entries for m.maspero@umcutrecht.nl

DELETE FROM public.company_representatives 
WHERE user_id = '2d319366-8b97-4a2d-a515-bee4494fcabc' 
  AND verified = false
  AND company_name IN ('Canon Medical Systems', 'AI Medical', 'Philips');

-- Add comment for audit trail
COMMENT ON TABLE public.company_representatives IS 'Company representatives table - test entries cleaned up on 2025-11-28';