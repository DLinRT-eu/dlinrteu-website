// Shared helper for internal notification recipients.
// info@dlinrt.eu stays the public contact address, but internal alerts are
// delivered directly to team members (IONOS forwarding is unreliable).

const FALLBACK_ADMIN_EMAILS = [
  "m.maspero@umcutrecht.nl",
  "ana.barragan@uclouvain.be",
];

export function getAdminNotificationEmails(): string[] {
  const raw = Deno.env.get("ADMIN_NOTIFICATION_EMAILS") ?? "";
  const parsed = raw
    .split(",")
    .map((e) => e.trim())
    .filter((e) => e.length > 0 && e.includes("@"));

  if (parsed.length > 0) return parsed;

  console.warn(
    "admin-recipients: ADMIN_NOTIFICATION_EMAILS is not set or invalid; using the built-in fallback list",
  );
  return [...FALLBACK_ADMIN_EMAILS];
}
