# MFA Flow — Audit & Fix Plan

## Audit findings

### 1. Critical — MFA can be bypassed at sign-in (AAL1 session leaks)
In `src/pages/Auth.tsx` (`handleLogin`), once `signIn()` succeeds the Supabase session is **already created at AAL1**. The subsequent `getAuthenticatorAssuranceLevel()` check only controls UI navigation. If the user:
- closes the tab and reopens any protected route directly, or
- refreshes during the MFA dialog, or
- already had a stored AAL1 session,

…they reach the dashboard without ever entering the TOTP code. `ProtectedRoute` / `ApprovalGate` (`src/App.tsx`) check authentication and role, but **never check AAL**. So MFA today is effectively advisory.

### 2. Critical — Backup-code path does not elevate the session
`handleMFAVerify` calls the `verify-backup-code` edge function. The function marks the code as used and returns `{ success: true }`, but it **never elevates the Supabase session to AAL2** (no `mfa.challenge` + `mfa.verify` is performed against Supabase Auth). After "successful" backup-code login, the session is still AAL1, so any AAL2-protected resource (or AAL2-gated route once we add it) will reject the user. Today this hides the bug because nothing actually requires AAL2.

### 3. High — MFA unenroll flow is weak
`MFASettings.confirmUnenrollment` re-authenticates by calling `signInWithPassword()` (which silently replaces the current session and may drop AAL context), then calls `mfa.unenroll`. It does **not** require a current TOTP code — anyone with the password (e.g. a stolen browser session that already has the password cached, or a phishing victim who didn't lose their TOTP) can disable MFA without producing a second factor. Standard practice is to require an active AAL2 session **and** a fresh TOTP code to unenroll.

### 4. Medium — Backup codes shown before TOTP is verified
In `MFASettings.startEnrollment`, backup codes are generated and persisted (10 sequential bcrypt-cost-10 round-trips) **before** the user has proven they can read TOTP codes. If the user abandons enrollment, an unverified factor exists alongside valid backup codes. The factor is cleaned up on the *next* enrollment attempt, but the codes are not.

### 5. Medium — Backup-code generation is 10 sequential round-trips
Each `store-backup-code` call performs bcrypt(10) on the server. 10 codes × ~80ms = noticeable latency and 10 chances for partial failure (some codes saved, others not). Should be batched into a single call.

### 6. Low — Backup-code verifier is O(n) bcrypt comparisons
`verify-backup-code` compares against every unused stored code with bcrypt (no early exit, by design for timing). With the 16-code cap this is bounded, but the cap should be reduced to 10 to align with what the UI actually generates.

### 7. Low — Stale unverified factors
If the user closes the enrollment dialog without verifying, the unverified TOTP factor lingers until the next enrollment attempt (cleaned up there) or until Supabase prunes it. Cosmetic, but worth removing on dialog close.

---

## Proposed fixes (in priority order)

### Fix 1 — Enforce AAL2 server-side & in routes (addresses #1)
- Update `ProtectedRoute` to call `supabase.auth.mfa.getAuthenticatorAssuranceLevel()` and, if `currentLevel === 'aal1' && nextLevel === 'aal2'`, redirect to `/auth?mfa=required` instead of rendering the protected children.
- Update `Auth.tsx` to detect that mode on mount and show `<MFAVerification>` immediately when an AAL1 session exists with `nextLevel === 'aal2'`, instead of only on the post-`signIn` code path.
- Add a "Cancel / Sign out" button in `MFAVerification` so an aborted MFA challenge cleanly signs the user out.

### Fix 2 — Make backup codes actually elevate the session (addresses #2)
Two acceptable approaches; recommend **A**:

**A. Server-side AAL2 elevation via Auth admin (preferred).**
Change `verify-backup-code` so that, on a successful match, it:
1. Marks the backup code as used.
2. Uses `supabase.auth.admin` (service role) to issue a fresh session for the user **at AAL2** (e.g. by performing the TOTP challenge/verify on the server using a one-time code that the function generates against the user's existing TOTP secret — not viable without the secret) **OR**, more simply, by signing the user out of the current AAL1 session and emailing a one-time recovery magic-link that, on click, lands on a recovery page where the user must immediately re-enroll a new TOTP factor before regaining access.

**B. Documented limitation.**
If we don't want a recovery edge function, remove the "Use backup code instead" affordance from `MFAVerification` and instead show a "Lost your device? Contact support" link. Backup codes then become a support-side recovery tool only.

Pick one — both close the gap. A keeps self-service; B is simpler.

### Fix 3 — Harden MFA unenroll (addresses #3)
- Require the user to be at AAL2 to unenroll (i.e. fresh TOTP within the current session).
- Replace the "password re-auth via `signInWithPassword`" with a `reauthenticate()` + TOTP challenge flow: ask for password **and** a current TOTP code, perform `mfa.challenge` + `mfa.verify` against the existing factor, then call `mfa.unenroll`.
- Only after success, delete `mfa_backup_codes` and update the `profiles` flags.

### Fix 4 — Defer backup-code generation until TOTP is verified (addresses #4)
- In `verifyEnrollment`, only after `mfa.verify` succeeds: generate codes, persist them, then reveal them in the dialog. Keep the dialog open with a "Save your backup codes" step before closing.
- On dialog close without verification, call `mfa.unenroll` on the pending factor.

### Fix 5 — Batch backup-code storage (addresses #5)
- Change `store-backup-code` to accept `{ codes: string[], reset: boolean }`, hash all codes server-side in one invocation, insert in a single batch.
- Update `MFASettings.generateBackupCodes` to call once with all 10 codes.

### Fix 6 — Lower the unused-code cap to 10 (addresses #6)
- In `store-backup-code`, change the quota from 16 to 10 to match UI generation. Add a DB check constraint or trigger update if one exists.

### Fix 7 — Clean up unverified factors on dialog close (addresses #7)
- In `MFASettings`, when `showEnrollDialog` transitions to `false` without a verified state, call `mfa.unenroll({ factorId })`.

---

## Files affected
- `src/pages/Auth.tsx` — direct-load AAL2 detection; cancel button wiring.
- `src/components/auth/ProtectedRoute.tsx` — add AAL2 enforcement.
- `src/components/auth/MFAVerification.tsx` — sign-out / cancel control; possibly remove backup-code tab (Fix 2-B).
- `src/components/profile/MFASettings.tsx` — defer backup codes; cleanup unverified factor; harder unenroll.
- `supabase/functions/store-backup-code/index.ts` — batch payload; quota 10.
- `supabase/functions/verify-backup-code/index.ts` — implement Fix 2-A recovery path, or remove if Fix 2-B chosen.
- (Optional) New `mfa-recovery-link` edge function if Fix 2-A path chosen.

## Decisions needed before implementing
1. **Backup-code strategy** — Fix 2-A (recovery magic-link + force re-enroll) or 2-B (remove self-service backup codes, use support recovery)?
2. **Scope** — apply all 7 fixes, or only the criticals (#1–#3)?

Once confirmed, I'll implement in one pass.
