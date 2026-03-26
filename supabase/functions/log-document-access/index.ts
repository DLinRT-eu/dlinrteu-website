import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";

const ALLOWED_ORIGINS = [
  "https://dlinrt.eu",
  "https://www.dlinrt.eu",
  "http://localhost:5173",
  "http://localhost:3000"
];

function getCorsHeaders(origin: string | null): Record<string, string> {
  const isAllowed = origin && (ALLOWED_ORIGINS.includes(origin) || origin.endsWith('.lovable.app'));
  return {
    'Access-Control-Allow-Origin': isAllowed ? origin : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };
}

serve(async (req) => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) throw new Error('Missing authorization header');

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    if (userError || !user) throw new Error('Unauthorized');

    const { data: roles } = await supabase.from('user_roles').select('role').eq('user_id', user.id);
    const isAdmin = roles?.some(r => r.role === 'admin');
    if (!isAdmin) throw new Error('Admin access required');

    let body: { document_id?: string; access_reason?: string };
    try { body = await req.json(); } catch { throw new Error('Invalid JSON body'); }

    const { document_id, access_reason } = body;
    if (!document_id || !access_reason) throw new Error('Missing required fields');

    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(document_id)) throw new Error('Invalid document_id format');
    if (typeof access_reason !== 'string' || access_reason.length > 500) throw new Error('access_reason must be a string under 500 characters');

    const { data: document, error: docError } = await supabase.from('profile_documents').select('id, user_id').eq('id', document_id).single();
    if (docError || !document) throw new Error('Document not found');

    if (document.user_id === user.id) {
      return new Response(JSON.stringify({ success: true, message: 'No logging needed for own documents' }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const userAgent = req.headers.get('User-Agent') || 'unknown';
    const clientIp = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const encoder = new TextEncoder();
    const data = encoder.encode(clientIp + 'document_access_salt');
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const ipHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    const { error: logError } = await supabase.from('profile_document_access_log').insert({
      document_id, accessed_by: user.id, access_reason, user_agent: userAgent.substring(0, 500), ip_hash: ipHash.substring(0, 64),
    });
    if (logError) throw new Error('Failed to log access');

    return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (error) {
    const origin2 = req.headers.get("origin");
    const corsHeaders2 = getCorsHeaders(origin2);
    console.error('Error in log-document-access:', error);
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }),
      { headers: { ...corsHeaders2, 'Content-Type': 'application/json' }, status: 400 }
    );
  }
});
