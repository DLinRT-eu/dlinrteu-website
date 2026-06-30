import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { Resend } from 'npm:resend@4.0.0';

const ALLOWED_ORIGINS = [
  'https://dlinrt.eu',
  'https://www.dlinrt.eu',
  'http://localhost:5173',
  'http://localhost:3000',
];

function getCorsHeaders(origin: string | null): HeadersInit {
  let allowedOrigin = ALLOWED_ORIGINS[0];
  if (origin) {
    if (ALLOWED_ORIGINS.includes(origin)) {
      allowedOrigin = origin;
    } else if (/^https:\/\/[a-z0-9-]+\.lovable\.app$/.test(origin)) {
      allowedOrigin = origin;
    }
  }
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };
}

const REDIRECT_TO = 'https://dlinrt.eu/update-password';

function buildEmailHtml(resetUrl: string, recipientName: string | null) {
  const greeting = recipientName ? `Hi ${recipientName},` : 'Hello,';
  return `
  <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#1a1a2e">
    <h2 style="color:#1a1a2e;margin-top:0">Reset your DLinRT.eu password</h2>
    <p>${greeting}</p>
    <p>An administrator has initiated a password reset for your DLinRT.eu account.
       Click the button below within the next hour to choose a new password.</p>
    <p style="text-align:center;margin:28px 0">
      <a href="${resetUrl}"
         style="background:#5090D0;color:#fff;text-decoration:none;padding:12px 24px;border-radius:6px;display:inline-block;font-weight:600">
        Set a new password
      </a>
    </p>
    <p style="font-size:13px;color:#555">If the button does not work, copy and paste this link into your browser:</p>
    <p style="font-size:12px;word-break:break-all;color:#5090D0">${resetUrl}</p>
    <hr style="border:none;border-top:1px solid #eee;margin:24px 0" />
    <p style="font-size:12px;color:#888">If you did not expect this email you can safely ignore it; the link will expire shortly.</p>
    <p style="font-size:12px;color:#888">— DLinRT.eu</p>
  </div>`;
}

Deno.serve(async (req) => {
  const origin = req.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'No authorization header' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;

    const userClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const adminClient = createClient(supabaseUrl, supabaseServiceKey);

    const { data: { user: callerUser }, error: authError } = await userClient.auth.getUser();
    if (authError || !callerUser) {
      return new Response(JSON.stringify({ error: 'Authentication failed' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { data: adminRole, error: adminCheckError } = await adminClient
      .from('user_roles')
      .select('role')
      .eq('user_id', callerUser.id)
      .eq('role', 'admin')
      .maybeSingle();

    if (adminCheckError || !adminRole) {
      return new Response(JSON.stringify({ error: 'Access denied: admin role required' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const body = await req.json().catch(() => ({}));
    const { userId, email, mode } = body as {
      userId?: string;
      email?: string;
      mode?: 'email' | 'link';
    };

    if (!mode || (mode !== 'email' && mode !== 'link')) {
      return new Response(JSON.stringify({ error: "mode must be 'email' or 'link'" }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    if (!userId && !email) {
      return new Response(JSON.stringify({ error: 'userId or email is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Resolve target email + name from profiles
    let targetEmail = email?.trim().toLowerCase() || '';
    let targetName: string | null = null;
    let targetUserId = userId || '';

    if (userId) {
      const { data: profile } = await adminClient
        .from('profiles')
        .select('id, email, first_name, last_name')
        .eq('id', userId)
        .maybeSingle();
      if (profile) {
        targetEmail = profile.email || targetEmail;
        targetName = [profile.first_name, profile.last_name].filter(Boolean).join(' ') || null;
        targetUserId = profile.id;
      }
    } else if (email) {
      const { data: profile } = await adminClient
        .from('profiles')
        .select('id, email, first_name, last_name')
        .ilike('email', targetEmail)
        .maybeSingle();
      if (profile) {
        targetName = [profile.first_name, profile.last_name].filter(Boolean).join(' ') || null;
        targetUserId = profile.id;
      }
    }

    if (!targetEmail) {
      return new Response(JSON.stringify({ error: 'Could not resolve target email' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Generate a fresh recovery link
    const { data: linkData, error: linkError } = await adminClient.auth.admin.generateLink({
      type: 'recovery',
      email: targetEmail,
      options: { redirectTo: REDIRECT_TO },
    });

    if (linkError || !linkData?.properties?.action_link) {
      console.error('generateLink failed', linkError);
      return new Response(
        JSON.stringify({ error: linkError?.message || 'Failed to generate reset link' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const resetUrl = linkData.properties.action_link;

    // Audit log
    await adminClient.from('admin_audit_log').insert({
      action_type: 'admin_password_reset',
      performed_by: callerUser.id,
      performed_by_email: callerUser.email,
      target_user_id: targetUserId || null,
      target_user_email: targetEmail,
      details: { mode, generated_at: new Date().toISOString() },
    });

    if (mode === 'email') {
      const resendKey = Deno.env.get('RESEND_API_KEY');
      if (!resendKey) {
        return new Response(JSON.stringify({ error: 'Email service not configured' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      const resend = new Resend(resendKey);
      const { error: sendError } = await resend.emails.send({
        from: 'DLinRT.eu <noreply@dlinrt.eu>',
        to: [targetEmail],
        subject: 'Reset your DLinRT.eu password',
        html: buildEmailHtml(resetUrl, targetName),
      });
      if (sendError) {
        console.error('Resend error', sendError);
        return new Response(
          JSON.stringify({ error: 'Failed to send email', details: sendError.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
        );
      }
      return new Response(
        JSON.stringify({ success: true, mode, targetEmail }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    // mode === 'link'
    return new Response(
      JSON.stringify({ success: true, mode, targetEmail, resetUrl }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  } catch (err) {
    console.error('admin-reset-user-password error', err);
    return new Response(JSON.stringify({ error: 'Internal error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
