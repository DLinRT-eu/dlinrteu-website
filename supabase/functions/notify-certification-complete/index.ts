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

interface CertificationRequest {
  productId: string;
  productName: string;
  companyName: string;
}

const handler = async (req: Request): Promise<Response> => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate JWT
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Verify user with anon client
    const anonClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await anonClient.auth.getUser(token);
    if (userError || !userData?.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const userId = userData.user.id;

    // Parse request body
    const { productId, productName, companyName }: CertificationRequest = await req.json();

    if (!productId || !productName || !companyName) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const escapeHtml = (s: unknown) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    const safeProductName = escapeHtml(productName);
    const safeCompanyName = escapeHtml(companyName);

    console.log(`Processing certification notification for product: ${productName}, company: ${companyName}`);

    // Use service role client for profile lookup
    const serviceClient = createClient(supabaseUrl, supabaseServiceKey);

    // Get the certifying user's profile
    const { data: profile, error: profileError } = await serviceClient
      .from("profiles")
      .select("email, first_name, last_name, notification_preferences")
      .eq("id", userId)
      .single();

    if (profileError || !profile) {
      console.error("Error fetching user profile:", profileError);
      throw new Error("User profile not found");
    }

    const certificationDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const emailsSent: string[] = [];

    // Check user notification preferences (status_updates category)
    const prefs = (profile.notification_preferences as any) || {};
    const categoryPrefs = prefs?.categories?.status_updates;
    const userEmailEnabled = categoryPrefs?.email !== false;

    // Send confirmation to the company representative
    if (userEmailEnabled) {
      try {
        await resend.emails.send({
          from: "DLinRT.eu Certification <noreply@dlinrt.eu>",
          to: [profile.email],
          subject: `Product Certification Confirmed: ${productName}`,
          html: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
              </head>
              <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
                  <div style="font-size: 48px; margin-bottom: 10px;">✅</div>
                  <h1 style="color: white; margin: 0; font-size: 24px;">Product Certification Confirmed</h1>
                </div>
                
                <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb; border-top: none;">
                  <p style="font-size: 16px; margin-top: 0;">
                    Hello ${profile.first_name} ${profile.last_name},
                  </p>
                  
                  <p style="font-size: 16px;">
                    Your product certification has been successfully recorded. The product will now display a 
                    <strong style="color: #10b981;">"Verified by Company"</strong> badge.
                  </p>

                  <div style="background: white; padding: 20px; border-radius: 8px; margin: 25px 0; border: 2px solid #10b981;">
                    <h2 style="margin-top: 0; color: #10b981; font-size: 18px;">Certification Details</h2>
                    
                    <table style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Product:</td>
                        <td style="padding: 8px 0; text-align: right; font-weight: 600;">${productName}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Company:</td>
                        <td style="padding: 8px 0; text-align: right; font-weight: 600;">${companyName}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Date:</td>
                        <td style="padding: 8px 0; text-align: right; font-weight: 600;">${certificationDate}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Certified by:</td>
                        <td style="padding: 8px 0; text-align: right; font-weight: 600;">${profile.first_name} ${profile.last_name}</td>
                      </tr>
                    </table>
                  </div>

                  <p style="font-size: 14px; color: #6b7280;">
                    If you need to update the product information or re-certify, you can do so from your 
                    <a href="https://dlinrt.eu/company/certification" style="color: #10b981;">Company Certification page</a>.
                  </p>

                  <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #9ca3af; font-size: 14px;">
                    <p style="margin: 5px 0;">
                      This is an automated notification from the DLinRT.eu Certification System.
                    </p>
                  </div>
                </div>
              </body>
            </html>
          `,
        });
        emailsSent.push(profile.email);
        console.log("Confirmation email sent to company representative:", profile.email);
      } catch (emailError) {
        console.error("Error sending confirmation to representative:", emailError);
      }
    } else {
      console.log(`User ${userId} has disabled email for status_updates, skipping representative notification`);
    }

    // Send notification to admin
    try {
      await resend.emails.send({
        from: "DLinRT.eu Certification <noreply@dlinrt.eu>",
        to: ["info@dlinrt.eu"],
        subject: `New Product Certification: ${productName} (${companyName})`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 24px;">New Product Certification</h1>
              </div>
              
              <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb; border-top: none;">
                <p style="font-size: 16px; margin-top: 0;">
                  A company representative has certified a product on DLinRT.eu.
                </p>

                <div style="background: white; padding: 20px; border-radius: 8px; margin: 25px 0; border: 1px solid #e5e7eb;">
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Product:</td>
                      <td style="padding: 8px 0; text-align: right; font-weight: 600;">${productName}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Company:</td>
                      <td style="padding: 8px 0; text-align: right; font-weight: 600;">${companyName}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Certified by:</td>
                      <td style="padding: 8px 0; text-align: right; font-weight: 600;">${profile.first_name} ${profile.last_name}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #6b7280; font-weight: 500;">Date:</td>
                      <td style="padding: 8px 0; text-align: right; font-weight: 600;">${certificationDate}</td>
                    </tr>
                  </table>
                </div>

                <div style="text-align: center; margin: 30px 0;">
                  <a href="https://dlinrt.eu/admin/certifications" 
                     style="display: inline-block; background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%); color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
                    View in Admin Dashboard
                  </a>
                </div>

                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #9ca3af; font-size: 14px;">
                  <p style="margin: 5px 0;">
                    This is an automated notification from the DLinRT.eu Certification System.
                  </p>
                </div>
              </div>
            </body>
          </html>
        `,
      });
      emailsSent.push("info@dlinrt.eu");
      console.log("Admin notification email sent");
    } catch (emailError) {
      console.error("Error sending admin notification:", emailError);
    }

    return new Response(
      JSON.stringify({ success: true, emailsSent }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in notify-certification-complete:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);