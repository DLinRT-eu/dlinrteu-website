---
name: Visual Editor Submission Feedback
description: Visual Editor submissions trigger confirmation email + admin notification, with editor-side "My Submissions" log and reviewer-side per-product Visual Edits history tab
type: feature
---
- Submit-for-review in `ProductEditContext` invokes `notify-edit-submitted` edge function.
- Edge function emails the submitter a confirmation (subject to `notification_preferences.categories.product_edits.email`), inserts in-app notifications for all admins, and emails admins who opt in.
- `/my-submissions` page (`MySubmissions.tsx`) lists the user's drafts (all statuses) with summary, changed fields, reviewer feedback.
- Reviewer/admin view: `VisualEditHistory.tsx` tab on `ProductReview.tsx`, backed by `get_product_edit_drafts_for_reviewer(text)` security-definer RPC (admin/reviewer only).
- Link from history → `/admin/edit-approvals?draft=<id>` for quick approval action.
