import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const SITE_URL = Deno.env.get('SITE_URL') || 'https://dlinrt.eu';

interface InvitationRequest {
  email: string;
  firstName?: string;
  lastName?: string;
  institution?: string;
  expertisePreferences?: Array<{ category: string; priority: number }>;
  message?: string;
}

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
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'No authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);
    
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { data: roles } = await supabaseAdmin.from('user_roles').select('role').eq('user_id', user.id);
    const isAdmin = roles?.some(r => r.role === 'admin');
    if (!isAdmin) {
      return new Response(
        JSON.stringify({ error: 'Requires admin role' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { email, firstName, lastName, institution, expertisePreferences, message }: InvitationRequest = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { data: existingUser } = await supabaseAdmin.from('profiles').select('id, email').eq('email', email).single();
    if (existingUser) {
      return new Response(
        JSON.stringify({ error: 'User already registered', userId: existingUser.id }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { data: existingInvitation } = await supabaseAdmin.from('reviewer_invitations').select('*').eq('email', email).eq('status', 'pending').single();

    let invitationToken: string;
    let invitationId: string;

    if (existingInvitation && new Date(existingInvitation.expires_at) > new Date()) {
      invitationToken = existingInvitation.token;
      invitationId = existingInvitation.id;
    } else {
      invitationToken = crypto.randomUUID();
      const { data: newInvitation, error: invitationError } = await supabaseAdmin
        .from('reviewer_invitations')
        .insert({ email, token: invitationToken, invited_by: user.id, expertise_preferences: expertisePreferences || [], status: 'pending' })
        .select().single();

      if (invitationError) {
        return new Response(
          JSON.stringify({ error: 'Failed to create invitation' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      invitationId = newInvitation.id;
    }

    const registrationUrl = `${SITE_URL}/auth?invitation=${invitationToken}`;

    if (!RESEND_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'Email service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const expertiseList = expertisePreferences && expertisePreferences.length > 0
      ? `<h3 style="color: #1e3a8a; margin: 20px 0 10px;">Your Expertise Areas</h3>
         <ul style="padding-left: 20px;">
           ${expertisePreferences.sort((a, b) => a.priority - b.priority).map(exp => `
             <li style="margin: 5px 0;"><strong>${String(exp.category ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;").split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</strong>${exp.priority <= 3 ? ' (Primary)' : exp.priority <= 6 ? ' (Secondary)' : ''}</li>
           `).join('')}
         </ul>` : '';

    const escapeHtml = (s: unknown) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    const safeFirstName = firstName ? escapeHtml(firstName) : '';
    const safeMessage = message ? escapeHtml(message) : '';
    const safeInstitution = institution ? escapeHtml(institution) : '';
    const safeUserEmail = escapeHtml(user.email);

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">DLinRT.eu</h1>
          <p style="color: rgba(255, 255, 255, 0.9); margin: 10px 0 0; font-size: 16px;">Deep Learning in Radiotherapy</p>
        </div>
        <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
          <h2 style="color: #1e3a8a; margin-top: 0;">You're Invited to Join as a Reviewer</h2>
          <p>Hello${safeFirstName ? ` ${safeFirstName}` : ''},</p>
          <p>You have been invited to join <strong>DLinRT.eu</strong> as a product reviewer.</p>
          ${safeMessage ? `<div style="background: #f3f4f6; border-left: 4px solid #667eea; padding: 15px; margin: 20px 0;"><p style="margin: 0; font-style: italic;">${safeMessage}</p></div>` : ''}
          ${expertiseList}
          ${safeInstitution ? `<p style="margin: 20px 0;"><strong>Institution:</strong> ${safeInstitution}</p>` : ''}
          <div style="margin: 30px 0; text-align: center;">
            <a href="${registrationUrl}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">Accept Invitation & Register</a>
          </div>
          <div style="background: #fef3c7; border: 1px solid #fbbf24; border-radius: 6px; padding: 15px; margin: 20px 0;">
            <p style="margin: 0; color: #92400e;"><strong>⏱️ This invitation expires in 7 days.</strong></p>
          </div>
          <p style="margin-top: 30px; color: #6b7280; font-size: 14px;">Questions? Contact <a href="mailto:info@dlinrt.eu" style="color: #667eea;">info@dlinrt.eu</a></p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">This invitation was sent by ${safeUserEmail}.</p>
        </div>
      </body>
      </html>
    `;

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${RESEND_API_KEY}` },
      body: JSON.stringify({
        from: 'DLinRT.eu <noreply@dlinrt.eu>',
        to: [email],
        subject: `You're invited to join DLinRT.eu as a Reviewer`,
        html: emailHtml,
      }),
    });

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      console.error('Resend API error:', errorText);
      return new Response(
        JSON.stringify({ error: 'Failed to send invitation email' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const emailData = await emailResponse.json();

    return new Response(
      JSON.stringify({ success: true, invitationId, email, registrationUrl, emailId: emailData.id }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in invite-reviewer function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
