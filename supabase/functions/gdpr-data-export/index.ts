// GDPR Article 15/20 — full user data export.
// Returns every personal-data record tied to the authenticated user,
// including email-keyed records that the user cannot read directly via RLS.
//
// Sensitive fields (IP hashes, user agents) are redacted before export.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { getCorsHeaders } from "../_shared/cors.ts";

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req.headers.get("origin"));

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Missing authorization" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: { user }, error: userErr } = await userClient.auth.getUser();
    if (userErr || !user) {
      return new Response(JSON.stringify({ error: "Invalid authentication" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const admin = createClient(supabaseUrl, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const uid = user.id;
    const email = user.email!;

    const [
      profile, roles, roleRequests, mfaLog, mfaBackup,
      reviews, revisions, notifications, userProducts,
      contact, newsletter, feedback, consent, securityEvents, emailLog,
    ] = await Promise.all([
      admin.from("profiles").select("*").eq("id", uid).maybeSingle(),
      admin.from("user_roles").select("*").eq("user_id", uid),
      admin.from("role_requests").select("*").eq("user_id", uid),
      admin.from("mfa_activity_log").select("id,user_id,action,factor_type,created_at").eq("user_id", uid),
      admin.from("mfa_backup_codes").select("id,user_id,used,used_at,created_at").eq("user_id", uid),
      admin.from("product_reviews").select("*").eq("assigned_to", uid),
      admin.from("company_revisions").select("*").eq("revised_by", uid),
      admin.from("notifications").select("*").eq("user_id", uid),
      admin.from("user_products").select("*").eq("user_id", uid),
      admin.from("contact_submissions").select("*").eq("email", email),
      admin.from("newsletter_subscribers").select("*").eq("email", email),
      admin.from("product_feedback").select("*").eq("submitter_email", email),
      admin.from("consent_audit_log").select("id,user_id,action,consent_version,created_at").eq("user_id", uid),
      admin.from("security_events").select("id,user_id,event_type,created_at").eq("user_id", uid),
      admin.from("email_send_log").select("id,recipient,subject,status,created_at").eq("recipient", email),
    ]);

    const payload = {
      exported_at: new Date().toISOString(),
      gdpr_notice:
        "This export contains every personal-data record DLinRT.eu holds about you. " +
        "IP-address hashes and user-agent strings are redacted by policy. " +
        "Records keyed only by email (contact submissions, newsletter, feedback, email log) " +
        "are included by matching your current account email.",
      user: { id: uid, email, created_at: user.created_at },
      profile: profile.data,
      roles: roles.data ?? [],
      role_requests: roleRequests.data ?? [],
      mfa_activity_log: mfaLog.data ?? [],
      mfa_backup_codes: mfaBackup.data ?? [],
      reviews: reviews.data ?? [],
      revisions: revisions.data ?? [],
      notifications: notifications.data ?? [],
      user_products: userProducts.data ?? [],
      contact_submissions: contact.data ?? [],
      newsletter_subscriptions: newsletter.data ?? [],
      product_feedback: feedback.data ?? [],
      consent_audit_log: consent.data ?? [],
      security_events: securityEvents.data ?? [],
      email_send_log: emailLog.data ?? [],
    };

    return new Response(JSON.stringify(payload, null, 2), {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="dlinrt-data-export-${new Date().toISOString().split("T")[0]}.json"`,
      },
    });
  } catch (err) {
    console.error("gdpr-data-export failed:", err);
    return new Response(JSON.stringify({ error: "Export failed" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
