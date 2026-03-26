import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";
import { Resend } from "npm:resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const ALLOWED_ORIGINS = [
  "https://dlinrt.eu",
  "https://www.dlinrt.eu",
  "http://localhost:5173",
  "http://localhost:3000",
];

function getCorsHeaders(origin: string | null): HeadersInit {
  const allowedOrigin =
    origin &&
    (ALLOWED_ORIGINS.includes(origin) || origin.endsWith(".lovable.app"))
      ? origin
      : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type",
  };
}

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Rate limiting
const rateLimitStore = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 300000; // 5 min
const RATE_LIMIT_MAX = 3;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const key = `feedback_${ip}`;
  if (!rateLimitStore.has(key)) rateLimitStore.set(key, []);
  const reqs = rateLimitStore.get(key)!.filter((t) => now - t < RATE_LIMIT_WINDOW);
  if (reqs.length >= RATE_LIMIT_MAX) return false;
  reqs.push(now);
  rateLimitStore.set(key, reqs);
  return true;
}

interface FeedbackRequest {
  submission_type: string;
  product_name: string;
  company_name?: string;
  submitter_name: string;
  submitter_email: string;
  details: string;
  supporting_url?: string;
}

const handler = async (req: Request): Promise<Response> => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  const clientIp = req.headers.get("x-forwarded-for") || "unknown";
  if (!checkRateLimit(clientIp)) {
    return new Response(
      JSON.stringify({ error: "Too many requests. Please try again later." }),
      { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }

  try {
    const text = await req.text();
    if (text.length > 10000) {
      return new Response(JSON.stringify({ error: "Request payload too large" }), {
        status: 413,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const body: FeedbackRequest = JSON.parse(text);
    const { submission_type, product_name, company_name, submitter_name, submitter_email, details, supporting_url } = body;

    // Validate required fields
    if (!submission_type || !product_name || !submitter_name || !submitter_email || !details) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Validate submission_type enum
    if (!["missing_product", "missing_info"].includes(submission_type)) {
      return new Response(JSON.stringify({ error: "Invalid submission type" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Length validation
    if (product_name.length > 200 || submitter_name.length > 100 || submitter_email.length > 254 || details.length > 5000 || (company_name && company_name.length > 200) || (supporting_url && supporting_url.length > 500)) {
      return new Response(JSON.stringify({ error: "Field values exceed maximum length" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Insert via service role
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { error: dbError } = await supabaseAdmin.from("product_feedback").insert({
      submission_type,
      product_name,
      company_name: company_name || null,
      submitter_name,
      submitter_email,
      details,
      supporting_url: supporting_url || null,
    });

    if (dbError) {
      console.error("DB insert error:", dbError.message);
      return new Response(JSON.stringify({ error: "Failed to save feedback" }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Send notification email to admins
    const typeLabel = submission_type === "missing_product" ? "Missing Product" : "Missing/Incorrect Info";
    try {
      await resend.emails.send({
        from: "DLinRT.eu Product Feedback <noreply@dlinrt.eu>",
        to: ["info@dlinrt.eu"],
        reply_to: submitter_email,
        subject: `Product Feedback: ${escapeHtml(typeLabel)} — ${escapeHtml(product_name)}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
              New Product Feedback Submission
            </h2>
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Type:</strong> ${escapeHtml(typeLabel)}</p>
              <p><strong>Product:</strong> ${escapeHtml(product_name)}</p>
              ${company_name ? `<p><strong>Company:</strong> ${escapeHtml(company_name)}</p>` : ""}
              <p><strong>Submitted by:</strong> ${escapeHtml(submitter_name)} (${escapeHtml(submitter_email)})</p>
              ${supporting_url ? `<p><strong>Supporting URL:</strong> <a href="${escapeHtml(supporting_url)}">${escapeHtml(supporting_url)}</a></p>` : ""}
            </div>
            <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
              <h3 style="color: #374151; margin-top: 0;">Details</h3>
              <p style="line-height: 1.6; color: #4b5563;">${escapeHtml(details).replace(/\n/g, "<br>")}</p>
            </div>
            <div style="margin-top: 30px; text-align: center; color: #6b7280; font-size: 12px;">
              <p>This email was sent from the DLinRT.eu product feedback form</p>
            </div>
          </div>
        `,
      });
    } catch (emailErr) {
      console.error("Email notification failed:", (emailErr as Error).message);
      // Don't fail the request if email fails — data is saved
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: unknown) {
    console.error("Error in submit-product-feedback:", (error as Error).message);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
