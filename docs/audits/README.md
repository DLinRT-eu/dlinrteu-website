# Audits

Persistent home for compliance, security, and data-quality audits run against DLinRT.eu. Each audit lives in a topic subfolder, named `YYYY-MM-DD-<phase>.{md,csv}`.

## GDPR

| Date | Phase | File | Status |
|---|---|---|---|
| 2026-06-20 | Initial penetration audit | [`gdpr/2026-06-20-initial.md`](./gdpr/2026-06-20-initial.md) · [csv](./gdpr/2026-06-20-initial.csv) | 12 findings raised |
| 2026-06-20 | Wave E follow-up | [`gdpr/2026-06-20-followup.md`](./gdpr/2026-06-20-followup.md) | 10/12 closed, 2 deferred |

**Remediation plan**: see [`.lovable/plan.md`](../../.lovable/plan.md) (Waves A–D shipped, Wave E verified).

### Deferred items (tracked, not yet closed)

1. **Postgres-backed rate limiting** on 5 public edge functions (`subscribe-newsletter`, `send-contact-email`, `submit-product-feedback`, `track-analytics`, `track-security-event`). Mitigation: Supabase platform-level abuse protection + CORS origin allowlist.
2. **CSP / COOP / Permissions-Policy propagation** on the `dlinrt.eu` custom domain. Headers are defined in `public/_headers` and honored on `*.lovable.app`, but stripped by the custom-domain proxy. Mitigation: tracked with Lovable platform.

## Adding a new audit

1. Pick (or create) a topic folder under `docs/audits/<topic>/`.
2. Save the report as `YYYY-MM-DD-<phase>.md` (+ optional `.csv` for tabular findings).
3. Append a row to the table above with status.
4. If the audit drives remediation work, link to the plan in `.lovable/plan.md`.
