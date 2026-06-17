import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";
import {
  getOrCreateAudienceId,
  createBroadcast,
} from "../_shared/resend-audience.ts";
import {
  parseNewsletterMarkdown,
  renderNewsletterHtml,
} from "../_shared/newsletter-render.ts";

const ALLOWED_ORIGINS = [
  "https://dlinrt.eu",
  "https://www.dlinrt.eu",
  "http://localhost:5173",
  "http://localhost:3000",
];

function getCorsHeaders(origin: string | null): HeadersInit {
  const allowed = origin && (ALLOWED_ORIGINS.includes(origin) || origin.endsWith(".lovable.app"))
    ? origin
    : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    Vary: "Origin",
  };
}

const FROM = "DLinRT.eu <noreply@dlinrt.eu>";
const REPLY_TO = "info@dlinrt.eu";

interface BroadcastRequest {
  subject?: string;
  preheader?: string;
  bodyMarkdown: string;
  testRecipient?: string;     // if set → single /emails test send
  name?: string;              // broadcast name (admin label)
}

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req.headers.get("origin"));
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    // Sending (test emails) can use the restricted key; audience/broadcast ops need Full Access.
    const sendKey = Deno.env.get("RESEND_API_KEY");
    const audienceKey = Deno.env.get("RESEND_AUDIENCE_API_KEY") || sendKey;
    if (!sendKey) {
      return new Response(JSON.stringify({ error: "RESEND_API_KEY not configured" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Missing authorization" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: { user }, error: userErr } = await userClient.auth.getUser();
    if (userErr || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const admin = createClient(supabaseUrl, serviceKey);
    const { data: roles } = await admin
      .from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin");
    if (!roles || roles.length === 0) {
      return new Response(JSON.stringify({ error: "Admin role required" }), {
        status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = (await req.json()) as BroadcastRequest;
    if (!body?.bodyMarkdown || typeof body.bodyMarkdown !== "string") {
      return new Response(JSON.stringify({ error: "bodyMarkdown required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const parsed = parseNewsletterMarkdown(body.bodyMarkdown);
    const subject = (body.subject || parsed.subject || "DLinRT.eu update").trim();
    const preheader = (body.preheader || parsed.preheader || "").trim();

    // TEST send → single email via /emails (bypasses audience)
    if (body.testRecipient) {
      const recipient = body.testRecipient.trim().toLowerCase();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipient)) {
        return new Response(JSON.stringify({ error: "Invalid test recipient" }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const html = renderNewsletterHtml({
        subject,
        preheader,
        blocksHtml: parsed.blocksHtml,
        unsubscribeUrl: `https://dlinrt.eu/unsubscribe`,
      });
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${sendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: FROM, to: [recipient], reply_to: REPLY_TO,
          subject: `[TEST] ${subject}`, html,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        return new Response(JSON.stringify({ error: data?.message || `Resend ${res.status}` }), {
          status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      await admin.from("admin_audit_log").insert({
        performed_by: user.id, performed_by_email: user.email || "unknown",
        action_type: "newsletter_broadcast_test",
        details: { subject, recipient, resend_id: data?.id },
      });
      return new Response(JSON.stringify({ success: true, mode: "test", resendId: data?.id }), {
        status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // PUSH draft to Resend audience as a broadcast. Final send happens inside Resend.
    const audienceId = await getOrCreateAudienceId(audienceKey);
    const html = renderNewsletterHtml({
      subject,
      preheader,
      blocksHtml: parsed.blocksHtml,
      unsubscribeUrl: "{{{RESEND_UNSUBSCRIBE_URL}}}",
    });

    const broadcast = await createBroadcast(audienceKey, {
      audience_id: audienceId,
      from: FROM,
      reply_to: REPLY_TO,
      subject,
      html,
      preheader,
      name: body.name || `DLinRT newsletter ${new Date().toISOString().slice(0, 10)}`,
    });

    // Count active subscribers for the audit detail
    const { count: activeCount } = await admin
      .from("newsletter_subscribers")
      .select("*", { count: "exact", head: true })
      .is("unsubscribed_at", null);

    await admin.from("admin_audit_log").insert({
      performed_by: user.id, performed_by_email: user.email || "unknown",
      action_type: "newsletter_broadcast_drafted",
      details: {
        broadcast_id: broadcast.id, audience_id: audienceId,
        subject, active_subscribers: activeCount ?? null,
      },
    });

    return new Response(JSON.stringify({
      success: true,
      mode: "drafted",
      broadcastId: broadcast.id,
      audienceId,
      activeSubscribers: activeCount ?? null,
      resendUrl: `https://resend.com/broadcasts/${broadcast.id}`,
    }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (err) {
    console.error("send-newsletter-broadcast error:", err);
    const raw = (err as Error).message || "Internal error";
    const message = raw.includes("restricted_api_key")
      ? "Resend API key is restricted to sending only. Set RESEND_AUDIENCE_API_KEY to a Full Access Resend key (Resend dashboard → API Keys → Create API Key → Full access)."
      : raw;
    return new Response(JSON.stringify({ error: message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

export {};
