

# February 2026 Changelog Entry

## What Changed in February 2026

Based on codebase analysis, these are the major changes made during February 2026:

### New Features
- **Dual-Axis Evidence Classification System** — New `evidenceRigor` (E0–E3) and `clinicalImpact` (I0–I5) scoring across 63+ products with PubMed-verified notes
- **Training Data, Evaluation Data & Safety Corrective Actions display** — 3 new product detail sections showing data provenance, clinical evaluation summaries, and FSCA/recall timelines
- **Dashboard Search Bar** — Product search directly from the authenticated dashboard
- **Notification Preferences Page** — Granular per-category email/in-app notification controls at `/notification-settings`
- **Role-Aware Mobile Navigation** — Mobile menu now shows admin/reviewer/company-specific links

### Improvements
- **CORS Standardization** — All 13 edge functions updated to support `*.lovable.app` origins
- **Resend SDK Upgrade** — Standardized all email functions to `resend@4.0.0`
- **Notification Preference Respect** — Email-sending functions now check user preferences before dispatching
- **Route Security Fixes** — Protected `/company/certification` route, added `ApprovalGate` to dashboard
- **Fixed `/company/revisions` broken link** — Redirected to existing company dashboard
- **Product data bulk update** — Evidence scores, PubMed verification dates, and notes added across 48+ product files
- **Header "More" dropdown** — General navigation links accessible for privileged users

### Bug Fixes
- **CORS `getCorsHeaders` syntax error** — Fixed duplicate header declaration and undeclared variable
- **ProductExperiences role check** — Replaced legacy `useAuth()` with `useRoles()` to include company users

### Cleanup
- Removed orphaned `MailingListSignupCompact.tsx`
- Removed orphaned `ReviewAssignmentEnhanced.tsx` (1241 lines of dead code)

## Implementation

Insert a single published changelog entry directly into the `changelog_entries` table via SQL. The entry will use:
- `entry_id`: `2026-02-backfill`
- `version`: `2026.02.0`
- `date`: `2026-02-28`
- `status`: `published`
- `category`: `feature` (primary category, details cover all)
- Professional markdown details with the sections above
- `auto_generated`: false (manually curated)

**Method**: Single `INSERT` into `changelog_entries` table — no file changes needed since the Changelog page reads from the database.

