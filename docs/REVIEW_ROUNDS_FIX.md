# Review Rounds Page Fixes

## Issues Fixed

### 1. Incorrect Reviewer Count
**Problem**: Total reviewers count was showing duplicates when a user had the reviewer role assigned multiple times in the `user_roles` table.

**Solution**: 
- Changed to use `Set` to get unique reviewer IDs
- Filter expertise to only include current reviewers
- Use `.size` on Set for accurate count

**Changes**:
- `src/pages/admin/ReviewRounds.tsx`: Updated `fetchReviewerStats()` function

### 2. Expertise Count Not Matching Reviewers
**Problem**: Expertise count included users who might have lost reviewer role but still had expertise entries.

**Solution**:
- Get unique reviewer IDs first
- Filter expertise table to only count users who are current reviewers
- Use Set intersection to get accurate count

### 3. Review Round Creation Failing
**Problem**: RLS policy was using `has_role()` function which might have had issues, causing INSERT to fail silently.

**Solutions Implemented**:

#### Database Migration
Created `20251117172000_fix_review_rounds_rls.sql`:
- Drops old policies
- Creates new policy using `is_admin_secure()` for consistency
- Uses `FOR ALL` to cover INSERT, UPDATE, DELETE, SELECT

#### Frontend Error Handling
Enhanced error reporting:
- Added console logging in `handleCreateRound()`
- Added detailed error messages in toast notifications
- Shows actual error message from database
- Increased toast duration for error messages

#### Utility Function Logging
Added debugging to `createReviewRound()`:
- Logs insert payload before sending
- Logs database errors with full details
- Logs success response

## Files Modified

1. **src/pages/admin/ReviewRounds.tsx**
   - Fixed `fetchReviewerStats()` to use unique reviewer IDs
   - Enhanced `handleCreateRound()` with error logging
   - Added detailed error messages in toasts

2. **src/utils/reviewRoundUtils.ts**
   - Added console logging to `createReviewRound()`
   - Logs insert payload, errors, and success

3. **supabase/migrations/20251117172000_fix_review_rounds_rls.sql** (NEW)
   - Fixed RLS policy to use `is_admin_secure()`
   - Unified policy name for consistency

## How to Deploy

### 1. Apply Database Migration

Copy contents of `supabase/migrations/20251117172000_fix_review_rounds_rls.sql` and run in Supabase SQL Editor:

```sql
-- Fix review_rounds RLS policies to use is_admin_secure() instead of has_role()
DROP POLICY IF EXISTS "Admins can manage all rounds" ON public.review_rounds;
DROP POLICY IF EXISTS "Admins full access to review_rounds" ON public.review_rounds;

CREATE POLICY "Admins full access to review_rounds"
ON public.review_rounds
FOR ALL
TO authenticated
USING (is_admin_secure())
WITH CHECK (is_admin_secure());
```

### 2. Frontend Already Updated
The React components are updated and will work immediately.

### 3. Test the Fixes

1. **Navigate to** `/admin/review-rounds`
2. **Check reviewer counts**:
   - Total Reviewers should show correct unique count
   - With Expertise should only count current reviewers who have set preferences
3. **Try creating a round**:
   - Click "Create New Round"
   - Fill in required fields (Name, Start Date)
   - Click "Create Round"
   - Check browser console for detailed logs
   - Should see success message or detailed error

### 4. Debugging Round Creation

If creation still fails, check console for:
```
[ReviewRounds] Creating round: {...}
[createReviewRound] Attempting to insert: {...}
[createReviewRound] Insert error: {...}  // or Success
```

Common issues:
- ❌ "permission denied" → RLS policy issue, verify migration ran
- ❌ "violates check constraint" → Invalid status or date values
- ❌ "null value in column" → Missing required field

## Additional Checks

If issues persist:

### Verify RLS Policy
```sql
SELECT 
  policyname,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'review_rounds'
ORDER BY policyname;
```

Should show:
- `Admins full access to review_rounds` with `FOR ALL`
- Using clause: `is_admin_secure()`
- With check clause: `is_admin_secure()`

### Verify Admin Function
```sql
SELECT is_admin_secure();
```
Should return `true` when logged in as admin.

### Check Review Rounds Table
```sql
SELECT * FROM review_rounds LIMIT 5;
```
Verify table exists and has correct columns.

## Expected Behavior After Fix

✅ **Reviewer Counts**:
- Shows accurate count of unique reviewers
- Expertise count only includes current reviewers
- No duplicates even if user_roles has duplicate entries

✅ **Round Creation**:
- Admins can create rounds successfully
- Detailed error messages if something fails
- Console shows full debugging information
- Toast shows specific error from database

✅ **Error Messages**:
- "Failed to create review round: [specific error]"
- Includes actual database error message
- Displays for 5 seconds for user to read
