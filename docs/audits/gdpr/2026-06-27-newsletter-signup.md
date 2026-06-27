# Newsletter Opt-in at Registration — 2026-06-27

## Change
Added an explicit newsletter opt-in checkbox to the signup form (`src/pages/Auth.tsx`).

## GDPR posture
- The checkbox is **unchecked by default**.
- It is **separate** from the required data-processing consent checkbox (GDPR Art. 7(2) — consent must be unbundled).
- Only users who actively tick the box are passed to the `subscribe-newsletter` edge function with `consentGiven: true`.
- The subscribe flow records the email in `newsletter_subscribers` and syncs to the Resend audience.
- Failure of the newsletter call is non-blocking and never aborts account creation.

## Explicitly NOT done
- **No back-fill** of existing registered users into `newsletter_subscribers`.
  Account/processing consent is not marketing consent (GDPR Art. 6(1)(a)).
  This is already encoded as a safeguard in `count_potential_newsletter_recoveries`.
- No database trigger added to `handle_new_user()` — consent is captured in the
  application layer where it can be reliably tied to an affirmative user action.

## Compliant alternative for existing users
If outreach to existing registered users is later required, the compliant route is
a one-time re-consent email inviting them to opt in via a confirmation link.
