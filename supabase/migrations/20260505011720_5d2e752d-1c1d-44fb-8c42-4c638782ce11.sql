INSERT INTO public.changelog_entries (entry_id, version, date, category, title, description, details, status, auto_generated, published_at, author)
VALUES (
  'late-april-hardening-2026-04',
  '2026.04.2',
  '2026-04-30',
  'improvement',
  'Late April 2026 — Security hardening & reviewer workflow polish',
  'Tightened Realtime, GraphQL, and RPC surfaces; scheduled background jobs; smoother reviewer and admin notification flows.',
  E'Security & access control\n- Hardened Realtime channel access: review_* topics scoped to assigned reviewers and admins, with explicit RESTRICTIVE deny policies for all other topics on realtime.messages.\n- Revoked anon SELECT on non-public catalogue tables to remove them from anonymous GraphQL/PostgREST introspection while keeping public-by-design tables (changelog_*) accessible.\n- Revoked authenticated SELECT on internal analytics views (analytics_summary, analytics_public) and other objects not used by the client.\n- Added array size and element length guards to quick_assign_products RPC overloads to prevent abusive payloads.\n\nReviewer & admin workflow\n- Added count_pending_role_requests_for_user RPC powering accurate pending-request badges.\n- Scheduled recurring reviewer reminder and maintenance jobs via pg_cron + pg_net.\n- New profile-insert trigger asynchronously invokes the notify-user-registration edge function so admins receive registration emails reliably.',
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