import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

// Resend webhook receiver. Configure in Resend dashboard:
//   URL: https://<project-ref>.functions.supabase.co/resend-webhook
//   Events: email.sent, email.delivered, email.bounced, email.complained,
//           email.delivery_delayed, email.opened (optional)
//
// This function is intentionally public (no JWT) — Resend cannot pass an
// auth header. We optionally verify the Svix signature when
// RESEND_WEBHOOK_SECRET is set.

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const WEBHOOK_SECRET = Deno.env.get("RESEND_WEBHOOK_SECRET");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, svix-id, svix-timestamp, svix-signature",
};

interface ResendEvent {
  type: string;
  created_at?: string;
  data?: {
    email_id?: string;
    to?: string[] | string;
    subject?: string;
    from?: string;
    bounce?: { type?: string; subType?: string; message?: string };
    complaint?: { type?: string; message?: string };
    [k: string]: unknown;
  };
}

// Minimal Svix signature verification (HMAC-SHA256, base64).
async function verifySvix(req: Request, body: string): Promise<boolean> {
  if (!WEBHOOK_SECRET) return false; // fail closed when secret not configured
  const id = req.headers.get("svix-id");
  const timestamp = req.headers.get("svix-timestamp");
  const signatureHeader = req.headers.get("svix-signature");
  if (!id || !timestamp || !signatureHeader) return false;

  const secretB64 = WEBHOOK_SECRET.startsWith("whsec_")
    ? WEBHOOK_SECRET.slice(6)
    : WEBHOOK_SECRET;
  let keyBytes: Uint8Array;
  try {
    keyBytes = Uint8Array.from(atob(secretB64), (c) => c.charCodeAt(0));
  } catch {
    return false;
  }
  const key = await crypto.subtle.importKey(
    "raw",
    keyBytes,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const toSign = new TextEncoder().encode(`${id}.${timestamp}.${body}`);
  const sig = await crypto.subtle.sign("HMAC", key, toSign);
  const expectedBytes = new Uint8Array(sig);
  return signatureHeader.split(" ").some((part) => {
    const received = part.split(",")[1];
    if (!received) return false;
    let receivedBytes: Uint8Array;
    try {
      const bin = atob(received);
      receivedBytes = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) receivedBytes[i] = bin.charCodeAt(i);
    } catch {
      return false;
    }
    if (receivedBytes.length !== expectedBytes.length) return false;
    let r = 0;
    for (let i = 0; i < expectedBytes.length; i++) r |= expectedBytes[i] ^ receivedBytes[i];
    return r === 0;
  });
}

function statusFromType(type: string): string {
  if (type === "email.sent") return "sent";
  if (type === "email.delivered") return "delivered";
  if (type === "email.bounced") return "bounced";
  if (type === "email.complained") return "complained";
  if (type === "email.delivery_delayed") return "delivery_delayed";
  if (type === "email.opened") return "opened";
  return type.replace("email.", "");
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    if (!WEBHOOK_SECRET) {
      console.error("resend-webhook: RESEND_WEBHOOK_SECRET not configured — rejecting request");
      return new Response(JSON.stringify({ error: "Service not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.text();
    const ok = await verifySvix(req, body);
    if (!ok) {
      console.warn("resend-webhook: signature verification failed");
      return new Response(JSON.stringify({ error: "Invalid signature" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const event: ResendEvent = JSON.parse(body);
    const data = event.data ?? {};
    const recipientList = Array.isArray(data.to)
      ? data.to
      : data.to
      ? [data.to]
      : [];

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const status = statusFromType(event.type);

    for (const recipient of recipientList) {
      const row = {
        recipient,
        subject: data.subject ?? null,
        function_name: null as string | null,
        resend_id: data.email_id ?? null,
        status,
        error:
          data.bounce?.message ??
          data.complaint?.message ??
          null,
        bounce_type: data.bounce?.type ?? data.complaint?.type ?? null,
        bounce_subtype: data.bounce?.subType ?? null,
        raw_event: event as unknown as Record<string, unknown>,
      };
      const { error } = await supabase.from("email_send_log").insert(row);
      if (error) console.error("email_send_log insert failed:", error);
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("resend-webhook error:", err);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
