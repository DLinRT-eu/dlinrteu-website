import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
// Resend shim — calls the HTTP API directly to avoid npm package resolution issues in Deno edge runtime
function createResend(apiKey: string | undefined) {
  return {
    emails: {
      async send(payload: Record<string, unknown>) {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey ?? ""}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        const text = await res.text();
        let data: any = null;
        try { data = text ? JSON.parse(text) : null; } catch { data = { raw: text }; }
        if (!res.ok) {
          const errMsg = (data && (data.message || data.error)) || `Resend HTTP ${res.status}`;
          throw new Error(typeof errMsg === "string" ? errMsg : JSON.stringify(errMsg));
        }
        return { data, error: null };
      },
    },
  };
}

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const resend = createResend(Deno.env.get("RESEND_API_KEY"));

const ALLOWED_ORIGINS = [
  "https://dlinrt.eu",
  "https://www.dlinrt.eu",
  "http://localhost:5173",
  "http://localhost:3000"
];

function getCorsHeaders(origin: string | null): HeadersInit {
  const isAllowed = origin && (ALLOWED_ORIGINS.includes(origin) || origin.endsWith('.lovable.app'));
  return {
    "Access-Control-Allow-Origin": isAllowed ? origin : ALLOWED_ORIGINS[0],
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };
}

const SITE_URL = "https://dlinrt.eu";
const INFO_EMAIL = "info@dlinrt.eu";

const DEFAULT_SUBJECT = "Action Required: Certify Your Product Information on DLinRT.eu – {CompanyName}";
const DEFAULT_BODY = `We are reaching out regarding the DLinRT.eu Company Certification Program for {CompanyName}.

The certification portal is now open and we kindly invite you to review your company's product information and certify that everything is accurate and up to date.

Your participation helps maintain the quality and reliability of our platform for the entire radiotherapy community.`;

function escapeHtml(s: unknown): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function bodyToHtml(plainText: string): string {
  return plainText
    .split(/\n\n+/)
    .map((para) => `<p style="font-size: 15px; color: #374151; margin: 0 0 16px;">${escapeHtml(para.trim()).replace(/\n/g, "<br/>")}</p>`)
    .join("\n");
}

function buildHtml(bodyHtml: string, firstName: string, lastName: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Product Certification Program – DLinRT.eu</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #16a34a, #15803d); padding: 32px 30px; border-radius: 10px 10px 0 0; text-align: center;">
          <div style="font-size: 36px; margin-bottom: 8px;">🏆</div>
          <h1 style="color: white; margin: 0; font-size: 22px; font-weight: 700;">Product Certification Program</h1>
          <p style="color: #bbf7d0; margin: 8px 0 0; font-size: 14px;">We Need Your Input</p>
        </div>
        <div style="background: #f9fafb; padding: 32px 30px; border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb; border-top: none;">
          <p style="font-size: 16px; margin-top: 0; color: #111827;">Dear <strong>${escapeHtml(firstName)} ${escapeHtml(lastName)}</strong>,</p>
          ${bodyHtml}
          <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 20px 24px; margin: 24px 0;">
            <p style="font-weight: 600; color: #15803d; margin: 0 0 12px; font-size: 15px;">We kindly ask you to:</p>
            <ul style="margin: 0; padding-left: 0; list-style: none;">
              <li style="padding: 6px 0; color: #374151; font-size: 14px;"><span style="color: #16a34a; font-weight: bold; margin-right: 8px;">✓</span>Review your company's product listings for accuracy</li>
              <li style="padding: 6px 0; color: #374151; font-size: 14px;"><span style="color: #16a34a; font-weight: bold; margin-right: 8px;">✓</span>Report anything that may be missing or incorrect</li>
              <li style="padding: 6px 0; color: #374151; font-size: 14px;"><span style="color: #16a34a; font-weight: bold; margin-right: 8px;">✓</span>Certify your current product information when ready</li>
            </ul>
          </div>
          <div style="text-align: center; margin: 32px 0;">
            <a href="${SITE_URL}/company/overview" style="display: inline-block; background: linear-gradient(135deg, #16a34a, #15803d); color: white; padding: 14px 36px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">Go to Company Overview →</a>
          </div>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
            <p style="margin: 0 0 6px;"><strong>Questions?</strong> Reply to this email or contact us at <a href="mailto:${INFO_EMAIL}" style="color: #16a34a;">${INFO_EMAIL}</a>.</p>
            <p style="margin: 0; color: #9ca3af; font-size: 13px;">— The DLinRT.eu Team</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

const handler = async (req: Request): Promise<Response> => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Verify admin authorization
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return new Response(
      JSON.stringify({ success: false, error: "Unauthorized" }),
      { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

  const userClient = createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: authHeader } },
  });

  const token = authHeader.replace("Bearer ", "");
  const { data: userData, error: userError } = await userClient.auth.getUser(token);

  if (userError || !userData?.user) {
    return new Response(
      JSON.stringify({ success: false, error: "Unauthorized" }),
      { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }

  const adminClient = createClient(supabaseUrl, serviceRoleKey);

  const { data: roles } = await adminClient
    .from("user_roles")
    .select("role")
    .eq("user_id", userData.user.id)
    .eq("role", "admin");

  if (!roles || roles.length === 0) {
    return new Response(
      JSON.stringify({ success: false, error: "Admin access required" }),
      { status: 403, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }

  let customSubject: string | undefined;
  let customBody: string | undefined;
  try {
    const body = await req.json();
    customSubject = body?.customSubject || undefined;
    customBody = body?.customBody || undefined;
  } catch {
    // no body or invalid JSON
  }

  try {
    console.log("Starting certification reminder email process...");

    const { data: reps, error: repsError } = await adminClient
      .from("company_representatives")
      .select(`id, company_name, company_id, position, user_id, profiles!inner (first_name, last_name, email)`)
      .eq("verified", true)
      .neq("company_id", "admin_all_companies");

    if (repsError) throw new Error(`Failed to fetch representatives: ${repsError.message}`);

    if (!reps || reps.length === 0) {
      return new Response(
        JSON.stringify({ success: true, message: "No verified representatives found", emailsSent: 0, companiesContacted: 0, recipients: [] }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const userIds = reps.map((r: any) => r.user_id);
    const { data: adminRoles } = await adminClient.from("user_roles").select("user_id").in("user_id", userIds).eq("role", "admin");
    const adminUserIds = new Set((adminRoles || []).map((r: any) => r.user_id));
    const targetReps = reps.filter((rep: any) => !adminUserIds.has(rep.user_id));

    console.log(`Found ${targetReps.length} eligible representatives`);

    if (targetReps.length === 0) {
      return new Response(
        JSON.stringify({ success: true, message: "No eligible representatives found", emailsSent: 0, companiesContacted: 0, recipients: [] }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const companiesContacted = new Set<string>();
    const recipientsList: { email: string; name: string; company: string }[] = [];
    let emailsSent = 0;
    let emailsFailed = 0;

    const bodyTemplate = customBody || DEFAULT_BODY;

    for (const rep of targetReps as any[]) {
      const profile = rep.profiles;
      const firstName = profile?.first_name || "Representative";
      const lastName = profile?.last_name || "";
      const email = profile?.email;
      const companyName = rep.company_name;

      if (!email) continue;

      const personalizedBody = bodyTemplate.replace(/\{FirstName\}/g, firstName).replace(/\{CompanyName\}/g, companyName);
      const subjectTemplate = customSubject || DEFAULT_SUBJECT;
      const personalizedSubject = subjectTemplate.replace(/\{CompanyName\}/g, companyName);
      const htmlContent = buildHtml(bodyToHtml(personalizedBody), firstName, lastName);

      try {
        const emailResponse = await resend.emails.send({
          from: "DLinRT.eu <noreply@dlinrt.eu>",
          to: [email],
          cc: [INFO_EMAIL],
          subject: personalizedSubject,
          html: htmlContent,
        });

        console.log(`Email sent to ${email} (${companyName}):`, emailResponse);
        emailsSent++;
        companiesContacted.add(companyName);
        recipientsList.push({ email, name: `${firstName} ${lastName}`.trim(), company: companyName });
      } catch (emailError: any) {
        console.error(`Failed to send email to ${email}:`, emailError);
        emailsFailed++;
      }
    }

    const companiesArray = Array.from(companiesContacted);
    await adminClient.from("certification_reminder_logs").insert({
      sent_by: userData.user.id,
      subject: customSubject || DEFAULT_SUBJECT,
      message_body: bodyTemplate,
      recipients: recipientsList,
      emails_sent: emailsSent,
      emails_failed: emailsFailed,
      companies: companiesArray,
    });

    return new Response(JSON.stringify({
      success: true,
      message: "Certification reminder emails sent",
      emailsSent, emailsFailed,
      companiesContacted: companiesContacted.size,
      companiesList: companiesArray,
      recipients: recipientsList,
    }), { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } });
  } catch (error: any) {
    console.error("Error in send-certification-reminder function:", error);
    return new Response(
      JSON.stringify({ success: false, error: 'Internal server error' }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
