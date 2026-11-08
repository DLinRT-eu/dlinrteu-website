# Audit of the latest change (security fixes) and proposed improvements

## What was audited
The four security fixes from the last turn: daily cap on bulk email to company representatives, daily cap on review-round start email, identical newsletter-signup reply for existing subscribers, and the confirmed-email check for direct company invitations.

## Findings
1. **Bulk representative email can go over the daily cap.** It only checks whether today's count has already reached 1,000, not whether this batch would push it over. With up to 500 recipients per send, one day could reach about 1,499 emails. The review-round email already handles this correctly (today's count plus this batch).
2. **Newsletter signup can still leak through response time.** An address that is already subscribed gets the same message but returns noticeably faster, because no confirmation email is prepared or sent. That timing difference could still reveal who is on the list.
3. **No automated tests cover the new rules** (daily caps, identical reply). They were not exercised with real sends.
4. Round-start cap and the invitation check look correct; no change proposed.

## Proposed changes
- Bulk email: refuse a send when today's count plus this batch exceeds 1,000, matching the review-round email. Message stays "Daily sending limit reached. Please try again tomorrow."
- Newsletter signup: add a small, uniform minimum response delay on all success paths so existing and new subscribers look alike.
- Add a small shared helper `wouldExceedDailyCap(sentToday, batch, cap)` in the shared email-delivery module, used by both email functions, with tests asserting: 1,000 cap — 900 sent + 100 batch allowed, 900 + 101 refused; 500 cap — 499 + 1 allowed, 500 + 1 refused.
- Redeploy the two affected functions plus subscribe-newsletter; run the tests.

## Not changing
Limits themselves (1,000 / 500 per 24 h), admin-only access, input length limits, and the invitation rule.
