

## Plan: Scope Realtime channel access for `review_comments`

### Finding

`review_comments` is published via Supabase Realtime. The `realtime.messages` table has no RLS policies, so any authenticated user can subscribe to any channel topic (e.g. `review_comments:*`) and receive live INSERT/UPDATE events for review comments on reviews they are not assigned to. The base table RLS protects historical SELECT queries, but Realtime broadcasts bypass that path — Realtime checks `realtime.messages` policies, not the source table's RLS.

### Fix

Add RLS policies on `realtime.messages` that restrict authenticated subscribers to only the channel topics they are entitled to. Two policies are needed (Realtime checks both for postgres_changes):

1. **SELECT policy** — required for receiving broadcast messages.
2. **INSERT policy** — required for the client to join the channel (Realtime inserts a presence/join row).

The policy logic: the user can access a `review_comments` channel only if they are an admin OR they are assigned to at least one review (any status). This matches the existing base-table policy `View comments on accessible reviews` which also allows admin / reviewer / assignee.

For simplicity and to match the existing model, scope by role:
- Admins: full access to all Realtime channels for `review_comments`.
- Reviewers: access only if `auth.uid()` appears as `assigned_to` in `product_reviews` for the specific `review_id` embedded in the topic — but topic-level filtering by review_id requires the client to subscribe per-review, which the codebase may not do.

Since I haven't yet inspected how the client subscribes (channel naming pattern), I'll be conservative:
- Allow SELECT/INSERT on `realtime.messages` only when the topic starts with `review_comments` AND the user has the `reviewer` or `admin` role. This blocks regular authenticated users (the broadest gap) while preserving functionality for legitimate reviewers/admins. Per-review topic filtering can be tightened in a follow-up once I confirm the client subscription pattern.
- For all other topics, leave default behavior (no policy = deny once RLS is enabled, so we'll add a permissive fallback for any non-`review_comments` topic to avoid breaking other realtime usage — but first I'll grep the codebase to confirm whether anything else uses Realtime).

### Steps

1. Grep `src/` for `supabase.channel(` and `realtime` usage to enumerate all Realtime topics in the app.
2. Based on findings, write a single migration that:
   - Enables RLS on `realtime.messages` (it's already enabled by Supabase by default, but we'll ensure it).
   - Adds a policy allowing admins + reviewers to SELECT/INSERT on `review_comments`-prefixed topics.
   - Adds permissive policies for any other topics actively used by the app (so we don't break them).
3. Mark the security finding as fixed with an explanation citing the migration and policy logic.

### Files touched

- One new SQL migration via `supabase--migration`.
- No frontend code changes (the existing channel subscription code keeps working for legitimate users).
- `security--manage_security_finding` call to mark fixed.

### Out of scope

- Per-review topic-level filtering (e.g. only the assigned reviewer for review X can subscribe to `review_comments:X`). Achievable but requires confirming/standardizing the topic naming convention first; happy to do as a follow-up.
- Migrating off Realtime for `review_comments` entirely.

