// Supabase Edge Function: send-newsletter-consent-invite
// Called right after account signup when the user did NOT tick the newsletter
// checkbox. Creates a pending (unsubscribed) subscriber row and emails a
// signed confirmation link; opening the link activates the subscription via
// confirm-newsletter-resubscribe. Best-effort: never blocks account creation.

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.108.2";
import { isSuppressed, logEmailSend } from "../_shared/email-delivery.ts";
import { createResubscribeToken } from "../_shared/resubscribe-token.ts";

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

const ALLOWED_ORIGINS = [
  "https://dlinrt.eu",
  "https://www.dlinrt.eu",
  "http://localhost:5173",
  "http://localhost:3000",
];

function getCorsHeaders(origin: string | null): HeadersInit {
  const allowedOrigin = origin && (ALLOWED_ORIGINS.includes(origin) || origin.endsWith(".lovable.app"))
    ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };
}

const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 5 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const key = `newsletter-invite:${ip}`;
  const current = rateLimitStore.get(key);
  if (!current || now > current.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  if (current.count >= RATE_LIMIT_MAX_REQUESTS) return false;
  current.count++;
  rateLimitStore.set(key, current);
  return true;
}

const MIN_RESPONSE_MS = 1500;

const handler = async (req: Request): Promise<Response> => {
  const started = Date.now();
  const res = await innerHandler(req);
  const wait = MIN_RESPONSE_MS - (Date.now() - started);
  if (wait > 0) await new Promise((r) => setTimeout(r, wait));
  return res;
};

const innerHandler = async (req: Request): Promise<Response> => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { "Content-Type": "application/json", ...corsHeaders } },
    );
  }

  try {
    const clientIP = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
    if (!checkRateLimit(clientIP)) {
      return new Response(
        JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
        { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } },
      );
    }

    const rawBody = await req.text();
    if (rawBody.length > 5000) {
      return new Response(
        JSON.stringify({ error: "Payload too large" }),
        { status: 413, headers: { "Content-Type": "application/json", ...corsHeaders } },
      );
    }
    let body: { firstName?: string; lastName?: string; email?: string };
    try {
      body = JSON.parse(rawBody);
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid JSON" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } },
      );
    }
    const { firstName, lastName, email } = body;
    const isValidEmail = typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!firstName?.trim() || !lastName?.trim() || !isValidEmail ||
        firstName.length > 100 || lastName.length > 100 || (email as string).length > 255) {
      return new Response(
        JSON.stringify({ error: "firstName, lastName and a valid email are required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } },
      );
    }

    const escapeHtml = (s: unknown) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    const safeFirst = escapeHtml(firstName);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    const normalizedEmail = (email as string).toLowerCase();

    const { data: existing } = await supabase
      .from("newsletter_subscribers")
      .select("id, unsubscribed_at")
      .eq("email", normalizedEmail)
      .maybeSingle();

    const genericOk = () => new Response(
      JSON.stringify({ success: true, message: "If eligible, a confirmation email has been sent" }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } },
    );

    if (existing && !existing.unsubscribed_at) return genericOk();

    // Invites are only for people who just created a DLinRT account with this
    // address; arbitrary addresses are silently ignored. No subscriber row is
    // written here — confirm-newsletter-resubscribe creates it after the click.
    const since = new Date(Date.now() - 30 * 60 * 1000).toISOString();
    const { data: account } = await supabase
      .from("profiles")
      .select("id")
      .ilike("email", normalizedEmail)
      .gte("created_at", since)
      .maybeSingle();
    if (!account) return genericOk();

    const { count: alreadyInvited } = await supabase
      .from("email_send_log")
      .select("id", { count: "exact", head: true })
      .eq("function_name", "send-newsletter-consent-invite")
      .eq("recipient", normalizedEmail);
    if ((alreadyInvited ?? 0) > 0) return genericOk();

    const token = await createResubscribeToken({
      email: normalizedEmail,
      firstName: firstName as string,
      lastName: lastName as string,
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    const confirmUrl = `${Deno.env.get("SUPABASE_URL")}/functions/v1/confirm-newsletter-resubscribe?token=${token}`;
    const subject = "Would you like the DLinRT newsletter?";

    if (await isSuppressed(supabase, normalizedEmail)) {
      await logEmailSend(supabase, {
        functionName: "send-newsletter-consent-invite",
        recipient: normalizedEmail,
        subject,
        status: "suppressed",
        error: "Recipient previously hard-bounced or complained",
      });
      return new Response(
        JSON.stringify({ success: true, message: "If eligible, a confirmation email has been sent" }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } },
      );
    }

    try {
      await resend.emails.send({
        from: "DLinRT Newsletter <info@dlinrt.eu>",
        reply_to: "info@dlinrt.eu",
        to: [normalizedEmail],
        subject,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
              Stay in the loop with DLinRT
            </h2>
            <p>Hello ${safeFirst},</p>
            <p>Thank you for creating your DLinRT.eu account. You did not subscribe to our newsletter during signup — if you'd like occasional updates on new AI products in radiotherapy, evidence reviews and community news, confirm with one click:</p>
            <p style="text-align: center; margin: 30px 0;">
              <a href="${confirmUrl}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                Yes, subscribe me
              </a>
            </p>
            <p style="color: #666; font-size: 14px;">This link expires in 7 days. If you don't want the newsletter, simply ignore this email — you will not be subscribed and we will not ask again.</p>
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 12px;">
              <p>This email was sent from DLinRT.eu</p>
            </div>
          </div>
        `,
      });
      await logEmailSend(supabase, {
        functionName: "send-newsletter-consent-invite",
        recipient: normalizedEmail,
        subject,
        status: "sent",
      });
    } catch (emailError) {
      console.error("send-newsletter-consent-invite: email failed", emailError);
      await logEmailSend(supabase, {
        functionName: "send-newsletter-consent-invite",
        recipient: normalizedEmail,
        subject,
        status: "failed",
        error: emailError instanceof Error ? emailError.message : String(emailError),
      });
      throw new Error("Failed to send confirmation email");
    }

    return new Response(
      JSON.stringify({ success: true, message: "If eligible, a confirmation email has been sent" }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } },
    );
  } catch (error) {
    console.error("Error in send-newsletter-consent-invite:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process newsletter consent invite" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } },
    );
  }
};

serve(handler);
