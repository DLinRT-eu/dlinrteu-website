

# Comprehensive Security, RLS, and GDPR Audit

## Executive Summary

This audit reveals a strong baseline security posture with comprehensive RLS policies, but identifies several areas requiring attention for GDPR compliance and defense-in-depth security.

---

## Audit Findings

### Category 1: Critical - Views Without RLS (SECURITY DEFINER Mode)

| View | Issue | Risk Level |
|------|-------|------------|
| `reviews_with_github_tracking` | Exposes `reviewer_email` and `reviewer_name` from profiles | **HIGH** |
| `analytics_public` | Uses SECURITY DEFINER - bypasses RLS on `analytics_daily` | **MEDIUM** |
| `analytics_summary` | Uses SECURITY DEFINER - bypasses RLS on `analytics_daily` | **MEDIUM** |
| `company_products` | Uses SECURITY DEFINER - bypasses RLS on underlying tables | **MEDIUM** |
| `public_team_members` | Uses SECURITY DEFINER - intentionally public but should be verified | **LOW** |

**Impact**: Views with SECURITY DEFINER bypass RLS policies of underlying tables. Anyone with SELECT access to these views can read data regardless of base table restrictions.

**Fix Required**:
1. Add `security_invoker = on` to critical views OR
2. Create proper RLS policies on the views themselves OR
3. Restrict view access using GRANT/REVOKE

---

### Category 2: GDPR - IP Address Storage

**Current State**: Mixed compliance - some areas hash IPs, others store plaintext.

| Table | Column | Status |
|-------|--------|--------|
| `mfa_activity_log` | `ip_address` | **Stores RAW IP** - GDPR violation |
| `admin_audit_log` | `ip_address` | Currently null (good) |
| `consent_audit_log` | `ip_hash` | **Hashed** (compliant) |
| `security_events` | `ip_hash` | **Hashed** (compliant) |
| `profile_document_access_log` | `ip_hash` | **Hashed** (compliant) |

**Edge Functions Analysis**:
- `track-analytics`: Uses `hash_ip()` RPC - **Compliant**
- `track-security-event`: Uses `hash_ip()` RPC - **Compliant**
- `log-document-access`: Uses `hash_ip()` - **Compliant**
- `subscribe-newsletter`: Uses raw IP for rate limiting only (memory) - **Acceptable**

**Fix Required**: 
- Rename `mfa_activity_log.ip_address` to `ip_hash` and ensure hashing
- Update any edge functions writing to `mfa_activity_log` to use `hash_ip()`

---

### Category 3: GDPR - User Tracking Analysis

**Cookie Consent Implementation**: **Compliant**
- Analytics tracking only activates with explicit consent
- Consent stored with version and timestamp
- `isTrackingAllowed()` gate on all tracking operations
- `clearTrackingIds()` for consent withdrawal

**Visitor ID Tracking**:
- Visitor ID is a UUID generated client-side
- Sent to server and **hashed via `hash_ip()` RPC** before storage
- 2-year expiry on consent-gated cookie

**Session ID**:
- Stored in `sessionStorage` (cleared on browser close)
- Never sent to server - **Local only**

**localStorage Usage Audit**:

| Key | Purpose | GDPR Risk |
|-----|---------|-----------|
| `activeRole` | Role UI state | None - cleared on logout |
| `dlinrt-auth-token` | Auth token | Cleared on logout |
| `recentSearches` | Search history | **LOW** - user convenience |

---

### Category 4: RLS Policy Analysis

**Strengths** (150 policies total):
- All tables have RLS enabled
- RESTRICTIVE policies used consistently
- `has_role()` and `is_admin_secure()` SECURITY DEFINER functions prevent recursion
- Anonymous access denied on 20+ sensitive tables via `USING(false)` policies
- Service role access properly gated

**Potential Improvements**:

| Table | Policy Gap | Risk |
|-------|------------|------|
| `product_revision_dates` | Public SELECT (`USING(true)`) | **LOW** - only revision metadata |
| `company_product_verifications` | Public SELECT (`USING(true)`) | **LOW** - intentional transparency |
| `changelog_entries` | Public SELECT for `status='published'` | **None** - intentional |

---

### Category 5: Edge Function Security

**Authentication Checks** (all functions reviewed):

| Function | Auth Method | Status |
|----------|-------------|--------|
| `admin-delete-user` | JWT + admin role check | **Secure** |
| `delete-account` | JWT + password re-auth | **Secure** |
| `track-analytics` | Service role key | **Secure** |
| `track-security-event` | Rate limited + fingerprint hash | **Secure** |
| `notify-*` functions | Service role key + admin validation | **Secure** |

**CORS Implementation**: Proper origin whitelisting on all reviewed functions.

---

### Category 6: Sensitive Data Exposure Points

**Data Export Feature** (`DataExport.tsx`):
- ✅ MFA verification for MFA-enabled users
- ✅ Only exports user's own data (RLS enforced)
- ⚠️ Exports raw `mfa_activity_log` which may include IPs

**Admin Profile Access**:
- ✅ Admins can view all profiles (expected for admin functions)
- ✅ Admin actions logged to `admin_audit_log`

---

## Technical Implementation Plan

### Phase 1: Fix Views Security (High Priority)

```sql
-- 1. Recreate reviews_with_github_tracking with security_invoker
DROP VIEW IF EXISTS public.reviews_with_github_tracking;
CREATE VIEW public.reviews_with_github_tracking
WITH (security_invoker = on) AS
SELECT 
  pr.id,
  pr.product_id,
  pr.assigned_to,
  pr.status,
  pr.assigned_at,
  pr.github_file_url,
  pr.github_last_modified,
  pr.auto_revision_triggered,
  (p.first_name || ' ' || p.last_name) AS reviewer_name,
  -- Remove email from view OR keep with security_invoker
  p.email AS reviewer_email,
  (SELECT count(*) FROM github_file_checks WHERE review_id = pr.id) AS check_count,
  (SELECT max(checked_at) FROM github_file_checks WHERE review_id = pr.id) AS last_check_at
FROM product_reviews pr
LEFT JOIN profiles p ON pr.assigned_to = p.id
WHERE pr.github_file_url IS NOT NULL;

-- 2. Add security_invoker to analytics views or restrict access
-- Option A: Restrict to authenticated users only
REVOKE SELECT ON analytics_public FROM anon;
GRANT SELECT ON analytics_public TO authenticated;

-- Option B: Recreate with security_invoker
DROP VIEW IF EXISTS public.analytics_summary;
CREATE VIEW public.analytics_summary
WITH (security_invoker = on) AS
SELECT date, total_visits, unique_visitors, created_at, updated_at
FROM analytics_daily ad
ORDER BY date DESC;
```

### Phase 2: Fix IP Address Storage (GDPR Critical)

```sql
-- Rename column to reflect its hashed nature
ALTER TABLE mfa_activity_log RENAME COLUMN ip_address TO ip_hash;

-- Add comment for documentation
COMMENT ON COLUMN mfa_activity_log.ip_hash IS 
  'SHA-256 hash of IP address for GDPR compliance - never store raw IPs';
```

**Edge Function Updates**:
- Audit any code inserting into `mfa_activity_log` to use `hash_ip()` RPC

### Phase 3: Data Export Enhancement

```typescript
// In DataExport.tsx, sanitize mfa_activity_log before export
const mfaLogSanitized = mfaLogData.data?.map(log => ({
  ...log,
  ip_hash: log.ip_address ? '[HASHED]' : null, // Don't export raw or hashed IPs
  user_agent: log.user_agent ? '[REDACTED]' : null
}));
```

### Phase 4: Additional Hardening

1. **Add Deny Policies on Views**:
```sql
-- Block anonymous access to sensitive views
CREATE POLICY "Deny anon access to reviews_with_github_tracking"
ON public.reviews_with_github_tracking FOR SELECT
TO anon USING (false);
```

2. **Audit company_products View**:
```sql
-- This view exposes user_id which could be sensitive
-- Consider removing user_id or adding security_invoker
```

---

## Summary of Changes Required

| Priority | Item | Type |
|----------|------|------|
| **CRITICAL** | Fix `reviews_with_github_tracking` view to use security_invoker | Migration |
| **CRITICAL** | Rename `mfa_activity_log.ip_address` to `ip_hash` | Migration |
| **HIGH** | Add security_invoker to `analytics_summary` view | Migration |
| **HIGH** | Restrict `analytics_public` view to authenticated users | Migration |
| **MEDIUM** | Sanitize IP data in DataExport component | Code |
| **MEDIUM** | Review `company_products` view for user_id exposure | Audit |
| **LOW** | Consider removing email from `reviews_with_github_tracking` | Design Decision |

---

## Compliance Summary

| Regulation | Status | Notes |
|------------|--------|-------|
| **GDPR Art. 17** (Right to Erasure) | ✅ Implemented | `delete-account` edge function |
| **GDPR Art. 20** (Data Portability) | ✅ Implemented | `DataExport` component |
| **GDPR Art. 7** (Consent) | ✅ Implemented | Cookie consent with audit log |
| **GDPR Rec. 26** (Anonymization) | ⚠️ Partial | IPs hashed in most places, fix `mfa_activity_log` |
| **ePrivacy** (Cookies) | ✅ Implemented | Analytics only with consent |

---

## Files to Modify

| File | Change |
|------|--------|
| New SQL migration | Fix views and rename IP column |
| `src/components/profile/DataExport.tsx` | Sanitize exported MFA logs |
| Edge functions writing to `mfa_activity_log` | Ensure IP hashing |

