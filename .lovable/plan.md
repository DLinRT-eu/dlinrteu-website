
# Fix 404 Error on /company/certify Route

## Problem

The `/company/certify` URL returns a 404 error because:
- The actual route is registered as `/company/certification` (in App.tsx line 332)
- Two components have incorrect links pointing to `/company/certify` instead of `/company/certification`

## Solution

Update the two incorrect links to use the correct route path.

---

## Files to Modify

| File | Line | Current Value | Correct Value |
|------|------|---------------|---------------|
| `src/pages/Dashboard_Authenticated.tsx` | 171 | `/company/certify` | `/company/certification` |
| `src/components/profile/RoleQuickActions.tsx` | 159 | `/company/certify` | `/company/certification` |

---

## Changes Detail

### File 1: `src/pages/Dashboard_Authenticated.tsx`

Change the link in the company quick action:

```typescript
// Before
link: '/company/certify',

// After
link: '/company/certification',
```

### File 2: `src/components/profile/RoleQuickActions.tsx`

Change the Link component:

```typescript
// Before
<Link to="/company/certify">

// After
<Link to="/company/certification">
```

---

## Impact

- Low risk - simple link corrections
- No logic changes
- Fixes the 404 error when users click "Certify Product" buttons
