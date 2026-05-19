# Cookie Security Audit

## Finding: cookies readable in JS is expected here, not a vulnerability

The cookies set by the site are intentionally JS-readable. They cannot be made `HttpOnly` from the browser — that flag can only be set by a server in a `Set-Cookie` response header, and this app writes cookies from the client via `document.cookie`.

### Inventory of cookies set by the app

| Cookie | Set by | Purpose | Sensitive? |
|---|---|---|---|
| `dlinrt-cookie-consent` | `src/utils/cookieUtils.ts` | GDPR consent record | No |
| `dlinrt-visitor-id` | analytics tracker | Anonymous dedup of unique visitors | No (random UUID, no PII) |
| `sidebar:state` | `src/components/ui/sidebar.tsx` | UI preference | No |
| `dlinrt-session-id` | analytics | Stored in `sessionStorage`, not a cookie | n/a |

### Auth tokens are NOT in cookies

Supabase auth (`src/integrations/supabase/client.ts`) uses `localStorage` with `storageKey: 'dlinrt-auth-token'`. So there is no session/JWT cookie that an XSS payload could steal via `document.cookie` — the real session token sits in localStorage and is equally JS-readable by design (Supabase JS SDK requires it).

The banner and analytics dedup logic both need to read these cookies from JS on every page load, so `HttpOnly` would break them even if it were settable.

### Current hardening already in place

`cookieUtils.ts` sets `SameSite=Strict` and `Secure` (in production) on every cookie it writes, plus signed CSP headers in `public/_headers`. That is the correct mitigation set for client-written cookies.

## Gaps worth fixing (small)

1. **`sidebar:state` cookie is not hardened.** `src/components/ui/sidebar.tsx:85` writes it without `Secure` or `SameSite`. Low risk (UI preference) but trivial to harden — add `secure; samesite=lax`.
2. **No documented threat model for cookies.** Add a short comment in `cookieUtils.ts` (already partially there) and one line in `SECURITY.md` so future reviewers don't re-flag this.

## Things NOT to do

- Do not try to set `HttpOnly` from JS — silently ignored by browsers.
- Do not move the Supabase auth token into a cookie to "fix" this. Switching Supabase auth to cookie storage requires SSR/edge middleware this app doesn't have, and would introduce CSRF surface that doesn't currently exist.
- Do not remove the analytics/consent cookies — they are required for the consent flow itself.

## Proposed change set (if you approve)

- `src/components/ui/sidebar.tsx`: append `; secure; samesite=lax` to the sidebar cookie write.
- `SECURITY.md`: add a 3-line "Cookie threat model" subsection stating that no auth/PII is stored in cookies, all client cookies use SameSite=Strict+Secure, and HttpOnly is N/A for client-written cookies.

No data-model, RLS, or auth changes. No UX change.
