// Supabase Edge Function: confirm-newsletter-resubscribe
// Verifies the signed token emailed to a previously unsubscribed address and
// reactivates the subscription. GET only; returns an HTML confirmation page.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.108.2";
import { verifyResubscribeToken } from "../_shared/resubscribe-token.ts";
import { getOrCreateAudienceId, upsertContact } from "../_shared/resend-audience.ts";

function htmlPage(title: string, message: string): Response {
  return new Response(
    `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title} — DLinRT Newsletter</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f8fafc; display: flex; justify-content: center; padding: 4rem 1rem; }
    .card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; max-width: 480px; padding: 2rem; }
    h1 { color: #1a1a2e; font-size: 1.4rem; margin-top: 0; }
    p { color: #475569; line-height: 1.6; }
    a { color: #5090D0; }
  </style>
</head>
<body>
  <div class="card">
    <h1>${title}</h1>
    <p>${message}</p>
    <p><a href="https://dlinrt.eu">Back to DLinRT.eu</a></p>
  </div>
</body>
</html>`,
    { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } },
  );
}

Deno.serve(async (req) => {
  if (req.method !== "GET") {
    return new Response("Method not allowed", { status: 405 });
  }

  const token = new URL(req.url).searchParams.get("token") ?? "";
  const payload = await verifyResubscribeToken(token);
  if (!payload) {
    return htmlPage(
      "Link invalid or expired",
      "This confirmation link is invalid or has expired. Please subscribe again at dlinrt.eu to receive a new link.",
    );
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
  );

  const email = payload.email.toLowerCase();

  // Only reactivate an existing, currently unsubscribed record.
  const { data: existing, error: selectError } = await supabase
    .from("newsletter_subscribers")
    .select("id, unsubscribed_at")
    .eq("email", email)
    .maybeSingle();

  if (selectError) {
    console.error("confirm-newsletter-resubscribe: lookup failed", selectError);
    return htmlPage("Something went wrong", "We could not process your confirmation. Please try again later.");
  }

  if (!existing) {
    return htmlPage("No subscription found", "We could not find a subscription for this email address. Please subscribe again at dlinrt.eu.");
  }

  if (!existing.unsubscribed_at) {
    return htmlPage("Already confirmed", "This email address is already subscribed to the DLinRT newsletter.");
  }

  const { error: updateError } = await supabase
    .from("newsletter_subscribers")
    .update({
      first_name: payload.firstName,
      last_name: payload.lastName,
      consent_given: true,
      unsubscribed_at: null,
      updated_at: new Date().toISOString(),
    })
    .eq("email", email);

  if (updateError) {
    console.error("confirm-newsletter-resubscribe: update failed", updateError);
    return htmlPage("Something went wrong", "We could not confirm your subscription. Please try again later.");
  }

  // Best-effort: reactivate in the Resend audience too.
  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (apiKey) {
    try {
      const audienceId = await getOrCreateAudienceId(apiKey);
      await upsertContact(apiKey, audienceId, {
        email,
        first_name: payload.firstName,
        last_name: payload.lastName,
        unsubscribed: false,
      });
    } catch (e) {
      console.warn("confirm-newsletter-resubscribe: Resend sync failed", (e as Error).message);
    }
  }

  return htmlPage(
    "Subscription confirmed",
    "Your subscription to the DLinRT newsletter has been reactivated. Welcome back!",
  );
});
