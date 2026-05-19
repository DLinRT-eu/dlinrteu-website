## Goal

Refine the "Who we help" section on Resources & Compliance, reorder the page so the scope/inclusion callout precedes it, and align terminology + docs.

## Changes

### 1. `src/pages/ResourcesCompliance.tsx` — reorder

Swap the order so the **Platform scope** blue callout (inclusion criteria) sits **above** the `StakeholderUseCases` block, immediately after `<PageIndex />`. No content change to either block beyond ordering and spacing tweaks.

### 2. `src/components/about/StakeholderUseCases.tsx` — strengthen the Vendor/Company entry

The existing "Vendor" card only frames vendors as benchmarkers. Rewrite that card so it covers the **two** value propositions DLinRT offers companies:

- **Visibility** — DLinRT is often the first access point for clinicians and researchers looking up a product.
- **Certified information** — through the Company Certification programme, vendors can have manufacturer-verified data displayed with the green/amber badge.
- (Keep) Benchmarking against per-task medians.

Proposed copy (single card, renamed "Vendor / Company"):

- audience: `"Vendor / Company"`
- description: `"Manufacturers and solution providers who want their product information accurately represented and discoverable."`
- question: `"How do clinicians and researchers find and evaluate my product — and is the information they see correct?"`
- view: `"Company page + Certification programme + Evidence/Impact scatter"`
- viewLink: `/companies`
- thresholds: `"Claim your company profile to certify product data (green/amber badge). Benchmark against per-task medians (≥E2 ∧ ≥I2 ∧ ≥R3 to be competitive)."`
- extra: `"DLinRT is often the first access point users have to your product — accurate, certified information improves trust and adoption signal."`

Icon: keep `Factory` (or switch to `Building2`) — will keep `Factory` to minimise churn.

### 3. Terminology consistency

Across the touched files use the canonical term **"Vendor / Company"** (matches existing `companyCertification` and `Companies` page nomenclature). Specifically:

- Update the `StakeholderUseCases` card label and the dashboard view toggle preset name reference in any inline comment.
- Verify the "Adoption Readiness (R0–R5)" wording is used (not Burden/Z) — the Platform scope block does not mention it, but the Evidence section's prose in `ResourcesCompliance.tsx` still says **"Implementation & Assurance Burden (Z0–Z5)"** and **"Rigor × Impact × Burden"**. Update those two paragraphs to **"Adoption Readiness (R0–R5)"** and **"Rigor × Impact × Readiness"** to stay consistent with the rest of the app (per the v2 rollout).

### 4. Docs

- **README.md** — if a "Who we help / audiences" or stakeholders blurb exists, ensure Vendor/Company line mentions visibility + certification. If absent, add a short one-liner under the project overview.
- **docs/FIELD_REFERENCE.md** — confirm the audience/stakeholder terminology and Adoption Readiness (R0–R5) label are used; touch only if Burden/Z terms remain.
- **docs/review/GUIDE.md** — same check: ensure R0–R5 / Adoption Readiness terminology only.

No data-model, product-file, or backend changes. No design system / token changes.

&nbsp;

About page StakeholderUseCases placement make consistent to what is placed about the vendors as well.

## Out of scope

- New icons, new sections, copy beyond the Vendor/Company card.