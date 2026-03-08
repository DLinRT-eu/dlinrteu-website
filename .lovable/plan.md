

# Newsletter, Email & Notification System Audit

## Data Findings

- **95 total subscribers**, earliest Dec 12 2025, latest Jan 30 2026 — **zero new subscriptions in over 5 weeks**
- All recent entries appear to be a bulk import (same second-level timestamps, many with `first_name: "Subscriber"` and empty `last_name`)
- **No edge function logs exist** for `subscribe-newsletter`, `send-contact-email`, `notify-user-approval`, `send-deadline-reminders`, or even `track-analytics` — this strongly suggests **edge functions may not be deployed** or logs have expired

## Issues Found

### Critical: Edge Functions Likely Not Deployed

No logs exist for ANY of the 25 edge functions, including `track-analytics` which fires on every page view. This means either:
- Functions were never deployed after recent code changes
- Or Supabase log retention cleared old logs and no new invocations occurred

**Fix**: Redeploy all edge functions. Add a health-check test to verify deployment.

### Critical: CORS Blocks Lovable Preview Testing

All public-facing edge functions (`subscribe-newsletter`, `send-contact-email`) only allow origins `dlinrt.eu`, `www.dlinrt.eu`, `localhost:5173`, `localhost:3000`. The Lovable preview URL (`*.lovable.app`) is missing. This means:
- Newsletter signups from the preview silently fail
- Contact form submissions from the preview silently fail

**Fix**: Add `*.lovable.app` to the CORS allowlist in all public edge functions, or better yet, create a shared CORS utility.

### High: CORS Configuration Is Inconsistent Across Functions

| Function | CORS Strategy |
|----------|--------------|
| `subscribe-newsletter` | Dynamic allowlist (4 origins) |
| `send-contact-email` | Dynamic allowlist (4 origins) |
| `notify-user-approval` | Hardcoded `https://dlinrt.eu` only |
| `send-deadline-reminders` | Wildcard `*` |
| `notify-user-registration` | Not visible but likely inconsistent |

**Fix**: Standardize all functions to use the same dynamic CORS allowlist including `lovable.app`.

### High: Notification Preferences Are Saved But Never Consulted

The `NotificationPreferences` component saves granular per-category email/in-app preferences to `profiles.notification_preferences`, but **none of the email-sending edge functions** (`notify-user-approval`, `send-deadline-reminders`, `notify-reviewer-assignment`, `notify-role-request-outcome`) read this field before sending. Preferences are stored but completely ignored.

**Fix**: Update email-sending functions to check `notification_preferences.categories.<relevant_category>.email` before sending. This requires each function to query the user's profile and respect their settings.

### Medium: Resend SDK Version Mismatch

- `subscribe-newsletter`, `notify-user-approval`, `send-deadline-reminders`: use `resend@2.0.0` via `esm.sh`
- `notify-user-registration`: uses `resend@4.0.0` via `npm:` specifier

Different versions may have different API behaviors. Standardize to one version.

### Low: MailingListSignupCompact Is Orphaned

`MailingListSignupCompact.tsx` is defined but never imported or used anywhere. It also has a bug: it sends `lastName: ''` which would be rejected by the edge function's validation (`!lastName?.trim()` evaluates to `true` for empty strings).

**Fix**: Remove the orphaned file, or fix the validation and wire it into the Footer.

### Low: MFA Implementation Looks Functional

MFA enrollment, verification, unenrollment, and backup codes all use Supabase Auth's native TOTP MFA API correctly. The `verify-backup-code` and `store-backup-code` edge functions exist. No code-level issues found — but can't verify runtime behavior without logs.

---

## Proposed Fix Plan

| # | Task | Severity |
|---|------|----------|
| 1 | Redeploy all edge functions and verify they're live | Critical |
| 2 | Standardize CORS across all public edge functions — add `lovable.app` and create shared allowlist | Critical |
| 3 | Standardize Resend SDK to `npm:resend@4.0.0` across all functions | High |
| 4 | Update email-sending functions to respect `notification_preferences` | High |
| 5 | Remove orphaned `MailingListSignupCompact.tsx` | Low |

### Implementation Details

**Task 2 — Shared CORS**: Create a pattern where all public functions use the same origin list:
```
dlinrt.eu, www.dlinrt.eu, *.lovable.app (preview + published), localhost:5173, localhost:3000
```

**Task 3 — Resend upgrade**: Update all `import { Resend } from "https://esm.sh/resend@2.0.0"` to `import { Resend } from "npm:resend@4.0.0"` across: `subscribe-newsletter`, `send-contact-email`, `notify-user-approval`, `send-deadline-reminders`, `notify-reviewer-assignment`, `notify-role-request-outcome`, `send-certification-reminder`, `invite-reviewer`, `admin-newsletter-management`, `unsubscribe-newsletter`.

**Task 4 — Notification preferences**: Each email function will query the target user's `profiles.notification_preferences` and check the relevant category before sending. Map: `notify-reviewer-assignment` → `review_assignments`, `send-deadline-reminders` → `review_deadlines`, `notify-user-approval` → `registration_updates`, `notify-role-request-outcome` → `registration_updates`.

### Scope
- ~12 edge functions updated (CORS + Resend version)
- 4 edge functions updated for notification preference checks
- 1 orphaned file deleted
- All functions redeployed

