import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const ALLOWED_ORIGINS = [
  'https://dlinrt.eu',
  'https://www.dlinrt.eu',
  'http://localhost:5173',
  'http://localhost:3000',
];

function getCorsHeaders(origin: string | null): Record<string, string> {
  const isAllowed = origin && (ALLOWED_ORIGINS.includes(origin) || origin.endsWith('.lovable.app'));
  return {
    'Access-Control-Allow-Origin': isAllowed ? origin! : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };
}

interface AcceptPayload {
  token: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

serve(async (req) => {
  const origin = req.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { token, password, firstName, lastName }: AcceptPayload = await req.json();
    if (!token || !password || password.length < 8) {
      return new Response(
        JSON.stringify({ error: 'Token and a password of at least 8 characters are required.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const { data: invitation, error: invError } = await admin
      .from('company_invitations')
      .select('*')
      .eq('token', token)
      .maybeSingle();

    if (invError || !invitation) {
      return new Response(JSON.stringify({ error: 'Invalid invitation.' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    if (invitation.status !== 'pending') {
      return new Response(JSON.stringify({ error: 'This invitation is no longer active.' }), {
        status: 410,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    if (new Date(invitation.expires_at).getTime() < Date.now()) {
      await admin.from('company_invitations').update({ status: 'expired' }).eq('id', invitation.id);
      return new Response(JSON.stringify({ error: 'This invitation has expired.' }), {
        status: 410,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const email = invitation.email as string;
    const resolvedFirst = (firstName ?? invitation.first_name ?? '').trim();
    const resolvedLast = (lastName ?? invitation.last_name ?? '').trim();

    // Create or reuse auth user
    let userId: string | null = null;

    const { data: created, error: createError } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { first_name: resolvedFirst, last_name: resolvedLast },
    });

    if (createError) {
      // If user already exists, look it up
      const msg = String(createError.message ?? '').toLowerCase();
      if (msg.includes('already') || msg.includes('registered')) {
        return new Response(
          JSON.stringify({
            error:
              'An account with this email already exists. Please sign in and ask the admin to assign you as a representative.',
          }),
          { status: 409, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      console.error('createUser error', createError);
      return new Response(JSON.stringify({ error: 'Failed to create account.' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    userId = created.user?.id ?? null;
    if (!userId) {
      return new Response(JSON.stringify({ error: 'Failed to create account.' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Ensure profile row (handle_new_user trigger may have created one)
    await admin.from('profiles').upsert(
      {
        id: userId,
        email,
        first_name: resolvedFirst,
        last_name: resolvedLast,
        approval_status: 'approved',
        approved_by: invitation.invited_by,
        approved_at: new Date().toISOString(),
      },
      { onConflict: 'id' }
    );

    // Assign company role
    await admin
      .from('user_roles')
      .upsert({ user_id: userId, role: 'company' }, { onConflict: 'user_id,role' });

    // Create verified company representative link
    await admin.from('company_representatives').insert({
      user_id: userId,
      company_id: invitation.company_id,
      company_name: invitation.company_name,
      position: invitation.rep_position,
      verified: true,
      verified_at: new Date().toISOString(),
      verified_by: invitation.invited_by,
    });

    // Mark invitation accepted
    await admin
      .from('company_invitations')
      .update({
        status: 'accepted',
        accepted_at: new Date().toISOString(),
        accepted_user_id: userId,
      })
      .eq('id', invitation.id);

    return new Response(
      JSON.stringify({ success: true, email, companyId: invitation.company_id }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('accept-company-invitation error', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
