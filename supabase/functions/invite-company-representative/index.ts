import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';
import { Resend } from 'npm:resend@4.0.0';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const SITE_URL = Deno.env.get('SITE_URL') || 'https://dlinrt.eu';

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

const escapeHtml = (s: unknown) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

interface InvitePayload {
  email: string;
  companyId: string;
  companyName: string;
  firstName?: string;
  lastName?: string;
  position?: string;
  message?: string;
  forceRegister?: boolean;
}

serve(async (req) => {
  const origin = req.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { data: roles } = await supabaseAdmin
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id);
    const isAdmin = roles?.some((r: { role: string }) => r.role === 'admin');
    if (!isAdmin) {
      return new Response(JSON.stringify({ error: 'Requires admin role' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const payload: InvitePayload = await req.json();
    const {
      email,
      companyId,
      companyName,
      firstName,
      lastName,
      position,
      message,
      forceRegister,
    } = payload;

    if (!email || !companyId || !companyName) {
      return new Response(
        JSON.stringify({ error: 'email, companyId and companyName are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Already a verified rep of this company?
    const { data: existingRep } = await supabaseAdmin
      .from('company_representatives')
      .select('id')
      .eq('company_id', companyId)
      .ilike('company_name', companyName);
    // (best-effort) not blocking on existing reps; admins may still re-invite.

    // Reuse an active pending invitation for the same email+company if present
    const { data: existing } = await supabaseAdmin
      .from('company_invitations')
      .select('*')
      .eq('email', normalizedEmail)
      .eq('company_id', companyId)
      .eq('status', 'pending')
      .maybeSingle();

    let invitationToken: string;
    let invitationId: string;

    if (existing && new Date(existing.expires_at) > new Date()) {
      invitationToken = existing.token;
      invitationId = existing.id;
      await supabaseAdmin
        .from('company_invitations')
        .update({
          first_name: firstName ?? existing.first_name,
          last_name: lastName ?? existing.last_name,
          rep_position: position ?? existing.rep_position,
          message: message ?? existing.message,
          invited_by: user.id,
        })
        .eq('id', existing.id);
    } else {
      invitationToken = crypto.randomUUID();
      const { data: created, error: insertError } = await supabaseAdmin
        .from('company_invitations')
        .insert({
          email: normalizedEmail,
          token: invitationToken,
          company_id: companyId,
          company_name: companyName,
          first_name: firstName ?? null,
          last_name: lastName ?? null,
          rep_position: position ?? null,
          message: message ?? null,
          invited_by: user.id,
          status: 'pending',
        })
        .select()
        .single();

      if (insertError || !created) {
        console.error('Failed to create invitation', insertError);
        return new Response(JSON.stringify({ error: 'Failed to create invitation' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      invitationId = created.id;
    }

    if (!RESEND_API_KEY) {
      return new Response(JSON.stringify({ error: 'Email service not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const acceptUrl = `${SITE_URL}/accept-company-invite?token=${encodeURIComponent(invitationToken)}`;
    const safeFirstName = firstName ? escapeHtml(firstName) : '';
    const safeCompany = escapeHtml(companyName);
    const safeInviter = escapeHtml(user.email ?? 'A DLinRT.eu admin');

    // Render the admin-authored message as the email body, preserving line breaks.
    // Fall back to the original boilerplate when no custom message was provided.
    const bodyHtml = message && message.trim().length > 0
      ? `<div style="white-space:pre-wrap;font-size:15px;color:#1a1a2e;line-height:1.6;">${escapeHtml(message)}</div>`
      : `<p>Hello${safeFirstName ? ` ${safeFirstName}` : ''},</p>
         <p>${safeInviter} has invited you to join <strong>DLinRT.eu</strong> as the official company representative for <strong>${safeCompany}</strong>.</p>
         <p>As a representative you will be able to certify product information, submit revisions, and manage your company's catalogue listings.</p>`;

    const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;line-height:1.6;color:#1a1a2e;max-width:600px;margin:0 auto;padding:20px;background:#ffffff;">
  <div style="background:#5090D0;padding:24px;border-radius:8px 8px 0 0;text-align:center;">
    <h1 style="color:#ffffff;margin:0;font-size:24px;">DLinRT.eu</h1>
    <p style="color:#e6f0fa;margin:6px 0 0;font-size:14px;">Deep Learning in Radiotherapy</p>
  </div>
  <div style="background:#ffffff;padding:28px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;">
    <h2 style="color:#1a1a2e;margin-top:0;">You're invited to manage ${safeCompany}</h2>
    ${bodyHtml}
    <div style="margin:28px 0;text-align:center;">
      <a href="${acceptUrl}" style="display:inline-block;background:#5090D0;color:#ffffff;padding:14px 28px;text-decoration:none;border-radius:6px;font-weight:600;">Accept invitation &amp; set password</a>
    </div>
    <p style="color:#6b7280;font-size:14px;">Or paste this link: <br><span style="word-break:break-all;">${acceptUrl}</span></p>
    <div style="background:#fef3c7;border:1px solid #fbbf24;border-radius:6px;padding:12px;margin:18px 0;">
      <p style="margin:0;color:#92400e;font-size:14px;">⏱ This invitation expires in 14 days.</p>
    </div>
    <p style="color:#6b7280;font-size:13px;margin-top:24px;">If you weren't expecting this, you can safely ignore this email.</p>
  </div>
</body></html>`;

    const resend = new Resend(RESEND_API_KEY);
    const { error: sendError } = await resend.emails.send({
      from: 'DLinRT.eu <noreply@dlinrt.eu>',
      to: [normalizedEmail],
      subject: `You're invited to manage ${companyName} on DLinRT.eu`,
      html,
    });

    if (sendError) {
      console.error('Resend error', sendError);
      return new Response(JSON.stringify({ error: 'Failed to send invitation email' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(
      JSON.stringify({ success: true, invitationId, acceptUrl }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('invite-company-representative error', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
