-- Create function to resolve security events
CREATE OR REPLACE FUNCTION public.resolve_security_event_admin(
  p_event_id UUID,
  p_notes TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_caller_uid UUID;
BEGIN
  v_caller_uid := auth.uid();
  
  IF v_caller_uid IS NULL THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Not authenticated'
    );
  END IF;
  
  IF NOT is_admin_secure() THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Access denied - admin role required'
    );
  END IF;
  
  -- Update the security event
  UPDATE public.security_events
  SET 
    resolved_at = NOW(),
    notes = COALESCE(p_notes, notes)
  WHERE id = p_event_id;
  
  IF NOT FOUND THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Security event not found'
    );
  END IF;
  
  RETURN jsonb_build_object(
    'success', true,
    'message', 'Security event resolved successfully',
    'event_id', p_event_id
  );
  
EXCEPTION
  WHEN OTHERS THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', SQLERRM
    );
END;
$$;