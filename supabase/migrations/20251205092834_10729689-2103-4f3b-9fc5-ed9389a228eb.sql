-- Fix get_security_events_admin function - drop first since return type is changing
DROP FUNCTION IF EXISTS public.get_security_events_admin(integer);

-- Recreate with correct columns from security_events table
CREATE OR REPLACE FUNCTION public.get_security_events_admin(last_n_days int DEFAULT 30)
RETURNS TABLE(
  id UUID,
  event_type TEXT,
  severity TEXT,
  ip_hash TEXT,
  url TEXT,
  details JSONB,
  created_at TIMESTAMPTZ,
  resolved_at TIMESTAMPTZ,
  notes TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Verify admin role
  IF NOT public.is_admin_secure() THEN
    RAISE EXCEPTION 'Access denied: admin role required';
  END IF;
  
  RETURN QUERY
  SELECT 
    se.id,
    se.event_type,
    se.severity,
    se.ip_hash,
    se.url,
    se.details,
    se.created_at,
    se.resolved_at,
    se.notes
  FROM public.security_events se
  WHERE se.created_at > NOW() - INTERVAL '1 day' * last_n_days
  ORDER BY se.created_at DESC;
END;
$$;