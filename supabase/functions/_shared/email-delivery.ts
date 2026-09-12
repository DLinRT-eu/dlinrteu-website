// Shared delivery-safety helpers for outgoing email.
//
// Resend delivery events are recorded in `email_send_log` by the `resend-webhook`
// function. These helpers use that log to (a) avoid re-sending to addresses that
// hard-bounced or filed a spam complaint, and (b) record every outgoing send so
// deliveries can be correlated with later delivery events.

type SupabaseLike = {
  from: (table: string) => any;
};

const SUPPRESSING_STATUSES = ["bounced", "complained"];

// Resend reports soft failures (mailbox full, out of office, transient) that must
// not permanently suppress an address.
const SOFT_BOUNCE_TYPES = ["Transient", "transient", "Undetermined", "undetermined"];

export interface EmailLogEntry {
  functionName: string;
  recipient: string;
  subject?: string | null;
  status: "queued" | "sent" | "suppressed" | "failed";
  resendId?: string | null;
  error?: string | null;
}

/**
 * True when the address previously produced a hard bounce or a spam complaint.
 * Fails open (returns false) so a logging problem never blocks legitimate mail.
 */
export async function isSuppressed(supabase: SupabaseLike, email: string): Promise<boolean> {
  const recipient = email.trim().toLowerCase();
  if (!recipient) return false;

  try {
    const { data, error } = await supabase
      .from("email_send_log")
      .select("status, bounce_type")
      .eq("recipient", recipient)
      .in("status", SUPPRESSING_STATUSES)
      .limit(50);

    if (error) {
      console.warn("email-delivery: suppression lookup failed", error.message);
      return false;
    }

    return (data ?? []).some((row: { status: string; bounce_type: string | null }) => {
      if (row.status === "complained") return true;
      return !SOFT_BOUNCE_TYPES.includes(row.bounce_type ?? "");
    });
  } catch (e) {
    console.warn("email-delivery: suppression lookup threw", (e as Error).message);
    return false;
  }
}

/** Filters a recipient list down to addresses that are safe to mail. */
export async function filterSuppressed(
  supabase: SupabaseLike,
  emails: string[],
  functionName: string,
): Promise<string[]> {
  const allowed: string[] = [];
  for (const email of emails) {
    if (await isSuppressed(supabase, email)) {
      await logEmailSend(supabase, {
        functionName,
        recipient: email,
        status: "suppressed",
        error: "Recipient previously hard-bounced or complained",
      });
      continue;
    }
    allowed.push(email);
  }
  return allowed;
}

/** Records an outgoing send (or a skip) in `email_send_log`. Never throws. */
export async function logEmailSend(supabase: SupabaseLike, entry: EmailLogEntry): Promise<void> {
  try {
    const { error } = await supabase.from("email_send_log").insert({
      function_name: entry.functionName,
      recipient: entry.recipient.trim().toLowerCase(),
      subject: entry.subject ?? null,
      status: entry.status,
      resend_id: entry.resendId ?? null,
      error: entry.error ?? null,
    });
    if (error) console.warn("email-delivery: send log insert failed", error.message);
  } catch (e) {
    console.warn("email-delivery: send log insert threw", (e as Error).message);
  }
}

/** Extracts the Resend message id from a send response, when present. */
export function resendMessageId(response: unknown): string | null {
  const data = (response as { data?: { id?: string } } | null)?.data;
  return data?.id ?? null;
}
