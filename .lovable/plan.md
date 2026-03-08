

# Implement Dashboard Search (Point 11) & Notification Preferences (Point 13)

## 1. Dashboard Search Bar

Add a product search bar to `Dashboard_Authenticated.tsx` between the hero section and the pending stats widget. When the user types and submits/selects, navigate to `/products?q=<query>`.

**Approach**: Use a simple search input with a search icon (no need for the full `DebouncedSearchWithSuggestions` component since we're just navigating). On Enter or button click, redirect to `/products?search=<query>`.

**File**: `src/pages/Dashboard_Authenticated.tsx`
- Add `useNavigate` import
- Add search state + handler that navigates to `/products?search=<query>`
- Render a search bar card between the hero and PendingStatsWidget

## 2. Notification Preferences Page

Create a new `NotificationPreferences` component and route where users can configure what notifications they receive and how (email vs in-app).

**Data model**: The `profiles` table already has a `notification_preferences` JSONB column (default: `{"email": true, "in_app": true}`). We'll extend this to store granular preferences:

```typescript
{
  email: boolean,        // global email toggle
  in_app: boolean,       // global in-app toggle
  categories: {
    review_assignments: { email: boolean, in_app: boolean },
    review_deadlines: { email: boolean, in_app: boolean },
    status_updates: { email: boolean, in_app: boolean },
    system_announcements: { email: boolean, in_app: boolean },
    company_revisions: { email: boolean, in_app: boolean },
    registration_updates: { email: boolean, in_app: boolean }
  }
}
```

No DB migration needed — the JSONB column already exists and accepts any structure.

**New files**:
- `src/components/notifications/NotificationPreferences.tsx` — Form with switches for each category/channel
- `src/pages/NotificationSettings.tsx` — Page wrapper

**Modified files**:
- `src/App.tsx` — Add `/notification-settings` route (protected)
- `src/pages/NotificationHistory.tsx` — Add link to preferences page
- `src/pages/Dashboard_Authenticated.tsx` — Add search bar + update Notifications quick action description

## Scope
- 2 new files, 3 modified files
- No database migration needed (reuses existing JSONB column)
- All preferences persisted to `profiles.notification_preferences` via existing `updateProfile`

