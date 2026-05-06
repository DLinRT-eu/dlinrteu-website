# Fix: Newsletter admin page appears empty

## Diagnosis
- DB query confirms **101 active subscribers** exist in `newsletter_subscribers` (no data loss).
- Edge-function logs for `admin-newsletter-management` show only `OPTIONS | 200` requests in the last hour — the actual `POST` never reaches the function.
- The function's `getCorsHeaders` returns only `Access-Control-Allow-Origin` and `Access-Control-Allow-Headers`, and only allows `dlinrt.eu`, `www.dlinrt.eu`, `localhost`, and `*.lovable.app`.
- The current preview is served from `*.lovableproject.com`, which is **not** in the allowlist, and the preflight is missing `Access-Control-Allow-Methods`. Browsers therefore block the POST and the page silently renders empty.

## Fix
Edit `supabase/functions/admin-newsletter-management/index.ts` only — update `getCorsHeaders`:

```ts
function getCorsHeaders(origin: string | null): Record<string, string> {
  const isAllowed = origin && (
    ALLOWED_ORIGINS.includes(origin) ||
    origin.endsWith('.lovable.app') ||
    origin.endsWith('.lovableproject.com')
  );
  return {
    'Access-Control-Allow-Origin': isAllowed ? origin : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin',
  };
}
```

That's the only change needed. After redeploy (automatic), the admin page will load all 101 subscribers normally.

## Files touched
- `supabase/functions/admin-newsletter-management/index.ts` (CORS only)

## Note on console warnings
The `DialogContent` accessibility warnings in the console come from the Command Palette dialog (no `DialogTitle`). Cosmetic, unrelated to the empty newsletter, but I can wrap a `VisuallyHidden` title in a follow-up if you want.
