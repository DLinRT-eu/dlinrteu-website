# Cookie warnings: findings and proposed action

## What the scanner flagged
1. **SameSite=None**: this is the `__cf_bm` cookie, which the hosting provider's (Cloudflare) bot protection sets on dlinrt.eu, www.dlinrt.eu and the lovable.app address. It is already HttpOnly, Secure and Partitioned, has a 30-minute lifetime and holds no user data. DLinRT code does not create it and cannot change it.
2. **HttpOnly missing**: these are DLinRT's own cookies, the cookie-consent choice and the sidebar open/closed state. Only the browser's own page code can read them, and a cookie created by page code can never be HttpOnly. They already use SameSite=Strict/Lax and Secure in production. They hold no login token, because sign-in uses browser storage, not cookies.

## Proposed action (no functional change)
- Keep the cookies as they are. Making them HttpOnly would break the consent banner and the sidebar, and there is nothing secret in them to protect.
- Add one line to the cookie/privacy section of `SECURITY.md` that names the `__cf_bm` hosting cookie, says why it uses SameSite=None, and says the consent and sidebar cookies are readable by page code on purpose.
- No database, login or security-scan finding changes.

## Technical details
- Checked with `curl -I` on all three domains: `__cf_bm=...; HttpOnly; SameSite=None; Partitioned; Secure`.
- `src/utils/cookieUtils.ts` (consent, SameSite=Strict) and `src/components/ui/sidebar.tsx` (SameSite=Lax) already have comments explaining why HttpOnly isn't possible.
