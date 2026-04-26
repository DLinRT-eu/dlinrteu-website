
-- Harden realtime.messages further: add RESTRICTIVE policies so any non-review_% topic
-- is explicitly denied for both reads and sends, in addition to the existing permissive
-- review_% allow policies. RESTRICTIVE policies are AND-ed with permissive ones, making
-- the deny-all-other-topics intent explicit and unambiguous to scanners and auditors.

ALTER TABLE realtime.messages ENABLE ROW LEVEL SECURITY;

-- Restrict SELECT to review_% topics only
DROP POLICY IF EXISTS "deny_non_review_topics_select" ON realtime.messages;
CREATE POLICY "deny_non_review_topics_select"
ON realtime.messages
AS RESTRICTIVE
FOR SELECT
TO authenticated
USING (realtime.topic() LIKE 'review_%');

-- Restrict INSERT to review_% topics only
DROP POLICY IF EXISTS "deny_non_review_topics_insert" ON realtime.messages;
CREATE POLICY "deny_non_review_topics_insert"
ON realtime.messages
AS RESTRICTIVE
FOR INSERT
TO authenticated
WITH CHECK (realtime.topic() LIKE 'review_%');

-- Block UPDATE and DELETE entirely for authenticated users (defense in depth)
DROP POLICY IF EXISTS "deny_all_update" ON realtime.messages;
CREATE POLICY "deny_all_update"
ON realtime.messages
AS RESTRICTIVE
FOR UPDATE
TO authenticated
USING (false)
WITH CHECK (false);

DROP POLICY IF EXISTS "deny_all_delete" ON realtime.messages;
CREATE POLICY "deny_all_delete"
ON realtime.messages
AS RESTRICTIVE
FOR DELETE
TO authenticated
USING (false);

-- Also block anon entirely from broadcast/presence (postgres_changes uses source-table RLS)
DROP POLICY IF EXISTS "deny_anon_all" ON realtime.messages;
CREATE POLICY "deny_anon_all"
ON realtime.messages
AS RESTRICTIVE
FOR ALL
TO anon
USING (false)
WITH CHECK (false);
