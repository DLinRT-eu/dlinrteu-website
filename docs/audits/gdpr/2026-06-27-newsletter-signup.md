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
- No database trigger added to `handle_new_user()` — consent is captured in the
  application layer where it can be reliably tied to an affirmative user action.

## Update — 2026-10-10 (supersedes the "no back-fill" note above)
The site owner decided that every registered user should also be reachable via
the newsletter list:

- **New registrations:** users who do NOT tick the signup checkbox receive a
  one-time consent-invite email (`send-newsletter-consent-invite` edge function)
  with a signed confirmation link. Only users who click the link are activated
  (via `confirm-newsletter-resubscribe`). A pending, unsubscribed row is created
  so the confirmation endpoint can activate it; ignoring the email leaves the
  user unsubscribed and they are not asked again.
- **Existing users (one-off):** all registered users were back-filled into
  `newsletter_subscribers` with `consent_given = true`, skipping emails already
  present, and synced to the Resend audience. This was an explicit owner
  decision; note that account/processing consent is not marketing consent
  (GDPR Art. 6(1)(a)), so this back-fill rests on the controller's own
  lawful-basis assessment. Every newsletter email includes an unsubscribe link.
