

# Add Admin Overview & Certification Management Quick Actions

## Problem

Two important admin pages are missing from the quick actions on the dashboard-home and profile:
- `/admin` (Admin Overview) - the central admin hub
- `/admin/certifications` (Certification Management) - manage product certifications

## Changes

### 1. `src/pages/Dashboard_Authenticated.tsx`

Add two new quick actions to the admin section:

| Action | Position | Icon | Color |
|--------|----------|------|-------|
| **Admin Overview** | First (top of admin list) | `LayoutDashboard` | `bg-slate-50 text-slate-600` |
| **Certification Management** | After "Company Revisions" | `BadgeCheck` | `bg-teal-50 text-teal-600` |

### 2. `src/components/profile/RoleQuickActions.tsx`

Add two new buttons to the admin section:

| Action | Position |
|--------|----------|
| **Admin Overview** | First (top of admin list) |
| **Certification Management** | After "Company Revisions" |

### 3. Import Updates

Add `LayoutDashboard` icon import to `Dashboard_Authenticated.tsx` (already imported in `RoleQuickActions.tsx`).

## Files to Modify

| File | Change |
|------|--------|
| `src/pages/Dashboard_Authenticated.tsx` | Add 2 quick actions + `LayoutDashboard` import |
| `src/components/profile/RoleQuickActions.tsx` | Add 2 buttons to admin section |

