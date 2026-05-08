import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.8';

// Allowed origins for security
const ALLOWED_ORIGINS = [
  "https://dlinrt.eu",
  "https://www.dlinrt.eu",
  "http://localhost:5173",
  "http://localhost:3000"
];

function getCorsHeaders(origin: string | null): HeadersInit {
  const allowedOrigin = origin && (ALLOWED_ORIGINS.includes(origin) || origin.endsWith('.lovable.app'))
    ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };
}

// IP-based rate limiting (backstop only — primary protection is per-email throttling + signed tokens)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 5 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 10;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const key = `unsubscribe:${ip}`;
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

// HMAC token utilities (stateless signed tokens)
const TOKEN_TTL_SECONDS = 60 * 60 * 24 * 3; // 3 days
const TOKEN_SECRET = Deno.env.get("UNSUBSCRIBE_TOKEN_SECRET") ?? "";

function b64urlEncode(bytes: Uint8Array): string {
  let str = btoa(String.fromCharCode(...bytes));
  return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function b64urlDecode(s: string): Uint8Array {
  const padded = s.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((s.length + 3) % 4);
  const bin = atob(padded);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function hmacSha256(secret: string, msg: string): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(msg));
  return new Uint8Array(sig);
}

function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a[i] ^ b[i];
  return r === 0;
}

async function signToken(email: string): Promise<string> {
  const payload = { e: email.toLowerCase(), x: Math.floor(Date.now() / 1000) + TOKEN_TTL_SECONDS };
  const payloadB64 = b64urlEncode(new TextEncoder().encode(JSON.stringify(payload)));
  const sig = await hmacSha256(TOKEN_SECRET, payloadB64);
  return `${payloadB64}.${b64urlEncode(sig)}`;
}

async function verifyToken(token: string): Promise<{ email: string } | null> {
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [payloadB64, sigB64] = parts;
  try {
    const expected = await hmacSha256(TOKEN_SECRET, payloadB64);
    const got = b64urlDecode(sigB64);
    if (!timingSafeEqual(expected, got)) return null;
    const payloadStr = new TextDecoder().decode(b64urlDecode(payloadB64));
    const payload = JSON.parse(payloadStr) as { e: string; x: number };
    if (!payload?.e || !payload?.x) return null;
    if (payload.x < Math.floor(Date.now() / 1000)) return null;
    return { email: payload.e };
  } catch {
    return null;
  }
}

// Direct Resend HTTP call (avoids npm resolution flakiness)
async function sendConfirmationEmail(email: string, confirmUrl: string): Promise<void> {
  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey) throw new Error("RESEND_API_KEY not configured");

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1a1a2e;">
      <h2 style="color: #5090D0;">Confirm Unsubscribe</h2>
      <p>We received a request to unsubscribe <strong>${email}</strong> from the DLinRT newsletter.</p>
      <p>If this was you, please confirm by clicking the button below. If you did not request this, you can safely ignore this email and you will remain subscribed.</p>
      <p style="margin: 32px 0;">
        <a href="${confirmUrl}" style="background:#5090D0;color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:6px;font-weight:600;display:inline-block;">Confirm unsubscribe</a>
      </p>
      <p style="font-size:12px;color:#6b7280;">This link expires in 3 days. If the button does not work, copy and paste this URL into your browser:<br/>${confirmUrl}</p>
    </div>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "DLinRT.eu <noreply@dlinrt.eu>",
      to: [email],
      subject: "Confirm your unsubscribe request",
      html,
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Resend error: ${res.status} ${text}`);
  }
}

const handler = async (req: Request): Promise<Response> => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );

  // GET /functions/v1/unsubscribe-newsletter?token=... → confirm and unsubscribe, then redirect
  if (req.method === "GET") {
    const url = new URL(req.url);
    const token = url.searchParams.get("token") ?? "";
    const verified = token ? await verifyToken(token) : null;

    const successUrl = "https://dlinrt.eu/unsubscribe?status=success";
    const errorUrl = "https://dlinrt.eu/unsubscribe?status=invalid";

    if (!verified) {
      return Response.redirect(errorUrl, 302);
    }

    const normalizedEmail = verified.email.trim().toLowerCase();
    const { data: subscriber } = await supabase
      .from('newsletter_subscribers')
      .select('id, unsubscribed_at')
      .eq('email', normalizedEmail)
      .maybeSingle();

    if (subscriber && !subscriber.unsubscribed_at) {
      await supabase
        .from('newsletter_subscribers')
        .update({
          unsubscribed_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', subscriber.id);
    }

    return Response.redirect(successUrl, 302);
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  try {
    const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    if (!checkRateLimit(clientIP)) {
      return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
        status: 429,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const { email } = await req.json();

    const isValidEmail = typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!isValidEmail) {
      return new Response(JSON.stringify({ error: "Please provide a valid email address" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (!TOKEN_SECRET) {
      console.error("UNSUBSCRIBE_TOKEN_SECRET is not configured");
      return new Response(JSON.stringify({ error: "Service not configured" }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Always respond identically (do not leak whether the email is subscribed)
    const genericResponse = new Response(JSON.stringify({
      success: true,
      message: "If this email is subscribed, a confirmation link has been sent. Please check your inbox to complete the unsubscribe.",
    }), { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } });

    const { data: subscriber } = await supabase
      .from('newsletter_subscribers')
      .select('id, unsubscribed_at, last_unsubscribe_request_at')
      .eq('email', normalizedEmail)
      .maybeSingle();

    // No-op for non-subscribers / already unsubscribed
    if (!subscriber || subscriber.unsubscribed_at) return genericResponse;

    // Per-email throttle: at most one confirmation email per hour. This neutralizes
    // header-spoofed bulk attacks because spoofing IPs cannot bypass per-email throttling.
    const lastSent = subscriber.last_unsubscribe_request_at
      ? new Date(subscriber.last_unsubscribe_request_at).getTime()
      : 0;
    if (Date.now() - lastSent < 60 * 60 * 1000) {
      return genericResponse;
    }

    const token = await signToken(normalizedEmail);
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const confirmUrl = `${supabaseUrl}/functions/v1/unsubscribe-newsletter?token=${encodeURIComponent(token)}`;

    try {
      await sendConfirmationEmail(normalizedEmail, confirmUrl);
      await supabase
        .from('newsletter_subscribers')
        .update({ last_unsubscribe_request_at: new Date().toISOString() })
        .eq('id', subscriber.id);
    } catch (e) {
      console.error("Failed to send confirmation email:", e);
      // Still return the generic response (don't leak success/failure)
    }

    return genericResponse;
  } catch (error: any) {
    console.error("Error in unsubscribe-newsletter function:", error);
    return new Response(JSON.stringify({ error: "Failed to process unsubscribe request" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
