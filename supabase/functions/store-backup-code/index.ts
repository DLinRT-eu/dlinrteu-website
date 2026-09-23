import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";

const MAX_UNUSED_CODES = 10;

const ALLOWED_ORIGINS = [
  'https://dlinrt.eu',
  'https://www.dlinrt.eu',
  'https://lovable.dev',
  'https://dlinrteu-website.lovable.app',
  'https://id-preview--7e82abf4-4ab2-47b7-8256-c0abaf5b5420.lovable.app',
  'http://localhost:5173',
  'http://localhost:3000',
];

const getAllowedOrigin = (req: Request) => {
  const origin = req.headers.get('origin') || '';
  return ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
};

const corsHeaders = (req: Request) => ({
  'Access-Control-Allow-Origin': getAllowedOrigin(req),
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Credentials': 'true',
});

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders(req) });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders(req), 'Content-Type': 'application/json' } }
      );
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(token);
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders(req), 'Content-Type': 'application/json' } }
      );
    }

    const body = await req.json().catch(() => ({}));
    const { codes, reset } = body as { codes?: unknown; reset?: unknown };

    // Validate batch payload
    if (!Array.isArray(codes) || codes.length === 0 || codes.length > MAX_UNUSED_CODES) {
      return new Response(
        JSON.stringify({ error: `Provide 1..${MAX_UNUSED_CODES} codes` }),
        { status: 400, headers: { ...corsHeaders(req), 'Content-Type': 'application/json' } }
      );
    }
    for (const c of codes) {
      if (typeof c !== 'string' || c.length < 8 || c.length > 64) {
        return new Response(
          JSON.stringify({ error: 'Invalid code format' }),
          { status: 400, headers: { ...corsHeaders(req), 'Content-Type': 'application/json' } }
        );
      }
    }

    // Reset existing unused codes if requested
    if (reset === true) {
      await supabaseClient
        .from('mfa_backup_codes')
        .delete()
        .eq('user_id', user.id)
        .eq('used', false);
    }

    // Defensive quota check (DB trigger also enforces 10)
    const { count: unusedCount } = await supabaseClient
      .from('mfa_backup_codes')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('used', false);

    if ((unusedCount ?? 0) + codes.length > MAX_UNUSED_CODES) {
      return new Response(
        JSON.stringify({ error: 'Backup code quota exceeded' }),
        { status: 429, headers: { ...corsHeaders(req), 'Content-Type': 'application/json' } }
      );
    }

    // Hash all codes server-side
    const rows = await Promise.all(
      (codes as string[]).map(async (code) => ({
        user_id: user.id,
        code_hash: await bcrypt.hash(code, 10),
      }))
    );

    const { error } = await supabaseClient.from('mfa_backup_codes').insert(rows);
    if (error) throw error;

    return new Response(
      JSON.stringify({ success: true, stored: rows.length }),
      { status: 200, headers: { ...corsHeaders(req), 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error storing backup codes:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders(req), 'Content-Type': 'application/json' } }
    );
  }
});
