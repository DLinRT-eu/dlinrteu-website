

## Plan: Harden cookies against JavaScript access (XSS exfiltration)

### Findings

The site sets cookies from client-side JS (`document.cookie = …`) in `src/utils/cookieUtils.ts`. These cookies cannot use the `HttpOnly` flag — by definition, any cookie set via `document.cookie` is JS-readable. The flagged cookies are:

| Cookie | Set in | Contains |
|---|---|---|
| `dlinrt-cookie-consent` | `cookieUtils.ts` (consent banner) | Consent flags + timestamp (no PII, no session token) |
| `dlinrt-visitor-id` | `storageUtils.ts` (analytics) | Random visitor UUID (no PII, no session token) |

The actual **auth session token** (`dlinrt-auth-token`) is stored in `localStorage` (see `src/integrations/supabase/client.ts`), not in a cookie — Supabase manages it. So no session/auth cookie is exposed here.

### What we can actually improve client-side

Since these cookies are set from JS, `HttpOnly` is impossible. We can still tighten them:

1. **Force `Secure` flag unconditionally** — currently only set when `location.protocol === 'https:'`. In production this is always HTTPS, so make it unconditional (remove the localhost exception, or keep it dev-only via `import.meta.env.DEV`).
2. **Upgrade `SameSite` from `lax` to `strict`** for both cookies — they have no cross-site use case (no third-party embeds, no OAuth redirect dependency on these specific cookies).
3. **Add `__Host-` prefix consideration** — skipped: requires no `domain` attribute and `path=/`, which we already do, but the prefix would force a rename and break existing consent state for all current visitors. Not worth the churn for non-sensitive cookies.
4. **Document why HttpOnly is N/A** — add a short comment in `cookieUtils.ts` explaining these cookies must be JS-readable (consent UI reads them on every page load to decide whether to show the banner; analytics reads visitor ID to deduplicate). Note that no session/auth token is stored in a cookie.
5. **Mark the security finding as acknowledged with mitigation** — submit a `security--manage_security_finding` entry explaining: (a) auth tokens are not in cookies, (b) the two JS cookies contain no PII or credentials, (c) Secure + SameSite=Strict are now enforced, (d) the residual JS-readability is required by the consent/analytics design.

### Files touched

- `src/utils/cookieUtils.ts` — change defaults: `secure: true` (always in prod), `sameSite: 'strict'`; same for the consent cookie write block. Add a 3-line comment explaining the HttpOnly limitation.
- No changes to `client.ts` (Supabase auth uses localStorage, not cookies — out of scope of this finding).
- No DB / edge function / migration changes.

### Out of scope (and why)

- Moving Supabase auth from localStorage to HttpOnly cookies — would require a custom auth proxy edge function and is a much larger architectural change. Not requested, and localStorage is Supabase's documented default.
- Renaming cookies to `__Host-` prefix — would invalidate every visitor's consent state.

