// GDPR retention purge — auto-deletes/archives data past its promised retention.
// Scheduled nightly via pg_cron (see migration).
//
// Runs with service-role privileges. Idempotent; safe to re-run.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { getCorsHeaders } from "../_shared/cors.ts";

interface PurgeResult {
  table: string;
  deleted: number;
  error?: string;
}

const SECONDS_PER_DAY = 86_400;

function cutoff(days: number): string {
  return new Date(Date.now() - days * SECONDS_PER_DAY * 1000).toISOString();
}

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req.headers.get("origin"));

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const admin = createClient(supabaseUrl, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const tasks: Array<{ table: string; days: number; column: string; extra?: Record<string, unknown> }> = [
      { table: "analytics_page_visits", days: 365, column: "created_at" },
      { table: "analytics_visitors", days: 365, column: "created_at" },
      { table: "analytics_daily", days: 365, column: "date" },
      { table: "security_events", days: 180, column: "created_at" },
      { table: "mfa_activity_log", days: 365, column: "created_at" },
      { table: "email_send_log", days: 90, column: "created_at" },
      { table: "admin_audit_log", days: 730, column: "created_at" },
      // Only purge resolved contact submissions
      { table: "contact_submissions", days: 730, column: "created_at", extra: { status: "resolved" } },
    ];

    const results: PurgeResult[] = [];
    for (const t of tasks) {
      try {
        let q = admin.from(t.table).delete({ count: "exact" }).lt(t.column, cutoff(t.days));
        if (t.extra) {
          for (const [k, v] of Object.entries(t.extra)) {
            q = q.eq(k, v as never);
          }
        }
        const { count, error } = await q;
        if (error) {
          results.push({ table: t.table, deleted: 0, error: error.message });
        } else {
          results.push({ table: t.table, deleted: count ?? 0 });
        }
      } catch (e) {
        results.push({ table: t.table, deleted: 0, error: (e as Error).message });
      }
    }

    const totalDeleted = results.reduce((s, r) => s + r.deleted, 0);

    // Log run to admin_audit_log (best-effort; this row will itself age out per the 730d rule)
    await admin.from("admin_audit_log").insert({
      action_type: "gdpr_retention_purge",
      performed_by: null,
      performed_by_email: "system@gdpr-retention-purge",
      details: { results, totalDeleted, ranAt: new Date().toISOString() },
    });

    return new Response(
      JSON.stringify({ ok: true, totalDeleted, results }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("gdpr-retention-purge failed:", err);
    return new Response(
      JSON.stringify({ ok: false, error: "Retention purge failed" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
