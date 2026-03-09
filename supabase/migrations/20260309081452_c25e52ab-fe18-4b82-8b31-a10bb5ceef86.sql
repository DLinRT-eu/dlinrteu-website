
INSERT INTO public.changelog_entries (entry_id, version, date, category, title, description, details, author, status, auto_generated, published_at)
VALUES (
  '2026-02-backfill',
  '2026.02.0',
  '2026-02-28',
  'feature',
  'February 2026 — Evidence Classification, Product Data Enhancements & Infrastructure Hardening',
  'Introduced a dual-axis evidence classification system, expanded product detail sections, standardized edge function infrastructure, and improved security across the platform.',
  E'## 🚀 New Features\n\n- **Dual-Axis Evidence Classification System** — New `evidenceRigor` (E0–E3) and `clinicalImpact` (I0–I5) scoring across 63+ products with PubMed-verified notes, enabling structured evaluation of clinical evidence quality\n- **Training Data, Evaluation Data & Safety Corrective Actions** — Three new product detail sections displaying data provenance, clinical evaluation summaries, and FSCA/recall timelines\n- **Dashboard Search Bar** — Search products directly from the authenticated dashboard\n- **Notification Preferences Page** — Granular per-category email/in-app notification controls at `/notification-settings`\n- **Role-Aware Mobile Navigation** — Mobile menu now surfaces admin, reviewer, and company-specific links contextually\n\n## ✨ Improvements\n\n- **CORS Standardization** — All 13 edge functions updated to support `*.lovable.app` preview origins, eliminating silent failures during development\n- **Resend SDK Upgrade** — Standardized all email-sending functions to `resend@4.0.0` for consistent API behavior\n- **Notification Preference Enforcement** — Email-sending functions now check user preferences before dispatching, respecting per-category opt-out settings\n- **Route Security Hardening** — Protected `/company/certification` route and added `ApprovalGate` to the dashboard\n- **Navigation Fix** — Corrected broken `/company/revisions` link to redirect to the company dashboard\n- **Product Data Bulk Update** — Evidence scores, PubMed verification dates, and clinical notes added across 48+ product files\n- **Header "More" Dropdown** — General navigation links now accessible for privileged users\n\n## 🐛 Bug Fixes\n\n- **CORS `getCorsHeaders` syntax error** — Fixed duplicate header declaration and undeclared variable reference across 5 edge functions\n- **ProductExperiences role check** — Replaced legacy `useAuth()` with `useRoles()` hook to properly include company users\n\n## 🧹 Cleanup\n\n- Removed orphaned `MailingListSignupCompact.tsx` component (unused, contained validation bug)\n- Removed orphaned `ReviewAssignmentEnhanced.tsx` (1,241 lines of dead code)',
  'DLinRT Team',
  'published',
  false,
  NOW()
);
