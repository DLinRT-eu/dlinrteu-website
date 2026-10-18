# Email reviewers: Q4 2026 review round has started

Send one email to each of the 12 reviewers in the active round "Q4 2026 - anticipated" (105 products, started 18 October 2026).

## Email content (English)

- Subject: "DLinRT review round Q4 2026 is open — deadline 10 November 2026"
- Greeting with the reviewer's first name.
- The round is open from today and runs until **10 November 2026**, so there are about three weeks to complete the reviews.
- **Their assigned products**: a list with a link to each product page, plus a link to their reviewer dashboard.
- Link to the public reviewer guide (https://dlinrt.eu/reviewer/guide).
- Thanks, and a contact link (https://dlinrt.eu/support) for questions.
- Sent from noreply@dlinrt.eu with info@dlinrt.eu as reply-to, with the usual DLinRT branding.

## How it is sent

- Add a "Notify reviewers: round started" action to the round's menu on the Review Rounds admin page, with a preview dialog (recipients, product counts, editable intro). You can resend it for future rounds.
- For this round, I send it once right after building it, and you see who received it.
- Reviewers who switched off review-assignment emails are skipped, and so are addresses that bounced or complained before. Every send is logged on the Email Health page.

## Technical details

- New edge function `send-round-start-email`: admin-only (checks `has_role` on the caller's JWT), dynamic CORS, `resend@4.0.0`. Reads `product_reviews` for the round with the service role, groups them by `assigned_to`, joins `profiles`, maps product IDs to names through a product name map sent by the admin client, checks `notification_preferences` and `isSuppressed`, and logs through `logEmailSend`.
- Deadline comes from `review_rounds.default_deadline` (or the per-review deadline when one is set).
- UI: new `SendRoundStartDialog.tsx`, wired into `RoundActionsMenu.tsx`.
- No database schema changes.
