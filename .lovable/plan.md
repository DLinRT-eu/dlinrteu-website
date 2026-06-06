## Bug

In `supabase/functions/notify-reviewer-assignment/index.ts` (line 155), the dashboard CTA is built from the Supabase project URL:

```ts
const dashboardUrl = `${supabaseUrl.replace('.supabase.co', '')}/review`;
```

That produces `https://msyfxyxzjyowwasgturs/review` (only the `.supabase.co` suffix is stripped — `https://` and the project ref remain), which is not a real host. So the "Go to Review Dashboard" button in the assignment email is broken.

Additionally, `/review` is the admin review-rounds dashboard. The recipient is a reviewer, so the link should point to the reviewer dashboard (`/reviewer/dashboard`).

## Audit of similar link patterns in other edge functions

I scanned every function in `supabase/functions/` for URL construction. Results:

- `notify-reviewer-assignment` — BROKEN (described above).
- All other notification/email functions hardcode `https://dlinrt.eu` (e.g. `notify-user-approval`, `notify-user-registration`, `notify-role-request-outcome`, `send-notification-digest`, `send-deadline-reminders`, `send-certification-reminder`, `subscribe-newsletter`, `unsubscribe-newsletter`) — OK.
- `invite-reviewer` and `invite-company-representative` use `SITE_URL` env var with `https://dlinrt.eu` fallback — OK.
- No other occurrence of `supabaseUrl.replace(...)` or similar broken patterns exists.

## Fix

In `supabase/functions/notify-reviewer-assignment/index.ts`:

1. Replace the broken `dashboardUrl` line with a hardcoded site URL consistent with sibling functions:
   ```ts
   const siteUrl = "https://dlinrt.eu";
   const dashboardUrl = `${siteUrl}/reviewer/dashboard`;
   ```
2. No other files need changes — the audit confirmed all other email links are well-formed.

## Out of scope

- Centralising the site URL into a shared constant or env var (would touch ~10 functions for no functional gain right now).
- Email template visual changes.
