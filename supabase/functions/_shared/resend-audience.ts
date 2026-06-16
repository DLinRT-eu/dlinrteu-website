// Shared Resend audience helpers used by the newsletter sync + broadcast
// edge functions. Auto-discovers (or creates) the "DLinRT.eu Subscribers"
// audience by name so no extra secret is required.

const RESEND_API = "https://api.resend.com";
export const AUDIENCE_NAME = "DLinRT.eu Subscribers";

function authHeaders(apiKey: string) {
  return {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };
}

async function rj(res: Response): Promise<any> {
  const text = await res.text();
  try { return text ? JSON.parse(text) : null; } catch { return { raw: text }; }
}

export async function listAudiences(apiKey: string): Promise<Array<{ id: string; name: string }>> {
  const res = await fetch(`${RESEND_API}/audiences`, { headers: authHeaders(apiKey) });
  const body = await rj(res);
  if (!res.ok) throw new Error(`Resend list audiences ${res.status}: ${JSON.stringify(body)}`);
  return body?.data ?? [];
}

export async function createAudience(apiKey: string, name: string): Promise<{ id: string; name: string }> {
  const res = await fetch(`${RESEND_API}/audiences`, {
    method: "POST",
    headers: authHeaders(apiKey),
    body: JSON.stringify({ name }),
  });
  const body = await rj(res);
  if (!res.ok) throw new Error(`Resend create audience ${res.status}: ${JSON.stringify(body)}`);
  return body;
}

export async function getOrCreateAudienceId(apiKey: string, name = AUDIENCE_NAME): Promise<string> {
  // Allow override via env if explicitly set
  const override = Deno.env.get("RESEND_AUDIENCE_ID");
  if (override) return override;
  const list = await listAudiences(apiKey);
  const found = list.find((a) => a.name === name);
  if (found) return found.id;
  const created = await createAudience(apiKey, name);
  return created.id;
}

export interface ResendContact {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  unsubscribed?: boolean;
  created_at?: string;
}

export async function listContacts(apiKey: string, audienceId: string): Promise<ResendContact[]> {
  const res = await fetch(`${RESEND_API}/audiences/${audienceId}/contacts`, { headers: authHeaders(apiKey) });
  const body = await rj(res);
  if (!res.ok) throw new Error(`Resend list contacts ${res.status}: ${JSON.stringify(body)}`);
  return body?.data ?? [];
}

export async function upsertContact(
  apiKey: string,
  audienceId: string,
  contact: { email: string; first_name?: string; last_name?: string; unsubscribed?: boolean },
): Promise<{ created: boolean; id?: string }> {
  // Try create first
  const createRes = await fetch(`${RESEND_API}/audiences/${audienceId}/contacts`, {
    method: "POST",
    headers: authHeaders(apiKey),
    body: JSON.stringify(contact),
  });
  if (createRes.ok) {
    const body = await rj(createRes);
    return { created: true, id: body?.id };
  }
  // If contact exists, fall back to PATCH by email
  if (createRes.status === 409 || createRes.status === 422 || createRes.status === 400) {
    const patchRes = await fetch(
      `${RESEND_API}/audiences/${audienceId}/contacts/${encodeURIComponent(contact.email)}`,
      { method: "PATCH", headers: authHeaders(apiKey), body: JSON.stringify(contact) },
    );
    if (patchRes.ok) {
      const body = await rj(patchRes);
      return { created: false, id: body?.id };
    }
    const errBody = await rj(patchRes);
    throw new Error(`Resend patch contact ${patchRes.status}: ${JSON.stringify(errBody)}`);
  }
  const errBody = await rj(createRes);
  throw new Error(`Resend create contact ${createRes.status}: ${JSON.stringify(errBody)}`);
}

export async function markContactUnsubscribed(apiKey: string, audienceId: string, email: string): Promise<void> {
  const res = await fetch(
    `${RESEND_API}/audiences/${audienceId}/contacts/${encodeURIComponent(email)}`,
    {
      method: "PATCH",
      headers: authHeaders(apiKey),
      body: JSON.stringify({ unsubscribed: true }),
    },
  );
  if (!res.ok && res.status !== 404) {
    const body = await rj(res);
    throw new Error(`Resend unsubscribe contact ${res.status}: ${JSON.stringify(body)}`);
  }
}

export async function deleteContact(apiKey: string, audienceId: string, email: string): Promise<void> {
  const res = await fetch(
    `${RESEND_API}/audiences/${audienceId}/contacts/${encodeURIComponent(email)}`,
    { method: "DELETE", headers: authHeaders(apiKey) },
  );
  if (!res.ok && res.status !== 404) {
    const body = await rj(res);
    throw new Error(`Resend delete contact ${res.status}: ${JSON.stringify(body)}`);
  }
}

export async function createBroadcast(
  apiKey: string,
  args: { audience_id: string; from: string; subject: string; html: string; reply_to?: string; preheader?: string; name?: string },
): Promise<{ id: string }> {
  const res = await fetch(`${RESEND_API}/broadcasts`, {
    method: "POST",
    headers: authHeaders(apiKey),
    body: JSON.stringify(args),
  });
  const body = await rj(res);
  if (!res.ok) throw new Error(`Resend create broadcast ${res.status}: ${JSON.stringify(body)}`);
  return body;
}

export async function sendBroadcast(apiKey: string, broadcastId: string): Promise<void> {
  const res = await fetch(`${RESEND_API}/broadcasts/${broadcastId}/send`, {
    method: "POST",
    headers: authHeaders(apiKey),
  });
  if (!res.ok) {
    const body = await rj(res);
    throw new Error(`Resend send broadcast ${res.status}: ${JSON.stringify(body)}`);
  }
}
