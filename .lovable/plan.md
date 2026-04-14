

## Add Email Change Functionality to Profile Page

### Problem
Users cannot change their login email address from within the app. The email is displayed as read-only in the "Account Status" card on the Profile page.

### Approach

Supabase provides `supabase.auth.updateUser({ email: newEmail })` which sends a confirmation link to both the old and new email addresses. The change is only applied after confirmation.

### Implementation

**1. Create `ChangeEmailSection.tsx` component** (`src/components/profile/ChangeEmailSection.tsx`)

A new card component placed in the Profile page that:
- Shows the current email (read-only)
- Has an "Change Email" button that reveals an input field
- Validates the new email format using a simple regex
- Calls `supabase.auth.updateUser({ email: newEmail })` on submit
- Shows a success toast explaining that confirmation emails were sent to both old and new addresses
- Handles errors (invalid email, rate limiting, same email)

**2. Update `Profile.tsx`**

- Import and add `<ChangeEmailSection />` in the profile page, placed after the "Account Status" card and before the "Profile Information" card
- Pass the current user email as a prop

### Technical Details

- No database migration needed — Supabase Auth handles email changes natively
- The `profiles.email` column will be auto-updated by the existing `handle_new_user` trigger or via the auth state change listener
- After the user confirms both emails, the `onAuthStateChange` event fires and the profile syncs automatically
- The `updateUser` call requires the user to be authenticated (already guaranteed by the Profile page)

### Security
- Email validation on both client-side (format check) and server-side (Supabase validates)
- Supabase sends confirmation to both old and new emails to prevent account hijacking
- Rate limiting is handled by Supabase Auth

