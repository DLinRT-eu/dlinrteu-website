-- Harden Realtime channel access (finding: realtime_no_rls)
-- realtime.messages already has RLS enabled but no policies => Broadcast/Presence is deny-all.
-- We add explicit, role-scoped allow policies for review_* topics so legitimate
-- reviewer/admin live-collaboration features work, while keeping all other topics denied.
-- postgres_changes (used by NotificationBell) authorizes via the source table's RLS,
-- not realtime.messages, so it is unaffected by these policies.

-- Ensure RLS is on (idempotent)
ALTER TABLE realtime.messages ENABLE ROW LEVEL SECURITY;

-- SELECT: receive broadcast/presence messages on review_* topics
DROP POLICY IF EXISTS "review_topics_select_admin_reviewer" ON realtime.messages;
CREATE POLICY "review_topics_select_admin_reviewer"
ON realtime.messages
FOR SELECT
TO authenticated
USING (
  realtime.topic() LIKE 'review_%'
  AND (
    public.has_role(auth.uid(), 'admin'::public.app_role)
    OR public.has_role(auth.uid(), 'reviewer'::public.app_role)
  )
);

-- INSERT: send broadcast/presence join+messages on review_* topics
DROP POLICY IF EXISTS "review_topics_insert_admin_reviewer" ON realtime.messages;
CREATE POLICY "review_topics_insert_admin_reviewer"
ON realtime.messages
FOR INSERT
TO authenticated
WITH CHECK (
  realtime.topic() LIKE 'review_%'
  AND (
    public.has_role(auth.uid(), 'admin'::public.app_role)
    OR public.has_role(auth.uid(), 'reviewer'::public.app_role)
  )
);