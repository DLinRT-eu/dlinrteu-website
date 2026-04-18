

## Plan: Resolve 3 Supabase security findings

### Finding 1 — `mfa_activity_log` missing INSERT policy → **Mark as fixed (already by design)**

Inspection shows all writes happen exclusively in edge functions (`verify-backup-code`, etc.) using the service-role client, which bypasses RLS. A previous migration (`20260406081945_…sql`) already documented this with a `COMMENT ON TABLE` explaining the intentional omission. The scanner can't see that intent.

Action: call `security--manage_security_finding` → `mark_as_fixed` with explanation pointing to the service-role write path + existing table comment. No schema change needed.

### Finding 2 — `certification_reminder_logs` missing INSERT policy → **Mark as fixed (already by design)**

Same pattern: only writer is `send-certification-reminder/index.ts` line 236, using `adminClient` (service-role). Admins reading via dashboard works through the existing SELECT policy. No authenticated-user code path inserts here.

Action: `mark_as_fixed` with explanation. No schema change.

### Finding 3 — `user_roles` privilege-escalation risk → **Mark as fixed (verified, no bypass paths)**

Searched all edge functions for `user_roles` writes:
- `delete-account` and `admin-delete-user` only **DELETE** (admin-gated and self-scoped respectively).
- No `.insert(` or `.upsert(` calls into `user_roles` exist anywhere in `supabase/functions/`.
- No SECURITY DEFINER function in the schema inserts roles either.
- All role grants flow through the client → RLS `is_admin_secure()` check.

Action: `mark_as_fixed` with explanation listing the audit results.

### Why no migrations

Adding a permissive INSERT policy to `mfa_activity_log` or `certification_reminder_logs` for `authenticated` users would actually **weaken** security — any logged-in user could forge log entries. The current "service-role-only writes, RLS blocks everyone else" pattern is correct. The findings are scanner false positives that need to be acknowledged.

### Files touched

None. Three `security--manage_security_finding` calls only.

