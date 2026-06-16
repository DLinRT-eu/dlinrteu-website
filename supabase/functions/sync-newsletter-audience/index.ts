import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";
import {
  getOrCreateAudienceId,
  listContacts,
  upsertContact,
  markContactUnsubscribed,
} from "../_shared/resend-audience.ts";

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

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req.headers.get("origin"));
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const apiKey = Deno.env.get("RESEND_API_KEY");
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "RESEND_API_KEY not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Admin auth
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Missing authorization" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
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
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const admin = createClient(supabaseUrl, serviceKey);
    const { data: roles } = await admin
      .from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin");
    if (!roles || roles.length === 0) {
      return new Response(JSON.stringify({ error: "Admin role required" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Optional body: { dryRun?: boolean }
    let dryRun = false;
    try {
      const body = req.method === "POST" ? await req.text() : "";
      if (body) dryRun = Boolean(JSON.parse(body)?.dryRun);
    } catch { /* ignore */ }

    const audienceId = await getOrCreateAudienceId(apiKey);

    // Load full subscriber list from Supabase (paginate to bypass 1000-row default)
    const allSubs: Array<{ email: string; first_name: string; last_name: string; unsubscribed_at: string | null }> = [];
    let from = 0;
    const pageSize = 1000;
    while (true) {
      const { data, error } = await admin
        .from("newsletter_subscribers")
        .select("email, first_name, last_name, unsubscribed_at")
        .range(from, from + pageSize - 1);
      if (error) throw error;
      if (!data || data.length === 0) break;
      allSubs.push(...data);
      if (data.length < pageSize) break;
      from += pageSize;
    }

    const supabaseByEmail = new Map(allSubs.map((s) => [s.email.toLowerCase(), s]));
    const resendContacts = await listContacts(apiKey, audienceId);
    const resendByEmail = new Map(resendContacts.map((c) => [c.email.toLowerCase(), c]));

    let pushed = 0;
    let pushedUnsub = 0;
    let pulledUnsub = 0;
    const errors: string[] = [];

    if (!dryRun) {
      // Push every Supabase subscriber to Resend with the right unsubscribed flag
      for (const sub of allSubs) {
        try {
          await upsertContact(apiKey, audienceId, {
            email: sub.email.toLowerCase(),
            first_name: sub.first_name || undefined,
            last_name: sub.last_name || undefined,
            unsubscribed: !!sub.unsubscribed_at,
          });
          if (sub.unsubscribed_at) pushedUnsub++;
          else pushed++;
        } catch (e) {
          errors.push(`push ${sub.email}: ${(e as Error).message}`);
        }
      }

      // Pull: any Resend contact marked unsubscribed but still active in Supabase
      for (const c of resendContacts) {
        if (!c.unsubscribed) continue;
        const sub = supabaseByEmail.get(c.email.toLowerCase());
        if (sub && !sub.unsubscribed_at) {
          const { error } = await admin
            .from("newsletter_subscribers")
            .update({ unsubscribed_at: new Date().toISOString(), updated_at: new Date().toISOString() })
            .eq("email", sub.email);
          if (error) errors.push(`pull ${sub.email}: ${error.message}`);
          else pulledUnsub++;
        }
      }
    }

    await admin.from("admin_audit_log").insert({
      performed_by: user.id,
      performed_by_email: user.email || "unknown",
      action_type: "newsletter_audience_sync",
      details: {
        audience_id: audienceId,
        supabase_total: allSubs.length,
        supabase_active: allSubs.filter((s) => !s.unsubscribed_at).length,
        resend_total: resendContacts.length,
        resend_unsubscribed: resendContacts.filter((c) => c.unsubscribed).length,
        pushed,
        pushed_unsubscribed: pushedUnsub,
        pulled_unsubscribed: pulledUnsub,
        errors: errors.slice(0, 25),
        dryRun,
      },
    });

    return new Response(
      JSON.stringify({
        success: true,
        audienceId,
        counts: {
          supabaseTotal: allSubs.length,
          supabaseActive: allSubs.filter((s) => !s.unsubscribed_at).length,
          resendTotal: resendContacts.length,
          resendUnsubscribed: resendContacts.filter((c) => c.unsubscribed).length,
          pushed,
          pushedUnsubscribed: pushedUnsub,
          pulledUnsubscribed: pulledUnsub,
        },
        errors: errors.slice(0, 25),
        dryRun,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("sync-newsletter-audience error:", err);
    return new Response(JSON.stringify({ error: (err as Error).message || "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

export {}; // module marker
