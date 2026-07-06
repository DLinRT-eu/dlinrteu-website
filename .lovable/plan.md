## Goal

Let admins clear a hash mismatch by re-certifying the current product content directly from the admin Certification Management page, without requiring the company representative to act.

## Context

- `src/pages/admin/CertificationManagement.tsx` lists all products with a `HashStatusBadge` (`valid` / `mismatch` / `legacy` / `never`) and a per-row Actions column.
- `CertificationDetailDialog` shows stored vs. current hash and explains mismatches, but has no write action.
- RLS on `company_product_verifications` already grants admins full manage rights (`Admins can manage all verifications`, `USING has_role(admin)`), so no schema or policy changes are needed.
- Verification rows carry `content_hash`, `verified_at`, `verified_by`, `verification_notes`.

## UX

1. In the Outdated tab / mismatch rows of the certifications table, add an inline "Approve & re-certify" button (shield-check icon) next to the existing view/open buttons. Only visible when `hashStatus === 'mismatch'` (and for admins — the page is already admin-only).
2. In `CertificationDetailDialog`, when `hashStatus === 'mismatch'`, add an "Admin override: approve current content" button in the mismatch explanation block. Same action as the inline button.
3. Both trigger a small confirmation dialog: "This will update the stored certification hash to the current content hash and mark the product as re-certified on behalf of {company}. Continue?" with an optional notes textarea (prefilled: "Admin override — hash mismatch approved on YYYY-MM-DD").
4. On confirm: `UPDATE company_product_verifications` for that row setting `content_hash = currentHash`, `verified_at = now()`, `verified_by = auth.uid()`, and appending the note to `verification_notes` (preserve prior notes with a newline separator). Show a toast, close the dialog, and refetch certifications so the badge flips to Verified.

## Technical Details

- New helper in `CertificationManagement.tsx` (or a small `useAdminCertificationOverride` hook) doing the Supabase update using the existing client.
- Reuse existing `AlertDialog` / `Dialog` primitives from shadcn for the confirmation step.
- Pass an `onOverride` callback into `CertificationDetailDialog` so the dialog can trigger the same flow used by the row action, keeping a single code path.
- No migrations, no edge functions, no new tables — purely UI + client-side update permitted by existing RLS.
- Audit trail: the override is captured by `verified_by = admin user id` + note text; no additional logging table is needed. (Optional: also insert into `admin_audit_log` if we want a separate record — flag this as a follow-up, not part of this change unless requested.)

## Out of scope

- Bulk override across many products.
- Changes to how company reps certify their own products.
- New notifications to companies when an admin overrides (can be added later if wanted).
