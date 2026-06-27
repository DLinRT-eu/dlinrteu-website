## Goal
Let new users opt in to the DLinRT newsletter from the signup form. Honor GDPR: the checkbox is **unchecked by default**, separate from the data-processing consent, and only the users who tick it are added to `newsletter_subscribers`. No back-fill of existing users (forbidden by `count_potential_newsletter_recoveries` safeguard / GDPR Art. 6(1)(a)).

## Changes

### 1. `src/pages/Auth.tsx` — signup form
- Add a new state `newsletterOptIn` (default `false`).
- In the signup JSX (around the data-processing consent checkbox, ~line 460+), add a separate, clearly-labelled checkbox:
  > *"Subscribe me to the DLinRT newsletter (occasional updates on new products, evidence reviews, and platform changes). You can unsubscribe at any time."*
- Extend `signupSchema` with `newsletterOptIn: z.boolean().optional()`.
- After a successful `signUp(...)` call, if `newsletterOptIn === true`, invoke the existing edge function:
  ```ts
  await supabase.functions.invoke('subscribe-newsletter', {
    body: { email: validation.email, firstName: validation.firstName, lastName: validation.lastName, source: 'signup' }
  });
  ```
  Wrap in try/catch so a newsletter failure never blocks account creation; surface a soft warning if it fails.
- Reset `newsletterOptIn` in the "clear form" block.

### 2. `subscribe-newsletter` edge function
Verify the function accepts the `{ email, firstName, lastName, source }` payload it's already designed for; no code change expected. If `source` isn't a recognized field, omit it. (Read-only verification, not an edit unless needed.)

### 3. Documentation
- Append a short note in `docs/audits/gdpr/2026-06-20-followup.md` (or a new `2026-06-27-newsletter-signup.md`) recording: explicit opt-in added at registration, unchecked by default, no back-fill performed, consent timestamp captured by the existing subscribe flow.

## Out of scope (deliberately not doing)
- **No back-fill** of existing registered users into `newsletter_subscribers`. The codebase already encodes that this would be a GDPR violation (account/processing consent ≠ marketing consent). If the user later wants to reach existing users, the compliant route is a one-time re-consent email — separate request.
- No change to `handle_new_user()` trigger. Newsletter subscription stays in the application layer where consent is captured, not in a DB trigger that would fire for every auth user regardless of consent.

## Technical notes
- The subscribe-newsletter edge function already handles dedupe (email lowercase + upsert), Resend audience sync, rate-limiting, and confirmation email — so we just call it.
- Calling `supabase.functions.invoke` right after `signUp` works even before email verification because the function uses the anon key and treats this as a public subscription endpoint.
