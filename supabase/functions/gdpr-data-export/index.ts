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
      contact, newsletter, feedback, consent, emailLog,
      drafts, expertise, documents, docAccess, assignments, comments, companyReps,
      companyInvites, reviewerInvites, regNotifications,
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
      admin.from("email_send_log").select("id,recipient,subject,status,created_at").ilike("recipient", email),
      admin.from("product_edit_drafts").select("*").eq("created_by", uid),
      admin.from("reviewer_expertise").select("*").eq("user_id", uid),
      admin.from("profile_documents").select("id,document_type,file_name,file_size,mime_type,description,verified_at,uploaded_at,updated_at").eq("user_id", uid),
      admin.from("profile_document_access_log").select("id,document_id,access_reason,accessed_at").eq("accessed_by", uid),
      admin.from("assignment_history").select("*").or(`assigned_to.eq.${uid},previous_assignee.eq.${uid},changed_by.eq.${uid}`),
      admin.from("review_comments").select("*").eq("user_id", uid),
      admin.from("company_representatives").select("*").eq("user_id", uid),
      admin.from("company_invitations").select("id,email,company_id,company_name,first_name,last_name,rep_position,status,expires_at,accepted_at,created_at").ilike("email", email),
      admin.from("reviewer_invitations").select("id,email,invited_at,expires_at,accepted_at,status,expertise_preferences,created_at").ilike("email", email),
      admin.from("user_registration_notifications").select("id,email,notification_sent_at,notification_status,verified,verified_at,created_at").eq("user_id", uid),
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
      email_send_log: emailLog.data ?? [],
      product_edit_drafts: drafts.data ?? [],
      reviewer_expertise: expertise.data ?? [],
      profile_documents: documents.data ?? [],
      profile_document_access_log: docAccess.data ?? [],
      assignment_history: assignments.data ?? [],
      review_comments: comments.data ?? [],
      company_representatives: companyReps.data ?? [],
      company_invitations: companyInvites.data ?? [],
      reviewer_invitations: reviewerInvites.data ?? [],
      user_registration_notifications: regNotifications.data ?? [],
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
