ALTER TABLE public.company_revisions
  ADD COLUMN IF NOT EXISTS github_pr_url text,
  ADD COLUMN IF NOT EXISTS github_synced_at timestamptz;