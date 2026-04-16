

## Plan: Full Regulatory Audit + Fix Edge Function Build Errors

### Part A — Fix build errors (do first, unblocks deploys)

**A1. `npm:resend@4.0.0` resolution failures (8 functions)**

Affected: `notify-role-request-outcome`, `notify-user-approval`, `send-contact-email`, `send-deadline-reminders`, `send-notification-digest`, `submit-product-feedback`, `subscribe-newsletter`, plus newsletter/admin variants.

Cause: Deno edge runtime cannot resolve the npm Resend SDK in this build (lockfile / nodeModulesDir). Per workspace standard (`infrastructure/edge-function-standards-v4-standardization`) we use `npm:resend@4.0.0`, but the recommended Lovable pattern for Resend is to call the **connector gateway via `fetch`** — no SDK import required. This avoids the npm resolution issue entirely while keeping the same RESEND_API_KEY env var.

Fix: Replace `import { Resend } from "npm:resend@4.0.0"` and `resend.emails.send({...})` calls with a small `sendEmail()` helper that POSTs to `https://connector-gateway.lovable.dev/resend/emails` using `LOVABLE_API_KEY` + `RESEND_API_KEY`. Apply identical pattern to all 8 functions.

**A2. `auth.getClaims()` TS error in `notify-certification-complete`**

`getClaims()` is not on the typed Supabase client. Replace with `anonClient.auth.getUser(token)` which returns `{ data: { user } }` — then read `user.id`. Same auth guarantee, type-safe.

### Part B — Full regulatory audit of all active products

I'll iterate through every product file in `src/data/products/<category>/` (~100+ products across 11 categories) and verify against authoritative sources.

**B1. Inventory pass** — list every product with: id, company, current FDA clearance #, current CE status, `lastRevised` date. Build a working spreadsheet in `/tmp/`.

**B2. FDA verification** — for each product with an FDA entry, check the FDA 510(k) database for:
- Whether a newer K-number supersedes the listed one (vendor often updates clearance every 1–3 years)
- Confirm decision date, product code (QKB for radiotherapy AI, LNH, QIH, etc.)
- Flag products where clearance appears withdrawn or company acquired

**B3. CE verification** — for each CE-marked product, verify:
- MDR 2017/745 vs MDD legacy status
- Risk class (IIa / IIb)
- Current notified body where listed
- Note: CE database (EUDAMED) is incomplete — rely on vendor sites + FDA cross-reference

**B4. New products discovery** — scan three sources:
- FDA AI/ML-enabled medical devices list (last update ~Mar 2026) filtered to product code QKB + adjacent radiotherapy codes (LNH, IZL, MUJ)
- Recent CE MDR approvals 2025–2026 from major vendors not already covered
- ESTRO / ASTRO 2025/2026 vendor announcements

For each new candidate, apply inclusion policy (`policy/product-inclusion-criteria` memory): must use AI/DL, must have explicit AI reference in intended use, must have public documentation.

**B5. Apply updates** — for each verified change:
- Update `regulatory.fda.clearanceNumber`, `decisionDate`, `notes` (preserve history in notes)
- Update `regulatory.ce` class/regulation if changed
- Update `lastRevised` and `source` 
- For new products: create new `.ts` file in correct category folder, register in category `index.ts`
- For superseded/withdrawn: archive per existing convention (move to `archived/`, update `archived/README.md`)

**B6. Changelog** — insert one summary entry into `changelog_entries` DB table documenting the audit scope, # products updated, # added, # archived.

### Execution approach

This is a multi-step research task. I'll work in batches by category (auto-contouring first as the largest, ~30 products), report findings per batch, and commit edits incrementally so you can review progress. Estimated 4–6 batched iterations.

### Files touched (estimate)

- ~8 edge function `index.ts` files (Part A)
- ~100 product `.ts` files audited; ~15–25 expected to need updates
- 3–8 new product files added
- 0–5 files moved to `archived/`
- 1 new changelog DB row
- `archived/README.md` updated if anything is moved

