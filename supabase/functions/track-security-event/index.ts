import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.8'

// Allowed origins for security
const ALLOWED_ORIGINS = [
  "https://dlinrt.eu",
  "https://www.dlinrt.eu",
  "http://localhost:5173",
  "http://localhost:3000"
];

function getCorsHeaders(origin: string | null): HeadersInit {
  const allowedOrigin = origin && (ALLOWED_ORIGINS.includes(origin) || origin.endsWith('.lovable.app'))
    ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };
}

// Per-user rate limiting (keyed by authenticated user id, not spoofable headers)
const rateLimitStore = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const RATE_LIMIT_MAX_EVENTS = 30; // Max 30 security events per minute per user

const checkRateLimit = (key: string): boolean => {
  const now = Date.now();
  const current = rateLimitStore.get(key);

  if (!current || now - current.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitStore.set(key, { count: 1, timestamp: now });
    return true;
  }

  if (current.count >= RATE_LIMIT_MAX_EVENTS) {
    return false;
  }

  current.count++;
  return true;
};

interface SecurityEventData {
  event_type: 'form_submission_failed' | 'unusual_activity' | 'rate_limit_exceeded' | 'suspicious_request' | 'repeated_failures' | 'bot_detection' | 'malicious_payload' | 'authentication_failure';
  severity: 'low' | 'medium' | 'high' | 'critical';
  details: Record<string, any>;
  user_agent: string;
  url: string;
  client_fingerprint: string;
}

Deno.serve(async (req) => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    // Require authenticated user — closes anonymous flooding vector.
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const userClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    const token = authHeader.replace('Bearer ', '');
    const { data: claimsData, error: claimsError } = await userClient.auth.getClaims(token);
    if (claimsError || !claimsData?.claims?.sub) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    const userId = claimsData.claims.sub as string;

    // Per-user rate limit (cannot be spoofed; tied to verified JWT)
    if (!checkRateLimit(`user:${userId}`)) {
      return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), {
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    let eventData: SecurityEventData;
    try {
      eventData = await req.json();
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const validEventTypes = ['form_submission_failed', 'unusual_activity', 'rate_limit_exceeded', 'suspicious_request', 'repeated_failures', 'bot_detection', 'malicious_payload', 'authentication_failure'];
    const validSeverities = ['low', 'medium', 'high', 'critical'];

    if (!eventData.event_type || !eventData.client_fingerprint) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!validEventTypes.includes(eventData.event_type)) {
      return new Response(JSON.stringify({ error: 'Invalid event_type' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (eventData.severity && !validSeverities.includes(eventData.severity)) {
      return new Response(JSON.stringify({ error: 'Invalid severity' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Enforce input length limits
    if (eventData.client_fingerprint.length > 128) {
      eventData.client_fingerprint = eventData.client_fingerprint.substring(0, 128);
    }
    if (eventData.url && eventData.url.length > 2048) {
      eventData.url = eventData.url.substring(0, 2048);
    }
    if (eventData.user_agent && eventData.user_agent.length > 500) {
      eventData.user_agent = eventData.user_agent.substring(0, 500);
    }
    if (eventData.details) {
      const detailsStr = JSON.stringify(eventData.details);
      if (detailsStr.length > 5000) {
        eventData.details = { truncated: true, message: 'Details exceeded maximum size' };
      }
    }

    // Hash the (now authenticated) user id for storage — avoids storing raw uid in events table
    const { data: hashedFingerprint } = await supabase.rpc('hash_ip', {
      ip_address: userId
    });

    const userAgentHash = eventData.user_agent ?
      btoa(eventData.user_agent.substring(0, 50)).substring(0, 20) : null;

    const { error } = await supabase
      .from('security_events')
      .insert({
        event_type: eventData.event_type,
        severity: eventData.severity,
        details: eventData.details,
        ip_hash: hashedFingerprint,
        user_agent_hash: userAgentHash,
        url: eventData.url
      });

    if (error) {
      console.error('Error inserting security event:', error);
      return new Response(JSON.stringify({ error: 'Failed to log security event' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (eventData.severity === 'critical') {
      console.error(`CRITICAL SECURITY EVENT: ${eventData.event_type}`, {
        fingerprint: hashedFingerprint,
        details: eventData.details,
        url: eventData.url
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in track-security-event function:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
