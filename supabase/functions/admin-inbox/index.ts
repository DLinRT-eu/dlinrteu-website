import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.108.2";
import { getCorsHeaders, rejectDisallowedOrigin } from "../_shared/cors.ts";
import { dailySendCount, isSuppressed, logEmailSend, wouldExceedDailyCap } from "../_shared/email-delivery.ts";
import { INBOX_ADDRESS, isAddressedToInbox, threadHeaders, validateReply } from "./replyHelpers.ts";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";
const FUNCTION_NAME = "admin-inbox-reply";
const DAILY_REPLY_CAP = 200;
const ID_RE = /^[0-9a-f-]{36}$/i;

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

async function gateway(path: string, init: RequestInit = {}) {
  const lovableKey = Deno.env.get("LOVABLE_API_KEY");
  const resendKey = Deno.env.get("RESEND_API_KEY");
  if (!lovableKey || !resendKey) throw new Error("Mail service not configured");
  const res = await fetch(`${GATEWAY_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": resendKey,
      ...(init.headers ?? {}),
    },
  });
  const text = await res.text();
  if (!res.ok) {
    console.error(`admin-inbox gateway ${path} [${res.status}]: ${text.slice(0, 500)}`);
    throw new Error(`Mail service error (${res.status})`);
  }
  return text ? JSON.parse(text) : {};
}

serve(async (req) => {
  const cors = getCorsHeaders(req.headers.get("origin"));
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  const rejected = rejectDisallowedOrigin(req);
  if (rejected) return rejected;
  const json = (data: unknown, status = 200) =>
    new Response(JSON.stringify(data), { status, headers: { ...cors, "Content-Type": "application/json" } });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) return json({ error: "Unauthorized" }, 401);
    const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const { data: userData, error: userErr } = await admin.auth.getUser(authHeader.replace("Bearer ", ""));
    if (userErr || !userData?.user) return json({ error: "Unauthorized" }, 401);
    const { data: isAdmin } = await admin.rpc("has_role", { _user_id: userData.user.id, _role: "admin" });
    if (!isAdmin) return json({ error: "Forbidden" }, 403);

    const body = await req.json().catch(() => null) as Record<string, unknown> | null;
    const action = body?.action;

    if (action === "list") {
      const folder = body?.folder === "sent" ? "sent" : "inbox";
      const after = typeof body?.after === "string" && ID_RE.test(body.after) ? `&after=${body.after}` : "";
      if (folder === "inbox") {
        const res = await gateway(`/emails/receiving?limit=50${after}`);
        const items = (res.data ?? []).filter((m: { to?: string[]; cc?: string[] }) => isAddressedToInbox(m.to, m.cc));
        return json({ items, has_more: !!res.has_more, last_id: res.data?.at(-1)?.id ?? null });
      }
      const res = await gateway(`/emails?limit=50${after}`);
      const items = (res.data ?? []).filter((m: { from?: string }) => (m.from ?? "").toLowerCase().includes(INBOX_ADDRESS));
      return json({ items, has_more: !!res.has_more, last_id: res.data?.at(-1)?.id ?? null });
    }

    if (action === "get") {
      if (typeof body?.id !== "string" || !ID_RE.test(body.id)) return json({ error: "Invalid message" }, 400);
      const path = body?.folder === "sent" ? `/emails/${body.id}` : `/emails/receiving/${body.id}`;
      return json(await gateway(path));
    }

    if (action === "attachment") {
      if (typeof body?.id !== "string" || !ID_RE.test(body.id) || typeof body?.attachment_id !== "string" || !ID_RE.test(body.attachment_id)) {
        return json({ error: "Invalid attachment" }, 400);
      }
      return json(await gateway(`/emails/receiving/${body.id}/attachments/${body.attachment_id}`));
    }

    if (action === "reply") {
      const input = validateReply(body);
      if (typeof input === "string") return json({ error: input }, 400);
      const sent = await dailySendCount(admin, FUNCTION_NAME);
      if (wouldExceedDailyCap(sent, 1, DAILY_REPLY_CAP)) return json({ error: "Daily reply limit reached. Try again tomorrow." }, 429);
      for (const r of [...input.to, ...input.cc]) {
        if (await isSuppressed(admin, r)) return json({ error: `${r} previously bounced or reported spam; not sent.` }, 400);
      }
      const original = await gateway(`/emails/receiving/${input.id}`);
      const headers = threadHeaders(original.message_id, original.headers?.references ?? original.headers?.References);
      const html = `<div style="font-family:Arial,sans-serif;color:#1a1a2e;line-height:1.5">${esc(input.body).replace(/\n/g, "<br>")}</div>`;
      const result = await gateway("/emails", {
        method: "POST",
        body: JSON.stringify({
          from: `DLinRT.eu <${INBOX_ADDRESS}>`,
          to: input.to,
          cc: input.cc.length ? input.cc : undefined,
          reply_to: INBOX_ADDRESS,
          subject: input.subject,
          text: input.body,
          html,
          headers,
        }),
      });
      for (const r of [...input.to, ...input.cc]) {
        await logEmailSend(admin, { functionName: FUNCTION_NAME, recipient: r, subject: input.subject, status: "sent", resendId: result.id ?? null });
      }
      return json({ ok: true, id: result.id ?? null });
    }

    return json({ error: "Unknown action" }, 400);
  } catch (err) {
    console.error("admin-inbox error:", err);
    return json({ error: "Mail service unavailable. Please try again." }, 500);
  }
});
