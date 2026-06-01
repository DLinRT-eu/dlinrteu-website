## Goal

Update changelog and guides to reflect the recent changes from this session:

1. Edit Approvals workflow fix — drafts could not progress past `draft` to `pending_review`/`approved`/`applied`. Resolved with a "Promote to pending review" path and corrected status transitions in `apply-product-edit`.
2. New "Test GitHub access" admin tool (button + edge function `test-github-access`) that verifies the `GITHUB_TOKEN` PAT has the right scopes and write access before approvals are synced.
3. LinkedIn social link added to the footer (https://www.linkedin.com/company/dlinrt-eu/).
4. New MedMind auto-contouring product added.

## Files to update

### `docs/ADMIN_GUIDE.md` — Section 9 (Product Edit Approvals)

- Update the **Draft Status Lifecycle** description to clarify the promote step (draft → pending_review is admin-or-author triggered, not implicit).
- Add a new subsection **"Test GitHub access"** under *GitHub Integration* documenting:
  - Where the button lives (top of `/admin/edit-approvals`).
  - What it checks: repo read, branch read, write probe (create+delete throwaway branch), token-scoped permissions.
  - What to do on failure: rotate the PAT with `contents: read & write` and `pull_requests: read & write` scopes, update the `GITHUB_TOKEN` secret in Supabase, retest.
- Note the recovery path for stuck drafts ("Promote to pending review" action).

### `docs/README.md` (docs index)

- Add a one-line bullet under admin features for the GitHub access health check.

### Changelog entry (DB-stored via `changelog_entries`)

Changelog lives in the database, not a file. Add a new entry through `/admin/changelog` (or via a Supabase migration insert) for June 2026 covering:

- Fixed: Product edit approvals could get stuck in `draft`; drafts now reliably progress through `pending_review` → `approved` → `applied`.
- Added: "Test GitHub access" admin diagnostic for verifying the `GITHUB_TOKEN` PAT before sync.
- Added: LinkedIn link in the site footer.
- Added: MedMind to the Auto-Contouring catalogue.

I will create this via a SQL migration so it is reproducible (preferred) rather than requiring a manual UI entry.

### `README.md` (root)

No change needed — README documents how to add products and links to guides; nothing here is invalidated by the session's changes.

### `SECURITY.md` / `docs/FIELD_REFERENCE.md` / review guides

No change needed — nothing about evidence rubric, fields, or security posture changed.

## Out of scope

- No code changes. Documentation and changelog only.
- Not touching the reviewer guide, field reference, or examples.

## Question

Want me to also write a short "How approvals flow" diagram (ASCII) into ADMIN_GUIDE Section 9, or keep the update minimal?
