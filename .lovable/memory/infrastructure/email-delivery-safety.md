---
name: Email Delivery Safety
description: Shared suppression + send logging helper for all Resend senders, resend-webhook records delivery events, admin Email Health page
type: feature
---
- `supabase/functions/_shared/email-delivery.ts` exposes `isSuppressed`, `filterSuppressed`, `logEmailSend`, `resendMessageId`.
- Every loop/transactional sender must check `isSuppressed` before sending and log the outcome (`sent` / `suppressed` / `failed`) into `email_send_log` using the service-role client. Suppression fails open.
- Suppression = prior `complained`, or `bounced` whose `bounce_type` is not Transient/Undetermined.
- `resend-webhook` requires `RESEND_WEBHOOK_SECRET` and writes delivery/bounce/complaint events to `email_send_log`. Without it no delivery history exists.
- Internal alert recipients come from `ADMIN_NOTIFICATION_EMAILS` (comma-separated); `_shared/admin-recipients.ts` warns when falling back to hardcoded addresses. Do not rely on info@dlinrt.eu forwarding for internal alerts; keep it as reply-to only.
- Newsletter signup sends only the subscriber welcome email — no per-signup admin notification.
- Admin page `/admin/email-health` (`src/pages/admin/EmailHealth.tsx`) shows the delivery log.
