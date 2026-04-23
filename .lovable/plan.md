

## Plan: Guided role-request test flow + daily admin pending-requests digest

Two separate, narrow additions. No changes to the existing `RoleRequestForm`, `RoleRequestHistory`, or admin approval UI — both features sit alongside.

### Part 1 — Guided test flow on `/profile`

A self-serve, in-app walkthrough that any signed-in user can run to confirm the role-request pipeline is working end-to-end on their own account. Lives in a collapsible "Test the role request flow" card on the Profile page, below the existing `RoleRequestHistory`.

**Component**: `src/components/profile/RoleRequestFlowTest.tsx` — a stepper (uses existing shadcn `Card` + `Badge` + `Button`) with four sequential checks. Each step shows `pending → running → pass/fail` with a short result message. The user clicks **Run test** to execute all steps in order.

| # | Step | What it verifies | How |
|---|------|------------------|-----|
| 1 | **Submit a test request** | Form insert + RLS allow own user | `INSERT` into `role_requests` with `requested_role='reviewer'`, `justification='[FLOW-TEST] auto-generated …'`, `status='pending'`. Skip if user already has reviewer role — surface a neutral "skipped: already reviewer" instead of failing. |
| 2 | **Appears in history** | Read-back via the same query `RoleRequestHistory` uses | `SELECT id, status, created_at FROM role_requests WHERE user_id = auth.uid() AND id = <inserted id>`. Pass if row found within 2s. |
| 3 | **Visible to admins** | Admin queue picks it up | Call a new `SECURITY DEFINER` RPC `count_pending_role_requests_for_user(_user_id uuid) RETURNS int` that returns the count of this user's pending requests as seen with admin privileges (so the test confirms admins *would* see it without exposing other users' rows). Pass if ≥ 1. |
| 4 | **Cleanup** | Test row removed | `DELETE FROM role_requests WHERE id = <inserted id> AND user_id = auth.uid()`. Always runs (even if step 2/3 failed) so no junk request remains in the admin queue. |

UX details:
- A clear banner: *"This submits a real request, then deletes it. No admin action required."*
- Per-step status icon (Loader2 / Check / X) and timestamps.
- Final summary line: "All checks passed" or list of failures with the raw error message.
- Disabled while a real pending request from this user already exists (avoid touching real data) — show "You have a pending request; resolve it before running the test."

No edge function needed; everything runs from the client using the existing `supabase` client and one new RPC.

### Part 2 — Daily admin digest of pending role requests

A scheduled email that lists all role requests still in `status='pending'` and how long they've waited, sent once per day to every admin who has not opted out of `registration_updates` emails.

**New edge function**: `supabase/functions/send-role-request-digest/index.ts`
- Auth: accepts service-role bearer (cron) OR an authenticated admin (manual "Send now" trigger from the admin UI). Same pattern as `notify-role-request-outcome`.
- Logic:
  1. Service-role client queries `role_requests` where `status='pending'`, joins `profiles` for requester name/email, ordered by `created_at` ASC.
  2. If zero pending → exit early with `{ success: true, skipped: true, reason: 'no pending requests' }` (no email sent — avoids daily empty inbox noise).
  3. Else fetch all admins via `user_roles` + `profiles`, filter out anyone whose `notification_preferences.categories.registration_updates.email === false`.
  4. Build one HTML email per admin (so each is personalised by first name and the unsubscribe-style preference link goes to their `/profile`). Subject: `DLinRT.eu - {N} pending role request{s} awaiting review`.
  5. Send via the existing `createResend` shim (matches `notify-role-request-outcome`). Reuse `getCorsHeaders` allowlist.
  6. Return `{ success, emailsSent, pendingCount, requestIds }`.
- Email body: brand header (steel-blue), a compact table (Requester · Role · Days waiting · Justification snippet), and a CTA button to `/admin` (the AdminOverview already shows the pending queue with Approve/Reject controls).

**Scheduling**: add a third pg_cron job alongside the existing two:
```sql
SELECT cron.schedule(
  'send-role-request-digest-daily',
  '0 8 * * *',  -- 08:00 UTC, same slot as deadline reminders
  $$ SELECT net.http_post(
       url := 'https://msyfxyxzjyowwasgturs.supabase.co/functions/v1/send-role-request-digest',
       headers := '{"Content-Type":"application/json","Authorization":"Bearer <anon>"}'::jsonb,
       body := '{"triggered_by":"cron"}'::jsonb
     ); $$
);
```
Inserted via the data tool (not a migration) since the URL + anon key are project-specific, mirroring the existing `send-deadline-reminders-daily` job.

**Admin manual trigger**: extend `src/components/admin/NotificationDigestControls.tsx` with a second small section "Pending role-request digest" containing only a **Send digest now** button + last-sent timestamp (read from a new `reminder_settings` row `setting_key='role_request_digest_last_sent'`, updated by the function on success). Keeps the admin-side surface minimal — no enable/frequency toggle, since the cron is fixed daily and zero-pending days are auto-skipped.

### Database changes (single migration)

1. RPC for the test flow:
   ```sql
   CREATE OR REPLACE FUNCTION public.count_pending_role_requests_for_user(_user_id uuid)
   RETURNS int LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
     SELECT count(*)::int FROM role_requests
     WHERE user_id = _user_id AND status = 'pending';
   $$;
   REVOKE ALL ON FUNCTION public.count_pending_role_requests_for_user(uuid) FROM public;
   GRANT EXECUTE ON FUNCTION public.count_pending_role_requests_for_user(uuid) TO authenticated;
   ```
   Safe: only returns a count, only for the caller's own `user_id` (the client always passes `auth.uid()`; we additionally enforce `_user_id = auth.uid()` inside the function body before the count to prevent probing other users).

No schema change to `role_requests` itself.

### Files touched

- **New** `src/components/profile/RoleRequestFlowTest.tsx` — guided stepper.
- **Edit** `src/pages/Profile.tsx` — render `<RoleRequestFlowTest />` under `<RoleRequestHistory />`.
- **New** `supabase/functions/send-role-request-digest/index.ts` — daily digest function.
- **Edit** `src/components/admin/NotificationDigestControls.tsx` — add "Send role-request digest now" section.
- **Migration** — `count_pending_role_requests_for_user` RPC.
- **Data insert** — pg_cron job `send-role-request-digest-daily` at `0 8 * * *`.

### Out of scope

- Changing the role-request submission form, validation, or admin Approve/Reject UI.
- New notification categories or per-admin frequency settings (uses existing `registration_updates` opt-out).
- Real-time admin notifications (`notifications` table inserts on submit) — daily digest only, per request.
- Live demo / e2e harness (Vitest/Playwright) — the guided flow is in-app and uses real DB rows that it cleans up itself.

