
-- Fix 1: Replace spoofable current_setting('role') checks with JWT-based checks on analytics tables

-- analytics_daily: drop spoofable policies, recreate with JWT check
DROP POLICY IF EXISTS "Allow service role write access for analytics_daily" ON public.analytics_daily;
DROP POLICY IF EXISTS "Allow service role update access for analytics_daily" ON public.analytics_daily;
DROP POLICY IF EXISTS "Service role full access analytics_daily" ON public.analytics_daily;

CREATE POLICY "Service role insert analytics_daily" ON public.analytics_daily
FOR INSERT TO public
WITH CHECK (auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY "Service role update analytics_daily" ON public.analytics_daily
FOR UPDATE TO public
USING (auth.jwt() ->> 'role' = 'service_role');

-- analytics_page_visits: drop spoofable policies, recreate with JWT check
DROP POLICY IF EXISTS "Allow service role write access for analytics_page_visits" ON public.analytics_page_visits;
DROP POLICY IF EXISTS "Allow service role update access for analytics_page_visits" ON public.analytics_page_visits;
DROP POLICY IF EXISTS "Service role full access analytics_page_visits" ON public.analytics_page_visits;

CREATE POLICY "Service role insert analytics_page_visits" ON public.analytics_page_visits
FOR INSERT TO public
WITH CHECK (auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY "Service role update analytics_page_visits" ON public.analytics_page_visits
FOR UPDATE TO public
USING (auth.jwt() ->> 'role' = 'service_role');

-- analytics_visitors: drop spoofable policy, recreate with JWT check
DROP POLICY IF EXISTS "Allow service role access for analytics_visitors" ON public.analytics_visitors;

CREATE POLICY "Service role write analytics_visitors" ON public.analytics_visitors
FOR INSERT TO public
WITH CHECK (auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY "Service role update analytics_visitors" ON public.analytics_visitors
FOR UPDATE TO public
USING (auth.jwt() ->> 'role' = 'service_role');

-- Fix 2: Restrict product_revision_dates public SELECT to authenticated users only
-- This prevents anonymous users from seeing internal user UUIDs in last_revised_by
DROP POLICY IF EXISTS "Anyone can read product revision dates" ON public.product_revision_dates;

CREATE POLICY "Authenticated users can read product revision dates" ON public.product_revision_dates
FOR SELECT TO authenticated
USING (true);

-- Also allow anonymous to read but without the UUID column by using a public view instead
-- For now, restrict to authenticated only since the client code requires auth context
