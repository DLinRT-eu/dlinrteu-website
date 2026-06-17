// Scheduled (cron) full reconcile of the newsletter audience with Resend.
// Mirrors sync-newsletter-audience but authenticates via a shared
// NEWSLETTER_CRON_SECRET header instead of an admin JWT, so pg_cron can call it.

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";
import {
  getOrCreateAudienceId,
  listContacts,
  upsertContact,
} from "../_shared/resend-audience.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-cron-secret",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const expected = Deno.env.get("NEWSLETTER_CRON_SECRET");
    if (!expected) {
      return new Response(JSON.stringify({ error: "NEWSLETTER_CRON_SECRET not configured" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const provided = req.headers.get("x-cron-secret");
    if (!provided || provided !== expected) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const apiKey = Deno.env.get("RESEND_API_KEY");
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "RESEND_API_KEY not configured" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const admin = createClient(supabaseUrl, serviceKey);

    const audienceId = await getOrCreateAudienceId(apiKey);

    // Paginate full subscriber list
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

    let pushed = 0;
    let pushedUnsub = 0;
    let pulledUnsub = 0;
    const errors: string[] = [];

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

    await admin.from("admin_audit_log").insert({
      performed_by: "00000000-0000-0000-0000-000000000000",
      performed_by_email: "cron@dlinrt.eu",
      action_type: "newsletter_audience_sync",
      details: {
        source: "cron",
        audience_id: audienceId,
        supabase_total: allSubs.length,
        supabase_active: allSubs.filter((s) => !s.unsubscribed_at).length,
        resend_total: resendContacts.length,
        resend_unsubscribed: resendContacts.filter((c) => c.unsubscribed).length,
        pushed,
        pushed_unsubscribed: pushedUnsub,
        pulled_unsubscribed: pulledUnsub,
        errors: errors.slice(0, 25),
      },
    });

    return new Response(JSON.stringify({
      success: true,
      audienceId,
      pushed, pushedUnsubscribed: pushedUnsub, pulledUnsubscribed: pulledUnsub,
      errors: errors.slice(0, 25),
    }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (err) {
    console.error("scheduled-newsletter-audience-sync error:", err);
    return new Response(JSON.stringify({ error: (err as Error).message || "Internal error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

export {};
