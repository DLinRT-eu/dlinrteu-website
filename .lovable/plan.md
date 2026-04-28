## Problem

The most recent registration (paul.naine@liminal-x.ai, 2026-04-26) did not produce an admin notification email. Investigation found:

- `notify-user-registration` edge function exists but has **zero invocations in its logs** and is **not called from anywhere** — no client code, no DB trigger, no cron, no webhook.
- The `handle_new_user` trigger creates a row in `user_registration_notifications` with `notification_status = 'pending'` (or `'blocked'` for non-institutional emails) and `notification_sent_at` set to `NOW()` — but that timestamp is misleading because nothing actually sends the email.
- Existing rows show `notification_status` flips to `'approved'` only after admin manually approves the user — so the table is being repurposed as a verification record rather than an outbound-email log, and no email is ever dispatched on signup.
- Result: every new registration since this code path was added has been silently missing the admin alert. Only the daily role-request digest (existing cron) catches role-request rows the next morning, and only if a role was requested.

## Fix

Add a database trigger that calls the `notify-user-registration` edge function via `pg_net` immediately after a profile row is created. This mirrors the existing pattern used by other cron jobs in `cron.job` (which already use `net.http_post` with the service role bearer).

### 1. Migration: trigger on profiles insert

Create `notify_admin_on_registration()` as a `SECURITY DEFINER` function that:
- Reads the new profile's id, email, first_name, last_name, created_at
- Calls `net.http_post` to `https://msyfxyxzjyowwasgturs.supabase.co/functions/v1/notify-user-registration` with the service role bearer and JSON body `{ userId, email, firstName, lastName, createdAt }`
- Wraps the call in `BEGIN/EXCEPTION WHEN OTHERS` so a network failure never blocks signup
- Updates `user_registration_notifications.notification_sent_at` only after a successful call (and writes `failure_reason` on error)

Attach it as `AFTER INSERT ON public.profiles FOR EACH ROW`.

### 2. Edge function adjustment (small)

`notify-user-registration/index.ts`:
- Keep the existing service-role auth check (it's correct — pg_net will send the service-role bearer).
- Add CORS headers using the standard `getCorsHeaders` allowlist pattern (currently missing — it's a private function so this is defensive only).
- After a successful Resend send, write back to `user_registration_notifications` (`notification_sent_at = now()`, clear `failure_reason`); on failure, write `failure_reason`. This makes the table truthful.

### 3. Backfill the missing notification

Manually invoke `notify-user-registration` once for paul.naine@liminal-x.ai so the admin gets the alert that was missed (one-shot SQL `SELECT net.http_post(...)`).

### 4. Verify

- Confirm pg_net request id appears in `net.http_request_queue` / `net._http_response`.
- Confirm `notify-user-registration` edge function logs show the invocation and a successful Resend send.
- Confirm `user_registration_notifications` row for paul.naine has `notification_sent_at` updated.

## Out of scope

- No change to `handle_new_user`, the role-request flow, the daily digest, or admin approval UI.
- No change to who receives the alert (stays at `info@dlinrt.eu` as currently coded).
- No retry/queue infrastructure — the trigger's exception handler is sufficient; persistent failures can be re-driven manually from the `user_registration_notifications.failure_reason` column.
