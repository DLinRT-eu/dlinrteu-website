// Shared CORS helpers for DLinRT edge functions
// Allowlist: production domains + Lovable preview subdomains + localhost dev.

export const ALLOWED_ORIGINS = [
  "https://dlinrt.eu",
  "https://www.dlinrt.eu",
  "http://localhost:5173",
  "http://localhost:3000",
];

export function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false;
  if (ALLOWED_ORIGINS.includes(origin)) return true;
  if (/^https:\/\/[a-z0-9-]+\.lovable\.app$/.test(origin)) return true;
  if (/^https:\/\/[a-z0-9-]+\.lovableproject\.com$/.test(origin)) return true;
  return false;
}

export function getCorsHeaders(origin: string | null): Record<string, string> {
  const allowedOrigin = isAllowedOrigin(origin) ? origin! : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Vary": "Origin",
  };
}

/**
 * Returns a 403 Response if the request origin is not allowlisted,
 * otherwise null so the handler can proceed.
 *
 * Use this at the very top of public POST handlers to fail-fast before
 * parsing untrusted bodies from cross-origin attackers.
 */
export function rejectDisallowedOrigin(req: Request): Response | null {
  const origin = req.headers.get("origin");
  // Same-origin / server-to-server calls won't send Origin; allow them through.
  if (!origin) return null;
  if (isAllowedOrigin(origin)) return null;
  return new Response(
    JSON.stringify({ error: "Origin not allowed" }),
    {
      status: 403,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": ALLOWED_ORIGINS[0],
        "Vary": "Origin",
      },
    },
  );
}
