-- ============================================
-- SECURITY AUDIT FIX: Views Security + GDPR IP Compliance
-- ============================================

-- Phase 1: Fix reviews_with_github_tracking view with security_invoker
DROP VIEW IF EXISTS public.reviews_with_github_tracking;
CREATE VIEW public.reviews_with_github_tracking
WITH (security_invoker = on) AS
SELECT 
  pr.id,
  pr.product_id,
  pr.assigned_to,
  pr.status,
  pr.assigned_at,
  pr.github_file_url,
  pr.github_last_modified,
  pr.auto_revision_triggered,
  (p.first_name || ' ' || p.last_name) AS reviewer_name,
  p.email AS reviewer_email,
  (SELECT count(*) FROM github_file_checks WHERE review_id = pr.id) AS check_count,
  (SELECT max(checked_at) FROM github_file_checks WHERE review_id = pr.id) AS last_check_at
FROM product_reviews pr
LEFT JOIN profiles p ON pr.assigned_to = p.id
WHERE pr.github_file_url IS NOT NULL;

COMMENT ON VIEW public.reviews_with_github_tracking IS 
  'GitHub tracking view with security_invoker - respects RLS on underlying tables';

-- Phase 2: Fix analytics_summary view with security_invoker
DROP VIEW IF EXISTS public.analytics_summary;
CREATE VIEW public.analytics_summary
WITH (security_invoker = on) AS
SELECT date, total_visits, unique_visitors, created_at, updated_at
FROM analytics_daily ad
ORDER BY date DESC;

COMMENT ON VIEW public.analytics_summary IS 
  'Analytics summary view with security_invoker - respects RLS on analytics_daily';

-- Phase 3: Restrict analytics_public to authenticated users only
REVOKE SELECT ON public.analytics_public FROM anon;
GRANT SELECT ON public.analytics_public TO authenticated;

-- Phase 4: Fix company_products view with security_invoker
DROP VIEW IF EXISTS public.company_products;
CREATE VIEW public.company_products
WITH (security_invoker = on) AS
SELECT 
  cr.company_id,
  cr.company_name,
  pr.product_id,
  cr.user_id
FROM company_representatives cr
JOIN product_reviews pr ON EXISTS (
  SELECT 1 FROM company_product_verifications cpv 
  WHERE cpv.company_id = cr.company_id 
  AND cpv.product_id = pr.product_id
);

COMMENT ON VIEW public.company_products IS 
  'Company products view with security_invoker - respects RLS on underlying tables';

-- Phase 5: GDPR - Rename mfa_activity_log.ip_address to ip_hash
ALTER TABLE public.mfa_activity_log RENAME COLUMN ip_address TO ip_hash;

COMMENT ON COLUMN public.mfa_activity_log.ip_hash IS 
  'SHA-256 hash of IP address for GDPR compliance - never store raw IPs';