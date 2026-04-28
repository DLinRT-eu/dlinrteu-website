import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const ALLOWED_ORIGINS = [
  "https://dlinrt.eu",
  "https://www.dlinrt.eu",
  "http://localhost:5173",
  "http://localhost:3000",
];

function getCorsHeaders(origin: string | null): HeadersInit {
  const isAllowed = origin && (ALLOWED_ORIGINS.includes(origin) || origin.endsWith(".lovable.app"));
  return {
    "Access-Control-Allow-Origin": isAllowed ? origin : ALLOWED_ORIGINS[0],
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}

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

const resend = createResend(Deno.env.get("RESEND_API_KEY"));

// Common free email providers to flag (institutional emails are preferred but all are allowed)
const NON_INSTITUTIONAL_EMAIL_DOMAINS = [
  "gmail.com", "yahoo.com", "hotmail.com", "outlook.com", 
  "live.com", "msn.com", "aol.com", "icloud.com", 
  "protonmail.com", "mail.com", "zoho.com", "yandex.com",
  "gmx.com", "inbox.com", "fastmail.com", "hushmail.com"
];

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function isInstitutionalEmail(email: string): boolean {
  const domain = email.toLowerCase().split('@')[1];
  if (!domain) return false;
  
  // Flag common free email providers as non-institutional
  if (NON_INSTITUTIONAL_EMAIL_DOMAINS.includes(domain)) {
    return false;
  }
  
  // Additional checks for institutional emails
  // Institutional emails typically have domains ending in .edu, .gov, .ac.*, .org, or company domains
  const institutionalPatterns = [
    /\.edu$/,           // Educational institutions
    /\.gov$/,           // Government
    /\.ac\.[a-z]{2}$/,  // Academic institutions (e.g., .ac.uk, .ac.jp)
    /\.org$/,           // Organizations
    /\.(com|net|eu|co\.[a-z]{2})$/ // Company domains (allow but will be manually verified)
  ];
  
  return institutionalPatterns.some(pattern => pattern.test(domain));
}

interface UserRegistrationData {
  userId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  createdAt: string;
}

const handler = async (req: Request): Promise<Response> => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  let parsedUserId: string | null = null;

  try {
    // Verify the request bearer matches one of the project's known keys.
    // Accept: new-style service role / publishable keys from env, plus the
    // legacy JWT-format anon key embedded in cron jobs across this project.
    const authHeader = req.headers.get("authorization");
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
    const publishableKey = Deno.env.get("SUPABASE_PUBLISHABLE_KEY");
    const LEGACY_ANON_JWT =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zeWZ4eXh6anlvd3dhc2d0dXJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgxOTgxNzgsImV4cCI6MjA2Mzc3NDE3OH0.3a-Q2TUNuB0vbWUoC0Q_Tg_HUAWZ1nH4UhSs95uz1o8";
    const validBearers = [serviceRoleKey, anonKey, publishableKey, LEGACY_ANON_JWT]
      .filter(Boolean)
      .map((k) => `Bearer ${k}`);

    if (!authHeader || !validBearers.includes(authHeader)) {
      console.error("Unauthorized request to notify-user-registration");
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const { userId, email, firstName, lastName, createdAt }: UserRegistrationData = await req.json();
    parsedUserId = userId;

    // Check if email is institutional (but don't block non-institutional)
    const isInstitutional = isInstitutionalEmail(email);
    if (!isInstitutional) {
      console.warn(`Non-institutional email registration detected: ${email}`);
      // Log but don't block - admin will review
    }

    // Prepare user display name
    const userName = firstName && lastName 
      ? `${escapeHtml(firstName)} ${escapeHtml(lastName)}` 
      : "Not provided";
    
    const emailDomain = email.split('@')[1];
    const emailWarning = !isInstitutional 
      ? '<div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 12px; border-radius: 4px; margin-bottom: 20px;"><p style="margin: 0; color: #92400e;"><strong>⚠️ Note:</strong> This user registered with a non-institutional email address and may require additional verification.</p></div>'
      : '';

    // Send notification email to admin
    const emailResponse = await resend.emails.send({
      from: "DLinRT.eu User Registration <noreply@dlinrt.eu>",
      to: ["info@dlinrt.eu"],
      subject: `🔔 New User Registration - Verification Required${!isInstitutional ? ' (Non-Institutional Email)' : ''}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">🔔 New User Registration</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Action Required: User Verification</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none;">
            ${emailWarning}
            
            <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; border-radius: 4px; margin-bottom: 25px;">
              <p style="margin: 0; color: #92400e; font-weight: 600;">
                ⚠️ This user requires manual verification before their account can be fully activated.
              </p>
            </div>

            <h2 style="color: #1f2937; margin-top: 0; font-size: 18px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
              User Information
            </h2>
            
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-weight: 600; width: 140px;">Name:</td>
                  <td style="padding: 8px 0; color: #1f2937;">${userName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Email:</td>
                  <td style="padding: 8px 0; color: #1f2937;">${escapeHtml(email)}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Domain:</td>
                  <td style="padding: 8px 0; color: #1f2937;">${escapeHtml(emailDomain)}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">User ID:</td>
                  <td style="padding: 8px 0; color: #4b5563; font-family: monospace; font-size: 12px;">${escapeHtml(userId)}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Registered:</td>
                  <td style="padding: 8px 0; color: #1f2937;">${new Date(createdAt).toLocaleString('en-US', { 
                    dateStyle: 'full', 
                    timeStyle: 'long',
                    timeZone: 'Europe/Brussels'
                  })}</td>
                </tr>
              </table>
            </div>

            <h2 style="color: #1f2937; font-size: 18px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
              Verification Steps
            </h2>
            
            <ol style="color: #4b5563; line-height: 1.8; padding-left: 20px;">
              <li style="margin-bottom: 10px;">
                <strong>Verify Email Domain:</strong> Confirm that <code style="background-color: #f3f4f6; padding: 2px 6px; border-radius: 3px;">${escapeHtml(emailDomain)}</code> belongs to a legitimate institution
              </li>
              <li style="margin-bottom: 10px;">
                <strong>Check User Identity:</strong> Verify the user's identity and affiliation with their institution
              </li>
              <li style="margin-bottom: 10px;">
                <strong>Validate Email:</strong> Ensure the user has verified their email address (check Supabase Auth dashboard)
              </li>
              <li style="margin-bottom: 10px;">
                <strong>Approve or Reject:</strong> Log into the DLinRT.eu admin dashboard to approve or reject this user
              </li>
            </ol>

            <div style="background-color: #eff6ff; border-left: 4px solid #2563eb; padding: 15px; border-radius: 4px; margin: 25px 0;">
              <p style="margin: 0; color: #1e40af; font-size: 14px;">
                <strong>🔒 Security Note:</strong> Institutional email addresses are strongly preferred. Non-institutional emails (Gmail, Yahoo, etc.) are allowed but require additional verification.
              </p>
            </div>

            <div style="margin-top: 30px; text-align: center;">
              <a href="https://dlinrt.eu/admin/users" 
                 style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: 600;">
                Open Admin Dashboard
              </a>
            </div>
          </div>
          
          <div style="background-color: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 12px; border-radius: 0 0 8px 8px;">
            <p style="margin: 0;">This is an automated notification from DLinRT.eu User Registration System</p>
            <p style="margin: 5px 0 0 0;">If you have questions, please contact the technical team</p>
          </div>
        </div>
      `,
    });

    console.log(`User registration notification sent successfully for user ${userId}, email ID: ${emailResponse.data?.id}`);

    // Write back to user_registration_notifications so the table reflects actual send status
    try {
      const admin = createClient(supabaseUrl, serviceRoleKey!);
      await admin
        .from("user_registration_notifications")
        .update({ notification_sent_at: new Date().toISOString(), failure_reason: null })
        .eq("user_id", userId);
    } catch (writeErr) {
      console.error("Failed to update user_registration_notifications:", writeErr);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Registration notification sent",
        emailId: emailResponse.data?.id,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in notify-user-registration function:", error.message);

    // Best-effort write of failure_reason
    if (parsedUserId && serviceRoleKey) {
      try {
        const admin = createClient(supabaseUrl, serviceRoleKey);
        await admin
          .from("user_registration_notifications")
          .update({ failure_reason: String(error?.message ?? error).slice(0, 500) })
          .eq("user_id", parsedUserId);
      } catch (_) {
        // swallow
      }
    }

    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
