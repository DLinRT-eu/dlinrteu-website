

# Fix Remaining Error Message Leakage in Edge Functions

## Problem

The `edge_fn_error_leak` finding was marked as fixed, but **6 additional edge functions** still return raw `error.message` to clients in their outer catch blocks. This leaks internal library details (Deno runtime errors, Supabase client errors, Resend API errors).

All other 7 ignored findings are genuinely resolved or correctly ignored.

## Files to Fix

| File | Line | Current | Fix |
|------|------|---------|-----|
| `supabase/functions/notify-user-registration/index.ts` | ~207 | `details: error.message` | Remove `details` field, return generic message |
| `supabase/functions/send-certification-reminder/index.ts` | ~232 | `error: error.message` | `error: 'Internal server error'` |
| `supabase/functions/auto-generate-monthly-changelog/index.ts` | ~456 | `error: error.message` | `error: 'Internal server error'` |
| `supabase/functions/admin-cleanup-duplicate-reviews/index.ts` | ~225 | `error.message` | `error: 'Internal server error'` |
| `supabase/functions/backfill-changelog-history/index.ts` | ~476 | `error.message` | `error: 'Internal server error'` |
| `supabase/functions/log-document-access/index.ts` | ~80 | `error.message` | `error: 'Internal server error'` |

## What Stays

Each function keeps `console.error(...)` with the full error for server-side debugging. Only the client-facing response changes to a generic message.

## Scope

- 6 edge function files edited (outer catch block only)
- No logic changes, no new files, no schema changes
- Update the `edge_fn_error_leak` finding's ignore_reason to reflect the expanded fix

