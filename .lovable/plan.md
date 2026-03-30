

# Admin Notification Digest & Role Verification Email Notifications

## Problem

1. **No notification digest**: Admins have no way to receive a periodic (daily/weekly) summary of unread notifications by email, making it easy to miss pending actions.
2. **Missing email on role approval (AdminOverview)**: The `AdminOverview.tsx` page approves/rejects roles directly but does NOT call `notify-role-request-outcome` — only `RoleRequestManager.tsx` does. This means some role approvals send no email.

## Plan

### Task 1: Add notification email on role approval in AdminOverview

**File**: `src/pages/admin/AdminOverview.tsx`

After the role approval succeeds (~line 209), add a call to `notify-role-request-outcome` with the user's email, name, and role — matching the pattern already used in `RoleRequestManager.tsx`. Same for rejection (~line 226).

This requires fetching the user's profile (email, first_name) before the approval. The current code only has `userId` and `requestedRole`. Add a profile lookup before the notification call.

### Task 2: Create notification digest edge function

**New file**: `supabase/functions/send-notification-digest/index.ts`

- Accepts a `frequency` parameter (`daily` or `weekly`)
- Queries `notifications` table for unread notifications per user within the time window
- Groups by user, respects `notification_preferences` (checks `email` global toggle)
- Sends a summary email via Resend with count per category and links to the notifications page
- Uses the standard CORS + service-role auth pattern
- HTML template: branded summary with notification counts by type

**Config**: Add to `supabase/config.toml`:
```
[functions.send-notification-digest]
verify_jwt = true
```

### Task 3: Add admin digest settings UI

**New file**: `src/components/admin/NotificationDigestControls.tsx`

- Similar pattern to `DeadlineReminderControls`
- Settings: enabled toggle, frequency selector (daily/weekly), manual trigger button
- Stores settings in `reminder_settings` table with key `notification_digest`
- Place this component in `AdminOverview.tsx` next to the existing DeadlineReminderControls

### Task 4: Add user-facing digest preference

**File**: `src/components/notifications/NotificationPreferences.tsx`

- Add a new section "Email Digest" below global toggles
- Options: Off / Daily / Weekly
- Stored in `notification_preferences.digest_frequency` field
- Only visible when email channel is enabled

### Task 5: Schedule the digest via cron (documentation note)

The digest function can be triggered manually by admins or scheduled via pg_cron (daily at 8:00 AM CET, weekly on Mondays). The cron setup requires an SQL insert (not a migration).

## Technical Details

- Edge function follows existing patterns: Resend, dynamic CORS, service-role auth
- Digest respects per-user `notification_preferences.email` and new `digest_frequency` field
- No new database tables needed — uses existing `notifications`, `reminder_settings`, and `profiles` tables
- AdminOverview role approval fix is a straightforward addition of the existing `notify-role-request-outcome` invocation

## Scope

- 2 existing files modified (`AdminOverview.tsx`, `NotificationPreferences.tsx`)
- 1 new component (`NotificationDigestControls.tsx`)
- 1 new edge function (`send-notification-digest`)
- 1 config.toml entry added
- No schema changes

