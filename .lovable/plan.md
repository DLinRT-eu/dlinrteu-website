
# Make Company Overview More Accessible

## Problem
The `/company/overview` page (which contains the new Certification Progress widget and Products with quick actions) is not directly accessible from:
1. The dashboard-home page (landing page after login)
2. The profile page

Company representatives must navigate through multiple clicks to reach their overview.

---

## Solution

Add prominent "Company Overview" links to both pages, making it accessible in **1 click** from either location.

---

## Changes Summary

### 1. Dashboard_Authenticated.tsx

Add a new quick action for company users that links directly to `/company/overview`:

| Current | After |
|---------|-------|
| Submit Revision, My Products, Certify Product, Company Dashboard | **Company Overview** (first), Submit Revision, My Products, Certify Product |

The new "Company Overview" button will be placed **first** in the company actions list since it's the main entry point with certification progress and product quick actions.

### 2. RoleQuickActions.tsx (Profile page)

Add "Company Overview" as the first quick action for company users:

| Current | After |
|---------|-------|
| Submit Revision, My Products, Certify Product, Company Dashboard, Company Guide | **Company Overview** (first), Submit Revision, My Products, Certify Product, Company Guide |

### 3. CompanyProfileSummary.tsx (Profile page)

Add an "Overview" button alongside the existing buttons, making it the primary action:

| Current Buttons | After |
|-----------------|-------|
| Company Dashboard, Manage Products | **Overview**, Company Dashboard, Manage Products |

---

## Files to Modify

| File | Change |
|------|--------|
| `src/pages/Dashboard_Authenticated.tsx` | Add "Company Overview" quick action at position 0 in company actions |
| `src/components/profile/RoleQuickActions.tsx` | Add "Company Overview" button as first company action |
| `src/components/profile/CompanyProfileSummary.tsx` | Add "Overview" button as primary action |

---

## Expected Outcome

- Company representatives can access the Overview page in **1 click** from dashboard-home
- Company representatives can access the Overview page in **1 click** from their profile
- The Overview page (with certification progress and quick actions) becomes the natural entry point for company workflow
