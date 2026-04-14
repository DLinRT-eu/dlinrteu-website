

## Fix: Remove `review_comments` from Supabase Realtime Publication

### Problem
The `review_comments` table is published to `supabase_realtime`, but Supabase's `realtime.messages` table has no RLS policies. This means any authenticated user could subscribe to Realtime channels and receive live review comment updates for reviews they are not assigned to.

### Key Finding
No client code actually subscribes to `review_comments` via Realtime. The only Realtime subscription in the app is in `NotificationBell.tsx` for the `notifications` table (which is not even published). So removing `review_comments` from the publication has zero functional impact.

### Plan

**Single migration** to remove `review_comments` from the Realtime publication:

```sql
ALTER PUBLICATION supabase_realtime DROP TABLE public.review_comments;
```

This eliminates the attack surface entirely. The `realtime` schema is Supabase-reserved and cannot have RLS policies added via migrations, so removing the table from the publication is the correct and complete fix.

After applying the migration, the `supabase_lov` finding `realtime_messages_no_rls` will be marked as fixed.

