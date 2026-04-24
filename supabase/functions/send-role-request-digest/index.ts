import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

// Resend HTTP shim — matches the pattern used in notify-role-request-outcome
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
  const isAllowed = origin && (ALLOWED_ORIGINS.includes(origin) || origin.endsWith(".lovable.app"));
  return {
    "Access-Control-Allow-Origin": isAllowed ? origin : ALLOWED_ORIGINS[0],
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

const daysSince = (iso: string): number => {
  const ms = Date.now() - new Date(iso).getTime();
  return Math.max(0, Math.floor(ms / (1000 * 60 * 60 * 24)));
};

const handler = async (req: Request): Promise<Response> => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
  const authHeader = req.headers.get("Authorization");

  // Auth: service-role bearer (cron) OR an authenticated admin (manual trigger)
  const isServiceRole = !!serviceRoleKey && authHeader === `Bearer ${serviceRoleKey}`;
  if (!isServiceRole) {
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ success: false, error: "Unauthorized" }), {
        status: 401, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await userClient.auth.getUser(token);
    if (userError || !userData?.user) {
      return new Response(JSON.stringify({ success: false, error: "Unauthorized" }), {
        status: 401, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
    const adminClient = createClient(supabaseUrl, serviceRoleKey);
    const { data: roles } = await adminClient
      .from("user_roles")
      .select("role")
      .eq("user_id", userData.user.id)
      .eq("role", "admin");
    if (!roles || roles.length === 0) {
      return new Response(JSON.stringify({ success: false, error: "Admin access required" }), {
        status: 403, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  const recordRun = async (value: Record<string, unknown>) => {
    try {
      await supabase.from("reminder_settings").upsert({
        setting_key: "role_request_digest_last_sent",
        setting_value: { last_sent_at: new Date().toISOString(), ...value } as any,
        updated_at: new Date().toISOString(),
      }, { onConflict: "setting_key" });
    } catch (e) {
      console.error("Failed to record digest run:", e);
    }
  };

  try {

    // 1. Pending role requests
    const { data: pending, error: pendingError } = await supabase
      .from("role_requests")
      .select("id, user_id, requested_role, justification, created_at")
      .eq("status", "pending")
      .order("created_at", { ascending: true });

    if (pendingError) throw pendingError;

    if (!pending || pending.length === 0) {
      console.log("send-role-request-digest: no pending requests, skipping send");
      await recordRun({ status: "success", pending_count: 0, emails_sent: 0, skipped: true, reason: "no pending requests" });
      return new Response(JSON.stringify({
        success: true, skipped: true, reason: "no pending requests", pendingCount: 0,
      }), { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } });
    }

    // Hydrate requester profiles
    const requesterIds = Array.from(new Set(pending.map(p => p.user_id)));
    const { data: requesterProfiles } = await supabase
      .from("profiles")
      .select("id, first_name, last_name, email")
      .in("id", requesterIds);
    const profileMap = new Map((requesterProfiles ?? []).map(p => [p.id, p]));

    // 2. Admins
    const { data: adminRows, error: adminErr } = await supabase
      .from("user_roles")
      .select("user_id")
      .eq("role", "admin");
    if (adminErr) throw adminErr;
    const adminIds = Array.from(new Set((adminRows ?? []).map(r => r.user_id)));

    if (adminIds.length === 0) {
      return new Response(JSON.stringify({ success: true, skipped: true, reason: "no admins" }), {
        status: 200, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const { data: adminProfiles } = await supabase
      .from("profiles")
      .select("id, first_name, email, notification_preferences")
      .in("id", adminIds);

    const recipients = (adminProfiles ?? []).filter(p => {
      if (!p.email) return false;
      const prefs: any = p.notification_preferences || {};
      return prefs?.categories?.registration_updates?.email !== false;
    });

    if (recipients.length === 0) {
      return new Response(JSON.stringify({
        success: true, skipped: true, reason: "all admins opted out", pendingCount: pending.length,
      }), { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } });
    }

    // 3. Build email body (shared table HTML)
    const siteUrl = "https://dlinrt.eu";
    const rowsHtml = pending.map(r => {
      const p = profileMap.get(r.user_id);
      const name = p ? `${p.first_name ?? ""} ${p.last_name ?? ""}`.trim() || (p.email ?? "Unknown") : "Unknown";
      const email = p?.email ?? "";
      const days = daysSince(r.created_at);
      const justSnippet = (r.justification ?? "").slice(0, 120);
      const justWithEllipsis = (r.justification ?? "").length > 120 ? justSnippet + "…" : justSnippet;
      const dayCellColor = days >= 7 ? "#b91c1c" : days >= 3 ? "#b45309" : "#374151";
      return `
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;font-size:14px;color:#111827;">
            <div style="font-weight:600;">${escapeHtml(name)}</div>
            <div style="color:#6b7280;font-size:12px;">${escapeHtml(email)}</div>
          </td>
          <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;font-size:14px;color:#111827;text-transform:capitalize;">${escapeHtml(r.requested_role)}</td>
          <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;font-size:14px;color:${dayCellColor};font-weight:600;text-align:center;">${days}d</td>
          <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;font-size:13px;color:#4b5563;">${escapeHtml(justWithEllipsis)}</td>
        </tr>
      `;
    }).join("");

    const N = pending.length;
    const subject = `DLinRT.eu - ${N} pending role request${N === 1 ? "" : "s"} awaiting review`;

    let emailsSent = 0;
    const sendErrors: Array<{ email: string; error: string }> = [];

    for (const admin of recipients) {
      const greetingName = admin.first_name?.trim() || "Admin";
      const html = `
        <!DOCTYPE html>
        <html>
          <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
          <body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;line-height:1.5;color:#111827;max-width:640px;margin:0 auto;padding:20px;background:#f9fafb;">
            <div style="background:linear-gradient(135deg,#1e3a5f 0%,#2d8a9e 100%);padding:28px;border-radius:10px 10px 0 0;text-align:center;">
              <h1 style="color:#ffffff;margin:0;font-size:22px;">Pending Role Requests</h1>
              <p style="color:#dbeafe;margin:8px 0 0;font-size:14px;">${N} request${N === 1 ? "" : "s"} awaiting your review</p>
            </div>
            <div style="background:#ffffff;padding:24px;border-radius:0 0 10px 10px;border:1px solid #e5e7eb;border-top:none;">
              <p style="font-size:15px;margin:0 0 16px;">Hello ${escapeHtml(greetingName)},</p>
              <p style="font-size:14px;color:#4b5563;margin:0 0 20px;">
                The following role requests are still pending. Please review and approve or reject each one.
              </p>
              <table role="presentation" style="width:100%;border-collapse:collapse;background:#ffffff;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
                <thead>
                  <tr style="background:#f3f4f6;">
                    <th style="padding:10px 12px;text-align:left;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:0.04em;">Requester</th>
                    <th style="padding:10px 12px;text-align:left;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:0.04em;">Role</th>
                    <th style="padding:10px 12px;text-align:center;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:0.04em;">Waiting</th>
                    <th style="padding:10px 12px;text-align:left;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:0.04em;">Justification</th>
                  </tr>
                </thead>
                <tbody>${rowsHtml}</tbody>
              </table>
              <div style="text-align:center;margin:28px 0 8px;">
                <a href="${siteUrl}/admin" style="display:inline-block;background:#1e3a5f;color:#ffffff;padding:12px 28px;text-decoration:none;border-radius:6px;font-weight:600;font-size:14px;">Review in Admin Dashboard</a>
              </div>
              <div style="margin-top:24px;padding-top:16px;border-top:1px solid #e5e7eb;color:#6b7280;font-size:12px;">
                <p style="margin:4px 0;">You can adjust your email preferences at <a href="${siteUrl}/profile" style="color:#1e3a5f;">your profile</a>.</p>
                <p style="margin:4px 0;color:#9ca3af;">This is an automated daily summary from DLinRT.eu — sent only when there are pending requests.</p>
              </div>
            </div>
          </body>
        </html>
      `;

      try {
        await resend.emails.send({
          from: "DLinRT.eu <noreply@dlinrt.eu>",
          to: [admin.email!],
          subject,
          html,
        });
        emailsSent++;
      } catch (err: any) {
        console.error(`Failed to send digest to ${admin.email}:`, err?.message ?? err);
        sendErrors.push({ email: admin.email!, error: err?.message ?? "unknown" });
      }
    }

    // Persist last-sent metadata
    await supabase.from("reminder_settings").upsert({
      setting_key: "role_request_digest_last_sent",
      setting_value: {
        last_sent_at: new Date().toISOString(),
        pending_count: N,
        emails_sent: emailsSent,
        recipient_count: recipients.length,
        skipped: false,
      } as any,
      updated_at: new Date().toISOString(),
    }, { onConflict: "setting_key" });

    return new Response(JSON.stringify({
      success: true,
      pendingCount: N,
      emailsSent,
      recipientCount: recipients.length,
      requestIds: pending.map(p => p.id),
      sendErrors: sendErrors.length > 0 ? sendErrors : undefined,
    }), { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } });
  } catch (error: any) {
    console.error("send-role-request-digest error:", error);
    return new Response(JSON.stringify({ success: false, error: error?.message ?? "Internal error" }), {
      status: 500, headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
