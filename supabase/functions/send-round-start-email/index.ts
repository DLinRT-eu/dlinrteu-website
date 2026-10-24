import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.108.2";
import { Resend } from "npm:resend@4.0.0";
import { getCorsHeaders, rejectDisallowedOrigin } from "../_shared/cors.ts";
import { isSuppressed, logEmailSend, resendMessageId } from "../_shared/email-delivery.ts";

const FUNCTION_NAME = "send-round-start-email";
const SITE = "https://dlinrt.eu";
const UUID_RE = /^[0-9a-f-]{36}$/i;

interface Body {
  round_id: string;
  intro?: string;
  product_names?: Record<string, string>;
  reviewer_ids?: string[];
  dry_run?: boolean;
}

const esc = (s: unknown) =>
  String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");

const fmtDate = (d: string) =>
  new Date(`${d}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

function parseBody(raw: unknown): Body | null {
  if (!raw || typeof raw !== "object") return null;
  const b = raw as Record<string, unknown>;
  if (typeof b.round_id !== "string" || !UUID_RE.test(b.round_id)) return null;
  if (b.intro !== undefined && (typeof b.intro !== "string" || b.intro.length > 4000)) return null;
  const names: Record<string, string> = {};
  if (b.product_names && typeof b.product_names === "object") {
    for (const [k, v] of Object.entries(b.product_names as Record<string, unknown>)) {
      if (typeof v === "string" && k.length < 200) names[k] = v.slice(0, 200);
    }
  }
  if (Object.keys(names).length > 1000) return null;
  if (Array.isArray(b.reviewer_ids) && b.reviewer_ids.length > 500) return null;
  const ids = Array.isArray(b.reviewer_ids) ? b.reviewer_ids.filter((x): x is string => typeof x === "string" && UUID_RE.test(x)) : undefined;
  return { round_id: b.round_id, intro: b.intro as string | undefined, product_names: names, reviewer_ids: ids, dry_run: b.dry_run === true };
}

function renderEmail(firstName: string, roundName: string, deadline: string, intro: string, products: { id: string; name: string }[]) {
  const items = products
    .map((p) => `<li style="margin:4px 0"><a href="${SITE}/product/${encodeURIComponent(p.id)}" style="color:#5090D0">${esc(p.name)}</a></li>`)
    .join("");
  const introHtml = esc(intro).split(/\n{2,}/).map((p) => `<p>${p.replace(/\n/g, "<br>")}</p>`).join("");
  return `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;color:#1a1a2e;line-height:1.5;max-width:600px;margin:0 auto;padding:20px">
<div style="background:#5090D0;color:#fff;padding:20px;border-radius:8px 8px 0 0"><h1 style="margin:0;font-size:20px">DLinRT review round is open</h1><p style="margin:4px 0 0">${esc(roundName)}</p></div>
<div style="border:1px solid #e5e7eb;border-top:0;padding:20px;border-radius:0 0 8px 8px">
<p>Dear ${esc(firstName || "reviewer")},</p>
${introHtml}
<p style="background:#f0f6fc;padding:12px;border-radius:6px"><strong>Deadline: ${esc(deadline)}</strong></p>
<p><strong>Your assigned products (${products.length}):</strong></p>
<ul style="padding-left:20px">${items}</ul>
<p><a href="${SITE}/reviewer/dashboard" style="display:inline-block;background:#5090D0;color:#fff;padding:10px 18px;border-radius:6px;text-decoration:none">Open your reviewer dashboard</a></p>
<p>New to reviewing, or want a refresher? See the <a href="${SITE}/reviewer/guide" style="color:#5090D0">Reviewer Guide</a>.</p>
<p>Questions? <a href="${SITE}/support" style="color:#5090D0">Get in touch</a> or reply to this email.</p>
<p>Thank you for your time and help keeping DLinRT.eu accurate.</p>
<p>The DLinRT.eu team</p>
<hr style="border:0;border-top:1px solid #e5e7eb"><p style="font-size:12px;color:#6b7280">You receive this because you are a DLinRT.eu reviewer. Manage email settings at <a href="${SITE}/notification-settings" style="color:#6b7280">${SITE}/notification-settings</a>.</p>
</div></body></html>`;
}

const handler = async (req: Request): Promise<Response> => {
  const cors = getCorsHeaders(req.headers.get("origin"));
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  const rejected = rejectDisallowedOrigin(req);
  if (rejected) return rejected;
  const json = (data: unknown, status = 200) =>
    new Response(JSON.stringify(data), { status, headers: { ...cors, "Content-Type": "application/json" } });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) return json({ error: "Unauthorized" }, 401);
    const url = Deno.env.get("SUPABASE_URL")!;
    const admin = createClient(url, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const { data: userData, error: userErr } = await admin.auth.getUser(authHeader.replace("Bearer ", ""));
    if (userErr || !userData?.user) return json({ error: "Unauthorized" }, 401);
    const { data: isAdmin } = await admin.rpc("has_role", { _user_id: userData.user.id, _role: "admin" });
    if (!isAdmin) return json({ error: "Admin access required" }, 403);

    const body = parseBody(await req.json().catch(() => null));
    if (!body) return json({ error: "Invalid request" }, 400);

    const { data: round } = await admin.from("review_rounds").select("id, name, default_deadline, end_date").eq("id", body.round_id).maybeSingle();
    if (!round) return json({ error: "Round not found" }, 404);

    const { data: reviews, error: revErr } = await admin
      .from("product_reviews")
      .select("product_id, assigned_to, deadline")
      .eq("review_round_id", body.round_id)
      .not("assigned_to", "is", null);
    if (revErr) throw revErr;

    const byReviewer = new Map<string, { products: string[]; deadline: string | null }>();
    for (const r of reviews ?? []) {
      const e = byReviewer.get(r.assigned_to) ?? { products: [], deadline: null };
      e.products.push(r.product_id);
      const d = r.deadline ?? round.default_deadline ?? round.end_date;
      if (d && (!e.deadline || d > e.deadline)) e.deadline = d;
      byReviewer.set(r.assigned_to, e);
    }
    let ids = Array.from(byReviewer.keys());
    if (body.reviewer_ids?.length) ids = ids.filter((id) => body.reviewer_ids!.includes(id));

    const { data: profiles } = await admin.from("profiles").select("id, email, first_name, last_name, notification_preferences").in("id", ids.length ? ids : ["00000000-0000-0000-0000-000000000000"]);
    const names = body.product_names ?? {};
    const recipients = (profiles ?? []).map((p) => {
      const e = byReviewer.get(p.id)!;
      const optedOut = (p.notification_preferences as any)?.categories?.review_assignments?.email === false;
      return { id: p.id, email: p.email as string, firstName: p.first_name as string, lastName: p.last_name as string, optedOut, deadline: e.deadline, products: e.products.map((id) => ({ id, name: names[id] ?? id })) };
    });

    if (body.dry_run) {
      return json({ round: round.name, recipients: recipients.map(({ id, email, firstName, lastName, optedOut, deadline, products }) => ({ id, email, name: `${firstName} ${lastName}`.trim(), optedOut, deadline, productCount: products.length })) });
    }

    const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
    const intro = body.intro?.trim() ||
      "The new DLinRT.eu review round has started and your products are ready for review. Please check each entry against its sources and update or confirm the information.";
    const results: { email: string; status: string; error?: string }[] = [];

    for (const r of recipients) {
      const deadline = r.deadline ? fmtDate(r.deadline) : "to be announced";
      const subject = `DLinRT review round ${round.name} is open — deadline ${deadline}`;
      if (r.optedOut) { results.push({ email: r.email, status: "skipped_opt_out" }); continue; }
      if (await isSuppressed(admin, r.email)) {
        await logEmailSend(admin, { functionName: FUNCTION_NAME, recipient: r.email, subject, status: "suppressed", error: "Recipient previously hard-bounced or complained" });
        results.push({ email: r.email, status: "suppressed" });
        continue;
      }
      try {
        const res = await resend.emails.send({
          from: "DLinRT.eu Review System <noreply@dlinrt.eu>",
          reply_to: "info@dlinrt.eu",
          to: [r.email],
          subject,
          html: renderEmail(r.firstName, round.name, deadline, intro, r.products),
        });
        if ((res as any)?.error) throw new Error((res as any).error.message ?? "Send failed");
        await logEmailSend(admin, { functionName: FUNCTION_NAME, recipient: r.email, subject, status: "sent", resendId: resendMessageId(res) });
        results.push({ email: r.email, status: "sent" });
      } catch (e) {
        const msg = (e as Error).message;
        await logEmailSend(admin, { functionName: FUNCTION_NAME, recipient: r.email, subject, status: "failed", error: msg });
        results.push({ email: r.email, status: "failed", error: msg });
      }
    }

    return json({
      sent: results.filter((r) => r.status === "sent").length,
      skipped: results.filter((r) => r.status !== "sent" && r.status !== "failed").length,
      failed: results.filter((r) => r.status === "failed").length,
      results,
    });
  } catch (e) {
    console.error(`${FUNCTION_NAME} error:`, e);
    return json({ error: "Internal error" }, 500);
  }
};

serve(handler);
