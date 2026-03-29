

# Improve Post-Login Navigation & Add Certification Completion Notification

## Problem

1. **Navigation confusion after login**: All roles land on `/dashboard-home` which shows a flat grid of quick actions. For admins with 12+ actions, it's overwhelming. For company/reviewer users, the most important actions aren't visually prioritized. The desktop Header nav is also sparse for role users (collapsed into "More" dropdown).

2. **No notification when certification is verified**: When a company representative certifies a product, there's no email confirmation sent to them or to admins.

## Plan

### Task 1: Improve Dashboard_Authenticated layout with role-priority sections

**File**: `src/pages/Dashboard_Authenticated.tsx`

- Reorganize the quick actions grid into **prioritized sections** per role instead of one flat list:
  - **Admin**: Show a "Priority Actions" row at top with the 3-4 most common admin tasks (Registrations, Review Rounds, Certification Management, Companies) as larger highlighted cards. Remaining admin actions go in a collapsible "All Admin Tools" section.
  - **Reviewer**: Show "Your Reviews" section first with Assigned Reviews, Due Reviews as primary cards. Then secondary actions.
  - **Company**: Show "Certification & Products" section first with Certify Product, My Products, Submit Revision as primary. Then secondary.
  - **Regular user** (no role): Show Products, Companies, Analytics, News as primary.
- Add a "Role-specific" banner/callout at the top that summarizes pending work (already partially done via `PendingStatsWidget`, but make stats cards link directly to their action pages).

### Task 2: Improve Header desktop nav for role users

**File**: `src/components/Header.tsx`

- Add Certifications link for admin nav (`/admin/certifications`)
- Add Company Products link for company nav (`/company/products`)
- Add Certification link for company nav (`/company/certification`)
- For reviewer, add Due Reviews link (`/reviewer/due-reviews`)

### Task 3: Improve MobileNav with missing role links

**File**: `src/components/MobileNav.tsx`

- Admin section: add Certifications, Registrations, Newsletter links
- Reviewer section: add a link to Reviewer Guide
- Company section: add My Products link (`/company/products`)

### Task 4: Make role dashboard route role-aware

**File**: `src/utils/roleDashboardUtils.ts`

Currently all roles go to `/dashboard-home`. Keep this, but no change needed here — the dashboard itself will be reorganized.

### Task 5: Create certification completion notification edge function

**New file**: `supabase/functions/notify-certification-complete/index.ts`

- Triggered from client code after a successful `certify_product` RPC call
- Sends email to the company representative confirming their product certification was recorded
- Sends email to admins (info@dlinrt.eu) notifying them a new certification was submitted
- Respects `notification_preferences` for the company user
- Uses Resend via `npm:resend@4.0.0`, dynamic CORS, standard edge function pattern
- HTML template with product name, company name, certification date, green checkmark branding

**Config**: Add to `supabase/config.toml`:
```
[functions.notify-certification-complete]
verify_jwt = true
```

### Task 6: Wire certification notification into certify flows

**Files**:
- `src/pages/company/Dashboard.tsx` (~line 196, after successful certification)
- `src/pages/company/CompanyDashboardOverview.tsx` (~line 306, after successful certification)

After the `certify_product` RPC succeeds, invoke:
```typescript
await supabase.functions.invoke('notify-certification-complete', {
  body: { productId, productName, companyName }
});
```

### Task 7: Update RoleQuickActions on profile page

**File**: `src/components/profile/RoleQuickActions.tsx`

- Ensure consistency with the updated Dashboard_Authenticated quick actions ordering

## Technical Details

- Edge function uses existing Resend + CORS pattern from other notification functions
- No database migration needed — uses existing `company_product_verifications` table
- Notification respects `notification_preferences.status_updates` category
- Edge function validates JWT and fetches user profile for personalization

## Scope

- 5 existing files modified
- 1 new edge function created
- 1 config.toml entry added
- No schema changes

