export const INBOX_ADDRESS = "info@dlinrt.eu";
export const MAX_REPLY_CHARS = 20000;
export const MAX_SUBJECT_CHARS = 200;
export const MAX_RECIPIENTS = 20;

const EMAIL_RE = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;

export function extractAddress(raw: string): string {
  const m = raw.match(/<([^>]+)>/);
  return (m ? m[1] : raw).trim().toLowerCase();
}

export function isAddressedToInbox(to: string[] | undefined, cc: string[] | undefined = []): boolean {
  return [...(to ?? []), ...(cc ?? [])].some((a) => extractAddress(a) === INBOX_ADDRESS);
}

export function replySubject(subject: string | null | undefined): string {
  const s = (subject ?? "").trim();
  if (/^re:/i.test(s)) return s.slice(0, MAX_SUBJECT_CHARS);
  return `Re: ${s}`.slice(0, MAX_SUBJECT_CHARS);
}

export function threadHeaders(messageId: string | null | undefined, references?: string | null): Record<string, string> {
  if (!messageId) return {};
  const refs = [references?.trim(), messageId].filter(Boolean).join(" ");
  return { "In-Reply-To": messageId, References: refs };
}

export interface ReplyInput { id: string; to: string[]; cc: string[]; subject: string; body: string }

export function validateReply(raw: unknown): ReplyInput | string {
  if (!raw || typeof raw !== "object") return "Invalid request";
  const b = raw as Record<string, unknown>;
  if (typeof b.id !== "string" || !/^[0-9a-f-]{36}$/i.test(b.id)) return "Invalid message";
  const list = (v: unknown) => (Array.isArray(v) ? v.filter((x): x is string => typeof x === "string").map(extractAddress) : []);
  const to = list(b.to);
  const cc = list(b.cc).filter((a) => a !== INBOX_ADDRESS);
  if (to.length === 0) return "At least one recipient is required";
  if (to.length + cc.length > MAX_RECIPIENTS) return "Too many recipients";
  if ([...to, ...cc].some((a) => !EMAIL_RE.test(a))) return "Invalid recipient address";
  if (typeof b.subject !== "string" || !b.subject.trim() || b.subject.length > MAX_SUBJECT_CHARS || /[\r\n]/.test(b.subject)) return "Invalid subject";
  if (typeof b.body !== "string" || !b.body.trim() || b.body.length > MAX_REPLY_CHARS) return "Message must be 1–20,000 characters";
  return { id: b.id, to, cc, subject: b.subject.trim(), body: b.body };
}
