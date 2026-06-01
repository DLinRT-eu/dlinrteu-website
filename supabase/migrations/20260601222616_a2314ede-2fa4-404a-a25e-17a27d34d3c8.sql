INSERT INTO public.changelog_entries (entry_id, version, date, category, title, description, details, status, auto_generated, published_at, author)
VALUES (
  'edit-approvals-github-health-2026-06',
  '2026.06.1',
  '2026-06-01',
  'improvement',
  'Edit-approval workflow fixes & GitHub access health check',
  'Drafts now reliably progress from draft to pending_review, approved, and applied. Admins get a one-click GitHub access diagnostic before syncing edits.',
  E'Product edit approvals\n- Fixed an issue where edits could get stuck in `draft` and never advance to review or sync.\n- Added a "Promote to pending review" admin action so abandoned drafts can be moved forward without the original author.\n- Status transitions through `pending_review` → `approved` → `applied` are now reliable end-to-end via the `apply-product-edit` edge function.\n\nGitHub access health check\n- New "Test GitHub access" button on `/admin/edit-approvals` (powered by the `test-github-access` edge function).\n- Verifies the `GITHUB_TOKEN` PAT can read the repo, read the `main` branch, and create+delete a throwaway branch (write probe), and reports the token-scoped permissions.\n- Failure path includes step-by-step instructions for rotating the PAT with `Contents: Read & write` and `Pull requests: Read & write` scopes.\n\nSite & catalogue\n- Added a LinkedIn link to the site footer (https://www.linkedin.com/company/dlinrt-eu/).\n- Added MedMind to the Auto-Contouring catalogue.',
  'published',
  false,
  NOW(),
  'DLinRT Team'
)
ON CONFLICT (entry_id) DO UPDATE SET
  date = EXCLUDED.date,
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  details = EXCLUDED.details,
  status = EXCLUDED.status,
  published_at = EXCLUDED.published_at,
  updated_at = NOW();