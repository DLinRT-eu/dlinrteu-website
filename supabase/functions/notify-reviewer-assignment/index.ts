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

interface NotificationRequest {
  reviewerId: string;
  roundName: string;
  assignmentCount: number;
  deadline?: string;
  productNames: string[];
}

function escapeHtml(unsafe: unknown): string {
  return String(unsafe ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const handler = async (req: Request): Promise<Response> => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

    // Authenticate: service role OR admin user JWT
    const authHeader = req.headers.get("Authorization");
    const expectedServiceBearer = `Bearer ${supabaseKey}`;
    const isServiceRole = !!authHeader && authHeader === expectedServiceBearer;

    if (!isServiceRole) {
      if (!authHeader?.startsWith("Bearer ")) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
      const userClient = createClient(supabaseUrl, supabaseAnonKey, {
        global: { headers: { Authorization: authHeader } },
      });
      const token = authHeader.replace("Bearer ", "");
      const { data: userData, error: userError } = await userClient.auth.getUser(token);
      if (userError || !userData?.user) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
      const adminClient = createClient(supabaseUrl, supabaseKey);
      const { data: roles } = await adminClient
        .from("user_roles")
        .select("role")
        .eq("user_id", userData.user.id)
        .eq("role", "admin");
      if (!roles || roles.length === 0) {
        return new Response(JSON.stringify({ error: "Admin access required" }), {
          status: 403,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
    }

    const { reviewerId, roundName, assignmentCount, deadline, productNames }: NotificationRequest = await req.json();

    if (typeof reviewerId !== "string" || !UUID_RE.test(reviewerId)) {
      return new Response(JSON.stringify({ error: "Invalid reviewerId" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    console.log("Processing notification for reviewer:", reviewerId);

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get reviewer details including notification preferences
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("email, first_name, last_name, notification_preferences")
      .eq("id", reviewerId)
      .single();

    if (profileError || !profile) {
      console.error("Error fetching reviewer profile:", profileError);
      throw new Error("Reviewer not found");
    }

    // Check notification preferences (review_assignments category)
    const prefs = (profile.notification_preferences as any) || {};
    const categoryPrefs = prefs?.categories?.review_assignments;
    if (categoryPrefs?.email === false) {
      console.log(`Reviewer ${reviewerId} has disabled email for review_assignments, skipping`);
      return new Response(JSON.stringify({ 
        success: true, 
        skipped: true,
        reason: 'User has disabled email notifications for review assignments'
      }), { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } });
    }

    console.log("Sending email to:", profile.email);

    const dashboardUrl = `${supabaseUrl.replace('.supabase.co', '')}/review`;

    const deadlineText = deadline 
      ? new Date(deadline).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })
      : "No deadline set";

    const displayProducts = productNames.slice(0, 5);
    const hasMore = productNames.length > 5;

    const emailResponse = await resend.emails.send({
      from: "DLinRT.eu Review System <noreply@dlinrt.eu>",
      to: [profile.email],
      subject: `New Review Assignment: ${roundName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Review Assignment</title>
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px;">New Review Assignment</h1>
            </div>
            
            <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb; border-top: none;">
              <p style="font-size: 16px; margin-top: 0;">
                Hello ${profile.first_name} ${profile.last_name},
              </p>
              
              <p style="font-size: 16px;">
                You have been assigned <strong style="color: #667eea;">${assignmentCount} product${assignmentCount !== 1 ? 's' : ''}</strong> 
                to review as part of <strong>${roundName}</strong>.
              </p>

              <div style="background: white; padding: 20px; border-radius: 8px; margin: 25px 0; border: 2px solid #667eea;">
                <h2 style="margin-top: 0; color: #667eea; font-size: 18px;">Assignment Details</h2>
                
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Round:</td>
                    <td style="padding: 8px 0; text-align: right; font-weight: 600;">${roundName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Products:</td>
                    <td style="padding: 8px 0; text-align: right; font-weight: 600;">${assignmentCount}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Deadline:</td>
                    <td style="padding: 8px 0; text-align: right; font-weight: 600; ${!deadline ? 'color: #9ca3af;' : ''}">${deadlineText}</td>
                  </tr>
                </table>
              </div>

              ${displayProducts.length > 0 ? `
              <div style="background: white; padding: 20px; border-radius: 8px; margin: 25px 0; border: 1px solid #e5e7eb;">
                <h3 style="margin-top: 0; color: #374151; font-size: 16px;">Products to Review:</h3>
                <ul style="margin: 10px 0; padding-left: 20px;">
                  ${displayProducts.map(name => `<li style="margin: 5px 0;">${name}</li>`).join('')}
                  ${hasMore ? `<li style="margin: 5px 0; color: #6b7280; font-style: italic;">...and ${productNames.length - 5} more</li>` : ''}
                </ul>
              </div>
              ` : ''}

              <div style="text-align: center; margin: 30px 0;">
                <a href="${dashboardUrl}" 
                   style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px rgba(102, 126, 234, 0.25);">
                  Go to Review Dashboard
                </a>
              </div>

              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
                <p style="margin: 5px 0;">
                  <strong>Need help?</strong> Contact your administrator if you have questions about your assignments.
                </p>
                <p style="margin: 5px 0; color: #9ca3af;">
                  This is an automated notification from the Review System.
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ 
      success: true, 
      emailResponse 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in notify-reviewer-assignment function:", error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: 'Internal server error' 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
