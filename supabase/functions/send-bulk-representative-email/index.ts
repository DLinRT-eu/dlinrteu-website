import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

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
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}

const SITE_URL = "https://dlinrt.eu";
const INFO_EMAIL = "info@dlinrt.eu";

function escapeHtml(s: unknown): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function substitute(template: string, vars: Record<string, string>): string {
  return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, key) => vars[key] ?? "");
}

// Minimal markdown → HTML: paragraphs, **bold**, *italic*, [text](url), - lists, line breaks.
function markdownToHtml(md: string): string {
  const escaped = escapeHtml(md);
  const blocks = escaped.split(/\n{2,}/).map((block) => {
    const lines = block.split("\n");
    const isList = lines.every((l) => /^\s*-\s+/.test(l));
    if (isList) {
      const items = lines
        .map((l) => l.replace(/^\s*-\s+/, ""))
        .map((l) => `<li style="margin: 4px 0;">${inline(l)}</li>`)
        .join("");
      return `<ul style="margin: 0 0 16px; padding-left: 20px; color: #374151; font-size: 15px;">${items}</ul>`;
    }
    return `<p style="font-size: 15px; color: #374151; margin: 0 0 16px; line-height: 1.6;">${inline(block.replace(/\n/g, "<br/>"))}</p>`;
  });
  return blocks.join("\n");
}

function inline(s: string): string {
  return s
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color: #5090D0;">$1</a>');
}

function buildHtml(opts: {
  bodyMarkdown: string;
  subject: string;
  companyName: string;
  companyUrl: string;
  vars: Record<string, string>;
}): string {
  const personalizedBody = substitute(opts.bodyMarkdown, opts.vars);
  const bodyHtml = markdownToHtml(personalizedBody);
  const safeCompany = escapeHtml(opts.companyName);
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; line-height: 1.6; color: #1a1a2e; max-width: 600px; margin: 0 auto; padding: 20px; background: #ffffff;">
  <div style="background: #5090D0; padding: 24px; border-radius: 8px 8px 0 0; text-align: center;">
    <h1 style="color: #ffffff; margin: 0; font-size: 24px;">DLinRT.eu</h1>
    <p style="color: #e6f0fa; margin: 6px 0 0; font-size: 14px;">Deep Learning in Radiotherapy</p>
  </div>
  <div style="background: #ffffff; padding: 28px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
    ${bodyHtml}
    <div style="text-align: center; margin: 28px 0;">
      <a href="${opts.companyUrl}" style="display: inline-block; background: #5090D0; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 600;">View ${safeCompany} on DLinRT.eu →</a>
    </div>
    <p style="color: #6b7280; font-size: 13px; word-break: break-all;">Or open: <a href="${opts.companyUrl}" style="color: #5090D0;">${opts.companyUrl}</a></p>
    <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 13px;">
      <p style="margin: 0 0 6px;">You receive this email as a verified DLinRT.eu company representative for ${safeCompany}.</p>
      <p style="margin: 0;">Questions? Reply to this email or contact <a href="mailto:${INFO_EMAIL}" style="color: #5090D0;">${INFO_EMAIL}</a>.</p>
    </div>
  </div>
</body></html>`;
}

async function sendViaResend(apiKey: string, payload: Record<string, unknown>) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const text = await res.text();
  let data: any = null;
  try { data = text ? JSON.parse(text) : null; } catch { data = { raw: text }; }
  if (!res.ok) {
    const msg = (data && (data.message || data.error)) || `Resend HTTP ${res.status}`;
    throw new Error(typeof msg === "string" ? msg : JSON.stringify(msg));
  }
  return data;
}

interface Payload {
  subject: string;
  bodyMarkdown: string;
  recipientIds?: string[]; // company_representatives.id values
  recipientFilter?: { allVerified?: boolean; companyIds?: string[] };
  testEmail?: string;     // when provided, only sends to this address using the first matching rep's data
  companies?: { id: string; name: string }[]; // client-supplied id→name (so we don't bundle data files in the function)
}

const handler = async (req: Request): Promise<Response> => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
    const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const userClient = createClient(SUPABASE_URL, ANON_KEY, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: userData, error: userErr } = await userClient.auth.getUser(authHeader.replace("Bearer ", ""));
    if (userErr || !userData?.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const admin = createClient(SUPABASE_URL, SERVICE_KEY);
    const { data: roles } = await admin
      .from("user_roles").select("role").eq("user_id", userData.user.id).eq("role", "admin");
    if (!roles || roles.length === 0) {
      return new Response(JSON.stringify({ error: "Admin access required" }), {
        status: 403, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    if (!RESEND_API_KEY) {
      return new Response(JSON.stringify({ error: "Email service not configured" }), {
        status: 500, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const payload: Payload = await req.json();
    const { subject, bodyMarkdown, recipientIds, recipientFilter, testEmail, companies } = payload;

    if (!subject?.trim() || !bodyMarkdown?.trim()) {
      return new Response(JSON.stringify({ error: "Subject and body are required" }), {
        status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const companyNameById = new Map<string, string>();
    (companies || []).forEach((c) => companyNameById.set(c.id, c.name));

    // Fetch verified representatives matching the criteria.
    let query = admin
      .from("company_representatives")
      .select(`id, company_name, company_id, position, user_id, profiles!inner (first_name, last_name, email)`)
      .eq("verified", true)
      .neq("company_id", "admin_all_companies");

    if (recipientIds && recipientIds.length > 0) {
      query = query.in("id", recipientIds);
    } else if (recipientFilter?.companyIds && recipientFilter.companyIds.length > 0) {
      query = query.in("company_id", recipientFilter.companyIds);
    }

    const { data: reps, error: repsErr } = await query;
    if (repsErr) throw new Error(repsErr.message);

    let targets = reps || [];

    // Exclude admins (matches certification reminder behavior)
    if (targets.length > 0) {
      const userIds = targets.map((r: any) => r.user_id);
      const { data: adminRoles } = await admin.from("user_roles").select("user_id").in("user_id", userIds).eq("role", "admin");
      const adminSet = new Set((adminRoles || []).map((r: any) => r.user_id));
      targets = targets.filter((r: any) => !adminSet.has(r.user_id));
    }

    if (targets.length === 0) {
      return new Response(JSON.stringify({ success: true, recipientCount: 0, successCount: 0, failureCount: 0, message: "No eligible recipients" }), {
        status: 200, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Test send mode: render with first target's data but send only to testEmail.
    const sendList: Array<{ rep: any; toEmail: string }> = testEmail
      ? [{ rep: targets[0], toEmail: testEmail }]
      : targets.map((rep: any) => ({ rep, toEmail: rep.profiles?.email })).filter((x) => !!x.toEmail);

    let successCount = 0;
    let failureCount = 0;
    const recipientsLog: { email: string; name: string; company: string; status: string; error?: string }[] = [];

    // Simple sequential send with small delay so we stay under Resend's rate cap.
    for (let i = 0; i < sendList.length; i++) {
      const { rep, toEmail } = sendList[i];
      const firstName = rep.profiles?.first_name || "Representative";
      const lastName = rep.profiles?.last_name || "";
      const companyName = companyNameById.get(rep.company_id) || rep.company_name || rep.company_id;
      const companyUrl = `${SITE_URL}/products/company/${encodeURIComponent(rep.company_id)}`;

      const vars: Record<string, string> = {
        first_name: firstName,
        last_name: lastName,
        full_name: `${firstName} ${lastName}`.trim(),
        company_name: companyName,
        company_url: companyUrl,
        rep_position: rep.position || "",
        sender_name: userData.user.email || "DLinRT.eu Admin",
        today: new Date().toISOString().slice(0, 10),
      };

      const personalizedSubject = substitute(subject, vars);
      const html = buildHtml({ bodyMarkdown, subject: personalizedSubject, companyName, companyUrl, vars });

      try {
        await sendViaResend(RESEND_API_KEY, {
          from: "DLinRT.eu <noreply@dlinrt.eu>",
          to: [toEmail],
          subject: personalizedSubject,
          html,
        });
        successCount++;
        recipientsLog.push({ email: toEmail, name: vars.full_name, company: companyName, status: "sent" });
      } catch (e: any) {
        failureCount++;
        recipientsLog.push({ email: toEmail, name: vars.full_name, company: companyName, status: "failed", error: e?.message });
        console.error(`Send failed to ${toEmail}:`, e?.message);
      }

      // Throttle ~6/sec
      if (i < sendList.length - 1) await new Promise((r) => setTimeout(r, 180));
    }

    if (!testEmail) {
      await admin.from("admin_bulk_email_log").insert({
        sent_by: userData.user.id,
        subject,
        body_markdown: bodyMarkdown,
        recipient_count: sendList.length,
        success_count: successCount,
        failure_count: failureCount,
        recipients: recipientsLog,
      });
    }

    return new Response(JSON.stringify({
      success: true,
      recipientCount: sendList.length,
      successCount,
      failureCount,
      testMode: !!testEmail,
    }), { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } });
  } catch (error: any) {
    console.error("send-bulk-representative-email error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500, headers: { "Content-Type": "application/json", ...getCorsHeaders(req.headers.get("origin")) },
    });
  }
};

serve(handler);
