-- Fix Security Definer Views - Set security_invoker=true on all views
-- This ensures views enforce RLS policies of the querying user, not the view creator

-- Fix company_products view
ALTER VIEW public.company_products SET (security_invoker = true);

-- Fix public_team_members view  
ALTER VIEW public.public_team_members SET (security_invoker = true);

-- Fix reviews_with_github_tracking view
ALTER VIEW public.reviews_with_github_tracking SET (security_invoker = true);

-- Fix user_product_experiences view
ALTER VIEW public.user_product_experiences SET (security_invoker = true);

-- Add comments explaining the security model
COMMENT ON VIEW public.company_products IS 'Shows verified company representatives and their associated products. Uses SECURITY INVOKER to enforce querying user RLS policies.';
COMMENT ON VIEW public.public_team_members IS 'Public display of team members with roles. Uses SECURITY INVOKER to enforce querying user RLS policies.';
COMMENT ON VIEW public.reviews_with_github_tracking IS 'Reviews with GitHub file tracking info. Uses SECURITY INVOKER to enforce querying user RLS policies.';
COMMENT ON VIEW public.user_product_experiences IS 'Public user product experiences for sharing. Uses SECURITY INVOKER to enforce querying user RLS policies.';
