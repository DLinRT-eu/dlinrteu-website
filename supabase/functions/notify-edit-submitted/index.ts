import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.108.2";

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
          const msg = (data && (data.message || data.error)) || `Resend HTTP ${res.status}`;
          throw new Error(typeof msg === "string" ? msg : JSON.stringify(msg));
        }
        return { data, error: null };
      },
    },
  };
}

const ALLOWED_ORIGINS = [
  "https://dlinrt.eu",
  "https://www.dlinrt.eu",
  "http://localhost:5173",
  "http://localhost:3000",
];

function getCorsHeaders(origin: string | null): HeadersInit {
  const isAllowed = origin && (ALLOWED_ORIGINS.includes(origin) || origin.endsWith(".lovable.app"));
  return {
    "Access-Control-Allow-Origin": isAllowed ? origin : ALLOWED_ORIGINS[0],
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };
}

function escapeHtml(s: unknown): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

interface RequestBody {
  draftId: string;
}

const resend = createResend(Deno.env.get("RESEND_API_KEY"));

serve(async (req: Request) => {
  const corsHeaders = getCorsHeaders(req.headers.get("origin"));
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const userClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: userData, error: userErr } = await userClient.auth.getUser(authHeader.replace("Bearer ", ""));
    if (userErr || !userData?.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const { draftId }: RequestBody = await req.json();
    if (!draftId || typeof draftId !== "string") {
      return new Response(JSON.stringify({ error: "Invalid draftId" }), {
        status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const admin = createClient(supabaseUrl, supabaseKey);

    const { data: draft, error: draftErr } = await admin
      .from("product_edit_drafts")
      .select("id, product_id, created_by, changed_fields, edit_summary, status, updated_at")
      .eq("id", draftId)
      .maybeSingle();

    if (draftErr || !draft) {
      return new Response(JSON.stringify({ error: "Draft not found" }), {
        status: 404, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
    if (draft.created_by !== userData.user.id) {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const { data: submitter } = await admin
      .from("profiles")
      .select("email, first_name, last_name, notification_preferences")
      .eq("id", draft.created_by)
      .maybeSingle();

    const productId = draft.product_id;
    const changed: string[] = Array.isArray(draft.changed_fields) ? draft.changed_fields : [];
    const summary = draft.edit_summary || "(no summary provided)";
    const submissionsUrl = "https://dlinrt.eu/my-submissions";
    const reviewUrl = `https://dlinrt.eu/admin/edit-approvals?draft=${draft.id}`;
    const productUrl = `https://dlinrt.eu/product/${encodeURIComponent(productId)}`;

    const changedList = changed.slice(0, 20)
      .map((f) => `<li style="margin:4px 0;font-family:monospace;font-size:13px;">${escapeHtml(f)}</li>`).join("");
    const moreCount = changed.length > 20 ? changed.length - 20 : 0;

    // 1) Confirmation email to submitter (respect notification preferences)
    const prefs = (submitter?.notification_preferences as any) || {};
    const editPrefs = prefs?.categories?.product_edits;
    const submitterEmailAllowed = editPrefs?.email !== false;

    let submitterEmailSent = false;
    if (submitter?.email && submitterEmailAllowed) {
      try {
        await resend.emails.send({
          from: "DLinRT.eu <noreply@dlinrt.eu>",
          to: [submitter.email],
          subject: `Edit submitted for review: ${productId}`,
          html: `
            <div style="font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;max-width:600px;margin:0 auto;color:#1a1a2e;">
              <div style="background:#5090D0;color:#fff;padding:24px;border-radius:8px 8px 0 0;">
                <h1 style="margin:0;font-size:22px;">Edit submitted for review</h1>
              </div>
              <div style="background:#f9fafb;padding:24px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;">
                <p>Hi ${escapeHtml(submitter.first_name || "there")},</p>
                <p>Thanks for your contribution. We've received your in-browser edit and queued it for admin review.</p>
                <div style="background:#fff;border:1px solid #e5e7eb;border-radius:6px;padding:16px;margin:16px 0;">
                  <p style="margin:4px 0;"><strong>Product:</strong> ${escapeHtml(productId)}</p>
                  <p style="margin:4px 0;"><strong>Submitted at:</strong> ${escapeHtml(new Date(draft.updated_at).toUTCString())}</p>
                  <p style="margin:4px 0;"><strong>Fields changed:</strong> ${changed.length}</p>
                  <p style="margin:8px 0 4px;"><strong>Your summary:</strong></p>
                  <p style="margin:0;color:#374151;white-space:pre-wrap;">${escapeHtml(summary)}</p>
                  ${changedList ? `<p style="margin:12px 0 4px;"><strong>Changed fields:</strong></p><ul style="margin:0;padding-left:20px;">${changedList}${moreCount ? `<li style="color:#6b7280;font-style:italic;">…and ${moreCount} more</li>` : ""}</ul>` : ""}
                </div>
                <p style="text-align:center;margin:24px 0;">
                  <a href="${submissionsUrl}" style="background:#5090D0;color:#fff;padding:12px 24px;text-decoration:none;border-radius:6px;font-weight:600;">View my submissions</a>
                </p>
                <p style="font-size:13px;color:#6b7280;">Reference ID: ${escapeHtml(draft.id)}</p>
                <p style="font-size:12px;color:#9ca3af;margin-top:24px;">You can manage these notifications under Notification Settings.</p>
              </div>
            </div>
          `,
        });
        submitterEmailSent = true;
      } catch (e) {
        console.error("Submitter email failed:", e);
      }
    }

    // 2) In-app notification for admins; optional email
    const { data: admins } = await admin
      .from("user_roles")
      .select("user_id")
      .eq("role", "admin");

    const adminIds = (admins || []).map((r: any) => r.user_id);
    const submitterName = [submitter?.first_name, submitter?.last_name].filter(Boolean).join(" ") || submitter?.email || "A contributor";

    if (adminIds.length > 0) {
      const notifRows = adminIds.map((uid: string) => ({
        user_id: uid,
        title: `New product edit awaiting review`,
        message: `${submitterName} submitted ${changed.length} change${changed.length !== 1 ? "s" : ""} to ${productId}.`,
        type: "product_edit",
        link: `/admin/edit-approvals?draft=${draft.id}`,
        read: false,
      }));
      await admin.from("notifications").insert(notifRows);

      // Email admins who allow product_edits emails
      const { data: adminProfiles } = await admin
        .from("profiles")
        .select("id, email, first_name, notification_preferences")
        .in("id", adminIds);

      for (const ap of adminProfiles || []) {
        const aprefs = (ap.notification_preferences as any) || {};
        const cat = aprefs?.categories?.product_edits;
        if (cat?.email === false) continue;
        if (!ap.email) continue;
        try {
          await resend.emails.send({
            from: "DLinRT.eu <noreply@dlinrt.eu>",
            to: [ap.email],
            subject: `Product edit awaiting review: ${productId}`,
            html: `
              <div style="font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;max-width:600px;margin:0 auto;color:#1a1a2e;">
                <h2 style="color:#5090D0;">New product edit awaiting review</h2>
                <p>${escapeHtml(submitterName)} submitted <strong>${changed.length}</strong> change${changed.length !== 1 ? "s" : ""} to <a href="${productUrl}">${escapeHtml(productId)}</a>.</p>
                <p><strong>Summary:</strong> ${escapeHtml(summary)}</p>
                <p style="text-align:center;margin:24px 0;">
                  <a href="${reviewUrl}" style="background:#5090D0;color:#fff;padding:12px 24px;text-decoration:none;border-radius:6px;font-weight:600;">Review submission</a>
                </p>
                <p style="font-size:12px;color:#9ca3af;">Reference ID: ${escapeHtml(draft.id)}</p>
              </div>
            `,
          });
        } catch (e) {
          console.error("Admin email failed for", ap.id, e);
        }
      }
    }

    return new Response(JSON.stringify({
      success: true,
      submitterEmailSent,
      adminsNotified: adminIds.length,
    }), { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } });
  } catch (err: any) {
    console.error("notify-edit-submitted error:", err);
    return new Response(JSON.stringify({ success: false, error: "Internal server error" }), {
      status: 500, headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
});
