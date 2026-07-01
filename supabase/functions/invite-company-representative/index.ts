import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.108.2';
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

    // ============================================================
    // Force-register branch: create account + send Set-Password email
    // ============================================================
    if (forceRegister) {
      if (!RESEND_API_KEY) {
        return new Response(JSON.stringify({ error: 'Email service not configured' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const resolvedFirst = (firstName ?? '').trim();
      const resolvedLast = (lastName ?? '').trim();

      // Look up or create the auth user
      let userId: string | null = null;
      let userAlreadyExisted = false;

      const { data: created, error: createError } = await supabaseAdmin.auth.admin.createUser({
        email: normalizedEmail,
        email_confirm: true,
        user_metadata: {
          first_name: resolvedFirst,
          last_name: resolvedLast,
          invited_company_id: companyId,
          invited_company_name: companyName,
          force_invited: true,
        },
      });

      if (createError) {
        const msg = String(createError.message ?? '').toLowerCase();
        if (msg.includes('already') || msg.includes('registered') || msg.includes('exists')) {
          // Fetch the existing user via listUsers (no admin.getUserByEmail in this SDK)
          const { data: list } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 200 });
          const match = list?.users?.find((u: { email?: string }) => (u.email ?? '').toLowerCase() === normalizedEmail);
          if (match) {
            userId = match.id;
            userAlreadyExisted = true;
          } else {
            console.error('createUser said exists but listUsers returned no match', createError);
            return new Response(JSON.stringify({ error: `Account already exists but could not be located: ${createError.message}` }), {
              status: 500,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
          }
        } else {
          console.error('forceRegister createUser error', createError);
          return new Response(JSON.stringify({ error: `Failed to create account: ${createError.message}` }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
      } else {
        userId = created.user?.id ?? null;
      }

      if (!userId) {
        return new Response(JSON.stringify({ error: 'Failed to create account.' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Ensure profile row (handle_new_user trigger may have created one)
      const { error: profileErr } = await supabaseAdmin.from('profiles').upsert(
        {
          id: userId,
          email: normalizedEmail,
          first_name: resolvedFirst || null,
          last_name: resolvedLast || null,
          approval_status: 'approved',
          approved_by: user.id,
          approved_at: new Date().toISOString(),
        },
        { onConflict: 'id' }
      );
      if (profileErr) console.error('profiles upsert error', profileErr);

      // Assign company role
      const { error: roleErr } = await supabaseAdmin
        .from('user_roles')
        .upsert({ user_id: userId, role: 'company' }, { onConflict: 'user_id,role' });
      if (roleErr) console.error('user_roles upsert error', roleErr);

      // Create verified company representative link (idempotent by user+company)
      const { data: existingRepRow } = await supabaseAdmin
        .from('company_representatives')
        .select('id')
        .eq('user_id', userId)
        .eq('company_id', companyId)
        .maybeSingle();

      if (!existingRepRow) {
        const { error: repError } = await supabaseAdmin.from('company_representatives').insert({
          user_id: userId,
          company_id: companyId,
          company_name: companyName,
          position: position ?? null,
          verified: true,
          verified_at: new Date().toISOString(),
          verified_by: user.id,
        });
        if (repError) {
          console.error('Failed to create company_representatives row', repError);
        }
      }

      // Record an accepted invitation row for audit purposes
      const forceToken = crypto.randomUUID();
      const { data: forceInvitation, error: forceInvErr } = await supabaseAdmin
        .from('company_invitations')
        .insert({
          email: normalizedEmail,
          token: forceToken,
          company_id: companyId,
          company_name: companyName,
          first_name: firstName ?? null,
          last_name: lastName ?? null,
          rep_position: position ?? null,
          message: message ?? null,
          invited_by: user.id,
          status: 'accepted',
          accepted_at: new Date().toISOString(),
          accepted_user_id: userId,
        })
        .select('id')
        .single();
      if (forceInvErr) console.error('company_invitations insert (force) error', forceInvErr);

      // Generate a Set-Password (recovery) link
      const redirectTo = `${SITE_URL}/update-password`;
      const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
        type: 'recovery',
        email: normalizedEmail,
        options: { redirectTo },
      });

      if (linkError || !linkData?.properties?.action_link) {
        console.error('generateLink error', linkError);
        return new Response(JSON.stringify({ error: 'Failed to generate password-setup link.' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const setPasswordUrl = linkData.properties.action_link;
      const safeFirstName = firstName ? escapeHtml(firstName) : '';
      const safeCompany = escapeHtml(companyName);
      const safeInviter = escapeHtml(user.email ?? 'A DLinRT.eu admin');

      const bodyHtml = message && message.trim().length > 0
        ? `<div style="white-space:pre-wrap;font-size:15px;color:#1a1a2e;line-height:1.6;">${escapeHtml(message)}</div>`
        : `<p>Hello${safeFirstName ? ` ${safeFirstName}` : ''},</p>
           <p>${safeInviter} has created a DLinRT.eu representative account for you on behalf of <strong>${safeCompany}</strong>. You are now registered and linked to this company.</p>
           <p>To activate your account, set your password using the button below.</p>`;

      const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;line-height:1.6;color:#1a1a2e;max-width:600px;margin:0 auto;padding:20px;background:#ffffff;">
  <div style="background:#5090D0;padding:24px;border-radius:8px 8px 0 0;text-align:center;">
    <h1 style="color:#ffffff;margin:0;font-size:24px;">DLinRT.eu</h1>
    <p style="color:#e6f0fa;margin:6px 0 0;font-size:14px;">Deep Learning in Radiotherapy</p>
  </div>
  <div style="background:#ffffff;padding:28px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;">
    <h2 style="color:#1a1a2e;margin-top:0;">Welcome to DLinRT.eu — set your password</h2>
    ${bodyHtml}
    <div style="margin:28px 0;text-align:center;">
      <a href="${setPasswordUrl}" style="display:inline-block;background:#5090D0;color:#ffffff;padding:14px 28px;text-decoration:none;border-radius:6px;font-weight:600;">Set your password</a>
    </div>
    <p style="color:#6b7280;font-size:14px;">Or paste this link into your browser:<br><span style="word-break:break-all;">${setPasswordUrl}</span></p>
    <div style="background:#fef3c7;border:1px solid #fbbf24;border-radius:6px;padding:12px;margin:18px 0;">
      <p style="margin:0;color:#92400e;font-size:14px;">⏱ This password-setup link expires after a limited time (Supabase recovery link). If it expires, you can request a new one from the sign-in page.</p>
    </div>
    <p style="color:#6b7280;font-size:13px;margin-top:24px;">If you weren't expecting this, please contact a DLinRT.eu administrator.</p>
  </div>
</body></html>`;

      const resend = new Resend(RESEND_API_KEY);
      const { error: sendError } = await resend.emails.send({
        from: 'DLinRT.eu <noreply@dlinrt.eu>',
        to: [normalizedEmail],
        subject: `Set your password for DLinRT.eu (${companyName} representative)`,
        html,
      });

      if (sendError) {
        console.error('Resend error (forceRegister)', sendError);
        return new Response(JSON.stringify({ error: 'Account created, but failed to send password-setup email.' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response(
        JSON.stringify({
          success: true,
          forceRegistered: true,
          userAlreadyExisted,
          userId,
          invitationId: forceInvitation?.id ?? null,
          setPasswordUrl,
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }



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
         <p>As a representative you will be able to certify product information, submit revisions, and manage your company's catalog listings.</p>`;

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
