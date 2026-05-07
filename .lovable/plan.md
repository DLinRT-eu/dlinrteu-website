## Goal

1. Acknowledge **UMC Utrecht** as the sponsor covering DLinRT.eu running costs on the **About** page (with logo + thank-you).
2. Mirror the acknowledgement on the **Transparency** page and populate it with the real cost ledger from the uploaded spreadsheet.

## Cost data summary (from `overview_costs_DLinRT.eu_upToMay.xlsx`)

Total expenses to date: **€631.14**, fully covered by UMC Utrecht (sponsor contribution €631.14 → net €0).

Breakdown:
- 2025 (Apr–Dec): 16 entries — Lovable subscriptions/top-ups + 1 IONOS domain charge → **€406.56**
- 2026 (Jan–May): 3 charges (Lovable Jan €198.13, Lovable Mar €26.45, May pending) → **€224.58**
- Single income line per year: "UMC Utrecht — operational sponsorship" matching expenses (net result = €0).

## Changes

### 1. Logo asset
- Add `public/logos/umc-utrecht.svg` (download official UMC Utrecht logo — will fetch from their public brand page; if unavailable in default mode I will ask for the file).

### 2. Financial data
- **`src/data/financials/2025.ts`** — replace placeholder with the 16 real expense entries (Lovable / IONOS, category `Software & Tooling` and `Domain & Email`) and one income line: `UMC Utrecht — operational sponsorship` (€406.56 net & gross). `lastUpdated: 2026-05-07`.
- **`src/data/financials/2026.ts`** (new) — 2026 expenses (Jan + Mar Lovable charges; May placeholder noted) + matching UMCU income line (€224.58). `carryOver: 0`.
- **`src/data/financials/index.ts`** — register `year2026` alongside `year2025`.

### 3. Reusable acknowledgement component
- **`src/components/SponsorAcknowledgement.tsx`** (new) — small card with UMC Utrecht logo, thank-you copy, and link to https://www.umcutrecht.nl. Two variants via prop: `compact` (About) and `full` (Transparency, mentions covering operational costs).

### 4. About page
- **`src/pages/About.tsx`** — insert `<SponsorAcknowledgement variant="compact" />` in a new section between `TeamSection` and `Financial Transparency`, titled "With support from".

### 5. Transparency page
- **`src/pages/Transparency.tsx`** — insert `<SponsorAcknowledgement variant="full" />` near the top of `<main>` (under the header paragraph), explaining that UMC Utrecht currently underwrites all hosting/tooling costs. The existing per-year tables will then reflect the matching income/expense entries automatically (net result €0, closing balance €0).

## Technical notes

- No schema changes; reuse existing `IncomeEntry` / `ExpenseEntry` model.
- Categories used: `Software & Tooling` (Lovable), `Domain & Email` (IONOS).
- Sponsor income is recorded as a single annual aggregate line with notes listing the covered services.
- Logo file referenced with `/logos/umc-utrecht.svg`; alt text: "UMC Utrecht".
- No DB / edge-function changes.

## Open question

Do you have a preferred UMC Utrecht logo file to use? If yes, please attach it; otherwise I will use the official SVG from the UMCU brand portal.
